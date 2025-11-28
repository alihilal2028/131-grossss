# Fix: Netlify Cannot Access GitHub Repository

## Error Message
```
Error checking out repo. Please verify Netlify app installation on GitHub.
```

## What This Means
Netlify doesn't have permission to access your GitHub repository. This is a **permission issue**, not a code issue.

---

## Solution: Fix GitHub Permissions

### Method 1: Reconnect Netlify to GitHub (Recommended)

#### Step 1: Remove Old Connection
1. Go to **GitHub.com** → Settings (your profile)
2. Click **Applications** (left sidebar)
3. Click **Installed GitHub Apps**
4. Find **Netlify**
5. Click **Configure**
6. Scroll down and click **"Revoke all user tokens"** or **"Suspend"**

#### Step 2: Reconnect Netlify
1. Go to [app.netlify.com](https://app.netlify.com)
2. Click your site (or create new site)
3. Go to **Site Settings** → **Build & Deploy**
4. Under **Link to repository**, click **"Link repository"**
5. Choose **GitHub** → **Authorize Netlify** (green button)
6. When GitHub asks, click **"Authorize netlify"**
7. Select **your repository**

#### Step 3: Grant Repository Access
GitHub will ask which repositories Netlify can access:
- Option A: **All repositories** (easiest)
- Option B: **Only select repositories** → Choose your real estate project

Click **"Install & Authorize"**

---

### Method 2: Fresh Deploy

If reconnecting doesn't work, start fresh:

#### Step 1: Delete Current Site
1. Netlify Dashboard → Your site
2. Site Settings → scroll to bottom
3. Click **"Delete site"**

#### Step 2: Create New Site
1. Click **"Add new site"**
2. Choose **"Import an existing project"**
3. Click **GitHub**
4. **Authorize Netlify** when prompted
5. Choose **your repository**
6. Settings will auto-detect from `netlify.toml`
7. Click **"Deploy site"**

---

## Alternative: Deploy from Git URL

If GitHub integration keeps failing:

#### Using Netlify CLI
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy from your local machine
cd /app
netlify deploy --prod
```

This bypasses GitHub entirely and deploys directly from your computer.

---

## Check GitHub App Permissions

### Verify Netlify Has Access:

1. Go to **github.com/settings/installations**
2. Find **Netlify** in the list
3. Click **Configure**
4. Make sure it shows your repository in the list
5. If not, click **"Select repositories"**
6. Add your repository
7. Click **Save**

---

## Common Causes

### Cause 1: Private Repository
- If your repo is private, Netlify needs explicit permission
- Go to GitHub → Repository Settings → Manage access
- Make sure Netlify app has access

### Cause 2: Organization Repository
- If the repo belongs to a GitHub organization (not your personal account)
- You need **admin permissions** on that organization
- Or ask the organization owner to grant Netlify access

### Cause 3: Expired Token
- Netlify's GitHub token expired
- Solution: Disconnect and reconnect (Method 1 above)

---

## Step-by-Step: Reconnect Properly

1. **Disconnect GitHub**
   - Netlify → Site Settings → Build & Deploy
   - Scroll to "Link to repository"
   - Click "Unlink repository"

2. **Remove Netlify from GitHub**
   - GitHub → Settings → Applications → Installed GitHub Apps
   - Find Netlify → Configure
   - Click "Uninstall"

3. **Reinstall Netlify on GitHub**
   - Go back to Netlify
   - Add new site → Import from GitHub
   - Authorize when prompted
   - Select your repository
   - Grant permissions

4. **Deploy**
   - Netlify will now have fresh permissions
   - Deploy should work!

---

## Quick Fix Commands

### If Using Netlify CLI:
```bash
# Make sure you're in the project root
cd /app

# Login to Netlify
netlify login

# Link to existing site (or create new)
netlify link

# Deploy
netlify deploy --prod --dir=frontend/build
```

---

## Verify It Worked

After reconnecting, try deploying again. You should see:
```
✓ Checking out repository
✓ Cloning repository
✓ Starting build
```

Instead of:
```
❌ Error checking out repo
```

---

## Still Not Working?

### Option A: Make Repository Public
1. GitHub → Your repository → Settings
2. Scroll to "Danger Zone"
3. Click "Change visibility" → "Make public"
4. Try deploying again

### Option B: Use Netlify Drop
1. Build locally: `cd /app/frontend && yarn build`
2. Go to [app.netlify.com/drop](https://app.netlify.com/drop)
3. Drag and drop the `frontend/build` folder
4. Instant deploy (no GitHub needed)

---

## Summary

**The Issue**: Netlify can't access your GitHub repository
**The Fix**: Reconnect Netlify to GitHub with proper permissions
**Time**: 2-3 minutes

Your code is perfect ✅
Your configuration is perfect ✅
Just need to fix the GitHub connection 🔗
