# URGENT: Fix Firestore Permissions

## The Problem

You're getting "Missing or insufficient permissions" errors because your Firestore security rules are blocking write operations.

## IMMEDIATE SOLUTION - Follow These Steps:

### Step 1: Go to Firebase Console

1. Open your browser and go to: https://console.firebase.google.com/
2. Sign in with your Google account
3. Click on your project: **portfolio-ee38a**

### Step 2: Navigate to Firestore Rules

1. In the left sidebar, click **"Firestore Database"**
2. Click on the **"Rules"** tab (next to "Data")

### Step 3: Replace Your Current Rules

Your current rules probably look like this:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

**REPLACE THEM WITH THIS:**

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow anyone to read skills and projects
    match /skills/{skillId} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.token.email == "ash1sh.1hakur10@gmail.com";
    }

    match /projects/{projectId} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.token.email == "ash1sh.1hakur10@gmail.com";
    }
  }
}
```

### Step 4: Publish the Rules

1. After pasting the new rules, click the **"Publish"** button
2. Wait for the confirmation message

### Step 5: Test Your App

1. Go back to your app: http://localhost:5173
2. Navigate to the Skills page
3. Click the "Debug Firebase 🔍" button (bottom right)
4. Check that you're signed in with: **ash1sh.1hakur10@gmail.com**
5. Try adding/editing/deleting a skill

## Alternative: Quick Test Rules (Less Secure)

If you want to test quickly, you can use these rules temporarily:

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

This allows any authenticated user to read/write. Use this ONLY for testing, then switch back to the secure rules.

## Troubleshooting

### If still not working:

1. Make sure you're signed in with the correct email: **ash1sh.1hakur10@gmail.com**
2. Try signing out and signing back in
3. Check the browser console for any authentication errors
4. Wait 1-2 minutes after updating rules for them to propagate

### Check Authentication Status:

1. Use the debug component (bottom right button)
2. Verify your email matches exactly: **ash1sh.1hakur10@gmail.com**
3. Check that "Admin: ✅ Yes" is shown

## After It's Working:

Once everything works, remove the debug component for production.
