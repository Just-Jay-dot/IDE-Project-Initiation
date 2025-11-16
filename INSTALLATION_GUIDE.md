# Installation Guide: Global CLI Tools

## 🎯 What You Get

Two global commands:

- **`projinit`** - Initialize new projects
- **`projorg`** - Organize existing projects (with backup/rollback)

---

## 📋 Step 1: Push to GitHub

### 1.1 Create GitHub Repository

```bash
# 1. Create new repo on GitHub
#    Name: windsor-project-constitution
#    Visibility: Public
#    Description: Windsor Project Constitution system

# 2. Initialize locally
cd "Cursor, VS Code, Windsor Project Startup Constitution"
git init
git add .
git commit -m "Initial commit: Windsor Project Constitution"
git branch -M main
git remote add origin https://github.com/yourusername/windsor-project-constitution.git
git push -u origin main
```

### 1.2 Update Repository URL in Scripts

After pushing, update the repository URL in both scripts:

**In `bin/projinit.js` and `bin/projorg.js`:**

```javascript
const WINDSOR_REPO =
  "https://github.com/yourusername/windsor-project-constitution.git";
```

Replace `yourusername` with your actual GitHub username.

---

## 📦 Step 2: Install Globally

### Option A: Install from Local Directory (Recommended for Testing)

```bash
# 1. Navigate to the project directory
cd "Cursor, VS Code, Windsor Project Startup Constitution"

# 2. Install dependencies
npm install

# 3. Link globally (creates projinit and projorg commands)
npm link

# 4. Verify installation
which projinit
which projorg
projinit --help  # Should show usage
```

### Option B: Install from GitHub (After Publishing)

```bash
# Install directly from GitHub
npm install -g git+https://github.com/yourusername/windsor-project-constitution.git

# Or if published to npm:
npm install -g windsor-project-constitution
```

---

## ✅ Step 3: Verify Installation

```bash
# Check if commands are available
projinit --version
projorg --version

# Test projinit
mkdir test-project
cd test-project
projinit

# Should create all Windsor Constitution files
```

---

## 🚀 Usage

### For New Projects: `projinit`

```bash
# In any directory (or specify path)
projinit                    # Uses current directory
projinit /path/to/project   # Specify path

# What it does:
# 1. Pulls latest from GitHub
# 2. Creates project structure
# 3. Copies all Windsor files
# 4. Sets up Cursor
```

### For Existing Projects: `projorg`

```bash
# In your existing project directory
cd my-existing-project
projorg

# What it does:
# 1. Creates backup in .windsor-backup/
# 2. Pulls latest from GitHub
# 3. Adds Windsor files (doesn't overwrite)
# 4. Optionally reorganizes structure
# 5. Updates import paths
# 6. Sets up Cursor
```

---

## 🔄 How It Works

### `projinit` Flow:

```
1. Check project directory
2. Pull/Clone from GitHub (caches in ~/.windsor-cache)
3. Create directory structure
4. Copy template files
5. Create INSTRUCTIONS.md and ROADMAP.md
6. Setup .cursor/custom-instructions.md
7. Create .windsor-config.json
8. Done! ✅
```

### `projorg` Flow:

```
1. Detect existing project
2. Create backup in .windsor-backup/[timestamp]/
3. Pull/Clone from GitHub
4. Add Windsor files (skip existing)
5. Ask: Reorganize structure? (optional)
   - If yes: Move files, update imports
6. Setup .cursor/custom-instructions.md
7. Create .windsor-config.json
8. Done! ✅
```

---

## 🔒 Backup & Rollback

### Automatic Backup

When you run `projorg`, it creates:

```
.windsor-backup/
└── 2025-01-20T10-30-00-000Z/
    ├── src/
    ├── package.json
    ├── rollback.sh          # Rollback script
    └── rollback-info.json   # Backup metadata
```

### Manual Rollback

```bash
# Option 1: Use the rollback script
cd .windsor-backup/2025-01-20T10-30-00-000Z/
./rollback.sh

# Option 2: Manual restore
cp -r .windsor-backup/2025-01-20T10-30-00-000Z/* ./
```

---

## 📝 Configuration

### Update Repository URL

If you change the GitHub repo URL, update it in:

- `bin/projinit.js` (line ~20)
- `bin/projorg.js` (line ~20)

```javascript
const WINDSOR_REPO =
  "https://github.com/yourusername/windsor-project-constitution.git";
```

### Cache Location

The tools cache the repository in:

```
~/.windsor-cache/
├── repo/          # Cloned repository
└── template/      # Template files
```

To force a fresh pull, delete the cache:

```bash
rm -rf ~/.windsor-cache
```

---

## 🐛 Troubleshooting

### Command Not Found

```bash
# If projinit/projorg not found:
# 1. Check npm global bin path
npm config get prefix

# 2. Add to PATH (if needed)
export PATH="$(npm config get prefix)/bin:$PATH"

# 3. Re-link
cd "Cursor, VS Code, Windsor Project Startup Constitution"
npm link
```

### GitHub Access Issues

```bash
# If GitHub clone fails:
# 1. Check repository is public
# 2. Verify URL is correct
# 3. Check internet connection
# 4. Try manual clone:
git clone https://github.com/yourusername/windsor-project-constitution.git ~/.windsor-cache/repo
```

### Permission Errors

```bash
# If permission denied:
sudo npm link  # (not recommended, fix npm permissions instead)

# Better: Fix npm permissions
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
export PATH=~/.npm-global/bin:$PATH
```

---

## 📚 Next Steps

1. **Push to GitHub** - Make repository public
2. **Install globally** - Run `npm link` in project directory
3. **Test projinit** - Try on a new project
4. **Test projorg** - Try on an existing project
5. **Update repo URL** - In both scripts after pushing

---

## 🎯 Quick Reference

```bash
# Install
cd "Cursor, VS Code, Windsor Project Startup Constitution"
npm install
npm link

# Use
projinit                    # New project
projorg                      # Existing project

# Uninstall
npm unlink -g windsor-project-constitution
```

---

**Ready to install? Follow Step 1 → Step 2 → Step 3!** 🚀
