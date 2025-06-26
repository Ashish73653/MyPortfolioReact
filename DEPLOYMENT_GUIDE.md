# 🚀 Deployment Guide

This guide covers deploying your portfolio to various hosting platforms.

## 🌐 GitHub Pages (Recommended - Free)

Your portfolio is already configured for GitHub Pages with automated deployment.

### Setup Steps:

1. **Repository Secrets** (Required for environment variables):
   ```
   Go to: Repository Settings > Secrets and variables > Actions
   
   Add these secrets:
   - VITE_FIREBASE_API_KEY
   - VITE_FIREBASE_AUTH_DOMAIN
   - VITE_FIREBASE_PROJECT_ID
   - VITE_FIREBASE_STORAGE_BUCKET
   - VITE_FIREBASE_MESSAGING_SENDER_ID
   - VITE_FIREBASE_APP_ID
   - VITE_ADMIN_EMAIL
   - VITE_GITHUB_USERNAME (optional)
   - VITE_GITHUB_TOKEN (optional)
   - VITE_EMAILJS_SERVICE_ID (optional)
   - VITE_EMAILJS_TEMPLATE_ID (optional)
   - VITE_EMAILJS_PUBLIC_KEY (optional)
   ```

2. **Enable GitHub Pages**:
   - Go to Repository Settings > Pages
   - Source: Deploy from a branch
   - Branch: `gh-pages` (created automatically)

3. **Deploy**:
   - Push to `main` branch
   - GitHub Actions will build and deploy automatically
   - Check the Actions tab for deployment status

### Custom Domain (Optional):
```
# Add CNAME file to public/ directory
echo "yourdomain.com" > my-portfolio/public/CNAME
```

---

## 🔺 Vercel (Easy & Fast)

### Deploy with Git:
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on every push

### Environment Variables in Vercel:
```bash
# Go to Vercel Dashboard > Project > Settings > Environment Variables
VITE_FIREBASE_API_KEY=your_value
VITE_FIREBASE_AUTH_DOMAIN=your_value
# ... add all other variables
```

### Manual Deploy:
```bash
npm install -g vercel
npm run build
vercel --prod
```

---

## 🌐 Netlify

### Deploy with Git:
1. Connect repository to Netlify
2. Build command: `npm run build`
3. Publish directory: `my-portfolio/dist`
4. Set environment variables in Netlify dashboard

### Manual Deploy:
```bash
npm run build
# Drag and drop dist folder to Netlify
```

### Netlify Configuration:
Create `netlify.toml` in project root:
```toml
[build]
  base = "my-portfolio"
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

---

## 🔥 Firebase Hosting

Perfect since you're already using Firebase!

### Setup:
```bash
npm install -g firebase-tools
firebase login
firebase init hosting

# Select your Firebase project
# Public directory: dist
# Single-page app: Yes
# Overwrite index.html: No
```

### Deploy:
```bash
npm run build
firebase deploy
```

### Configuration (`firebase.json`):
```json
{
  "hosting": {
    "public": "dist",
    "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
```

---

## ☁️ AWS S3 + CloudFront

For advanced users who want full AWS integration.

### S3 Setup:
1. Create S3 bucket
2. Enable static website hosting
3. Upload build files
4. Set bucket policy for public read

### CloudFront Setup:
1. Create CloudFront distribution
2. Point to S3 bucket
3. Set custom error pages for SPA routing

---

## 🛠️ Build Optimization

### Environment-Specific Builds:

```bash
# Development
npm run dev

# Production
npm run build

# Preview production build
npm run preview
```

### Performance Tips:

1. **Image Optimization**:
   - Use WebP format
   - Compress images before adding
   - Consider lazy loading

2. **Bundle Size**:
   - Check bundle size: `npm run build -- --analyze`
   - Implement code splitting if needed
   - Remove unused dependencies

3. **Caching**:
   - Most platforms handle this automatically
   - For custom servers, set proper cache headers

---

## 🔍 Monitoring & Analytics

### Add Analytics:
```typescript
// Add to index.html or main.tsx
// Google Analytics, Plausible, or other analytics
```

### Performance Monitoring:
- Use Lighthouse for performance audits
- Monitor Core Web Vitals
- Set up error tracking (Sentry, etc.)

---

## 🐛 Troubleshooting Deployment

### Common Issues:

1. **Environment Variables Not Working**:
   - Ensure all secrets are set correctly
   - Check variable names match exactly
   - Restart deployment after adding secrets

2. **404 Errors on Refresh**:
   - Check that `404.html` is in build output
   - Verify SPA redirect configuration
   - Test routes after deployment

3. **Build Failures**:
   - Check build logs in deployment platform
   - Test build locally first: `npm run build`
   - Verify all dependencies are in `package.json`

4. **Firebase Not Working in Production**:
   - Ensure domain is added to Firebase authorized domains
   - Check that environment variables are available at build time
   - Verify Firestore security rules

### Debug Steps:
```bash
# Test build locally
npm run build
npm run preview

# Check build output
ls -la dist/

# Test environment variables
echo $VITE_FIREBASE_API_KEY
```

---

## 📊 Deployment Comparison

| Platform | Cost | Ease | Performance | Custom Domain |
|----------|------|------|-------------|---------------|
| GitHub Pages | Free | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ |
| Vercel | Free tier | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| Netlify | Free tier | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| Firebase | Pay-as-go | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| AWS S3 | Low cost | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |

**Recommendation**: Start with GitHub Pages (free and automatic), then consider Vercel or Netlify for advanced features.

---

## 🎉 Post-Deployment

After successful deployment:

1. **Test All Features**:
   - Admin login and functionality
   - Contact form submission
   - Mobile responsiveness
   - Page loading and navigation

2. **Share Your Portfolio**:
   - Update your resume/CV
   - Share on LinkedIn
   - Add to GitHub profile
   - Include in job applications

3. **Monitor Performance**:
   - Set up analytics
   - Monitor for errors
   - Track user engagement

Your portfolio is now live and ready to showcase your work! 🚀
