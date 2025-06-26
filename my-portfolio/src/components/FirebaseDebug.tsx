import { useAuth } from "../contexts/AuthContext";
import { auth } from "../config/firebase";
import { useState } from "react";

export default function FirebaseDebug() {
  const { user, isAdmin } = useAuth();
  const [showDebug, setShowDebug] = useState(false);

  if (!showDebug) {
    return (
      <button
        onClick={() => setShowDebug(true)}
        className="fixed bottom-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg z-50"
      >
        Debug Firebase 🔍
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 bg-white border border-gray-300 rounded-lg shadow-lg p-4 max-w-sm z-50">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-bold text-gray-800">Firebase Debug</h3>
        <button 
          onClick={() => setShowDebug(false)}
          className="text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
      </div>
      
      <div className="text-sm space-y-1">
        <div>
          <strong>Auth Status:</strong> {user ? '✅ Signed In' : '❌ Not Signed In'}
        </div>
        
        {user && (
          <>
            <div>
              <strong>Email:</strong> {user.email}
            </div>
            <div>
              <strong>Admin:</strong> {isAdmin ? '✅ Yes' : '❌ No'}
            </div>
            <div>
              <strong>UID:</strong> {user.uid?.substring(0, 8)}...
            </div>
          </>
        )}
        
        <div className="mt-3 pt-2 border-t">
          <strong>Expected Admin:</strong>
          <div className="text-xs text-gray-600">
            ash1sh.1hakur10@gmail.com
          </div>
        </div>
        
        <div className="mt-2">
          <button
            onClick={() => {
              console.log('=== FIREBASE DEBUG ===');
              console.log('User:', user);
              console.log('Is Admin:', isAdmin);
              console.log('Auth User:', auth.currentUser);
              console.log('Expected Admin Email:', "ash1sh.1hakur10@gmail.com");
              if (auth.currentUser) {
                auth.currentUser.getIdToken().then(token => {
                  console.log('ID Token (first 100 chars):', token.substring(0, 100) + '...');
                }).catch(err => console.error('Token error:', err));
              }
            }}
            className="w-full bg-blue-500 text-white px-2 py-1 rounded text-xs"
          >
            Log to Console
          </button>
        </div>
      </div>
    </div>
  );
}
