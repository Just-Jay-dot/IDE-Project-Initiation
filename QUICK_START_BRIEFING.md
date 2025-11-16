# Quick Start Briefing: Windsor Project Constitution System

## 🎯 Your Goal

Transform your Windsor Project Startup Constitution into a **reusable, installable system** that works for:
- ✅ **New projects** (fresh setup)
- ✅ **Existing projects** (midway - reorganizes without breaking)

---

## 📋 What You Need to Do (5 Steps)

### Step 1: Create Public Git Repository (30 min)

```bash
# 1. Create new repo on GitHub
#    Name: windsor-project-constitution
#    Visibility: Public
#    Description: Standardized project initialization system

# 2. Clone locally
git clone https://github.com/yourusername/windsor-project-constitution.git
cd windsor-project-constitution
```

### Step 2: Organize Files (15 min)

```bash
# Create template structure
mkdir -p template/.cursor/rules
mkdir -p template/docs/{IDEA,BLUEPRINT,OPERATIONS,TEAM,METRICS}

# Copy all your guide files
cp "Cursor, VS Code, Windsor Project Startup Constitution"/*.md template/

# Extract .cursor/rules from CURSOR.md Part 2
# (Create template/.cursor/rules/*.mdc files)
```

### Step 3: Create Installation Script (2 hours)

Create `scripts/install.js` that:
- Detects new vs existing project
- Copies template files
- For existing: reorganizes + updates import paths
- Sets up Cursor custom instructions

**See:** `PROJECT_INIT_SYSTEM_GUIDE.md` for full script code

### Step 4: Test & Refine (1 hour)

```bash
# Test on new project
mkdir test-new-project
cd test-new-project
node ../windsor-project-constitution/scripts/install.js

# Test on existing project
cd your-existing-project
node ../windsor-project-constitution/scripts/install.js
```

### Step 5: Publish & Use (30 min)

```bash
# Push to GitHub
git add .
git commit -m "Initial release"
git push origin main

# Now you can use it:
# Option 1: Clone and run
git clone https://github.com/yourusername/windsor-project-constitution.git
cd windsor-project-constitution
node scripts/install.js /path/to/project

# Option 2: (If published to npm)
npx windsor-project-constitution
```

---

## 🔑 Key Components

### 1. Installation Script (`scripts/install.js`)
- Main entry point
- Detects project type
- Orchestrates setup

### 2. Path Updater (`scripts/path-updater.js`)
- **Critical for existing projects**
- Maps old paths → new paths
- Updates all imports
- Validates no broken references

### 3. Cursor Setup (`scripts/cursor-setup.js`)
- Creates `.cursor/custom-instructions.md`
- Sets up @ references
- Configures Cursor to always pull from repo

### 4. Template Files (`template/`)
- All your guide files
- `.cursor/rules/` examples
- Directory structure templates

---

## 🚨 Critical: Handling Existing Projects

**The Challenge:**
When you reorganize an existing project, imports break:
```javascript
// Before
import Button from './components/Button'

// After reorganization
import Button from './src/components/ui/Button'  // ❌ Broken!
```

**The Solution:**
The `path-updater.js` script:
1. Creates path mapping before moving files
2. Scans all source files
3. Updates all imports automatically
4. Validates everything still works

**Example:**
```javascript
// Path mapping
{
  './components/Button': './src/components/ui/Button',
  '../utils/helpers': './src/utils/helpers'
}

// Script updates all files with these mappings
```

---

## 📝 Cursor Custom Instructions Setup

After installation, set up Cursor to always reference the system:

### Method 1: Custom Instructions File
The installer creates `.cursor/custom-instructions.md` with:
```
Always reference:
- @IDEA_GUIDE.md
- @BLUEPRINT_GUIDE.md
- @CURSOR.md
- @INSTRUCTIONS.md
- @.cursor/rules/
```

### Method 2: Cursor Settings
In Cursor Settings → Rules, add:
```
Always pull and reference Windsor Constitution files:
@IDEA_GUIDE.md, @BLUEPRINT_GUIDE.md, @CURSOR.md
```

### Method 3: Git Submodule (Advanced)
```bash
git submodule add https://github.com/yourusername/windsor-project-constitution.git .windsor
# Then reference: @.windsor/template/IDEA_GUIDE.md
```

---

## ✅ Success Checklist

You'll know it's working when:

- [ ] Can install on new project (creates full structure)
- [ ] Can install on existing project (reorganizes safely)
- [ ] All imports updated correctly (no broken references)
- [ ] Cursor recognizes @ references
- [ ] Team can pull and use in their projects
- [ ] Documentation is clear and complete

---

## 🎓 Implementation Order

**Week 1: Foundation**
1. Day 1: Create repo, organize files
2. Day 2: Build basic install script (new projects only)
3. Day 3: Test on multiple new projects
4. Day 4: Add Cursor setup functionality
5. Day 5: Write documentation

**Week 2: Existing Project Support**
1. Day 1-2: Build path updater script
2. Day 3: Test on existing React project
3. Day 4: Test on existing Node.js project
4. Day 5: Refine and document

**Week 3: Polish & Publish**
1. Day 1-2: Error handling, rollback, validation
2. Day 3: Comprehensive testing
3. Day 4: Final documentation
4. Day 5: Publish and share

---

## 💡 Quick Wins

**Start Simple:**
1. ✅ Get new project installation working first
2. ✅ Then add existing project support
3. ✅ Iterate based on real usage

**Test Early:**
- Test on actual projects you're working on
- Find edge cases
- Refine based on feedback

**Document As You Go:**
- Write README as you build
- Document decisions
- Include examples

---

## 📚 Full Documentation

See `PROJECT_INIT_SYSTEM_GUIDE.md` for:
- Complete script implementations
- Detailed path updater logic
- Cursor setup instructions
- Troubleshooting guide
- Advanced customization

---

## 🚀 Ready to Start?

1. **Read:** `PROJECT_INIT_SYSTEM_GUIDE.md` (full details)
2. **Create:** GitHub repository
3. **Build:** Installation script (start simple)
4. **Test:** On real projects
5. **Iterate:** Based on results
6. **Publish:** Share with team/projects

**Time Estimate:** 2-3 weeks for complete system

**Start Now:** Create the GitHub repo and begin organizing files!

---

**Questions?** Review the full guide in `PROJECT_INIT_SYSTEM_GUIDE.md`

