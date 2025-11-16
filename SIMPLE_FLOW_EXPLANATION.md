# Simple Flow: How It Works

## 🎯 The Big Picture

You create a **template repository** that anyone can pull into their project (new or existing) to get the Windsor Constitution system set up automatically.

---

## 📋 Step-by-Step Flow

### Step 1: You Create the Template Repo

```bash
# 1. Create GitHub repo: windsor-project-constitution
# 2. Put all your guide files in template/ folder
# 3. Add the install script
# 4. Push to GitHub
```

**What's in the repo:**
```
windsor-project-constitution/
├── template/              # All your guide files
│   ├── IDEA_GUIDE.md
│   ├── BLUEPRINT_GUIDE.md
│   ├── CURSOR.md
│   ├── .cursor/rules/
│   └── docs/
├── scripts/
│   └── install.js        # The installer script
└── README.md
```

---

### Step 2: Someone Uses It in Their Project

#### For a NEW Project:

```bash
# 1. Create new project folder
mkdir my-new-project
cd my-new-project

# 2. Clone the template repo (or use npx)
git clone https://github.com/yourusername/windsor-project-constitution.git
cd windsor-project-constitution

# 3. Run the installer
node scripts/install.js /path/to/my-new-project
```

**What happens:**
1. ✅ Creates directory structure (`docs/`, `.cursor/`, `src/`, etc.)
2. ✅ Copies all guide files (`IDEA_GUIDE.md`, `BLUEPRINT_GUIDE.md`, etc.)
3. ✅ Sets up `.cursor/rules/` files
4. ✅ Creates `INSTRUCTIONS.md` and `ROADMAP.md` templates
5. ✅ Creates `.cursor/custom-instructions.md` for Cursor
6. ✅ Creates `.windsor-config.json` (tracks installation)

**Result:** Your project now has all the Windsor Constitution files and structure!

---

#### For an EXISTING Project:

```bash
# 1. Go to your existing project
cd my-existing-project

# 2. Clone and run installer
git clone https://github.com/yourusername/windsor-project-constitution.git
cd windsor-project-constitution
node scripts/install.js /path/to/my-existing-project
```

**What happens:**
1. ⚠️ Detects it's an existing project
2. 📦 Creates backup (just in case)
3. ✅ Adds Windsor files (doesn't move your existing code)
4. ✅ Creates `docs/` structure
5. ✅ Sets up `.cursor/` files
6. ✅ Creates Cursor custom instructions

**Important:** For existing projects, the starter script **doesn't reorganize your code** - it just adds the Windsor files. The path updater (for reorganizing) is a future enhancement.

---

### Step 3: Using It in Cursor

After installation, open your project in Cursor:

```bash
cd my-project
cursor .
```

**In Cursor, you can now use:**

```
@INSTRUCTIONS.md What is the current project status?

@BLUEPRINT_GUIDE.md Review my architecture

@.cursor/rules/api-standards.mdc Check this endpoint
```

Cursor will reference these files because:
- The installer created `.cursor/custom-instructions.md`
- This file tells Cursor to always reference the Windsor guides
- Cursor reads this automatically

---

## 🔄 Complete Flow Diagram

```
┌─────────────────────────────────────┐
│  1. You Create Template Repo        │
│     - windsor-project-constitution  │
│     - template/ folder with guides  │
│     - scripts/install.js            │
└──────────────┬──────────────────────┘
               │
               │ Push to GitHub
               │
               ▼
┌─────────────────────────────────────┐
│  2. Someone Uses It                 │
│                                     │
│     Option A: New Project           │
│     ├─ Creates structure            │
│     ├─ Copies all files             │
│     └─ Sets up Cursor               │
│                                     │
│     Option B: Existing Project     │
│     ├─ Adds Windsor files          │
│     ├─ Doesn't touch existing code │
│     └─ Sets up Cursor              │
└──────────────┬──────────────────────┘
               │
               │ Installation Complete
               │
               ▼
┌─────────────────────────────────────┐
│  3. Use in Cursor                   │
│     - @INSTRUCTIONS.md              │
│     - @BLUEPRINT_GUIDE.md           │
│     - @.cursor/rules/               │
└─────────────────────────────────────┘
```

---

## 🎯 Real Example

### Scenario: Setting up a new React project

```bash
# 1. Create project
npx create-react-app my-app
cd my-app

# 2. Install Windsor Constitution
git clone https://github.com/yourusername/windsor-project-constitution.git
cd windsor-project-constitution
node scripts/install.js ../my-app

# 3. Your project now has:
#    - IDEA_GUIDE.md
#    - BLUEPRINT_GUIDE.md
#    - CURSOR.md
#    - docs/ folder structure
#    - .cursor/ folder with rules
#    - INSTRUCTIONS.md template
#    - ROADMAP.md template

# 4. Open in Cursor
cd ../my-app
cursor .

# 5. In Cursor, ask:
#    "@INSTRUCTIONS.md What should I do first?"
#    "@BLUEPRINT_GUIDE.md Help me plan my MVP"
```

---

## ✅ What Gets Created

After installation, your project will have:

```
my-project/
├── IDEA_GUIDE.md              ← Copied from template
├── BLUEPRINT_GUIDE.md         ← Copied from template
├── CURSOR.md                  ← Copied from template
├── SETUP_CHECKLIST.md         ← Copied from template
├── SYSTEM_SUMMARY.md          ← Copied from template
├── ui-ux-prompt-2025.md      ← Copied from template
├── README.md                  ← Copied from template
├── INSTRUCTIONS.md           ← Created (template)
├── ROADMAP.md                 ← Created (template)
├── .windsor-config.json      ← Created (tracks installation)
│
├── .cursor/
│   ├── custom-instructions.md ← Created (tells Cursor what to reference)
│   └── rules/
│       ├── project-guidelines.mdc
│       ├── api-standards.mdc
│       ├── testing-requirements.mdc
│       └── security-checklist.mdc
│
└── docs/
    ├── IDEA/
    ├── BLUEPRINT/
    ├── OPERATIONS/
    ├── TEAM/
    └── METRICS/
```

---

## 🚀 Quick Start Commands

### For New Projects:
```bash
# Clone and install
git clone https://github.com/yourusername/windsor-project-constitution.git
cd windsor-project-constitution
node scripts/install.js /path/to/new/project
```

### For Existing Projects:
```bash
# Same command - it detects existing projects automatically
cd your-existing-project
git clone https://github.com/yourusername/windsor-project-constitution.git
cd windsor-project-constitution
node scripts/install.js ..
```

### Using in Cursor:
```
# Just use @ references
@INSTRUCTIONS.md What's the current status?
@BLUEPRINT_GUIDE.md Review my architecture
```

---

## 💡 Key Points

1. **Template Repo** = Your Windsor Constitution files organized
2. **Install Script** = Copies files to any project
3. **Cursor Setup** = Makes @ references work automatically
4. **Works for Both** = New projects (full setup) and existing (adds files)

---

## ❓ Common Questions

**Q: Do I need to run the installer every time?**
A: No, just once per project. After installation, all files are in your project.

**Q: What if I update the template repo?**
A: You can pull updates and re-run the installer (it will skip existing files).

**Q: Does it break existing projects?**
A: No! The starter script only ADDS files, doesn't move your existing code.

**Q: How do I use it in Cursor?**
A: Just use `@filename.md` - Cursor automatically finds the files.

---

**That's it! Simple flow: Create repo → Install in project → Use in Cursor** 🎉

