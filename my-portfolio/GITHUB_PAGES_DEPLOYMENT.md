# 🚀 GitHub Pages Deployment Guide with Firestore

## Prerequisites

- GitHub repository with your portfolio code
- Firebase project set up with Firestore
- All environment variables ready

## Step-by-Step Deployment

### 1. Enable GitHub Pages

1. Go to your GitHub repository
2. Navigate to **Settings** → **Pages**
3. Under "Source", select **GitHub Actions**
4. Click **Save**

### 2. Add Repository Secrets

Go to your repository **Settings** → **Secrets and variables** → **Actions** and add these secrets:

```
VITE_GITHUB_USERNAME=Your_GitHub_Username
VITE_GITHUB_TOKEN=Your_GitHub_Personal_Access_Token
VITE_FIREBASE_API_KEY=Your_Firebase_API_Key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=Your_Sender_ID
VITE_FIREBASE_APP_ID=Your_App_ID
VITE_ADMIN_EMAIL=your-admin@email.com
VITE_EMAILJS_SERVICE_ID=Your_EmailJS_Service_ID
VITE_EMAILJS_TEMPLATE_ID=Your_EmailJS_Template_ID
VITE_EMAILJS_PUBLIC_KEY=Your_EmailJS_Public_Key
```

### 3. Firebase Authentication Setup

1. Go to [Firebase Console](https://console.firebase.google.com/project/portfolio-ee38a/authentication/settings)
2. Navigate to **Authentication** → **Settings** → **Authorized domains**
3. Add your GitHub Pages domain:
   ```
   ashish73653.github.io
   ```

### 4. Firebase Firestore Security Rules

**Choose one of these rule sets based on your needs:**

**Option A: Production Rules (Recommended)**

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /skills/{skillId} {
      allow read: if true;
      allow write: if request.auth != null &&
                     request.auth.token.email_verified == true &&
                     request.auth.token.email == "ash1sh.1hakur10@gmail.com";
    }

    match /projects/{projectId} {
      allow read: if true;
      allow write: if request.auth != null &&
                     request.auth.token.email_verified == true &&
                     request.auth.token.email == "ash1sh.1hakur10@gmail.com";
    }

    match /{document=**} {
      allow read: if true;
      allow write: if request.auth != null &&
                     request.auth.token.email_verified == true &&
                     request.auth.token.email == "ash1sh.1hakur10@gmail.com";
    }
  }
}
```

**Option B: Development/Testing Rules (Use temporarily if having issues)**

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

### 5. Deploy Commands

**Option A: Automatic Deployment (Recommended)**

- Push to your `main` branch
- GitHub Actions will automatically build and deploy

**Option B: Manual Deployment**

```bash
# Build the project
npm run build

# Deploy to GitHub Pages
npm run deploy
```

### 6. Your Deployed URLs

- **GitHub Pages**: https://ashish73653.github.io/MyPortfolioReact/
- **Repository**: https://github.com/Ashish73653/MyPortfolioReact

### 7. Testing Admin Mode

1. Visit your deployed site
2. Add `?admin=true` to the URL: `https://ashish73653.github.io/MyPortfolioReact/?admin=true`
3. Click "Login as Admin"
4. Authenticate with Google using `ash1sh.1hakur10@gmail.com`
5. You should now have admin capabilities

## Troubleshooting

### Environment Variables Not Loading

- Double-check all repository secrets are set correctly
- Ensure secret names match exactly (case-sensitive)
- Trigger a new deployment after adding secrets

### Firebase Auth Error

- Verify your GitHub Pages domain is in Firebase authorized domains
- Check that your Firebase project ID matches in environment variables
- Ensure you're using the correct admin email

### Firestore Permission Denied

- Update Firestore security rules to allow admin write access
- Verify you're authenticated with the correct admin email
- Check Firebase project permissions

## Next Steps

1. Set up custom domain (optional)
2. Enable Firebase hosting (alternative)
3. Set up monitoring and analytics
