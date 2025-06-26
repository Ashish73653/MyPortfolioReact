# Firestore Security Rules Setup

## Problem

You're getting "Missing or insufficient permissions" errors when trying to add/edit/delete skills and projects. This is because Firestore security rules are blocking write operations.

## Solution

### Option 1: Development Mode (Quick Fix - Less Secure)

For development and testing, you can use more permissive rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read/write access to all documents for authenticated users
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

### Option 2: Production Mode (Recommended - More Secure)

For production with admin-only write access:

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

## How to Update Firestore Rules

### Method 1: Firebase Console (Recommended)

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project (`portfolio-ee38a`)
3. Navigate to **Firestore Database** in the left sidebar
4. Click on the **Rules** tab
5. Replace the existing rules with one of the options above
6. Click **Publish** to save the changes

### Method 2: Firebase CLI

If you have Firebase CLI installed:

```bash
# Install Firebase CLI if not already installed
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize Firebase in your project (if not already done)
firebase init firestore

# Edit firestore.rules file and then deploy
firebase deploy --only firestore:rules
```

## Current Issue Analysis

Based on the error logs, your current rules are likely either:

1. Set to deny all writes
2. Set to require authentication but the auth token is not being properly validated
3. Set to production mode but your email is not matching the admin email

## Testing Authentication

To verify your authentication is working:

1. Open browser developer tools
2. Go to Console tab
3. Check if you see successful Google sign-in logs
4. Verify your email matches the admin email in the config

## Immediate Action Required

1. **Go to Firebase Console → Firestore → Rules**
2. **Use Option 1 (Development Mode) temporarily** to get things working
3. **After confirming everything works, switch to Option 2 (Production Mode)**

## Security Note

- Option 1 allows any authenticated user to read/write
- Option 2 only allows your specific admin email to write
- Always use Option 2 for production deployments
