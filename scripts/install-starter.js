#!/usr/bin/env node

/**
 * Windsor Project Constitution - Starter Installation Script
 * 
 * This is a simplified starter version. Expand based on your needs.
 * See PROJECT_INIT_SYSTEM_GUIDE.md for full implementation.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Configuration
const WINDSOR_VERSION = '1.0.0';
const TEMPLATE_DIR = path.join(__dirname, '../template');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  red: '\x1b[31m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logStep(step, message) {
  log(`\n${step}. ${message}`, 'bright');
}

// Main installation function
async function install() {
  log('\n🚀 Windsor Project Constitution Installer', 'bright');
  log('==========================================\n', 'bright');
  
  const projectRoot = process.cwd();
  log(`Project root: ${projectRoot}`, 'blue');
  
  // Check if template directory exists
  if (!fs.existsSync(TEMPLATE_DIR)) {
    log('\n❌ Error: Template directory not found!', 'red');
    log(`Expected: ${TEMPLATE_DIR}`, 'red');
    log('\nPlease ensure you run this from the windsor-project-constitution directory.', 'yellow');
    process.exit(1);
  }
  
  const isExistingProject = detectExistingProject(projectRoot);
  
  if (isExistingProject) {
    log('\n📦 Detected existing project', 'yellow');
    log('⚠️  This will add Windsor Constitution files to your project.', 'yellow');
    log('   Your existing files will NOT be moved or modified.\n', 'yellow');
    
    const response = await askQuestion('Continue? (y/n): ');
    if (response.toLowerCase() !== 'y') {
      log('\nInstallation cancelled.', 'yellow');
      process.exit(0);
    }
    
    await installToExistingProject(projectRoot);
  } else {
    log('\n✨ Setting up new project', 'green');
    await installToNewProject(projectRoot);
  }
  
  // Set up Cursor custom instructions
  await setupCursorInstructions(projectRoot);
  
  // Create .windsor-config.json
  createConfigFile(projectRoot, isExistingProject);
  
  log('\n✅ Installation complete!', 'green');
  log('\n📖 Next steps:', 'bright');
  log('   1. Review INSTRUCTIONS.md');
  log('   2. Configure .cursor/rules/ for your project');
  log('   3. Start using @ references in Cursor');
  log('   4. Read the guides: IDEA_GUIDE.md, BLUEPRINT_GUIDE.md, CURSOR.md\n');
}

function detectExistingProject(root) {
  const indicators = [
    'package.json',
    'package-lock.json',
    'yarn.lock',
    'src',
    'app',
    'lib',
    'components',
    '.git'
  ];
  
  return indicators.some(indicator => 
    fs.existsSync(path.join(root, indicator))
  );
}

async function installToNewProject(root) {
  logStep(1, 'Creating directory structure...');
  
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
  
  dirs.forEach(dir => {
    const fullPath = path.join(root, dir);
    fs.mkdirSync(fullPath, { recursive: true });
    log(`   ✓ Created ${dir}`, 'green');
  });
  
  logStep(2, 'Copying template files...');
  copyTemplateFiles(root);
  
  logStep(3, 'Creating initial documentation...');
  createInitialDocs(root);
}

async function installToExistingProject(root) {
  logStep(1, 'Creating directory structure (if needed)...');
  
  const dirs = [
    '.cursor/rules',
    'docs/IDEA',
    'docs/BLUEPRINT',
    'docs/OPERATIONS',
    'docs/TEAM',
    'docs/METRICS'
  ];
  
  dirs.forEach(dir => {
    const fullPath = path.join(root, dir);
    if (!fs.existsSync(fullPath)) {
      fs.mkdirSync(fullPath, { recursive: true });
      log(`   ✓ Created ${dir}`, 'green');
    } else {
      log(`   ⊙ ${dir} already exists`, 'blue');
    }
  });
  
  logStep(2, 'Copying template files (skip existing)...');
  copyTemplateFiles(root, { skipExisting: true });
}

function copyTemplateFiles(root, options = {}) {
  const skipExisting = options.skipExisting || false;
  
  // Copy all markdown files from template root
  const templateFiles = fs.readdirSync(TEMPLATE_DIR);
  
  templateFiles.forEach(file => {
    if (file.endsWith('.md') || file.endsWith('.mdc')) {
      const srcPath = path.join(TEMPLATE_DIR, file);
      const destPath = path.join(root, file);
      
      if (fs.statSync(srcPath).isFile()) {
        if (skipExisting && fs.existsSync(destPath)) {
          log(`   ⊙ Skipped ${file} (already exists)`, 'blue');
        } else {
          fs.copyFileSync(srcPath, destPath);
          log(`   ✓ Copied ${file}`, 'green');
        }
      }
    }
  });
  
  // Copy .cursor/rules directory
  const rulesSource = path.join(TEMPLATE_DIR, '.cursor', 'rules');
  if (fs.existsSync(rulesSource)) {
    const rulesDest = path.join(root, '.cursor', 'rules');
    copyDirectory(rulesSource, rulesDest, skipExisting);
    log(`   ✓ Copied .cursor/rules/`, 'green');
  }
  
  // Copy docs subdirectories
  const docsSource = path.join(TEMPLATE_DIR, 'docs');
  if (fs.existsSync(docsSource)) {
    const docsDest = path.join(root, 'docs');
    copyDirectory(docsSource, docsDest, skipExisting);
    log(`   ✓ Copied docs/ structure`, 'green');
  }
}

function copyDirectory(src, dest, skipExisting = false) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  
  const entries = fs.readdirSync(src, { withFileTypes: true });
  
  entries.forEach(entry => {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    
    if (entry.isDirectory()) {
      copyDirectory(srcPath, destPath, skipExisting);
    } else {
      if (skipExisting && fs.existsSync(destPath)) {
        // Skip
      } else {
        fs.copyFileSync(srcPath, destPath);
      }
    }
  });
}

function createInitialDocs(root) {
  // Create INSTRUCTIONS.md template
  const instructionsPath = path.join(root, 'INSTRUCTIONS.md');
  if (!fs.existsSync(instructionsPath)) {
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
    
    fs.writeFileSync(instructionsPath, instructions);
    log(`   ✓ Created INSTRUCTIONS.md`, 'green');
  }
  
  // Create ROADMAP.md template
  const roadmapPath = path.join(root, 'ROADMAP.md');
  if (!fs.existsSync(roadmapPath)) {
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
    
    fs.writeFileSync(roadmapPath, roadmap);
    log(`   ✓ Created ROADMAP.md`, 'green');
  }
}

async function setupCursorInstructions(root) {
  logStep(4, 'Setting up Cursor custom instructions...');
  
  const cursorDir = path.join(root, '.cursor');
  if (!fs.existsSync(cursorDir)) {
    fs.mkdirSync(cursorDir, { recursive: true });
  }
  
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
- Repository: https://github.com/yourusername/windsor-project-constitution
`;
  
  fs.writeFileSync(customInstructionsPath, instructions);
  log(`   ✓ Created .cursor/custom-instructions.md`, 'green');
}

function createConfigFile(root, isExisting) {
  const configPath = path.join(root, '.windsor-config.json');
  
  const config = {
    version: WINDSOR_VERSION,
    installed: new Date().toISOString(),
    projectType: isExisting ? 'existing' : 'new',
    structure: {
      docs: true,
      cursorRules: true,
      tests: true
    },
    repository: 'https://github.com/yourusername/windsor-project-constitution'
  };
  
  fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
  log(`   ✓ Created .windsor-config.json`, 'green');
}

function askQuestion(question) {
  const readline = require('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer);
    });
  });
}

// Run if called directly
if (require.main === module) {
  install().catch(error => {
    log(`\n❌ Error: ${error.message}`, 'red');
    console.error(error);
    process.exit(1);
  });
}

module.exports = { install };

