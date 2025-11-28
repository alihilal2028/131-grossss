# How to Get Netlify Build Logs

## Step 1: Find Your Failed Deploy

1. Go to [app.netlify.com](https://app.netlify.com)
2. Click on your site
3. Go to **"Deploys"** tab
4. Click on the **failed deploy** (red X icon)

## Step 2: View Full Build Log

1. On the deploy page, you'll see the build log
2. Click **"Show full log"** or scroll down
3. Look for **RED TEXT** - that's the error

## Step 3: Copy the Error Section

Copy everything from where it says:
```
❌ Build failed
```

Or look for:
```
Error: ...
npm ERR! ...
yarn error ...
```

## What to Copy

Copy from the error line backwards about 20-30 lines. For example:

```
12:01:45 PM: $ yarn build
12:01:50 PM: Creating an optimized production build...
12:02:15 PM: Failed to compile.
12:02:15 PM: 
12:02:15 PM: ./src/components/Something.jsx
12:02:15 PM: Module not found: Can't resolve 'XYZ'
12:02:15 PM: 
12:02:15 PM: npm ERR! code ELIFECYCLE
12:02:15 PM: npm ERR! errno 1
```

## Common Error Patterns

Look for these keywords in the log:
- `Error:`
- `Failed to compile`
- `Module not found`
- `Cannot find module`
- `npm ERR!`
- `yarn error`
- `ELIFECYCLE`
- `Command failed`

## Alternative: Download Full Log

1. On the deploy page
2. Click the **"⋮"** (three dots) menu
3. Select **"Download deploy log"**
4. Open the file and find the error section

## Then Share With Me

Once you have the error, paste it here and I'll fix it immediately!

---

## Meanwhile: Manual Deploy Check

Try this to see if there's an obvious issue:

### Check 1: Verify Files Exist
```bash
ls -la /app/netlify.toml
ls -la /app/.nvmrc
ls -la /app/frontend/.nvmrc
ls -la /app/frontend/public/_redirects
```

All should exist ✅

### Check 2: Test Build Locally
```bash
cd /app/frontend
CI=false yarn build
```

Should show: `Compiled successfully!` ✅

### Check 3: Check Git
```bash
cd /app
git status
```

Should show all files committed ✅

---

## Quick Fixes to Try

### Fix 1: Clear Netlify Cache
1. Site Settings → Build & Deploy
2. Click **"Clear cache and retry deploy"**

### Fix 2: Manual Configuration
If auto-detect fails, set manually:
- Base directory: `frontend`
- Build command: `yarn install && yarn build`
- Publish directory: `build`
- Node version: Add env var `NODE_VERSION` = `20`

### Fix 3: Check Branch
Make sure you deployed from the correct branch (usually `main` or `master`)

---

## Still Stuck?

Share the error log and I'll fix it in minutes! 🚀
