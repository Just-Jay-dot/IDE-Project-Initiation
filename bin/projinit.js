#!/usr/bin/env node

/**
 * projinit - Initialize new projects with Windsor Constitution
 * 
 * Usage: projinit [project-path]
 * 
 * This command:
 * 1. Pulls latest from GitHub repo
 * 2. Sets up new project structure
 * 3. Copies all Windsor Constitution files
 * 4. Configures Cursor
 */

const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');
const inquirer = require('inquirer');
const simpleGit = require('simple-git');
const { execSync } = require('child_process');

// Configuration
const WINDSOR_REPO = 'https://github.com/Just-Jay-dot/IDE-Project-Initiation.git';
const WINDSOR_VERSION = '1.0.0';
const CACHE_DIR = path.join(require('os').homedir(), '.windsor-cache');
const TEMPLATE_DIR = path.join(CACHE_DIR, 'template');

// Colors
const log = {
  info: (msg) => console.log(chalk.blue('ℹ'), msg),
  success: (msg) => console.log(chalk.green('✓'), msg),
  error: (msg) => console.log(chalk.red('✗'), msg),
  warn: (msg) => console.log(chalk.yellow('⚠'), msg),
  step: (msg) => console.log(chalk.cyan('\n→'), chalk.bold(msg)),
};

async function main() {
  console.log(chalk.bold.cyan('\n🚀 Windsor Project Constitution - projinit\n'));
  
  // Get project path
  const projectPath = process.argv[2] || process.cwd();
  const projectRoot = path.resolve(projectPath);
  
  log.info(`Project path: ${projectRoot}`);
  
  // Check if directory exists and is empty
  if (fs.existsSync(projectRoot)) {
    const files = fs.readdirSync(projectRoot);
    if (files.length > 0) {
      log.warn('Directory is not empty!');
      const { proceed } = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'proceed',
          message: 'Continue anyway? (Files will be added, not replaced)',
          default: true
        }
      ]);
      if (!proceed) {
        log.info('Cancelled.');
        process.exit(0);
      }
    }
  } else {
    fs.mkdirSync(projectRoot, { recursive: true });
    log.success('Created project directory');
  }
  
  try {
    // Step 1: Pull/Clone from GitHub
    log.step('Step 1: Fetching Windsor Constitution from GitHub...');
    await fetchFromGitHub();
    
    // Step 2: Create directory structure
    log.step('Step 2: Creating project structure...');
    await createProjectStructure(projectRoot);
    
    // Step 3: Copy template files
    log.step('Step 3: Copying Windsor Constitution files...');
    await copyTemplateFiles(projectRoot);
    
    // Step 4: Create initial docs
    log.step('Step 4: Creating initial documentation...');
    await createInitialDocs(projectRoot);
    
    // Step 5: Setup Cursor
    log.step('Step 5: Setting up Cursor configuration...');
    await setupCursor(projectRoot);
    
    // Step 6: Create config
    log.step('Step 6: Creating configuration...');
    createConfigFile(projectRoot, 'new');
    
    console.log(chalk.bold.green('\n✅ Project initialized successfully!\n'));
    console.log(chalk.cyan('Next steps:'));
    console.log('  1. cd', projectRoot);
    console.log('  2. Review INSTRUCTIONS.md');
    console.log('  3. Configure .cursor/rules/ for your project');
    console.log('  4. Start using @ references in Cursor\n');
    
  } catch (error) {
    log.error(`Installation failed: ${error.message}`);
    console.error(error);
    process.exit(1);
  }
}

async function fetchFromGitHub() {
  // Create cache directory
  if (!fs.existsSync(CACHE_DIR)) {
    fs.mkdirSync(CACHE_DIR, { recursive: true });
  }
  
  const gitDir = path.join(CACHE_DIR, 'repo');
  
  if (fs.existsSync(gitDir)) {
    // Update existing repo
    log.info('Updating cached repository...');
    const git = simpleGit(gitDir);
    try {
      await git.pull();
      log.success('Repository updated');
    } catch (error) {
      log.warn('Pull failed, using cached version');
    }
  } else {
    // Clone repo
    log.info('Cloning repository (first time, this may take a moment)...');
    try {
      await simpleGit().clone(WINDSOR_REPO, gitDir);
      log.success('Repository cloned');
    } catch (error) {
      log.error(`Failed to clone repository: ${error.message}`);
      log.info('Make sure the repository URL is correct and accessible');
      throw error;
    }
  }
  
  // Copy template directory
  const repoTemplateDir = path.join(gitDir, 'template');
  if (fs.existsSync(repoTemplateDir)) {
    await fs.copy(repoTemplateDir, TEMPLATE_DIR);
    log.success('Template files ready');
  } else {
    // Fallback: use repo root as template
    log.warn('Template directory not found, using repo root');
    await fs.copy(gitDir, TEMPLATE_DIR, {
      filter: (src) => {
        const name = path.basename(src);
        return !['.git', 'node_modules', '.gitignore'].includes(name);
      }
    });
  }
}

async function createProjectStructure(root) {
  const dirs = [
    '.cursor/rules',
    'docs/IDEA',
    'docs/BLUEPRINT',
    'docs/OPERATIONS',
    'docs/TEAM',
    'docs/METRICS',
    'src/api',
    'src/services',
    'src/models',
    'src/utils',
    'src/middleware',
    'src/components',
    'tests/unit',
    'tests/integration',
    'tests/e2e'
  ];
  
  for (const dir of dirs) {
    const fullPath = path.join(root, dir);
    await fs.ensureDir(fullPath);
    log.success(`Created ${dir}`);
  }
}

async function copyTemplateFiles(root) {
  if (!fs.existsSync(TEMPLATE_DIR)) {
    throw new Error('Template directory not found. Run fetchFromGitHub first.');
  }
  
  // Copy all markdown files from template root
  const templateFiles = await fs.readdir(TEMPLATE_DIR);
  
  for (const file of templateFiles) {
    const srcPath = path.join(TEMPLATE_DIR, file);
    const destPath = path.join(root, file);
    
    const stat = await fs.stat(srcPath);
    if (stat.isFile() && (file.endsWith('.md') || file.endsWith('.mdc') || file === '.cursorrules')) {
      await fs.copy(srcPath, destPath, { overwrite: false });
      log.success(`Copied ${file}`);
    }
  }
  
  // Copy .cursor/rules
  const rulesSource = path.join(TEMPLATE_DIR, '.cursor', 'rules');
  if (await fs.pathExists(rulesSource)) {
    const rulesDest = path.join(root, '.cursor', 'rules');
    await fs.copy(rulesSource, rulesDest, { overwrite: false });
    log.success('Copied .cursor/rules/');
  }
  
  // Copy .cursor/guides
  const guidesSource = path.join(TEMPLATE_DIR, '.cursor', 'guides');
  if (await fs.pathExists(guidesSource)) {
    const guidesDest = path.join(root, '.cursor', 'guides');
    await fs.copy(guidesSource, guidesDest, { overwrite: false });
    log.success('Copied .cursor/guides/');
  }
  
  // Copy .cursor/README.md
  const cursorReadmeSource = path.join(TEMPLATE_DIR, '.cursor', 'README.md');
  if (await fs.pathExists(cursorReadmeSource)) {
    const cursorReadmeDest = path.join(root, '.cursor', 'README.md');
    await fs.copy(cursorReadmeSource, cursorReadmeDest, { overwrite: false });
    log.success('Copied .cursor/README.md');
  }
  
  // Copy docs structure
  const docsSource = path.join(TEMPLATE_DIR, 'docs');
  if (await fs.pathExists(docsSource)) {
    const docsDest = path.join(root, 'docs');
    await fs.copy(docsSource, docsDest, { overwrite: false });
    log.success('Copied docs/ structure');
  }
}

async function createInitialDocs(root) {
  const instructionsPath = path.join(root, 'INSTRUCTIONS.md');
  if (!(await fs.pathExists(instructionsPath))) {
    const instructions = `---
title: Project Instructions
created_at: ${new Date().toISOString()}
updated_at: ${new Date().toISOString()}
status: Active
version: 1.0
---

# Project Instructions

## Product Overview
[Describe your product here]

## Current Phase
- [ ] Idea Validation (IDEA_GUIDE.md)
- [ ] Product Blueprint (BLUEPRINT_GUIDE.md)
- [ ] Development (Building MVP)
- [ ] Beta/Launch
- [ ] Production

## Quick Links
- Problem Validation: [Link to doc]
- Product Spec: [Link to doc]
- Technical Architecture: [Link to doc]
- API Documentation: [Link to doc]
- MVP Roadmap: [Link to doc]

## Technology Stack
- Frontend: [Tech]
- Backend: [Tech]
- Database: [Tech]
- Deployment: [Platform]

## Team Roles
- Product Lead: @[Name]
- Tech Lead: @[Name]
- Developers: @[Name], @[Name]

## Current Sprint
- Sprint: [Sprint number/dates]
- Goal: [Sprint goal]
- Target: [Target date]

## Success Metrics
1. [Metric 1]: [Target]
2. [Metric 2]: [Target]
3. [Metric 3]: [Target]

## Development Workflow
- Daily standup: [Time] UTC in [Channel]
- Code review: [Requirements]
- Deployment: [Process]

## Change Log
### v1.0 (${new Date().toISOString().split('T')[0]})
- Initial setup
`;
    await fs.writeFile(instructionsPath, instructions);
    log.success('Created INSTRUCTIONS.md');
  }
  
  const roadmapPath = path.join(root, 'ROADMAP.md');
  if (!(await fs.pathExists(roadmapPath))) {
    const roadmap = `---
title: Product Roadmap
created_at: ${new Date().toISOString()}
updated_at: ${new Date().toISOString()}
status: Active
version: 1.0
---

# Product Roadmap

## Current Status
- Phase: [Current phase]
- Completion: [X%]
- Team Size: [X]
- Launch Target: [Date]

## Next 12 Weeks

### Week 1-4: [Phase Name]
**Goal:** [Specific deliverable]
**Owner:** @[Name]

#### Week 1-2
- [ ] Task 1
- [ ] Task 2

#### Week 3-4
- [ ] Task 3
- [ ] Task 4

**Success Criteria:**
- Metric 1: [Target]
- Metric 2: [Target]

## Milestones

| Date | Milestone | Status |
|------|-----------|--------|
| ${new Date().toISOString().split('T')[0]} | MVP Features Complete | Not Started |
| ${new Date(Date.now() + 30*24*60*60*1000).toISOString().split('T')[0]} | Beta Launch | Not Started |

## Change Log
### v1.0 (${new Date().toISOString().split('T')[0]})
- Initial roadmap
`;
    await fs.writeFile(roadmapPath, roadmap);
    log.success('Created ROADMAP.md');
  }
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

This project was initialized using:
- Windsor Project Constitution v${WINDSOR_VERSION}
- Installed: ${new Date().toISOString()}
- Command: projinit
`;
  
  await fs.writeFile(customInstructionsPath, instructions);
  log.success('Created .cursor/custom-instructions.md');
}

function createConfigFile(root, projectType) {
  const config = {
    version: WINDSOR_VERSION,
    installed: new Date().toISOString(),
    projectType: projectType,
    command: 'projinit',
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

