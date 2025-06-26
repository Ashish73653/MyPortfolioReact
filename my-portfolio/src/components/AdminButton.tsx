import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";

interface AdminButtonProps {
  onAdminModeToggle: (isAdmin: boolean) => void;
}

export default function AdminButton({ onAdminModeToggle }: AdminButtonProps) {
  const { user, isAdmin, signInWithGoogle, logout } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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
      className={`fixed z-50 admin-button-container ${
        isMobile 
          ? 'top-2 right-2' 
          : 'top-4 right-4 sm:top-6 sm:right-6'
      }`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      style={{
        // Safe area for mobile devices (notch/dynamic island)
        ...(isMobile && {
          top: 'max(0.5rem, env(safe-area-inset-top, 0.5rem))',
          right: 'max(0.5rem, env(safe-area-inset-right, 0.5rem))'
        })
      }}
    >
      {/* Mobile: Show minimized button when not authenticated or when minimized */}
      {isMobile && !user && !isMinimized ? (
        <motion.button
          onClick={() => setIsMinimized(!isMinimized)}
          className="p-2 rounded-full bg-blue-500/80 text-white backdrop-blur-md shadow-lg border border-blue-400/30"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <span className="text-sm">🔐</span>
        </motion.button>
      ) : (
        <motion.div
          layout
          className={isMobile ? 'scale-90' : ''}
        >
          <motion.button
            onClick={handleAuthAction}
            disabled={isLoading}
            className={`px-3 py-2 sm:px-4 sm:py-2 rounded-xl font-semibold shadow-lg backdrop-blur-md border transition-all duration-300 text-xs sm:text-sm ${
              isAdmin
                ? "bg-gradient-to-r from-red-500 to-pink-500 text-white border-red-400/30"
                : user
                ? "bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-yellow-400/30"
                : "bg-gradient-to-r from-blue-500 to-purple-500 text-white border-blue-400/30"
            } disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-xl`}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="flex items-center gap-1 sm:gap-2">
              {isLoading ? (
                <>
                  <motion.div
                    className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-white border-t-transparent rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                  <span className="text-xs sm:text-sm hidden sm:inline">Loading...</span>
                </>
              ) : isAdmin ? (
                <>
                  <span className="text-sm sm:text-base">🔓</span>
                  <span className="text-xs sm:text-sm hidden sm:inline">Admin Mode</span>
                </>
              ) : user ? (
                <>
                  <span className="text-sm sm:text-base">⚠️</span>
                  <span className="text-xs sm:text-sm hidden sm:inline">Not Admin</span>
                </>
              ) : (
                <>
                  <span className="text-sm sm:text-base">🔐</span>
                  <span className="text-xs sm:text-sm hidden sm:inline">Admin Login</span>
                </>
              )}
            </div>
          </motion.button>

          {/* User info tooltip */}
          {user && (
            <motion.div
              className="absolute top-full right-0 mt-2 p-3 bg-white/95 dark:bg-gray-800/95 backdrop-blur-lg rounded-xl shadow-xl border border-white/30 dark:border-gray-700/30 min-w-48 max-w-xs sm:max-w-sm"
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
      )}
    </motion.div>
  );
}
