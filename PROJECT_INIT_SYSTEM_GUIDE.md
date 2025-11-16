# Project Initialization System: Complete Setup Guide

**Created:** 2025-01-20  
**Purpose:** Transform the Windsor Project Startup Constitution into a reusable, installable system for any project (new or existing)  
**Status:** Implementation Guide

---

## 🎯 Your Goal

Create a standardized project initialization system that:

1. ✅ Works for **new projects** (fresh setup)
2. ✅ Works for **midway projects** (existing codebases - updates paths safely)
3. ✅ Can be **pulled from a public git repo**
4. ✅ **Organizes everything** according to the Windsor Constitution structure
5. ✅ **Updates import paths** automatically when reorganizing existing projects
6. ✅ **Sets up Cursor custom instructions** to always reference this system

---

## 📋 Implementation Strategy

### Phase 1: Create the Template Repository

#### Step 1.1: Structure the Template Repo

Create a new repository structure:

```
windsor-project-constitution/
├── template/                          # Template files to copy
│   ├── .cursor/
│   │   └── rules/
│   │       ├── project-guidelines.mdc
│   │       ├── api-standards.mdc
│   │       ├── testing-requirements.mdc
│   │       └── security-checklist.mdc
│   ├── docs/
│   │   ├── IDEA/
│   │   ├── BLUEPRINT/
│   │   ├── OPERATIONS/
│   │   ├── TEAM/
│   │   └── METRICS/
│   ├── IDEA_GUIDE.md
│   ├── BLUEPRINT_GUIDE.md
│   ├── CURSOR.md
│   ├── SETUP_CHECKLIST.md
│   ├── SYSTEM_SUMMARY.md
│   ├── ui-ux-prompt-2025.md
│   └── README.md
│
├── scripts/                           # Installation scripts
│   ├── install.sh                    # Main installation script
│   ├── install.js                    # Node.js version (cross-platform)
│   ├── path-updater.js               # Updates import paths
│   └── cursor-setup.js               # Sets up Cursor custom instructions
│
├── .windsor-config.json              # Configuration template
├── README.md                         # Main repo README
└── LICENSE                           # MIT or your choice
```

#### Step 1.2: Create Installation Script

**File: `scripts/install.js`**

This script will:

- Detect if project is new or existing
- Copy template files
- Update import paths (for existing projects)
- Set up Cursor custom instructions
- Create directory structure

**Key Features:**

```javascript
// Pseudo-code structure:
1. Check if project exists (has package.json, src/, etc.)
2. If existing:
   - Scan for import statements
   - Create backup
   - Reorganize files
   - Update all import paths
   - Verify no broken imports
3. If new:
   - Create full structure
   - Copy all template files
4. Set up Cursor custom instructions
5. Create .windsor-config.json
```

#### Step 1.3: Path Updater Script

**File: `scripts/path-updater.js`**

This handles the critical "midway project" scenario:

```javascript
// What it does:
1. Scans all source files for imports
2. Maps old paths → new paths based on reorganization
3. Updates imports in:
   - JavaScript/TypeScript files
   - CSS/SCSS imports
   - JSON config files
   - HTML references
4. Validates imports still work
5. Creates migration report
```

---

## 🚀 Step-by-Step Implementation

### Step 1: Create the Public Repository

```bash
# 1. Create new repo on GitHub (public)
# Name: windsor-project-constitution
# Description: Standardized project initialization system for Cursor IDE

# 2. Clone locally
git clone https://github.com/yourusername/windsor-project-constitution.git
cd windsor-project-constitution
```

### Step 2: Organize Template Files

```bash
# Copy your existing files into template/ directory
mkdir -p template/.cursor/rules
mkdir -p template/docs/{IDEA,BLUEPRINT,OPERATIONS,TEAM,METRICS}

# Copy all guide files
cp "Cursor, VS Code, Windsor Project Startup Constitution"/*.md template/
cp "Cursor, VS Code, Windsor Project Startup Constitution"/*.md template/

# Copy .cursor/rules examples (create from CURSOR.md)
# Extract sections from CURSOR.md Part 2 into template/.cursor/rules/
```

### Step 3: Create Installation Script

Create `scripts/install.js` with this structure:

```javascript
#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

// Configuration
const WINDSOR_VERSION = "1.0.0";
const TEMPLATE_DIR = path.join(__dirname, "../template");

// Main installation function
async function install() {
  console.log("🚀 Windsor Project Constitution Installer");
  console.log("==========================================\n");

  const projectRoot = process.cwd();
  const isExistingProject = detectExistingProject(projectRoot);

  if (isExistingProject) {
    console.log("📦 Detected existing project");
    await installToExistingProject(projectRoot);
  } else {
    console.log("✨ Setting up new project");
    await installToNewProject(projectRoot);
  }

  // Set up Cursor custom instructions
  await setupCursorInstructions(projectRoot);

  // Create .windsor-config.json
  createConfigFile(projectRoot);

  console.log("\n✅ Installation complete!");
  console.log("📖 Next steps:");
  console.log("   1. Review INSTRUCTIONS.md");
  console.log("   2. Configure .cursor/rules/ for your project");
  console.log("   3. Start using @ references in Cursor");
}

function detectExistingProject(root) {
  return (
    fs.existsSync(path.join(root, "package.json")) ||
    fs.existsSync(path.join(root, "src")) ||
    fs.existsSync(path.join(root, "app")) ||
    fs.existsSync(path.join(root, "lib"))
  );
}

async function installToNewProject(root) {
  // Create directory structure
  const dirs = [
    ".cursor/rules",
    "docs/IDEA",
    "docs/BLUEPRINT",
    "docs/OPERATIONS",
    "docs/TEAM",
    "docs/METRICS",
    "src/api",
    "src/services",
    "src/models",
    "src/utils",
    "tests/unit",
    "tests/integration",
    "tests/e2e",
  ];

  dirs.forEach((dir) => {
    const fullPath = path.join(root, dir);
    fs.mkdirSync(fullPath, { recursive: true });
  });

  // Copy template files
  copyTemplateFiles(root);

  // Create initial INSTRUCTIONS.md and ROADMAP.md
  createInitialDocs(root);
}

async function installToExistingProject(root) {
  console.log("\n⚠️  Existing project detected!");
  console.log("This will reorganize your project structure.");
  console.log("A backup will be created before changes.\n");

  // Create backup
  const backupDir = path.join(root, ".windsor-backup", Date.now().toString());
  console.log(`📦 Creating backup: ${backupDir}`);
  // ... backup logic

  // Analyze current structure
  const pathMap = analyzeProjectStructure(root);

  // Reorganize files
  await reorganizeFiles(root, pathMap);

  // Update import paths
  await updateImportPaths(root, pathMap);

  // Copy template files (don't overwrite existing)
  copyTemplateFiles(root, { skipExisting: true });

  // Validate imports
  await validateImports(root);
}

async function setupCursorInstructions(root) {
  const cursorRulesPath = path.join(root, ".cursor", "rules");
  const customInstructionsPath = path.join(
    root,
    ".cursor",
    "custom-instructions.md"
  );

  // Create custom instructions file
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
`;

  fs.writeFileSync(customInstructionsPath, instructions);
  console.log("✅ Cursor custom instructions created");
}

function createConfigFile(root) {
  const config = {
    version: WINDSOR_VERSION,
    installed: new Date().toISOString(),
    projectType: detectExistingProject(root) ? "existing" : "new",
    structure: {
      docs: true,
      cursorRules: true,
      tests: true,
    },
  };

  fs.writeFileSync(
    path.join(root, ".windsor-config.json"),
    JSON.stringify(config, null, 2)
  );
}

// Export for use
if (require.main === module) {
  install().catch(console.error);
}

module.exports = { install };
```

### Step 4: Create Path Updater

Create `scripts/path-updater.js`:

```javascript
const fs = require("fs");
const path = require("path");
const { glob } = require("glob");

class PathUpdater {
  constructor(projectRoot, pathMap) {
    this.root = projectRoot;
    this.pathMap = pathMap; // { oldPath: newPath }
    this.updatedFiles = [];
  }

  async updateAllImports() {
    console.log("🔄 Updating import paths...\n");

    // Find all source files
    const files = await this.findSourceFiles();

    for (const file of files) {
      const updated = await this.updateFileImports(file);
      if (updated) {
        this.updatedFiles.push(file);
      }
    }

    console.log(`✅ Updated ${this.updatedFiles.length} files`);
    return this.generateReport();
  }

  async findSourceFiles() {
    const patterns = [
      "**/*.js",
      "**/*.jsx",
      "**/*.ts",
      "**/*.tsx",
      "**/*.css",
      "**/*.scss",
      "**/*.json",
      "**/*.html",
    ];

    const files = [];
    for (const pattern of patterns) {
      const matches = await glob(pattern, {
        cwd: this.root,
        ignore: ["node_modules/**", ".git/**", "dist/**", "build/**"],
      });
      files.push(...matches);
    }

    return [...new Set(files)];
  }

  async updateFileImports(filePath) {
    const fullPath = path.join(this.root, filePath);
    let content = fs.readFileSync(fullPath, "utf8");
    let updated = false;

    // Update each import path
    for (const [oldPath, newPath] of Object.entries(this.pathMap)) {
      const oldPattern = this.createImportPattern(oldPath);
      const newPattern = this.createImportPattern(newPath);

      if (content.includes(oldPattern)) {
        content = content.replace(
          new RegExp(oldPattern.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g"),
          newPattern
        );
        updated = true;
      }
    }

    if (updated) {
      fs.writeFileSync(fullPath, content);
    }

    return updated;
  }

  createImportPattern(filePath) {
    // Handle different import styles
    const patterns = [
      `"${filePath}"`,
      `'${filePath}'`,
      `"${filePath.replace(/\\/g, "/")}"`,
      `'${filePath.replace(/\\/g, "/")}'`,
      `from "${filePath}"`,
      `from '${filePath}'`,
      `require("${filePath}")`,
      `require('${filePath}')`,
    ];

    return patterns;
  }

  generateReport() {
    return {
      filesUpdated: this.updatedFiles.length,
      files: this.updatedFiles,
      pathMappings: this.pathMap,
    };
  }
}

module.exports = PathUpdater;
```

### Step 5: Create Package.json for the Template Repo

```json
{
  "name": "windsor-project-constitution",
  "version": "1.0.0",
  "description": "Standardized project initialization system for Cursor IDE",
  "main": "scripts/install.js",
  "bin": {
    "windsor-install": "./scripts/install.js"
  },
  "scripts": {
    "install": "node scripts/install.js"
  },
  "keywords": [
    "cursor",
    "project-template",
    "development-standards",
    "ide-configuration"
  ],
  "author": "Your Name",
  "license": "MIT",
  "dependencies": {
    "glob": "^10.0.0"
  }
}
```

### Step 6: Create Main README for the Repo

```markdown
# Windsor Project Constitution

Standardized project initialization system for Cursor IDE and VS Code.

## Quick Start

### For New Projects

\`\`\`bash
npx windsor-project-constitution

# or

npm install -g windsor-project-constitution
windsor-install
\`\`\`

### For Existing Projects

\`\`\`bash

# In your existing project directory

npx windsor-project-constitution

# The installer will:

# 1. Detect existing structure

# 2. Create backup

# 3. Reorganize files

# 4. Update all import paths

# 5. Set up Cursor instructions

\`\`\`

## What It Does

1. ✅ Creates standardized directory structure
2. ✅ Copies all Windsor Constitution guides
3. ✅ Sets up Cursor IDE rules
4. ✅ Updates import paths (for existing projects)
5. ✅ Creates custom instructions for Cursor
6. ✅ Validates no broken imports

## Manual Installation

If you prefer manual setup:

\`\`\`bash
git clone https://github.com/yourusername/windsor-project-constitution.git
cd windsor-project-constitution
cp -r template/\* /path/to/your/project/
\`\`\`

## Documentation

- [Installation Guide](./docs/INSTALLATION.md)
- [Migration Guide](./docs/MIGRATION.md)
- [Customization](./docs/CUSTOMIZATION.md)
```

---

## 🔧 Setting Up Cursor Custom Instructions

### Option 1: Via Cursor Settings

1. Open Cursor Settings (⌘, or Ctrl,)
2. Search for "Rules" or "Custom Instructions"
3. Add this instruction:

```
Always reference the Windsor Project Constitution files:
- @IDEA_GUIDE.md for idea validation
- @BLUEPRINT_GUIDE.md for product specifications
- @CURSOR.md for development standards
- @INSTRUCTIONS.md for current project status
- @.cursor/rules/ for project-specific rules

When starting a new project or feature, always check:
1. @INSTRUCTIONS.md for current priorities
2. @.cursor/rules/project-guidelines.mdc for standards
3. @BLUEPRINT_GUIDE.md for architecture patterns
```

### Option 2: Via .cursorrules File

Create `.cursorrules` in project root:

```
# Windsor Project Constitution

Always pull and reference these files from the Windsor Constitution:
- IDEA_GUIDE.md
- BLUEPRINT_GUIDE.md
- CURSOR.md
- INSTRUCTIONS.md
- .cursor/rules/*.mdc

When working on this project:
1. Check @INSTRUCTIONS.md for current status
2. Follow @.cursor/rules/ standards
3. Reference @BLUEPRINT_GUIDE.md for architecture
4. Use @IDEA_GUIDE.md for validation
```

### Option 3: Via Git Submodule (Advanced)

```bash
# In your project
git submodule add https://github.com/yourusername/windsor-project-constitution.git .windsor

# Then reference in Cursor:
# @.windsor/template/IDEA_GUIDE.md
```

---

## 📝 Implementation Checklist

### Repository Setup

- [ ] Create GitHub repository (public)
- [ ] Clone locally
- [ ] Organize template files
- [ ] Create installation scripts
- [ ] Create path updater script
- [ ] Write comprehensive README
- [ ] Add LICENSE file
- [ ] Create package.json
- [ ] Test installation on new project
- [ ] Test installation on existing project
- [ ] Publish to npm (optional)

### Script Development

- [ ] `install.js` - Main installer
- [ ] `path-updater.js` - Import path updater
- [ ] `cursor-setup.js` - Cursor configuration
- [ ] `validate.js` - Post-install validation
- [ ] Error handling and rollback
- [ ] Progress indicators
- [ ] Detailed logging

### Documentation

- [ ] Main README.md
- [ ] Installation guide
- [ ] Migration guide (for existing projects)
- [ ] Customization guide
- [ ] Troubleshooting guide
- [ ] Video tutorial (optional)

### Testing

- [ ] Test on fresh project
- [ ] Test on existing React project
- [ ] Test on existing Node.js project
- [ ] Test on existing TypeScript project
- [ ] Verify import path updates
- [ ] Verify Cursor instructions work
- [ ] Test rollback functionality

---

## 🎯 Usage Instructions for End Users

### For New Projects

```bash
# Method 1: npx (recommended)
npx windsor-project-constitution

# Method 2: Clone and run
git clone https://github.com/yourusername/windsor-project-constitution.git
cd windsor-project-constitution
node scripts/install.js /path/to/new/project
```

### For Existing Projects

```bash
# In your existing project directory
npx windsor-project-constitution

# The script will:
# 1. Ask for confirmation
# 2. Create backup in .windsor-backup/
# 3. Analyze current structure
# 4. Reorganize files
# 5. Update all imports
# 6. Validate changes
# 7. Report results
```

### Setting Up Cursor

After installation:

1. **Open Cursor** in your project
2. **Open Settings** (⌘, or Ctrl,)
3. **Go to Rules/Custom Instructions**
4. **Add reference** to `.cursor/custom-instructions.md` (created by installer)
5. **Restart Cursor**

Now you can use:

```
@INSTRUCTIONS.md What is the current project status?
@BLUEPRINT_GUIDE.md Review my architecture
@.cursor/rules/api-standards.mdc Check this endpoint
```

---

## 🔄 Handling Midway Projects (Critical)

### The Challenge

When applying to existing projects, files may move:

- `src/components/Button.js` → `src/components/ui/Button.js`
- `utils/helpers.js` → `src/utils/helpers.js`

### The Solution

The `path-updater.js` script:

1. **Maps old → new paths** before moving files
2. **Scans all source files** for imports
3. **Updates imports** in:
   - JavaScript/TypeScript files
   - CSS/SCSS imports
   - JSON configs
   - HTML references
4. **Validates** imports still work
5. **Creates report** of changes

### Example Path Mapping

```javascript
const pathMap = {
  // Old path → New path
  "./components/Button": "./components/ui/Button",
  "../utils/helpers": "./src/utils/helpers",
  "@/components": "@/src/components",
  "utils/api": "src/services/api",
};
```

### Safety Features

- ✅ **Backup created** before changes
- ✅ **Dry-run mode** to preview changes
- ✅ **Validation** after updates
- ✅ **Rollback** if validation fails
- ✅ **Detailed report** of all changes

---

## 📦 Publishing to npm (Optional)

If you want to make it installable via npm:

```bash
# 1. Create package.json (see above)
# 2. Test locally
npm link

# 3. Publish
npm publish --access public

# Users can then:
npm install -g windsor-project-constitution
windsor-install
```

---

## 🎓 Next Steps

1. **Create the repository structure** (Step 1)
2. **Develop the installation script** (Step 3)
3. **Test on a sample project** (new and existing)
4. **Refine based on testing**
5. **Publish to GitHub**
6. **Share with your team/projects**

---

## 💡 Pro Tips

1. **Start Simple**: Begin with new project support, then add existing project support
2. **Test Thoroughly**: Test on multiple project types (React, Node.js, etc.)
3. **Document Everything**: Users need clear instructions
4. **Version Control**: Tag releases so users can pin versions
5. **Community**: Accept contributions and feedback

---

**Ready to build? Start with Step 1 and work through the checklist!**
