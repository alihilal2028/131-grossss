#!/bin/bash

# 🚀 Quick Netlify Deployment Script
# Run this to prepare and deploy to Netlify

set -e

echo "🏠 131 Grosvenor Avenue - Netlify Deployment"
echo "============================================"
echo ""

# Check if we're in the right directory
if [ ! -f "netlify.toml" ]; then
    echo "❌ Error: netlify.toml not found. Run this from /app directory"
    exit 1
fi

# Test build locally first
echo "📦 Step 1: Testing build locally..."
cd frontend
CI=false yarn build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
else
    echo "❌ Build failed. Fix errors before deploying."
    exit 1
fi

cd ..

# Check for git
if [ ! -d ".git" ]; then
    echo ""
    echo "📝 Step 2: Initialize Git repository..."
    git init
    echo "✅ Git initialized"
else
    echo "✅ Git already initialized"
fi

# Stage all files
echo ""
echo "📝 Step 3: Staging files..."
git add .

# Check if there are changes to commit
if git diff-index --quiet HEAD 2>/dev/null; then
    echo "✅ No new changes to commit"
else
    echo "📝 Committing changes..."
    git commit -m "Real estate website ready for Netlify deployment"
    echo "✅ Changes committed"
fi

echo ""
echo "============================================"
echo "✅ ALL CHECKS PASSED!"
echo "============================================"
echo ""
echo "🎯 Next Steps:"
echo ""
echo "1. If not already done, create GitHub repository:"
echo "   → Go to github.com and create a new repository"
echo ""
echo "2. Push to GitHub:"
echo "   → git remote add origin YOUR_GITHUB_REPO_URL"
echo "   → git branch -M main"
echo "   → git push -u origin main"
echo ""
echo "3. Deploy on Netlify:"
echo "   → Go to app.netlify.com"
echo "   → Click 'Add new site' → 'Import an existing project'"
echo "   → Select your GitHub repository"
echo "   → Netlify auto-detects settings from netlify.toml"
echo "   → Click 'Deploy site'"
echo ""
echo "4. Wait 2-3 minutes for deployment ⏱️"
echo ""
echo "📂 Build directory: frontend/build/"
echo "📄 Config file: netlify.toml"
echo "🔄 Redirects: frontend/public/_redirects"
echo "📦 Node version: 18 (.nvmrc)"
echo ""
echo "🎉 Your site will be live at: https://YOUR-SITE-NAME.netlify.app"
echo ""
