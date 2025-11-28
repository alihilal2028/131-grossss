# Netlify Deployment Guide - 131 Grosvenor Avenue

## Quick Deploy Steps

### 1. Push to GitHub (if not already done)
```bash
git init
git add .
git commit -m "Real estate website ready for deployment"
git branch -M main
git remote add origin <your-github-repo-url>
git push -u origin main
```

### 2. Deploy on Netlify

#### Option A: Connect via Netlify Dashboard (Recommended)
1. Go to [netlify.com](https://netlify.com) and log in
2. Click **"Add new site"** → **"Import an existing project"**
3. Choose **GitHub** and authorize
4. Select your repository
5. Netlify will **auto-detect** settings from `netlify.toml`:
   - Build command: `cd frontend && yarn install && yarn build`
   - Publish directory: `frontend/build`
   - Node version: 18
6. Click **"Deploy site"**

#### Option B: Netlify CLI
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Initialize and deploy
netlify init

# Or deploy directly
netlify deploy --prod
```

### 3. Configuration Already Set ✅

All configuration is in `netlify.toml`:
- ✅ Build command configured
- ✅ Publish directory set
- ✅ Node 18 specified
- ✅ SPA redirects configured
- ✅ Security headers added
- ✅ Cache optimization enabled
- ✅ Asset compression configured

### 4. Environment Variables (if needed in future)

If you need backend API integration later:
1. Go to Site Settings → Environment Variables
2. Add:
   - `REACT_APP_API_URL` = your backend URL
   - Any other API keys

### 5. Custom Domain (Optional)

1. Go to Domain Settings
2. Add custom domain
3. Follow DNS configuration steps
4. Netlify provides free SSL automatically

## Build Verification

Before deploying, test the build locally:

```bash
cd frontend
yarn build
```

If successful, you'll see:
```
The project was built assuming it is hosted at /.
The build folder is ready to be deployed.
```

## Troubleshooting

### Build Fails with "Module not found"
- Check that all dependencies are in `package.json`
- Run `yarn install` in frontend directory

### Build Fails with Memory Error
- In Netlify: Site Settings → Build & Deploy → Environment Variables
- Add: `NODE_OPTIONS = --max_old_space_size=4096`

### Page Shows 404 on Refresh
- Already fixed with `_redirects` file
- Make sure `frontend/public/_redirects` exists

### Slow Build Times
- Already optimized in `netlify.toml`
- First build: ~2-3 minutes
- Subsequent builds: ~1-2 minutes (cached)

## Expected Build Output

```
✓ Build successful!
✓ Deploy preview URL: https://random-name.netlify.app
✓ Production URL: https://your-site-name.netlify.app
```

## Post-Deployment Checklist

- [ ] Homepage loads correctly
- [ ] Gallery images display
- [ ] Contact form is visible (backend integration needed for functionality)
- [ ] Map displays correctly
- [ ] All navigation works
- [ ] Mobile responsive
- [ ] No console errors

## Notes

- **Frontend Only**: This deployment only includes the React frontend
- **Backend**: If you need the FastAPI backend, deploy separately on:
  - Railway
  - Render
  - Heroku
  - Vercel (serverless)
  
- **Contact Form**: Currently frontend only. Connect to backend API or use:
  - Netlify Forms
  - FormSpree
  - EmailJS

## Files Created for Deployment

```
/netlify.toml              - Main Netlify configuration
/frontend/public/_redirects - SPA routing
/.nvmrc                    - Node version for Netlify
/.node-version             - Alternative Node version file
```

## Support

If deployment fails, check:
1. Netlify build logs
2. Make sure `frontend/build` directory is gitignored but builds successfully
3. Verify all image URLs are accessible
4. Check browser console for errors

---

**Deployment should take 2-3 minutes max!**
