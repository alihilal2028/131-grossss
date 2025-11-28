#!/bin/bash

echo "======================================"
echo "NETLIFY DEPLOYMENT DIAGNOSTIC CHECK"
echo "======================================"
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check 1: netlify.toml
echo "1. Checking netlify.toml..."
if [ -f "/app/netlify.toml" ]; then
    echo -e "${GREEN}✓ netlify.toml exists${NC}"
    echo "   Content:"
    head -10 /app/netlify.toml | sed 's/^/   /'
else
    echo -e "${RED}✗ netlify.toml NOT FOUND${NC}"
fi
echo ""

# Check 2: Node version files
echo "2. Checking Node version files..."
if [ -f "/app/.nvmrc" ]; then
    echo -e "${GREEN}✓ /app/.nvmrc exists${NC} ($(cat /app/.nvmrc))"
else
    echo -e "${RED}✗ /app/.nvmrc NOT FOUND${NC}"
fi

if [ -f "/app/frontend/.nvmrc" ]; then
    echo -e "${GREEN}✓ /app/frontend/.nvmrc exists${NC} ($(cat /app/frontend/.nvmrc))"
else
    echo -e "${RED}✗ /app/frontend/.nvmrc NOT FOUND${NC}"
fi
echo ""

# Check 3: _redirects file
echo "3. Checking _redirects file..."
if [ -f "/app/frontend/public/_redirects" ]; then
    echo -e "${GREEN}✓ _redirects exists${NC}"
    echo "   Content: $(cat /app/frontend/public/_redirects)"
else
    echo -e "${RED}✗ _redirects NOT FOUND${NC}"
fi
echo ""

# Check 4: package.json
echo "4. Checking package.json..."
if [ -f "/app/frontend/package.json" ]; then
    echo -e "${GREEN}✓ package.json exists${NC}"
    echo "   Name: $(grep '"name"' /app/frontend/package.json | head -1)"
else
    echo -e "${RED}✗ package.json NOT FOUND${NC}"
fi
echo ""

# Check 5: Try local build
echo "5. Testing local build..."
cd /app/frontend
if CI=false yarn build > /tmp/build.log 2>&1; then
    echo -e "${GREEN}✓ Build successful!${NC}"
    echo "   Build size: $(du -sh build 2>/dev/null | cut -f1)"
else
    echo -e "${RED}✗ Build failed!${NC}"
    echo "   Last 10 lines of build log:"
    tail -10 /tmp/build.log | sed 's/^/   /'
fi
echo ""

# Check 6: Git status
echo "6. Checking Git status..."
cd /app
if [ -d ".git" ]; then
    echo -e "${GREEN}✓ Git initialized${NC}"
    echo "   Branch: $(git branch --show-current 2>/dev/null || echo 'No branch')"
    echo "   Uncommitted files: $(git status --short | wc -l)"
else
    echo -e "${YELLOW}⚠ Git not initialized${NC}"
    echo "   Run: git init && git add . && git commit -m 'Initial commit'"
fi
echo ""

# Summary
echo "======================================"
echo "SUMMARY"
echo "======================================"
echo ""
echo "Required for Netlify:"
echo "  ✓ netlify.toml in root"
echo "  ✓ .nvmrc with Node 20"
echo "  ✓ _redirects in frontend/public"
echo "  ✓ Successful local build"
echo "  ✓ Git repository with commits"
echo ""
echo "If all checks pass ✓, deployment should work!"
echo "If any checks fail ✗, fix them first."
echo ""
echo "======================================"
