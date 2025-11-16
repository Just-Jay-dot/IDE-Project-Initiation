#!/bin/bash

# Quick Setup Script for Windsor Project Constitution
# This script helps you set up the repository and install globally

set -e

echo "🚀 Windsor Project Constitution - Setup Script"
echo "=============================================="
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js is not installed. Please install Node.js first.${NC}"
    exit 1
fi

echo -e "${GREEN}✓${NC} Node.js found: $(node --version)"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ npm is not installed. Please install npm first.${NC}"
    exit 1
fi

echo -e "${GREEN}✓${NC} npm found: $(npm --version)"
echo ""

# Get current directory
CURRENT_DIR=$(pwd)
echo -e "${BLUE}Current directory:${NC} $CURRENT_DIR"
echo ""

# Step 1: Install dependencies
echo -e "${YELLOW}Step 1: Installing dependencies...${NC}"
npm install
echo -e "${GREEN}✓${NC} Dependencies installed"
echo ""

# Step 2: Make bin files executable
echo -e "${YELLOW}Step 2: Making scripts executable...${NC}"
chmod +x bin/projinit.js
chmod +x bin/projorg.js
echo -e "${GREEN}✓${NC} Scripts are executable"
echo ""

# Step 3: Link globally
echo -e "${YELLOW}Step 3: Linking globally...${NC}"
npm link
echo -e "${GREEN}✓${NC} Linked globally"
echo ""

# Step 4: Verify installation
echo -e "${YELLOW}Step 4: Verifying installation...${NC}"
if command -v projinit &> /dev/null; then
    echo -e "${GREEN}✓${NC} projinit command found"
else
    echo -e "${RED}❌${NC} projinit command not found"
    echo -e "${YELLOW}Tip:${NC} You may need to add npm global bin to your PATH"
    echo "Run: export PATH=\"\$(npm config get prefix)/bin:\$PATH\""
fi

if command -v projorg &> /dev/null; then
    echo -e "${GREEN}✓${NC} projorg command found"
else
    echo -e "${RED}❌${NC} projorg command not found"
    echo -e "${YELLOW}Tip:${NC} You may need to add npm global bin to your PATH"
    echo "Run: export PATH=\"\$(npm config get prefix)/bin:\$PATH\""
fi
echo ""

# Step 5: GitHub setup reminder
echo -e "${YELLOW}Step 5: GitHub Setup Reminder${NC}"
echo ""
echo "Before using the commands, you need to:"
echo "1. Create GitHub repository: windsor-project-constitution"
echo "2. Push this code to GitHub"
echo "3. Update repository URL in:"
echo "   - bin/projinit.js (line ~20)"
echo "   - bin/projorg.js (line ~20)"
echo ""
echo "Change: const WINDSOR_REPO = 'https://github.com/yourusername/...'"
echo ""

# Success message
echo -e "${GREEN}✅ Setup complete!${NC}"
echo ""
echo "Next steps:"
echo "1. Push to GitHub (see INSTALLATION_GUIDE.md)"
echo "2. Update repository URLs in bin files"
echo "3. Test: projinit test-project"
echo "4. Test: cd test-project && projorg"
echo ""
echo "For detailed instructions, see: INSTALLATION_GUIDE.md"
echo ""

