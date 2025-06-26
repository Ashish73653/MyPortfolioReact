import { motion } from "framer-motion";
import { useState } from "react";
import profileImage from "../assets/IMG-20241015-WA0043copy-removebg-preview.png";

export default function About() {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  const skills = [
    { name: "Java", color: "from-orange-400 to-red-600", level: 88 },
    { name: "SQL", color: "from-blue-400 to-cyan-600", level: 85 },
    { name: "AWS", color: "from-yellow-400 to-orange-500", level: 80 },
    { name: "React", color: "from-blue-400 to-blue-600", level: 95 },
    { name: "TypeScript", color: "from-blue-500 to-indigo-600", level: 90 },
    { name: "Node.js", color: "from-green-400 to-green-600", level: 85 },
  ];

  const socialLinks = [
    { 
      name: "GitHub", 
      icon: "🐙", 
      url: "https://github.com/Ashish73653", 
      color: "hover:bg-gray-800", 
      description: "Check out my code" 
    },
    { 
      name: "LinkedIn", 
      icon: "💼", 
      url: "https://www.linkedin.com/in/ashish-singh-1771091a5/", 
      color: "hover:bg-blue-600", 
      description: "Let's connect professionally" 
    },
    { 
      name: "Twitter", 
      icon: "🐦", 
      url: "#", 
      color: "hover:bg-sky-500", 
      description: "Follow my thoughts" 
    },
    { 
      name: "Email", 
      icon: "📧", 
      url: "mailto:ash1sh.1hakur10@email.com", 
      color: "hover:bg-red-500", 
      description: "Drop me a message" 
    },
  ];

  return (
    <motion.div
      className="min-h-screen relative p-4 sm:p-6 overflow-x-hidden"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Enhanced animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-1 h-1 rounded-full ${
              i % 4 === 0 
                ? "bg-blue-400/40" 
                : i % 4 === 1 
                ? "bg-purple-400/40" 
                : i % 4 === 2
                ? "bg-pink-400/40"
                : "bg-indigo-400/40"
            }`}
            animate={{
              x: [0, 200, 0],
              y: [0, -150, 0],
              scale: [1, 2.5, 1],
              opacity: [0.2, 0.8, 0.2],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 10 + i * 1.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.8,
            }}
            style={{
              left: `${3 + i * 6}%`,
              top: `${5 + (i * 6)}%`,
            }}
          />
        ))}
      </div>

      {/* Floating gradient orbs */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={`orb-${i}`}
          className={`absolute w-40 h-40 rounded-full opacity-20 ${
            i === 0
              ? "bg-gradient-to-r from-blue-400 to-purple-500"
              : i === 1
              ? "bg-gradient-to-r from-purple-400 to-pink-500"
              : i === 2
              ? "bg-gradient-to-r from-pink-400 to-blue-500"
              : "bg-gradient-to-r from-indigo-400 to-purple-500"
          }`}
          animate={{
            x: [0, 60, 0],
            y: [0, -60, 0],
            scale: [1, 1.2, 1],
            rotate: [0, 360],
          }}
          transition={{
            duration: 18 + i * 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 2,
          }}
          style={{
            right: `${10 + i * 15}%`,
            bottom: `${20 + i * 8}%`,
            filter: "blur(50px)",
          }}
        />
      ))}

      {/* Main content optimized for viewport */}
      <div className="relative z-10 max-w-6xl mx-auto px-3 sm:px-4 lg:px-6">
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 lg:items-center min-h-screen py-4 lg:py-6">
          
          {/* Left side - Profile Image & Visual Elements */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-col items-center space-y-4 lg:space-y-6"
          >
            {/* Profile Image with Enhanced Interactive Elements */}
            <div className="relative flex justify-center w-full">
              <motion.div
                className="relative w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64 rounded-3xl overflow-hidden"
                whileHover={{ 
                  scale: 1.08, 
                  rotateY: 8,
                  rotateX: 3,
                }}
                transition={{ 
                  type: "spring", 
                  stiffness: 150, 
                  damping: 20 
                }}
                style={{
                  transformStyle: "preserve-3d",
                }}
              >
                {/* Your actual photo */}
                <motion.img
                  src={profileImage}
                  alt="Profile"
                  className="w-full h-full object-contain"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />

                {/* Overlay gradient for better text visibility on floating badges */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"
                  animate={{ 
                    opacity: [0.2, 0.4, 0.2]
                  }}
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                />

                {/* Animated overlay patterns */}
                <motion.div
                  className="absolute inset-0 opacity-20"
                  animate={{
                    background: [
                      "radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.3) 2px, transparent 2px)",
                      "radial-gradient(circle at 80% 50%, rgba(139, 92, 246, 0.3) 2px, transparent 2px)",
                      "radial-gradient(circle at 50% 20%, rgba(236, 72, 153, 0.3) 2px, transparent 2px)",
                      "radial-gradient(circle at 50% 80%, rgba(59, 130, 246, 0.3) 2px, transparent 2px)",
                    ]
                  }}
                  transition={{ duration: 12, repeat: Infinity }}
                />

                {/* Subtle scanning line effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-b from-transparent via-white/10 to-transparent h-8"
                  animate={{
                    y: ["-100%", "100%"],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "linear",
                    repeatDelay: 4,
                  }}
                />
                
                {/* Enhanced floating skill badges around image */}
                {skills.slice(0, 4).map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    className="absolute px-3 py-1.5 bg-white/95 backdrop-blur-md rounded-full text-xs font-semibold shadow-2xl border border-white/40"
                    style={{
                      top: `${12 + index * 20}%`,
                      right: index % 2 === 0 ? "5%" : "auto",
                      left: index % 2 === 1 ? "5%" : "auto",
                      zIndex: 10,
                    }}
                    animate={{
                      y: [-15, 15, -15],
                      rotate: [-5, 5, -5],
                      scale: [0.9, 1.1, 0.9],
                    }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    whileHover={{ 
                      scale: 1.3, 
                      rotate: 0,
                      y: -20,
                      boxShadow: "0 30px 60px rgba(0,0,0,0.25)",
                      zIndex: 30,
                    }}
                  >
                    <span className={`bg-gradient-to-r ${skill.color} bg-clip-text text-transparent font-bold`}>
                      {skill.name}
                    </span>
                  </motion.div>
                ))}
              </motion.div>

              {/* Multiple enhanced decorative rings */}
              <motion.div
                className="absolute -inset-6 border-2 border-blue-300/60 rounded-full"
                animate={{ 
                  rotate: 360, 
                  scale: [1, 1.1, 1],
                  borderColor: [
                    "rgba(147, 197, 253, 0.6)",
                    "rgba(167, 139, 250, 0.6)",
                    "rgba(244, 114, 182, 0.6)",
                    "rgba(99, 102, 241, 0.6)",
                    "rgba(147, 197, 253, 0.6)"
                  ]
                }}
                transition={{ 
                  rotate: { duration: 25, repeat: Infinity, ease: "linear" },
                  scale: { duration: 5, repeat: Infinity, ease: "easeInOut" },
                  borderColor: { duration: 8, repeat: Infinity, ease: "easeInOut" }
                }}
              />
              <motion.div
                className="absolute -inset-10 border border-purple-300/50 rounded-full"
                animate={{ 
                  rotate: -360, 
                  scale: [1, 0.9, 1],
                  opacity: [0.5, 0.9, 0.5]
                }}
                transition={{ 
                  rotate: { duration: 35, repeat: Infinity, ease: "linear" },
                  scale: { duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 },
                  opacity: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }
                }}
              />
              <motion.div
                className="absolute -inset-14 border border-pink-300/40 rounded-full"
                animate={{ 
                  rotate: 360, 
                  opacity: [0.3, 0.8, 0.3],
                  scale: [1, 1.08, 1]
                }}
                transition={{ 
                  rotate: { duration: 45, repeat: Infinity, ease: "linear" },
                  opacity: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 },
                  scale: { duration: 7, repeat: Infinity, ease: "easeInOut", delay: 3 }
                }}
              />
            </div>

            {/* Enhanced Social Media Links */}
            <motion.div 
              variants={itemVariants}
              className="flex justify-center gap-4"
            >
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  className={`group relative p-3 bg-white/15 backdrop-blur-md rounded-xl ${social.color} transition-all duration-300 border border-white/30 shadow-xl`}
                  whileHover={{ 
                    scale: 1.15, 
                    y: -8,
                    boxShadow: "0 20px 40px rgba(0,0,0,0.2)" 
                  }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    type: "spring",
                    stiffness: 200,
                    damping: 20
                  }}
                >
                  <motion.div 
                    className="text-xl flex items-center justify-center"
                    whileHover={{ 
                      rotate: 10,
                      scale: 1.1
                    }}
                    transition={{ 
                      type: "spring",
                      stiffness: 300,
                      damping: 20
                    }}
                  >
                    {social.icon}
                  </motion.div>
                  
                  {/* Enhanced tooltip with better positioning */}
                  <motion.div
                    className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-gray-900/95 backdrop-blur-md text-white text-sm px-4 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap border border-gray-700/60 shadow-2xl pointer-events-none"
                    initial={{ y: 10, scale: 0.8, opacity: 0 }}
                    whileInView={{ y: 0, scale: 1 }}
                  >
                    <div className="font-semibold text-white">{social.name}</div>
                    <div className="text-gray-300 text-xs">{social.description}</div>
                    {/* Enhanced arrow */}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-3 border-r-3 border-t-3 border-transparent border-t-gray-900/95"></div>
                  </motion.div>
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Right side - Content */}
          <motion.div 
            variants={itemVariants}
            className="space-y-6 lg:space-y-7"
          >
            {/* Intro Section */}
            <div className="space-y-4">
              <motion.div
                variants={itemVariants}
                className="space-y-3"
              >
                <motion.h1 
                  className="text-4xl lg:text-5xl font-bold"
                  initial={{ opacity: 0, x: -60 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1, ease: "easeOut" }}
                >
                  <motion.span 
                    className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
                    animate={{ 
                      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                    }}
                    transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                    style={{ backgroundSize: "200% 200%" }}
                  >
                    Hello!
                  </motion.span>
                </motion.h1>
                
                <motion.h2 
                  className="text-xl lg:text-2xl font-semibold text-gray-700 dark:text-gray-300"
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                >
                  I'm <motion.span 
                    className="text-blue-500"
                    whileHover={{ 
                      scale: 1.08, 
                      color: "#8B5CF6",
                      textShadow: "0 0 20px rgba(139, 92, 246, 0.5)"
                    }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    Ashish Singh
                  </motion.span>
                </motion.h2>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="space-y-3"
              >
                <motion.p 
                  className="text-base lg:text-lg text-gray-600 dark:text-gray-300 leading-relaxed"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  A passionate <motion.span 
                    className="font-semibold text-blue-500 relative"
                    whileHover={{ 
                      scale: 1.08,
                      textShadow: "0 0 20px rgba(59, 130, 246, 0.5)"
                    }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    Full-Stack Developer
                    <motion.div
                      className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-purple-500"
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.span> who 
                  who thrives on building scalable, interactive digital experiences. I bring ideas to life through clean code, thoughtful design, and a strong focus on performance and usability.
                </motion.p>

                <motion.p 
                  className="text-sm lg:text-base text-gray-500 dark:text-gray-400"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  When I’m not coding, I’m exploring emerging technologies, contributing to open-source projects, or sharing insights with the developer community.
                </motion.p>
              </motion.div>
            </div>

            {/* Interactive Skills Section & Fun Facts Side by Side */}
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Skills Section */}
              <motion.div 
                variants={itemVariants}
                className="space-y-4"
              >
                <motion.h3 
                  className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  Skills & Expertise
                </motion.h3>
                
                <div className="space-y-3">
                  {skills.slice(0, 4).map((skill) => (
                    <motion.div
                      key={skill.name}
                      className="relative group"
                      onHoverStart={() => setHoveredSkill(skill.name)}
                      onHoverEnd={() => setHoveredSkill(null)}
                      whileHover={{ x: 8 }}
                      initial={{ opacity: 0, x: -60 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ 
                        duration: 0.6, 
                        type: "spring",
                        stiffness: 200
                      }}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <motion.span 
                          className="font-semibold text-gray-700 dark:text-gray-300 text-base"
                          whileHover={{ scale: 1.05 }}
                        >
                          {skill.name}
                        </motion.span>
                        <motion.span 
                          className="text-xs text-gray-500/70"
                          animate={{ 
                            scale: hoveredSkill === skill.name ? 1.1 : 1,
                            color: hoveredSkill === skill.name ? "#6B7280" : undefined
                          }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          {skill.level}%
                        </motion.span>
                      </div>
                      
                      <div className="h-2.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <motion.div
                          className={`h-full bg-gradient-to-r ${skill.color} rounded-full relative`}
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.level}%` }}
                          transition={{ 
                            duration: 1.5, 
                            ease: "easeOut" 
                          }}
                        >
                          {/* Enhanced shimmer effect */}
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                            animate={hoveredSkill === skill.name ? {
                              x: ["-100%", "100%"]
                            } : {}}
                            transition={{
                              duration: 1.5,
                              repeat: hoveredSkill === skill.name ? Infinity : 0,
                              ease: "linear"
                            }}
                          />
                          
                          {/* Enhanced glow effect */}
                          <motion.div
                            className={`absolute inset-0 bg-gradient-to-r ${skill.color} rounded-full blur-sm opacity-0`}
                            animate={{
                              opacity: hoveredSkill === skill.name ? 0.8 : 0,
                              scale: hoveredSkill === skill.name ? 1.2 : 1
                            }}
                            transition={{ duration: 0.4 }}
                          />
                        </motion.div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Fun Facts */}
              <motion.div 
                variants={itemVariants}
                className="space-y-4"
              >
                <motion.h3 
                  className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  Quick Stats
                </motion.h3>
                
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { number: "10+", label: "Projects", icon: "🚀", color: "from-blue-500 to-purple-500" },
                    { number: "1", label: "Years Exp", icon: "⏰", color: "from-purple-500 to-pink-500" },
                    { number: "∞", label: "Coffee", icon: "☕", color: "from-orange-500 to-red-500" },
                    { number: "24/7", label: "Learning", icon: "🧠", color: "from-green-500 to-blue-500" },
                  ].map((stat) => (
                    <motion.div
                      key={stat.label}
                      className="text-center p-3 bg-gradient-to-br from-white/10 to-white/20 backdrop-blur-md rounded-xl border border-white/20 shadow-lg"
                      whileHover={{ 
                        scale: 1.05, 
                        y: -4,
                        boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
                        backgroundColor: "rgba(59, 130, 246, 0.15)"
                      }}
                      initial={{ opacity: 0, y: 40 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ 
                        type: "spring",
                        stiffness: 150
                      }}
                    >
                      <motion.div 
                        className="text-xl mb-1"
                        animate={{ 
                          rotate: [0, 8, -8, 0],
                          scale: [1, 1.1, 1]
                        }}
                        transition={{ 
                          duration: 3, 
                          repeat: Infinity
                        }}
                      >
                        {stat.icon}
                      </motion.div>
                      <motion.div 
                        className={`text-lg font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-1`}
                        whileHover={{ scale: 1.1 }}
                      >
                        {stat.number}
                      </motion.div>
                      <div className="text-xs text-gray-600 dark:text-gray-400 font-medium">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
