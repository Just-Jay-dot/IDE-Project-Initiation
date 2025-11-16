# Windsor Project Constitution

Global CLI tools for standardized project initialization and organization.

## 🚀 Quick Start

### Install Globally

```bash
# Clone this repository
git clone https://github.com/yourusername/windsor-project-constitution.git
cd windsor-project-constitution

# Install dependencies and link globally
npm install
npm link

# Now you can use:
projinit    # For new projects
projorg     # For existing projects
```

## 📦 Commands

### `projinit` - Initialize New Projects

```bash
projinit                    # Uses current directory
projinit /path/to/project   # Specify path
```

**What it does:**
1. Pulls latest Windsor Constitution from GitHub
2. Creates complete project structure
3. Copies all guide files (IDEA_GUIDE.md, BLUEPRINT_GUIDE.md, etc.)
4. Sets up `.cursor/rules/` files
5. Creates INSTRUCTIONS.md and ROADMAP.md templates
6. Configures Cursor custom instructions

### `projorg` - Organize Existing Projects

```bash
cd your-existing-project
projorg
```

**What it does:**
1. ✅ Creates backup in `.windsor-backup/` (with rollback script)
2. Pulls latest Windsor Constitution from GitHub
3. Adds Windsor files (doesn't overwrite existing)
4. Optionally reorganizes structure (with import path updates)
5. Sets up Cursor configuration
6. Validates changes

**Safety Features:**
- Automatic backup before any changes
- Rollback script included in backup
- Optional reorganization (you choose)
- Import path updates validated

## 📚 What You Get

After running `projinit` or `projorg`, your project will have:

```
your-project/
├── IDEA_GUIDE.md              # Idea validation guide
├── BLUEPRINT_GUIDE.md         # Product blueprint guide
├── CURSOR.md                  # Cursor IDE configuration
├── SETUP_CHECKLIST.md         # Setup checklist
├── SYSTEM_SUMMARY.md          # System overview
├── ui-ux-prompt-2025.md      # UI/UX prompt guide
├── INSTRUCTIONS.md            # Project instructions (template)
├── ROADMAP.md                 # Project roadmap (template)
├── .windsor-config.json      # Configuration file
│
├── .cursor/
│   ├── custom-instructions.md # Tells Cursor what to reference
│   └── rules/
│       ├── project-guidelines.mdc
│       ├── api-standards.mdc
│       ├── testing-requirements.mdc
│       └── security-checklist.mdc
│
└── docs/
    ├── IDEA/                  # Idea validation docs
    ├── BLUEPRINT/             # Product specifications
    ├── OPERATIONS/            # Deployment & operations
    ├── TEAM/                  # Team documentation
    └── METRICS/               # Success metrics
```

## 🎯 Using in Cursor

After installation, open your project in Cursor and use:

```
@INSTRUCTIONS.md What is the current project status?

@BLUEPRINT_GUIDE.md Review my architecture

@.cursor/rules/api-standards.mdc Check this endpoint
```

Cursor automatically finds these files because `.cursor/custom-instructions.md` tells it where they are.

## 🔒 Backup & Rollback

When you run `projorg` on an existing project:

1. **Backup Created**: `.windsor-backup/[timestamp]/`
   - Contains all your original files
   - Includes rollback script
   - Metadata in `rollback-info.json`

2. **Rollback**:
   ```bash
   cd .windsor-backup/2025-01-20T10-30-00-000Z/
   ./rollback.sh
   ```

## 📖 Documentation

- **[INSTALLATION_GUIDE.md](./INSTALLATION_GUIDE.md)** - Complete installation instructions
- **[PROJECT_INIT_SYSTEM_GUIDE.md](./PROJECT_INIT_SYSTEM_GUIDE.md)** - Technical details
- **[SIMPLE_FLOW_EXPLANATION.md](./SIMPLE_FLOW_EXPLANATION.md)** - How it works
- **[QUICK_START_BRIEFING.md](./QUICK_START_BRIEFING.md)** - Quick reference

## 🛠️ Development

### Project Structure

```
windsor-project-constitution/
├── bin/
│   ├── projinit.js      # New project command
│   └── projorg.js       # Existing project command
├── template/            # Template files (to be created)
├── package.json
└── README.md
```

### Setup for Development

```bash
# Install dependencies
npm install

# Link globally for testing
npm link

# Test commands
projinit test-project
projorg test-existing-project
```

## 📝 Configuration

### Update Repository URL

After pushing to GitHub, update the URL in:
- `bin/projinit.js` (line ~20)
- `bin/projorg.js` (line ~20)

```javascript
const WINDSOR_REPO = 'https://github.com/yourusername/windsor-project-constitution.git';
```

## 🐛 Troubleshooting

### Command Not Found

```bash
# Check if linked
which projinit

# Re-link if needed
npm link
```

### GitHub Access Issues

```bash
# Clear cache and retry
rm -rf ~/.windsor-cache
projinit
```

## 📄 License

MIT

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

---

**Made with ❤️ for better project organization**
