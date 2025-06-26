import { motion } from "framer-motion";
import { useState } from "react";

export default function Resume() {
  const [activeSection, setActiveSection] = useState<string>("experience");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  const experienceData = [
    {
  title: "Student Intern – Home Device Management (HDM)",
  company: "Nokia",
  location: "Bengaluru, India",
  period: "Sep 2022 – Jul 2023",
  description: "Contributed to Nokia's HDM project focusing on TR-069 and SNMP-based device management. Conducted testing and automation tasks while collaborating cross-functionally to ensure reliable network device performance.",
  technologies: ["Linux", "Java", "REST APIs", "Git", "SOAP UI", "SNMP", "TR-069"],
  achievements: [
    "Performed 40+ functional, regression, and black-box tests",
    "Improved product reliability through automated testing workflows",
    "Enhanced collaboration between engineering and documentation teams"
  ]
}
  ];

  const educationData = [
    {
  degree: "Master of Engineering in Computer Science (Cloud Computing)",
  school: "Chandigarh University",
  location: "Punjab, India",
  period: "2024 – Present",
  gpa: "8.74 CGPA",
  highlights: [
    "Studying at Chandigarh University",
    "Specialization in Cloud Computing",
    "Hands-on projects with modern tech stack"
  ]
},
{
  degree: "Bachelor of Technology in Computer Science",
  school: "Chandigarh Engineering College",
  location: "Mohali, India",
  period: "2019 – 2023",
  gpa: "8.06 CGPA",
  highlights: [
    "Graduated from Chandigarh Engineering College",
    "Completed internship at Nokia",
    "Focused on software development and testing"
  ]
},
{
  degree: "10+2",
  school: "Shishu Niketan Model Sr. Sec. School",
  location: "Chandigarh, India",
  period: "2017 – 2019",
  gpa: "77.6%",
  highlights: [
    "Completed Higher Secondary Education in Science stream",
    "Built strong foundation in Physics, Chemistry, and Mathematics",
    "Actively participated in school events and competitions"
  ]
},
{
  degree: "10th",
  school: "Shishu Niketan Model Sr. Sec. School",
  location: "Chandigarh, India",
  period: "2016 – 2017",
  gpa: "9.6 CGPA",
  highlights: [
    "Completed Secondary Education with distinction",
    "Achieved excellent academic performance",
    "Demonstrated early interest in technology and computing"
  ]
}


  ];

  const certificationsData = [
    {
  title: "AWS Certified Cloud Practitioner",
  issuer: "Amazon Web Services",
  issueDate: "Ongoing",
  expiryDate: "—",
  credentialId: "—",
  description: "Pursuing certification to validate foundational knowledge of AWS Cloud concepts, services, and use cases.",
  skills: ["AWS Basics", "Cloud Concepts", "Security", "Billing & Pricing"],
  icon: "☁️",
  color: "from-yellow-400 to-orange-500",
  badgeUrl: "#"
},
{
  title: "Java Certification",
  issuer: "TCL-IT",
  issueDate: "2023",
  expiryDate: "—",
  credentialId: "—",
  description: "Demonstrates foundational and intermediate proficiency in Java programming and software development concepts.",
  skills: ["Java", "OOP", "Core Concepts"],
  icon: "☕",
  color: "from-orange-500 to-red-500",
  badgeUrl: "#"
},
{
  title: "HackerRank Problem Solving & Java",
  issuer: "HackerRank",
  issueDate: "2024",
  expiryDate: "—",
  credentialId: "—",
  description: "Achieved 3 stars in Problem Solving and 4 stars in Java, showcasing algorithmic and language-specific skills.",
  skills: ["Problem Solving", "Algorithms", "Java", "Data Structures"],
  icon: "🎯",
  color: "from-green-400 to-green-600",
  badgeUrl: "https://www.hackerrank.com/Ashish73653"
},
{
  title: "LeetCode 100-Day Streak & 260+ Problems Solved",
  issuer: "LeetCode",
  issueDate: "2022, 2024",
  expiryDate: "—",
  credentialId: "—",
  description: "Earned 100-day streak badges and solved over 260 problems on LeetCode, reflecting strong consistency and problem-solving aptitude.",
  skills: ["DSA", "Problem Solving", "Consistency", "LeetCode"],
  icon: "📘",
  color: "from-gray-600 to-blue-600",
  badgeUrl: "https://leetcode.com/Ashish73653"
}

  ];

  const achievements = [
    {
  title: "100-Day Streak Badge",
  organization: "LeetCode",
  year: "2022 & 2024",
  description: "Earned consistent 100-day coding streak badges and solved over 260+ DSA problems.",
  icon: "📈",
  color: "from-green-400 to-blue-600"
},
{
  title: "Problem Solving & Java Star Badges",
  organization: "HackerRank",
  year: "2024",
  description: "Achieved 3 stars in Problem Solving and 4 stars in Java, highlighting strong algorithmic skills.",
  icon: "🎖️",
  color: "from-purple-500 to-indigo-600"
},
{
  title: "Java Certification",
  organization: "TCL-IT",
  year: "2023",
  description: "Certified for demonstrating proficiency in Java programming and software development.",
  icon: "☕",
  color: "from-orange-500 to-red-600"
},
{
  title: "Internship at Nokia",
  organization: "Nokia India Pvt. Ltd.",
  year: "2023",
  description: "Recognized for contributing to TR-069 based Home Device Management system during 11-month internship.",
  icon: "🏢",
  color: "from-blue-400 to-gray-500"
}

  ];

  const sectionButtons = [
    { key: "experience", label: "Experience", icon: "💼" },
    { key: "education", label: "Education", icon: "🎓" },
    { key: "certifications", label: "Certifications", icon: "�" },
    { key: "achievements", label: "Achievements", icon: "🏆" }
  ];

  return (
    <motion.div
      className="min-h-screen w-full relative overflow-hidden bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-2 h-2 rounded-full ${
              i % 3 === 0 
                ? "bg-blue-400/30" 
                : i % 3 === 1 
                ? "bg-purple-400/30" 
                : "bg-indigo-400/30"
            }`}
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
              scale: [1, 2, 1],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 15 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              left: `${5 + i * 8}%`,
              top: `${10 + (i * 7)}%`,
            }}
          />
        ))}
      </div>

      {/* Floating gradient orbs */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={`orb-${i}`}
          className={`absolute w-32 h-32 rounded-full opacity-20 ${
            i === 0
              ? "bg-gradient-to-r from-blue-400 to-purple-500"
              : i === 1
              ? "bg-gradient-to-r from-purple-400 to-pink-500"
              : "bg-gradient-to-r from-pink-400 to-blue-500"
          }`}
          animate={{
            x: [0, 80, 0],
            y: [0, -60, 0],
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20 + i * 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            right: `${10 + i * 25}%`,
            bottom: `${20 + i * 15}%`,
            filter: "blur(40px)",
          }}
        />
      ))}

      <div className="relative z-10 w-full h-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Header */}
        <motion.div 
          variants={itemVariants}
          className="text-center mb-12"
        >
          <motion.h1 
            className="text-4xl lg:text-6xl font-bold mb-4"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.span 
              className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
              animate={{ 
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              style={{ backgroundSize: "200% 200%" }}
            >
              Resume
            </motion.span>
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            A comprehensive overview of my professional journey, skills, and achievements
          </motion.p>
        </motion.div>

        {/* Navigation Tabs */}
        <motion.div 
          variants={itemVariants}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {sectionButtons.map((section) => (
            <motion.button
              key={section.key}
              onClick={() => setActiveSection(section.key)}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 ${
                activeSection === section.key
                  ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg transform scale-105"
                  : "bg-white/80 dark:bg-gray-800/80 backdrop-blur-md text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-700 shadow-md"
              }`}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <span className="text-lg">{section.icon}</span>
              {section.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Content Sections */}
        <motion.div
          key={activeSection}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.5 }}
        >
          {/* Experience Section */}
          {activeSection === "experience" && (
            <div className="space-y-8">
              {experienceData.map((exp, index) => (
                <motion.div
                  key={index}
                  className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-white/20"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -5, boxShadow: "0 25px 50px rgba(0,0,0,0.15)" }}
                >
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
                    <div className="flex-1">
                      <motion.h3 
                        className="text-2xl font-bold text-gray-900 dark:text-white mb-2"
                        whileHover={{ scale: 1.02 }}
                      >
                        {exp.title}
                      </motion.h3>
                      <motion.div 
                        className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-1"
                        whileHover={{ color: "#8B5CF6" }}
                      >
                        {exp.company}
                      </motion.div>
                      <div className="text-gray-600 dark:text-gray-400 mb-4">
                        📍 {exp.location} • ⏰ {exp.period}
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    {exp.description}
                  </p>

                  {/* Technologies */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Technologies Used:</h4>
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech, techIndex) => (
                        <motion.span
                          key={techIndex}
                          className="px-3 py-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full text-sm font-medium text-blue-700 dark:text-blue-300 border border-blue-200/50"
                          whileHover={{ scale: 1.1, y: -2 }}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: techIndex * 0.05 }}
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                  </div>

                  {/* Achievements */}
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Key Achievements:</h4>
                    <ul className="space-y-2">
                      {exp.achievements.map((achievement, achIndex) => (
                        <motion.li
                          key={achIndex}
                          className="flex items-center text-gray-700 dark:text-gray-300"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: achIndex * 0.1 }}
                          whileHover={{ x: 5 }}
                        >
                          <motion.span 
                            className="text-green-500 mr-3"
                            animate={{ rotate: [0, 10, -10, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            ✅
                          </motion.span>
                          {achievement}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Education Section */}
          {activeSection === "education" && (
            <div className="space-y-8">
              {educationData.map((edu, index) => (
                <motion.div
                  key={index}
                  className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-white/20"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -5, boxShadow: "0 25px 50px rgba(0,0,0,0.15)" }}
                >
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex-1">
                      <motion.h3 
                        className="text-2xl font-bold text-gray-900 dark:text-white mb-2"
                        whileHover={{ scale: 1.02 }}
                      >
                        {edu.degree}
                      </motion.h3>
                      <motion.div 
                        className="text-lg font-semibold text-purple-600 dark:text-purple-400 mb-1"
                        whileHover={{ color: "#EC4899" }}
                      >
                        {edu.school}
                      </motion.div>
                      <div className="text-gray-600 dark:text-gray-400 mb-2">
                        📍 {edu.location} • ⏰ {edu.period}
                      </div>
                      <motion.div 
                        className="text-green-600 dark:text-green-400 font-semibold"
                        whileHover={{ scale: 1.05 }}
                      >
                        GPA: {edu.gpa}
                      </motion.div>
                    </div>
                    <motion.div 
                      className="text-4xl"
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      🎓
                    </motion.div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Highlights:</h4>
                    <ul className="space-y-2">
                      {edu.highlights.map((highlight, hlIndex) => (
                        <motion.li
                          key={hlIndex}
                          className="flex items-center text-gray-700 dark:text-gray-300"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: hlIndex * 0.1 }}
                          whileHover={{ x: 5 }}
                        >
                          <motion.span 
                            className="text-yellow-500 mr-3"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity, delay: hlIndex * 0.3 }}
                          >
                            🌟
                          </motion.span>
                          {highlight}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Certifications Section */}
          {activeSection === "certifications" && (
            <div className="grid lg:grid-cols-2 gap-8">
              {certificationsData.map((cert, index) => (
                <motion.div
                  key={index}
                  className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-white/20"
                  initial={{ opacity: 0, y: 50, rotateY: -10 }}
                  animate={{ opacity: 1, y: 0, rotateY: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ 
                    scale: 1.02, 
                    y: -5, 
                    rotateY: 5,
                    boxShadow: "0 25px 50px rgba(0,0,0,0.15)" 
                  }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <motion.div 
                          className="text-4xl"
                          animate={{ 
                            rotate: [0, 10, -10, 0],
                            scale: [1, 1.1, 1]
                          }}
                          transition={{ 
                            duration: 4, 
                            repeat: Infinity,
                            delay: index * 0.5
                          }}
                        >
                          {cert.icon}
                        </motion.div>
                        <div>
                          <motion.h3 
                            className="text-xl font-bold text-gray-900 dark:text-white"
                            whileHover={{ scale: 1.02 }}
                          >
                            {cert.title}
                          </motion.h3>
                          <motion.div 
                            className={`text-lg font-semibold bg-gradient-to-r ${cert.color} bg-clip-text text-transparent`}
                            whileHover={{ scale: 1.05 }}
                          >
                            {cert.issuer}
                          </motion.div>
                        </div>
                      </div>
                      
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                          <span className="mr-2">📅</span>
                          <span>Issued: {cert.issueDate}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                          <span className="mr-2">⏰</span>
                          <span>Expires: {cert.expiryDate}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-500">
                          <span className="mr-2">🆔</span>
                          <span className="font-mono text-xs">{cert.credentialId}</span>
                        </div>
                      </div>
                    </div>
                    
                    <motion.button
                      className="px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg text-blue-600 dark:text-blue-400 font-medium text-sm border border-blue-200/50 hover:border-blue-300/70 transition-all duration-300"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => window.open(cert.badgeUrl, '_blank')}
                    >
                      View Badge
                    </motion.button>
                  </div>

                  <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    {cert.description}
                  </p>

                  {/* Skills Covered */}
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Skills Covered:</h4>
                    <div className="flex flex-wrap gap-2">
                      {cert.skills.map((skill, skillIndex) => (
                        <motion.span
                          key={skillIndex}
                          className={`px-3 py-1 bg-gradient-to-r ${cert.color}/20 rounded-full text-sm font-medium border border-current/20`}
                          style={{ 
                            background: `linear-gradient(to right, ${cert.color.split(' ')[1]} 20%, ${cert.color.split(' ')[3]} 20%)` 
                          }}
                          whileHover={{ scale: 1.1, y: -2 }}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: skillIndex * 0.05 }}
                        >
                          <span className={`bg-gradient-to-r ${cert.color} bg-clip-text text-transparent font-semibold`}>
                            {skill}
                          </span>
                        </motion.span>
                      ))}
                    </div>
                  </div>

                  {/* Verification Status */}
                  <motion.div 
                    className="mt-6 flex items-center gap-2 text-green-600 dark:text-green-400"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <motion.span 
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      ✅
                    </motion.span>
                    <span className="text-sm font-medium">Verified Credential</span>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Achievements Section */}
          {activeSection === "achievements" && (
            <div className="grid md:grid-cols-2 gap-8">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={index}
                  className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-white/20 text-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ 
                    scale: 1.05, 
                    y: -10,
                    boxShadow: "0 30px 60px rgba(0,0,0,0.2)" 
                  }}
                >
                  <motion.div 
                    className="text-6xl mb-4"
                    animate={{ 
                      rotate: [0, 10, -10, 0],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ 
                      duration: 3, 
                      repeat: Infinity,
                      delay: index * 0.5
                    }}
                  >
                    {achievement.icon}
                  </motion.div>
                  <motion.h3 
                    className="text-xl font-bold text-gray-900 dark:text-white mb-2"
                    whileHover={{ scale: 1.05 }}
                  >
                    {achievement.title}
                  </motion.h3>
                  <motion.div 
                    className={`text-lg font-semibold bg-gradient-to-r ${achievement.color} bg-clip-text text-transparent mb-2`}
                    whileHover={{ scale: 1.05 }}
                  >
                    {achievement.organization}
                  </motion.div>
                  <div className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                    {achievement.year}
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">
                    {achievement.description}
                  </p>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Download Resume Button */}
        <motion.div 
          className="text-center mt-16"
          variants={itemVariants}
        >
          <motion.button
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300"
            whileHover={{ 
              scale: 1.05, 
              y: -5,
              boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)" 
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              // Placeholder for download functionality
              alert("Resume download functionality would be implemented here");
            }}
          >
            <motion.span 
              className="flex items-center gap-3"
              whileHover={{ gap: "1rem" }}
            >
              📄 Download Resume PDF
            </motion.span>
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
}