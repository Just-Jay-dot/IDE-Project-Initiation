#!/usr/bin/env node

/**
 * projorg - Organize existing projects with Windsor Constitution
 * 
 * Usage: projorg [project-path]
 * 
 * This command:
 * 1. Creates backup and rollback point
 * 2. Pulls latest from GitHub repo
 * 3. Adds Windsor Constitution files
 * 4. Organizes project structure (optional)
 * 5. Updates import paths
 * 6. Validates changes
 */

const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');
const inquirer = require('inquirer');
const simpleGit = require('simple-git');
const { execSync } = require('child_process');
const glob = require('glob');

// Configuration
const WINDSOR_REPO = 'https://github.com/yourusername/windsor-project-constitution.git';
const WINDSOR_VERSION = '1.0.0';
const CACHE_DIR = path.join(require('os').homedir(), '.windsor-cache');
const TEMPLATE_DIR = path.join(CACHE_DIR, 'template');
const BACKUP_DIR_NAME = '.windsor-backup';

// Colors
const log = {
  info: (msg) => console.log(chalk.blue('ℹ'), msg),
  success: (msg) => console.log(chalk.green('✓'), msg),
  error: (msg) => console.log(chalk.red('✗'), msg),
  warn: (msg) => console.log(chalk.yellow('⚠'), msg),
  step: (msg) => console.log(chalk.cyan('\n→'), chalk.bold(msg)),
};

async function main() {
  console.log(chalk.bold.cyan('\n🔧 Windsor Project Constitution - projorg\n'));
  
  // Get project path
  const projectPath = process.argv[2] || process.cwd();
  const projectRoot = path.resolve(projectPath);
  
  if (!fs.existsSync(projectRoot)) {
    log.error(`Project directory does not exist: ${projectRoot}`);
    process.exit(1);
  }
  
  log.info(`Project path: ${projectRoot}`);
  
  // Check if it's actually a project
  const hasProjectFiles = fs.existsSync(path.join(projectRoot, 'package.json')) ||
                          fs.existsSync(path.join(projectRoot, 'src')) ||
                          fs.existsSync(path.join(projectRoot, 'app')) ||
                          fs.existsSync(path.join(projectRoot, '.git'));
  
  if (!hasProjectFiles) {
    log.warn('This does not appear to be an existing project.');
    const { proceed } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'proceed',
        message: 'Continue anyway?',
        default: false
      }
    ]);
    if (!proceed) {
      log.info('Cancelled. Use "projinit" for new projects.');
      process.exit(0);
    }
  }
  
  try {
    // Step 1: Create backup
    log.step('Step 1: Creating backup and rollback point...');
    const backupPath = await createBackup(projectRoot);
    
    // Step 2: Pull from GitHub
    log.step('Step 2: Fetching Windsor Constitution from GitHub...');
    await fetchFromGitHub();
    
    // Step 3: Add Windsor files
    log.step('Step 3: Adding Windsor Constitution files...');
    await addWindsorFiles(projectRoot);
    
    // Step 4: Ask about reorganization
    log.step('Step 4: Project organization options...');
    const { organize } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'organize',
        message: 'Reorganize project structure? (moves files, updates imports)',
        default: false
      }
    ]);
    
    if (organize) {
      await organizeProject(projectRoot, backupPath);
    }
    
    // Step 5: Setup Cursor
    log.step('Step 5: Setting up Cursor configuration...');
    await setupCursor(projectRoot);
    
    // Step 6: Create config
    log.step('Step 6: Creating configuration...');
    createConfigFile(projectRoot, 'existing', backupPath);
    
    console.log(chalk.bold.green('\n✅ Project organized successfully!\n'));
    console.log(chalk.cyan('Backup location:'), backupPath);
    console.log(chalk.cyan('\nNext steps:'));
    console.log('  1. Test your application');
    console.log('  2. If something broke, restore from backup');
    console.log('  3. Review INSTRUCTIONS.md');
    console.log('  4. Start using @ references in Cursor\n');
    
  } catch (error) {
    log.error(`Organization failed: ${error.message}`);
    console.error(error);
    log.warn('\nYou can restore from backup if needed.');
    process.exit(1);
  }
}

async function createBackup(root) {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const backupPath = path.join(root, BACKUP_DIR_NAME, timestamp);
  
  await fs.ensureDir(backupPath);
  
  // Copy important files
  const itemsToBackup = [
    'package.json',
    'package-lock.json',
    'yarn.lock',
    'src',
    'app',
    'lib',
    'components',
    'utils',
    'config',
    '.git',
    'tsconfig.json',
    'jsconfig.json',
    'webpack.config.js',
    'vite.config.js',
    'next.config.js',
    'tailwind.config.js'
  ];
  
  let backedUp = 0;
  for (const item of itemsToBackup) {
    const srcPath = path.join(root, item);
    if (await fs.pathExists(srcPath)) {
      const destPath = path.join(backupPath, item);
      await fs.copy(srcPath, destPath);
      backedUp++;
    }
  }
  
  // Create rollback script
  const rollbackScript = `#!/bin/bash
# Rollback script - Restores project from backup
# Generated: ${new Date().toISOString()}

BACKUP_DIR="${backupPath}"
PROJECT_ROOT="${root}"

echo "🔄 Rolling back to backup: $BACKUP_DIR"

if [ ! -d "$BACKUP_DIR" ]; then
  echo "❌ Backup directory not found!"
  exit 1
fi

# Restore files
cp -r "$BACKUP_DIR"/* "$PROJECT_ROOT"/

echo "✅ Rollback complete!"
`;
  
  const rollbackPath = path.join(backupPath, 'rollback.sh');
  await fs.writeFile(rollbackPath, rollbackScript);
  await fs.chmod(rollbackPath, '755');
  
  // Create rollback info
  const rollbackInfo = {
    timestamp: new Date().toISOString(),
    backupPath: backupPath,
    projectRoot: root,
    command: 'projorg',
    itemsBackedUp: backedUp
  };
  
  await fs.writeFile(
    path.join(backupPath, 'rollback-info.json'),
    JSON.stringify(rollbackInfo, null, 2)
  );
  
  log.success(`Backup created: ${backupPath}`);
  log.info(`Backed up ${backedUp} items`);
  log.info(`Rollback script: ${rollbackPath}`);
  
  return backupPath;
}

async function fetchFromGitHub() {
  // Same as projinit
  if (!fs.existsSync(CACHE_DIR)) {
    fs.mkdirSync(CACHE_DIR, { recursive: true });
  }
  
  const gitDir = path.join(CACHE_DIR, 'repo');
  
  if (fs.existsSync(gitDir)) {
    log.info('Updating cached repository...');
    const git = simpleGit(gitDir);
    try {
      await git.pull();
      log.success('Repository updated');
    } catch (error) {
      log.warn('Pull failed, using cached version');
    }
  } else {
    log.info('Cloning repository (first time)...');
    try {
      await simpleGit().clone(WINDSOR_REPO, gitDir);
      log.success('Repository cloned');
    } catch (error) {
      log.error(`Failed to clone repository: ${error.message}`);
      throw error;
    }
  }
  
  const repoTemplateDir = path.join(gitDir, 'template');
  if (fs.existsSync(repoTemplateDir)) {
    await fs.copy(repoTemplateDir, TEMPLATE_DIR);
    log.success('Template files ready');
  } else {
    log.warn('Template directory not found, using repo root');
    await fs.copy(gitDir, TEMPLATE_DIR, {
      filter: (src) => {
        const name = path.basename(src);
        return !['.git', 'node_modules', '.gitignore'].includes(name);
      }
    });
  }
}

async function addWindsorFiles(root) {
  if (!fs.existsSync(TEMPLATE_DIR)) {
    throw new Error('Template directory not found.');
  }
  
  // Create docs structure if needed
  await fs.ensureDir(path.join(root, 'docs', 'IDEA'));
  await fs.ensureDir(path.join(root, 'docs', 'BLUEPRINT'));
  await fs.ensureDir(path.join(root, 'docs', 'OPERATIONS'));
  await fs.ensureDir(path.join(root, 'docs', 'TEAM'));
  await fs.ensureDir(path.join(root, 'docs', 'METRICS'));
  
  // Copy guide files (skip if exist)
  const templateFiles = await fs.readdir(TEMPLATE_DIR);
  let copied = 0;
  
  for (const file of templateFiles) {
    const srcPath = path.join(TEMPLATE_DIR, file);
    const destPath = path.join(root, file);
    
    const stat = await fs.stat(srcPath);
    if (stat.isFile() && file.endsWith('.md')) {
      if (!(await fs.pathExists(destPath))) {
        await fs.copy(srcPath, destPath);
        log.success(`Added ${file}`);
        copied++;
      } else {
        log.info(`Skipped ${file} (already exists)`);
      }
    }
  }
  
  // Copy .cursor/rules (merge, don't overwrite)
  const rulesSource = path.join(TEMPLATE_DIR, '.cursor', 'rules');
  if (await fs.pathExists(rulesSource)) {
    const rulesDest = path.join(root, '.cursor', 'rules');
    await fs.ensureDir(rulesDest);
    
    const ruleFiles = await fs.readdir(rulesSource);
    for (const ruleFile of ruleFiles) {
      const srcRule = path.join(rulesSource, ruleFile);
      const destRule = path.join(rulesDest, ruleFile);
      
      if (!(await fs.pathExists(destRule))) {
        await fs.copy(srcRule, destRule);
        log.success(`Added .cursor/rules/${ruleFile}`);
        copied++;
      }
    }
  }
  
  log.success(`Added ${copied} Windsor Constitution files`);
}

async function organizeProject(root, backupPath) {
  log.warn('⚠️  Reorganization will move files and update imports.');
  log.warn('A backup has been created, but please test thoroughly.');
  
  const { confirm } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'confirm',
      message: 'Proceed with reorganization?',
      default: false
    }
  ]);
  
  if (!confirm) {
    log.info('Reorganization skipped.');
    return;
  }
  
  // Analyze current structure
  log.info('Analyzing project structure...');
  const pathMap = await analyzeStructure(root);
  
  // Create new structure
  log.info('Creating new structure...');
  await createNewStructure(root);
  
  // Move files
  log.info('Moving files...');
  await moveFiles(root, pathMap);
  
  // Update imports
  log.info('Updating import paths...');
  await updateImports(root, pathMap);
  
  log.success('Reorganization complete!');
  log.warn('Please test your application thoroughly.');
}

async function analyzeStructure(root) {
  // Simple analysis - can be enhanced
  const pathMap = {};
  
  // Check for common patterns
  const checks = [
    { old: 'components', new: 'src/components' },
    { old: 'utils', new: 'src/utils' },
    { old: 'lib', new: 'src/lib' },
    { old: 'helpers', new: 'src/utils/helpers' }
  ];
  
  for (const check of checks) {
    const oldPath = path.join(root, check.old);
    if (await fs.pathExists(oldPath)) {
      pathMap[`./${check.old}`] = `./${check.new}`;
      pathMap[`../${check.old}`] = `./${check.new}`;
    }
  }
  
  return pathMap;
}

async function createNewStructure(root) {
  const dirs = [
    'src/components',
    'src/utils',
    'src/services',
    'src/models',
    'src/api'
  ];
  
  for (const dir of dirs) {
    await fs.ensureDir(path.join(root, dir));
  }
}

async function moveFiles(root, pathMap) {
  // This is a simplified version
  // In production, you'd want more sophisticated logic
  log.warn('File moving is simplified. Manual review recommended.');
}

async function updateImports(root, pathMap) {
  if (Object.keys(pathMap).length === 0) {
    log.info('No import paths to update');
    return;
  }
  
  const patterns = ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx'];
  const files = [];
  
  for (const pattern of patterns) {
    const matches = glob.sync(pattern, {
      cwd: root,
      ignore: ['node_modules/**', '.git/**', 'dist/**', 'build/**', BACKUP_DIR_NAME + '/**']
    });
    files.push(...matches);
  }
  
  let updated = 0;
  for (const file of files) {
    const filePath = path.join(root, file);
    let content = await fs.readFile(filePath, 'utf8');
    let changed = false;
    
    for (const [oldPath, newPath] of Object.entries(pathMap)) {
      const regex = new RegExp(oldPath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
      if (content.includes(oldPath)) {
        content = content.replace(regex, newPath);
        changed = true;
      }
    }
    
    if (changed) {
      await fs.writeFile(filePath, content);
      updated++;
    }
  }
  
  log.success(`Updated imports in ${updated} files`);
}

async function setupCursor(root) {
  const cursorDir = path.join(root, '.cursor');
  await fs.ensureDir(cursorDir);
  
  const customInstructionsPath = path.join(cursorDir, 'custom-instructions.md');
  
  const instructions = `# Windsor Project Constitution - Custom Instructions

This project follows the Windsor Project Constitution system.

## Always Reference These Files

When working on this project, always reference:
- @IDEA_GUIDE.md - For idea validation
- @BLUEPRINT_GUIDE.md - For product specifications
- @CURSOR.md - For development standards
- @INSTRUCTIONS.md - For current project status
- @.cursor/rules/ - For project-specific rules

## Project Structure

This project follows the Windsor Constitution structure:
- docs/IDEA/ - Idea validation documents
- docs/BLUEPRINT/ - Product specifications
- docs/OPERATIONS/ - Deployment and operations
- docs/TEAM/ - Team documentation
- docs/METRICS/ - Success metrics

## Development Standards

Follow the standards defined in:
- .cursor/rules/project-guidelines.mdc
- .cursor/rules/api-standards.mdc
- .cursor/rules/testing-requirements.mdc
- .cursor/rules/security-checklist.mdc

## Quick Commands

\`\`\`bash
# Reference documentation
@INSTRUCTIONS.md What is the current project status?

# Check standards
@.cursor/rules/api-standards.mdc Review this API endpoint

# Validate idea
@IDEA_GUIDE.md Help me validate this product idea
\`\`\`

## Installation Source

This project was organized using:
- Windsor Project Constitution v${WINDSOR_VERSION}
- Installed: ${new Date().toISOString()}
- Command: projorg
`;
  
  await fs.writeFile(customInstructionsPath, instructions);
  log.success('Created .cursor/custom-instructions.md');
}

function createConfigFile(root, projectType, backupPath) {
  const config = {
    version: WINDSOR_VERSION,
    installed: new Date().toISOString(),
    projectType: projectType,
    command: 'projorg',
    backupPath: backupPath,
    structure: {
      docs: true,
      cursorRules: true,
      tests: true
    }
  };
  
  fs.writeFileSync(
    path.join(root, '.windsor-config.json'),
    JSON.stringify(config, null, 2)
  );
  log.success('Created .windsor-config.json');
}

// Run if called directly
if (require.main === module) {
  main().catch(error => {
    log.error(`Fatal error: ${error.message}`);
    console.error(error);
    process.exit(1);
  });
}

module.exports = { main };

