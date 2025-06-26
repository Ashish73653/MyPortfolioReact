import type { ReactNode } from "react";
import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import { motion } from "framer-motion";

const SIDEBAR_WIDTH_OPEN = 220;
const SIDEBAR_WIDTH_CLOSED = 56;

// Helper hook for mobile detection (for perfect reactivity)
function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(
    typeof window !== "undefined" ? window.innerWidth >= 768 : false
  );
  useEffect(() => {
    const handler = () => setIsDesktop(window.innerWidth >= 768);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);
  return isDesktop;
}

export default function Layout({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isDesktop = useIsDesktop();
  const sidebarWidth = isDesktop
    ? (sidebarOpen ? SIDEBAR_WIDTH_OPEN : SIDEBAR_WIDTH_CLOSED)
    : 0;

  const animationConfig = {
    type: "spring" as const,
    stiffness: 400,
    damping: 35,
    mass: 0.6,
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-light dark:bg-dark">
      {/* Sidebar */}
      <Sidebar 
        isOpen={sidebarOpen} 
        toggleSidebar={() => setSidebarOpen(o => !o)}
        closeSidebar={() => setSidebarOpen(false)}
        animationConfig={animationConfig}
      />

      {/* Overlay for mobile: covers content while sidebar is open */}
      {!isDesktop && sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-20 bg-black bg-opacity-40 backdrop-blur-sm md:hidden"
        />
      )}

      {/* Main content area */}
      <motion.main
        animate={{ 
          marginLeft: isDesktop ? sidebarWidth : 0,
          width: isDesktop ? `calc(100vw - ${sidebarWidth}px)` : "100vw"
        }}
        transition={animationConfig}
        className="bg-light dark:bg-dark overflow-x-hidden overflow-y-auto min-h-screen relative"
        style={{ 
          willChange: "margin-left, width", 
          zIndex: 10
        }}
      >
        {/* Mobile menu button - centered on left edge */}
        {!sidebarOpen && (
          <button
            className="md:hidden fixed left-0 top-1/2 -translate-y-1/2 z-50 p-3 bg-blue-600/30 hover:bg-blue-700/50 backdrop-blur-sm text-white rounded-r-lg shadow-lg transition-all duration-300 hover:translate-x-1"
            aria-label="Open Sidebar"
            onClick={() => setSidebarOpen(true)}
          >
            <svg 
              className="w-5 h-5" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M9 5l7 7-7 7" 
              />
            </svg>
          </button>
        )}
        <div className="h-full overflow-x-hidden">
          {children}
        </div>
      </motion.main>
    </div>
  );
}