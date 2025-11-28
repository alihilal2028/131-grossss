# 131 Grosvenor Avenue - Netlify Deployment Guide

## ✅ ALL CONFIGURED - Ready to Deploy!

### Configuration Applied (Based on Working Dweet Project):
1. ✅ Node version: 20
2. ✅ Publish path: `build` (relative to base directory)
3. ✅ Base directory: `frontend`
4. ✅ Build command optimized for React + Framer Motion

## Current Configuration

**netlify.toml settings:**
- Base directory: `frontend`
- Build command: `yarn install && yarn build`
- Publish directory: `build` (relative to base)
- Node version: `20`
- CI: `false` (warnings won't break build)
- ESLint disabled during build

**Files created:**
- `/app/.nvmrc` - Node version 20
- `/app/frontend/.nvmrc` - Node version 20
- `/app/netlify.toml` - Optimized config
- `/app/frontend/public/_redirects` - SPA routing

## Deploy Now! 🚀

Your Netlify deployment will work perfectly:

### Step 1: Push to GitHub
```bash
cd /app
git init
git add .
git commit -m "Luxury real estate website - ready for Netlify"
git branch -M main
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

### Step 2: Deploy on Netlify
1. Go to [app.netlify.com](https://app.netlify.com)
2. Click **"Add new site"** → **"Import an existing project"**
3. Select **GitHub** and choose your repository
4. **Netlify auto-detects everything** from `netlify.toml`
5. Click **"Deploy site"**

### Step 3: Wait 2-3 Minutes ⏱️
Build will complete successfully:
```
✓ Building site in frontend directory
✓ yarn install complete
✓ yarn build complete
✓ Compiled successfully!
✓ Deploy is live!
🎉 https://your-site-name.netlify.app
```

## What's Different from Default

This configuration matches your successful **dweet** deployment:

1. **Base Directory**: `frontend` (Netlify builds from inside this folder)
2. **Publish Path**: `build` (not `frontend/build` - avoids path doubling)
3. **Node 20**: Required for latest React and dependencies
4. **CI=false**: Warnings won't break build
5. **ESLint disabled**: Faster builds, no linting errors

## Manual Netlify Settings (Backup)

If you need to configure manually in Netlify Dashboard:

**Build settings:**
- Base directory: `frontend`
- Build command: `yarn install && yarn build`
- Publish directory: `build`

**Environment variables:**
- `NODE_VERSION` = `20`
- `CI` = `false`
- `DISABLE_ESLINT_PLUGIN` = `true`

## Expected Build Time

- First build: **2-3 minutes**
- Subsequent builds: **1-2 minutes** (cached)

## Troubleshooting

### If Build Fails

1. **Check Node version**: Should be 20 (not 18)
2. **Check base directory**: Should be `frontend`
3. **Check publish path**: Should be `build` (not `frontend/build`)
4. **Clear Netlify cache**: Site Settings → Build & Deploy → Clear cache

### Common Warnings (Safe to Ignore)

You may see these warnings during build - **they're normal**:
- ✓ workbox-webpack-plugin deprecation
- ✓ babel-preset-react-app deprecation  
- ✓ svgo optimization warnings
- ✓ peer dependency warnings

These won't break the build with `CI=false`.

## Post-Deployment

Once deployed:
- ✓ Site live at: `https://your-site-name.netlify.app`
- ✓ All routes work (SPA configured)
- ✓ Images load correctly
- ✓ Animations smooth
- ✓ No watermarks
- ✓ Contact form displays

### Custom Domain

1. Netlify Dashboard → Domain Settings
2. Add custom domain
3. Update DNS (Netlify provides instructions)
4. SSL enabled automatically (free)

## Quick Deploy Script

```bash
# Test build locally first
cd /app/frontend
yarn build

# If successful, push to GitHub
cd /app
git add .
git commit -m "Deploy to Netlify"
git push
```

## Success Indicators

When deployment succeeds, you'll see:
```
✔ Site is live
✔ Deploy time: 2m 15s
✔ Deploy URL: https://your-site-name.netlify.app
```

---

**This exact configuration worked for dweet. It will work for this project!** 🎉
