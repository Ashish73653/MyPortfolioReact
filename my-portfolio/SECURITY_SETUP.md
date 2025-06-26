# 🔐 Firebase Security Setup for Your Portfolio

## Quick Setup Steps:

### 1. **Set up Firestore Rules (Important!)**

Go to your [Firebase Console](https://console.firebase.google.com/project/portfolio-ee38a/firestore/rules) and replace the default rules with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read access to skills and projects for everyone
    match /skills/{document} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.token.email == 'as4797singh@gmail.com';
    }

    match /projects/{document} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.token.email == 'as4797singh@gmail.com';
    }
  }
}
```

### 2. **Enable Google Authentication**

1. Go to [Authentication > Sign-in method](https://console.firebase.google.com/project/portfolio-ee38a/authentication/providers)
2. Click on **Google** provider
3. **Enable** Google sign-in
4. Add your domain to **Authorized domains** (localhost should already be there)
5. **Save** the configuration

### 3. **Test Admin Mode**

1. **Visit your portfolio**: http://localhost:5173
2. **Navigate to Skills or Projects page**
3. **Click the Admin button** (top-right corner)
4. **Sign in with Google** using `as4797singh@gmail.com`
5. **Start adding skills/projects!**

## 🔒 Security Features:

✅ **Your `.env` file is protected** - It's in `.gitignore` so it won't be pushed to GitHub
✅ **Only your email can access admin mode** - `as4797singh@gmail.com`
✅ **Public can view content** - Everyone can see your skills/projects
✅ **Admin-only editing** - Only you can add/edit/delete content
✅ **Real-time updates** - Changes appear instantly for all visitors

## 🚀 Ready to Use!

Your portfolio now has:

- **Dynamic Skills Management** - Add/edit/delete skills with categories, levels, icons
- **Dynamic Projects Management** - Add/edit/delete projects with images, technologies, links
- **Secure Admin Access** - Only you can manage content
- **Beautiful UI** - Consistent with your existing design
- **Mobile Responsive** - Works perfectly on all devices

## 📝 Next Steps:

1. Set up the Firestore rules above
2. Enable Google Auth
3. Test admin functionality
4. Start adding your real skills and projects!
5. Deploy to production when ready

Your Firebase project is now configured and ready to use! 🎉
