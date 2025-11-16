#!/bin/bash

# Complete Automated Setup for Windsor Project Constitution
# This script does everything possible automatically

set -e

echo "🚀 Windsor Project Constitution - Complete Automated Setup"
echo "=========================================================="
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
CYAN='\033[0;36m'
NC='\033[0m'

# Get current directory
PROJECT_DIR=$(cd "$(dirname "$0")" && pwd)
cd "$PROJECT_DIR"

echo -e "${CYAN}Project directory:${NC} $PROJECT_DIR"
echo ""

# Step 1: Check prerequisites
echo -e "${YELLOW}Step 1: Checking prerequisites...${NC}"

if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js is not installed${NC}"
    exit 1
fi
echo -e "${GREEN}✓${NC} Node.js: $(node --version)"

if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ npm is not installed${NC}"
    exit 1
fi
echo -e "${GREEN}✓${NC} npm: $(npm --version)"

if ! command -v git &> /dev/null; then
    echo -e "${RED}❌ git is not installed${NC}"
    exit 1
fi
echo -e "${GREEN}✓${NC} git: $(git --version | cut -d' ' -f3)"
echo ""

# Step 2: Install npm dependencies
echo -e "${YELLOW}Step 2: Installing npm dependencies...${NC}"
npm install --silent
echo -e "${GREEN}✓${NC} Dependencies installed"
echo ""

# Step 3: Make scripts executable
echo -e "${YELLOW}Step 3: Making scripts executable...${NC}"
chmod +x bin/projinit.js
chmod +x bin/projorg.js
chmod +x SETUP_SCRIPT.sh
echo -e "${GREEN}✓${NC} Scripts are executable"
echo ""

# Step 4: Initialize git repository
echo -e "${YELLOW}Step 4: Initializing git repository...${NC}"

if [ -d ".git" ]; then
    echo -e "${BLUE}ℹ${NC} Git repository already exists"
else
    git init
    echo -e "${GREEN}✓${NC} Git repository initialized"
fi

# Create .gitignore if it doesn't exist
if [ ! -f ".gitignore" ]; then
    cat > .gitignore << 'EOF'
# Dependencies
node_modules/
package-lock.json

# OS files
.DS_Store
.DS_Store?
._*
.Trashes

# IDE
.vscode/
.idea/
*.swp
*.swo

# Cache
.windsor-cache/

# Logs
*.log
npm-debug.log*

# Environment
.env
.env.local
EOF
    echo -e "${GREEN}✓${NC} Created .gitignore"
fi

# Add all files
git add .
echo -e "${GREEN}✓${NC} Files staged for commit"
echo ""

# Step 5: Create initial commit
echo -e "${YELLOW}Step 5: Creating initial commit...${NC}"
if ! git diff --cached --quiet || ! git diff-files --quiet; then
    git commit -m "Initial commit: Windsor Project Constitution CLI tools" --quiet
    echo -e "${GREEN}✓${NC} Initial commit created"
else
    echo -e "${BLUE}ℹ${NC} No changes to commit"
fi
echo ""

# Step 6: Set main branch
echo -e "${YELLOW}Step 6: Setting up git branch...${NC}"
git branch -M main 2>/dev/null || true
echo -e "${GREEN}✓${NC} Branch set to main"
echo ""

# Step 7: Link globally
echo -e "${YELLOW}Step 7: Linking globally...${NC}"
npm link
echo -e "${GREEN}✓${NC} Linked globally"
echo ""

# Step 8: Verify installation
echo -e "${YELLOW}Step 8: Verifying installation...${NC}"
if command -v projinit &> /dev/null; then
    echo -e "${GREEN}✓${NC} projinit command available"
else
    echo -e "${YELLOW}⚠${NC} projinit not in PATH (may need to restart terminal)"
fi

if command -v projorg &> /dev/null; then
    echo -e "${GREEN}✓${NC} projorg command available"
else
    echo -e "${YELLOW}⚠${NC} projorg not in PATH (may need to restart terminal)"
fi
echo ""

# Step 9: Get GitHub username
echo -e "${YELLOW}Step 9: GitHub Setup${NC}"
echo ""
echo -e "${CYAN}To complete setup, you need to:${NC}"
echo ""
echo "1. Create a GitHub repository:"
echo "   - Go to: https://github.com/new"
echo "   - Name: windsor-project-constitution"
echo "   - Visibility: Public"
echo "   - Don't initialize with README (we already have one)"
echo ""
echo "2. After creating the repo, run this command:"
echo ""
echo -e "${GREEN}   git remote add origin https://github.com/YOUR_USERNAME/windsor-project-constitution.git${NC}"
echo -e "${GREEN}   git push -u origin main${NC}"
echo ""
echo "3. Update repository URL in scripts:"
echo "   - Edit bin/projinit.js (line ~20)"
echo "   - Edit bin/projorg.js (line ~20)"
echo "   - Replace YOUR_USERNAME with your GitHub username"
echo ""

# Create a helper script for GitHub push
cat > PUSH_TO_GITHUB.sh << 'EOFPUSH'
#!/bin/bash

# Helper script to push to GitHub
# Usage: ./PUSH_TO_GITHUB.sh YOUR_GITHUB_USERNAME

if [ -z "$1" ]; then
    echo "Usage: ./PUSH_TO_GITHUB.sh YOUR_GITHUB_USERNAME"
    exit 1
fi

USERNAME=$1

echo "🚀 Pushing to GitHub..."
echo ""

# Update repository URLs in scripts
echo "Updating repository URLs in scripts..."
sed -i.bak "s/yourusername/$USERNAME/g" bin/projinit.js
sed -i.bak "s/yourusername/$USERNAME/g" bin/projorg.js
rm -f bin/projinit.js.bak bin/projorg.js.bak
echo "✓ Updated repository URLs"

# Add remote if not exists
if ! git remote | grep -q origin; then
    git remote add origin "https://github.com/$USERNAME/windsor-project-constitution.git"
    echo "✓ Added remote origin"
else
    git remote set-url origin "https://github.com/$USERNAME/windsor-project-constitution.git"
    echo "✓ Updated remote origin"
fi

# Push to GitHub
echo ""
echo "Pushing to GitHub..."
git push -u origin main

echo ""
echo "✅ Done! Repository pushed to GitHub"
echo ""
echo "Now you can use:"
echo "  projinit    # For new projects"
echo "  projorg     # For existing projects"
EOFPUSH

chmod +x PUSH_TO_GITHUB.sh

echo -e "${GREEN}✓${NC} Created PUSH_TO_GITHUB.sh helper script"
echo ""

# Final summary
echo -e "${GREEN}═══════════════════════════════════════════════════════════${NC}"
echo -e "${GREEN}✅ Automated setup complete!${NC}"
echo -e "${GREEN}═══════════════════════════════════════════════════════════${NC}"
echo ""
echo -e "${CYAN}Next steps:${NC}"
echo ""
echo "1. Create GitHub repository:"
echo "   https://github.com/new"
echo "   Name: windsor-project-constitution"
echo "   Visibility: Public"
echo ""
echo "2. Run the push script:"
echo -e "   ${GREEN}./PUSH_TO_GITHUB.sh YOUR_GITHUB_USERNAME${NC}"
echo ""
echo "3. Test the commands:"
echo -e "   ${GREEN}projinit test-project${NC}"
echo -e "   ${GREEN}cd test-project && projorg${NC}"
echo ""
echo -e "${YELLOW}Note:${NC} If commands not found, restart your terminal or run:"
echo "   export PATH=\"\$(npm config get prefix)/bin:\$PATH\""
echo ""

