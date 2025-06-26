import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";

const SIDEBAR_WIDTH_OPEN = 220;
const SIDEBAR_WIDTH_CLOSED = 56;

const navLinks = [
  { to: "/", label: "About", icon: "👤", color: "from-purple-500 to-purple-700", hoverColor: "hover:bg-purple-500/20", activeColor: "bg-purple-500/30 border-purple-400" },
  { to: "/resume", label: "Resume", icon: "📄", color: "from-blue-500 to-blue-700", hoverColor: "hover:bg-blue-500/20", activeColor: "bg-blue-500/30 border-blue-400" },
  { to: "/github", label: "Github Repos", icon: "💻", color: "from-green-500 to-green-700", hoverColor: "hover:bg-green-500/20", activeColor: "bg-green-500/30 border-green-400" },
  { to: "/skills", label: "Skills", icon: "🛠️", color: "from-orange-500 to-orange-700", hoverColor: "hover:bg-orange-500/20", activeColor: "bg-orange-500/30 border-orange-400" },
  { to: "/projects", label: "Projects", icon: "📁", color: "from-cyan-500 to-cyan-700", hoverColor: "hover:bg-cyan-500/20", activeColor: "bg-cyan-500/30 border-cyan-400" },
  { to: "/contact", label: "Contact", icon: "✉️", color: "from-pink-500 to-pink-700", hoverColor: "hover:bg-pink-500/20", activeColor: "bg-pink-500/30 border-pink-400" },
];

export default function Sidebar({
  isOpen,
  toggleSidebar,
  closeSidebar,
  animationConfig,
}: {
  isOpen: boolean;
  toggleSidebar: () => void;
  closeSidebar?: () => void;
  animationConfig?: {
    type: "spring";
    stiffness: number;
    damping: number;
    mass: number;
  };
}) {
  const location = useLocation();

  // Use provided animation config or fallback to default
  const transition = animationConfig || { type: "spring", stiffness: 250, damping: 30 };

  // Check if mobile
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  // Handle navigation link click
  const handleNavClick = () => {
    if (isMobile && closeSidebar) {
      closeSidebar();
    }
  };

  return (
    <motion.aside
      initial={false}
      animate={{
        width: isMobile ? SIDEBAR_WIDTH_OPEN : (isOpen ? SIDEBAR_WIDTH_OPEN : SIDEBAR_WIDTH_CLOSED),
        x: isMobile ? (isOpen ? 0 : -SIDEBAR_WIDTH_OPEN) : 0,
      }}
      transition={transition}
      className="h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white fixed left-0 top-0 z-30 flex flex-col shadow-2xl border-r border-gray-700/50 overflow-hidden backdrop-blur-xl"
      style={{ willChange: "width, transform", overflowX: "hidden", maxWidth: isMobile ? SIDEBAR_WIDTH_OPEN : (isOpen ? SIDEBAR_WIDTH_OPEN : SIDEBAR_WIDTH_CLOSED) }}
    >
      {/* Decorative top accent */}
      <div className="h-1 bg-gradient-to-r from-purple-500 via-blue-500 via-green-500 via-orange-500 via-cyan-500 to-pink-500"></div>
      
      {/* Header section */}
      <div className="p-2 border-b border-gray-700/50">
        {/* Toggle button for desktop */}
        {!isMobile && (
          <motion.button
            onClick={toggleSidebar}
            className="w-full p-2 rounded-xl bg-gradient-to-r from-gray-800 to-gray-700 hover:from-gray-700 hover:to-gray-600 transition-all duration-300 shadow-lg hover:shadow-xl group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            aria-label="Toggle Sidebar"
          >
            <motion.div
              animate={{ rotate: isOpen ? 0 : 180 }}
              transition={{ duration: 0.3 }}
              className="flex items-center justify-center"
            >
              {isOpen ? (
                <div className="flex items-center gap-2">
                  <span className="text-xl">🎯</span>
                  <span className="font-semibold text-gray-200 group-hover:text-white transition-colors text-sm">Portfolio</span>
                </div>
              ) : (
                <span className="text-2xl">☰</span>
              )}
            </motion.div>
          </motion.button>
        )}
        
        {/* Close button for mobile */}
        {isMobile && (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xl">🎯</span>
              <span className="font-bold text-lg bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Portfolio</span>
            </div>
            <motion.button
              onClick={toggleSidebar}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all duration-200 group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Close Sidebar"
            >
              <svg 
                className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M6 18L18 6M6 6l12 12" 
                />
              </svg>
            </motion.button>
          </div>
        )}
      </div>
      
      {/* Navigation Links */}
      <nav className="flex-1 flex flex-col gap-1 p-1.5 overflow-y-auto overflow-x-hidden">
        {navLinks.map((link, index) => {
          const isActive = location.pathname === link.to;
          
          return (
            <motion.div
              key={link.to}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                to={link.to}
                onClick={handleNavClick}
                className={`relative group flex items-center gap-2 p-1.5 rounded-xl transition-all duration-300 border border-transparent ${
                  isActive
                    ? `${link.activeColor} border-l-4 shadow-lg transform scale-[1.02]`
                    : `${link.hoverColor} hover:transform hover:scale-[1.02] hover:shadow-md`
                } ${!isOpen && !isMobile ? 'justify-center' : ''}`}
              >
                {/* Icon container with gradient background when closed */}
                <motion.div
                  className={`relative flex items-center justify-center transition-all duration-300 ${
                    !isOpen && !isMobile 
                      ? "w-9 h-9 rounded-xl bg-gradient-to-br shadow-lg" 
                      : "w-5 h-5"
                  } ${!isOpen && !isMobile ? link.color : ""}`}
                  animate={{
                    scale: !isOpen && !isMobile ? 1.15 : 1,
                    y: !isOpen && !isMobile ? [0, -2, 0] : 0,
                  }}
                  whileHover={{
                    scale: !isOpen && !isMobile ? 1.6 : 1.05,
                    rotate: !isOpen && !isMobile ? [0, 15, -15, 10, -10, 0] : 0,
                    y: !isOpen && !isMobile ? -8 : 0,
                    boxShadow: !isOpen && !isMobile ? "0 20px 40px rgba(0,0,0,0.6)" : "none",
                  }}
                  whileTap={{
                    scale: !isOpen && !isMobile ? 1.8 : 0.95,
                    rotate: !isOpen && !isMobile ? [0, -25, 25, -15, 15, 0] : 0,
                    y: !isOpen && !isMobile ? -12 : 0,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 20,
                    mass: 0.8,
                    y: {
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    },
                    rotate: {
                      duration: 0.6,
                      ease: "easeInOut",
                    }
                  }}
                >
                  <motion.span 
                    className={`transition-all duration-300 ${
                      !isOpen && !isMobile ? "text-2xl" : "text-base"
                    } ${isActive ? "animate-pulse" : ""}`}
                    animate={{
                      rotate: !isOpen && !isMobile && isActive ? [0, 5, -5, 0] : 0,
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    {link.icon}
                  </motion.span>
                  
                  {/* Animated border ring */}
                  {!isOpen && !isMobile && (
                    <motion.div
                      className="absolute inset-0 rounded-xl border-2 border-white/20"
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.8, 0.3],
                        rotate: [0, 180, 360],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                  )}
                  
                  {/* Glowing effect for active item when closed */}
                  {isActive && !isOpen && !isMobile && (
                    <>
                      <motion.div
                        className="absolute inset-0 rounded-xl bg-gradient-to-br opacity-40 blur-sm"
                        style={{ background: `linear-gradient(135deg, ${link.color.split(' ')[1]}, ${link.color.split(' ')[3]})` }}
                        animate={{ 
                          opacity: [0.4, 0.8, 0.4],
                          scale: [1, 1.1, 1],
                        }}
                        transition={{ 
                          duration: 2, 
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                      {/* Extra glow layer */}
                      <motion.div
                        className="absolute -inset-1 rounded-xl opacity-60 blur-md"
                        style={{ background: `linear-gradient(135deg, ${link.color.split(' ')[1]}, ${link.color.split(' ')[3]})` }}
                        animate={{ 
                          opacity: [0.2, 0.6, 0.2],
                          scale: [1, 1.2, 1],
                        }}
                        transition={{ 
                          duration: 3, 
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: 0.5
                        }}
                      />
                    </>
                  )}
                  
                  {/* Floating particles effect */}
                  {!isOpen && !isMobile && (
                    <>
                      {[...Array(3)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-1 h-1 rounded-full bg-white/40"
                          style={{
                            top: `${20 + i * 20}%`,
                            left: `${20 + i * 20}%`,
                          }}
                          animate={{
                            y: [-10, -20, -10],
                            x: [0, 5, 0],
                            opacity: [0, 1, 0],
                            scale: [0, 1, 0],
                          }}
                          transition={{
                            duration: 2 + i * 0.5,
                            repeat: Infinity,
                            delay: i * 0.3,
                            ease: "easeInOut",
                          }}
                        />
                      ))}
                    </>
                  )}
                  
                  {/* Hover glow effect */}
                  <motion.div
                    className={`absolute -inset-2 rounded-xl opacity-0 blur-lg group-hover:opacity-100 transition-all duration-300 ${
                      !isOpen && !isMobile ? 'block' : 'hidden'
                    }`}
                    style={{
                      background: !isOpen && !isMobile ? `linear-gradient(135deg, ${link.color.split(' ')[1]}, ${link.color.split(' ')[3]})` : 'transparent'
                    }}
                  />
                  
                  {/* Extra intense hover glow */}
                  <motion.div
                    className={`absolute -inset-4 rounded-xl opacity-0 blur-2xl group-hover:opacity-70 transition-all duration-500 ${
                      !isOpen && !isMobile ? 'block' : 'hidden'
                    }`}
                    style={{
                      background: !isOpen && !isMobile ? `radial-gradient(circle, ${link.color.split(' ')[1]}, ${link.color.split(' ')[3]}, transparent)` : 'transparent'
                    }}
                  />
                </motion.div>

                {/* Label with smooth animation */}
                <motion.div
                  initial={false}
                  animate={{
                    opacity: (isOpen || isMobile) ? 1 : 0,
                    width: (isOpen || isMobile) ? "auto" : 0,
                    marginLeft: (isOpen || isMobile) ? 0 : -16,
                  }}
                  transition={{ 
                    duration: 0.2,
                    ease: "easeInOut"
                  }}
                  className="overflow-hidden"
                >
                  <span className={`font-medium whitespace-nowrap transition-all duration-300 ${
                    isActive 
                      ? "text-white font-semibold" 
                      : "text-gray-300 group-hover:text-white"
                  }`}>
                    {link.label}
                  </span>
                </motion.div>

                {/* Active indicator line */}
                {isActive && (isOpen || isMobile) && (
                  <motion.div
                    className="absolute right-2 w-2 h-2 rounded-full bg-white shadow-lg"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  />
                )}

                {/* Hover ripple effect */}
                <motion.div
                  className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: `radial-gradient(circle at center, ${link.color.includes('purple') ? 'rgba(168, 85, 247, 0.1)' : 
                      link.color.includes('blue') ? 'rgba(59, 130, 246, 0.1)' :
                      link.color.includes('green') ? 'rgba(34, 197, 94, 0.1)' :
                      link.color.includes('orange') ? 'rgba(249, 115, 22, 0.1)' :
                      link.color.includes('cyan') ? 'rgba(6, 182, 212, 0.1)' :
                      'rgba(236, 72, 153, 0.1)'} 0%, transparent 70%)`
                  }}
                />
              </Link>
            </motion.div>
          );
        })}
      </nav>

      {/* Footer with version or additional info */}
      <motion.div 
        className="p-2 border-t border-gray-700/50"
        initial={false}
        animate={{
          opacity: (isOpen || isMobile) ? 1 : 0,
        }}
        transition={{ duration: 0.2 }}
      >
        {(isOpen || isMobile) && (
          <div className="text-center">
            <p className="text-xs text-gray-400 mb-1">Portfolio v2.0</p>
            <div className="flex justify-center gap-1">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-1 h-1 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity, 
                    delay: i * 0.2,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </motion.aside>
  );
}