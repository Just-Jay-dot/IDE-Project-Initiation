# 🚀 Quick Setup: projinit & projorg

## What You Have Now

✅ Two global CLI commands ready to use:
- **`projinit`** - For new projects
- **`projorg`** - For existing projects (with backup)

---

## 📋 3-Step Setup

### Step 1: Push to GitHub (5 minutes)

```bash
# 1. Create new repo on GitHub: windsor-project-constitution (Public)

# 2. In your project directory:
cd "Cursor, VS Code, Windsor Project Startup Constitution"
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/windsor-project-constitution.git
git push -u origin main
```

### Step 2: Update Repository URL (2 minutes)

After pushing, edit these files:
- `bin/projinit.js` (line ~20)
- `bin/projorg.js` (line ~20)

Change:
```javascript
const WINDSOR_REPO = 'https://github.com/yourusername/windsor-project-constitution.git';
```
Replace `yourusername` with your GitHub username.

### Step 3: Install Globally (2 minutes)

```bash
# Option A: Use setup script (easiest)
./SETUP_SCRIPT.sh

# Option B: Manual
npm install
npm link
```

**Done!** Now you can use `projinit` and `projorg` anywhere.

---

## 🎯 Usage

### For New Projects

```bash
# In terminal (anywhere):
projinit                    # Uses current directory
projinit my-new-project     # Creates new project

# What happens:
# 1. Pulls from GitHub
# 2. Creates structure
# 3. Copies all Windsor files
# 4. Sets up Cursor
```

### For Existing Projects

```bash
# In your existing project:
cd my-existing-project
projorg

# What happens:
# 1. Creates backup (.windsor-backup/)
# 2. Pulls from GitHub
# 3. Adds Windsor files
# 4. Optionally reorganizes
# 5. Updates imports
```

---

## ✅ Verify Installation

```bash
# Check if commands work:
projinit --help
projorg --help

# Test on new project:
mkdir test-project
cd test-project
projinit
ls -la  # Should see Windsor files
```

---

## 🔒 Backup & Rollback

When you run `projorg`, it creates:
```
.windsor-backup/
└── 2025-01-20T10-30-00-000Z/
    ├── src/
    ├── package.json
    ├── rollback.sh          # Run this to restore
    └── rollback-info.json
```

**To rollback:**
```bash
cd .windsor-backup/2025-01-20T10-30-00-000Z/
./rollback.sh
```

---

## 🐛 Troubleshooting

### Command Not Found

```bash
# Check npm global path
npm config get prefix

# Add to PATH (add to ~/.zshrc or ~/.bashrc):
export PATH="$(npm config get prefix)/bin:$PATH"

# Re-link:
npm link
```

### GitHub Access Issues

Make sure:
1. Repository is **public**
2. URL is correct in `bin/projinit.js` and `bin/projorg.js`
3. You have internet connection

---

## 📚 Full Documentation

- **INSTALLATION_GUIDE.md** - Complete setup instructions
- **README.md** - Project overview
- **SIMPLE_FLOW_EXPLANATION.md** - How it works

---

## 🎉 That's It!

1. Push to GitHub ✅
2. Update repo URL ✅
3. Run `npm link` ✅
4. Use `projinit` and `projorg` ✅

**You're ready to go!** 🚀

