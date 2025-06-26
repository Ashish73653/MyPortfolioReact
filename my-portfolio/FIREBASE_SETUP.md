# Firebase Setup Guide for Portfolio Admin Mode

## 1. Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project"
3. Enter project name (e.g., "my-portfolio-admin")
4. Enable Google Analytics (optional)
5. Create project

## 2. Enable Authentication

1. In Firebase Console, go to **Authentication** > **Sign-in method**
2. Click on **Google** provider
3. Enable Google sign-in
4. Add your domain to authorized domains if hosting elsewhere
5. Save the configuration

## 3. Set up Firestore Database

1. Go to **Firestore Database**
2. Click **Create database**
3. Choose **Start in test mode** (we'll secure it later)
4. Select your preferred location
5. Create database

### Database Structure

The app will automatically create these collections:

```
skills/
  {docId}/
    name: string
    category: string
    level: number
    icon: string
    description?: string
    experience?: string
    createdAt: timestamp
    updatedAt: timestamp

projects/
  {docId}/
    title: string
    description: string
    technologies: string[]
    images: string[]
    liveUrl?: string
    githubUrl?: string
    featured: boolean
    createdAt: timestamp
    updatedAt: timestamp
```

## 4. Get Firebase Configuration

1. Go to **Project settings** (gear icon)
2. Scroll down to **Your apps**
3. Click **Web app** icon (</>) to add a web app
4. Register app with a name
5. Copy the config object

## 5. Update Environment Variables

Update your `.env` file with your Firebase config:

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id

# Admin Configuration
VITE_ADMIN_EMAIL=your_email@gmail.com
```

## 6. Secure Firestore Rules (Production)

Replace the default rules with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read access to skills and projects for everyone
    match /skills/{document} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.token.email == 'your_email@gmail.com';
    }

    match /projects/{document} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.token.email == 'your_email@gmail.com';
    }
  }
}
```

## 7. How to Use Admin Mode

1. **Start the app**: `npm run dev`
2. **Click the Admin button** in the top-right corner
3. **Sign in with Google** using your admin email
4. **Add/Edit Skills**:
   - Navigate to Skills page
   - Click "Add New Skill" button
   - Fill out the form with skill details
   - Skills will be visible to all visitors immediately
5. **Add/Edit Projects**:
   - Navigate to Projects page
   - Click "Add New Project" button
   - Fill out project details including images, links
   - Projects will be visible to all visitors immediately

## 8. Features

### Skills Management

- ✅ Add new skills with categories, levels, icons
- ✅ Edit existing skills
- ✅ Delete skills
- ✅ Real-time updates visible to all users
- ✅ Fallback to static data if Firebase is empty

### Projects Management

- ✅ Add new projects with images, technologies
- ✅ Mark projects as featured
- ✅ Edit existing projects
- ✅ Delete projects
- ✅ Real-time updates visible to all users
- ✅ Fallback to static data if Firebase is empty

### Security

- ✅ Only your Google account can access admin mode
- ✅ Admin controls only visible to authenticated admin
- ✅ Public read access for all visitors
- ✅ Secure Firestore rules

## 9. Troubleshooting

### Common Issues:

1. **"Firebase not configured"**

   - Check your `.env` file has all required variables
   - Restart the dev server after updating `.env`

2. **"Permission denied" errors**

   - Verify your email in `VITE_ADMIN_EMAIL` matches your Google account
   - Check Firestore rules are correctly set

3. **Google Sign-in not working**

   - Ensure Google provider is enabled in Firebase Auth
   - Check if your domain is in authorized domains

4. **Data not updating**
   - Check browser console for errors
   - Verify Firestore rules allow read/write for your account

## 10. Next Steps

- Deploy to production (Vercel, Netlify, etc.)
- Add image upload functionality
- Implement more content sections (About, Resume)
- Add analytics and monitoring
