# .cursor Directory

This directory contains all Cursor IDE configuration and Windsor Constitution guides.

## Structure

```
.cursor/
├── .cursorrules              # Main rules file (auto-read by Cursor)
├── custom-instructions.md    # Custom instructions
├── guides/                   # Windsor Constitution guides
│   ├── IDEA_GUIDE.md
│   ├── BLUEPRINT_GUIDE.md
│   ├── CURSOR.md
│   ├── SETUP_CHECKLIST.md
│   ├── SYSTEM_SUMMARY.md
│   └── ui-ux-prompt-2025.md
└── rules/                    # Project-specific rules (MDC files)
    ├── project-guidelines.mdc
    ├── api-standards.mdc
    ├── testing-requirements.mdc
    └── security-checklist.mdc
```

## How It Works

### Automatic Rules (.cursorrules)
Cursor automatically reads `.cursorrules` file and follows all standards defined there without you needing to @ mention anything.

### Guides (guides/)
Comprehensive documentation for:
- Product development (IDEA_GUIDE.md)
- MVP planning (BLUEPRINT_GUIDE.md)
- Development standards (CURSOR.md)
- UI/UX patterns (ui-ux-prompt-2025.md)

Access with: `@.cursor/guides/IDEA_GUIDE.md`

### Project Rules (rules/)
MDC files with specific standards:
- `project-guidelines.mdc` - Code organization, naming conventions
- `api-standards.mdc` - API design patterns
- `testing-requirements.mdc` - Testing strategies
- `security-checklist.mdc` - Security requirements

Access with: `@.cursor/rules/api-standards.mdc`

## Usage

### Cursor Automatically Follows
- Everything in `.cursorrules` is applied by default
- No need to @ mention for basic standards

### When to @ Reference
- For detailed information: `@.cursor/guides/BLUEPRINT_GUIDE.md`
- For specific patterns: `@.cursor/rules/api-standards.mdc`
- When you need comprehensive guidance

## Updating

To customize for your project:
1. Edit `.cursorrules` for project-specific standards
2. Add/modify files in `rules/` for detailed patterns
3. Keep `guides/` for reference (don't edit unless updating Windsor Constitution)

