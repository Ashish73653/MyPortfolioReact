import { motion } from "framer-motion";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

interface AdminButtonProps {
  onAdminModeToggle: (isAdmin: boolean) => void;
}

export default function AdminButton({ onAdminModeToggle }: AdminButtonProps) {
  const { user, isAdmin, signInWithGoogle, logout } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleAuthAction = async () => {
    setIsLoading(true);
    try {
      if (user) {
        await logout();
        onAdminModeToggle(false);
      } else {
        await signInWithGoogle();
        // onAdminModeToggle will be called when auth state changes
      }
    } catch (error) {
      console.error('Authentication error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Auto-toggle admin mode when admin status changes
  useState(() => {
    onAdminModeToggle(isAdmin);
  });

  return (
    <motion.div
      className="fixed top-4 right-4 z-50"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <motion.button
        onClick={handleAuthAction}
        disabled={isLoading}
        className={`px-4 py-2 rounded-xl font-semibold shadow-lg backdrop-blur-md border transition-all duration-300 ${
          isAdmin
            ? "bg-gradient-to-r from-red-500 to-pink-500 text-white border-red-400/30"
            : user
            ? "bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-yellow-400/30"
            : "bg-gradient-to-r from-blue-500 to-purple-500 text-white border-blue-400/30"
        } disabled:opacity-50 disabled:cursor-not-allowed`}
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="flex items-center gap-2">
          {isLoading ? (
            <>
              <motion.div
                className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
              <span className="text-sm">Loading...</span>
            </>
          ) : isAdmin ? (
            <>
              <span>🔓</span>
              <span className="text-sm">Admin Mode</span>
            </>
          ) : user ? (
            <>
              <span>⚠️</span>
              <span className="text-sm">Not Admin</span>
            </>
          ) : (
            <>
              <span>🔐</span>
              <span className="text-sm">Admin Login</span>
            </>
          )}
        </div>
      </motion.button>

      {/* User info tooltip */}
      {user && (
        <motion.div
          className="absolute top-full right-0 mt-2 p-3 bg-white/95 dark:bg-gray-800/95 backdrop-blur-lg rounded-xl shadow-xl border border-white/30 dark:border-gray-700/30 min-w-48"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center gap-3">
            {user.photoURL && (
              <img
                src={user.photoURL}
                alt="Profile"
                className="w-8 h-8 rounded-full"
              />
            )}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                {user.displayName}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                {user.email}
              </p>
            </div>
          </div>
          {isAdmin && (
            <div className="mt-2 px-2 py-1 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <p className="text-xs text-green-800 dark:text-green-300 font-medium">
                ✅ Admin Access Granted
              </p>
            </div>
          )}
        </motion.div>
      )}
    </motion.div>
  );
}
