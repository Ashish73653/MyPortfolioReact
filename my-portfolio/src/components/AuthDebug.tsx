import { useAuth } from "../contexts/AuthContext";
import { useEffect } from "react";
import { auth } from "../config/firebase";

export default function AuthDebug() {
  const { user, isAdmin } = useAuth();

  useEffect(() => {
    console.log('=== AUTH DEBUG COMPONENT ===');
    console.log('User from context:', user);
    console.log('User email:', user?.email);
    console.log('Is Admin:', isAdmin);
    console.log('Auth current user:', auth.currentUser);
    console.log('Admin email env:', import.meta.env.VITE_ADMIN_EMAIL);
    
    // Test ID token
    if (auth.currentUser) {
      auth.currentUser.getIdToken().then((token: string) => {
        console.log('ID Token (first 50 chars):', token.substring(0, 50) + '...');
      }).catch((error: any) => {
        console.error('Error getting ID token:', error);
      });
    }
  }, [user, isAdmin]);

  if (!user) {
    return (
      <div className="fixed top-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded z-50">
        <strong>Auth Debug:</strong> Not signed in
        <button 
          onClick={() => console.log('Current auth state:', { user, isAdmin, authUser: auth.currentUser })}
          className="ml-2 text-xs bg-red-500 text-white px-2 py-1 rounded"
        >
          Log State
        </button>
      </div>
    );
  }

  return (
    <div className="fixed top-4 right-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded z-50 max-w-md">
      <strong>Auth Debug:</strong>
      <div className="text-xs mt-1">
        <div>Email: {user.email}</div>
        <div>Admin: {isAdmin ? 'Yes' : 'No'}</div>
        <div>UID: {user.uid?.substring(0, 10)}...</div>
      </div>
      <button 
        onClick={() => console.log('Full auth state:', { user, isAdmin, authUser: auth.currentUser })}
        className="mt-2 text-xs bg-green-500 text-white px-2 py-1 rounded"
      >
        Log Full State
      </button>
    </div>
  );
}
