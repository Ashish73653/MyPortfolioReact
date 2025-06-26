import { motion } from "framer-motion";
import { useState, useMemo } from "react";
import { useSkills } from "../hooks/useFirebase";
import type { Skill } from "../hooks/useFirebase";
import { useAuth } from "../contexts/AuthContext";
import AdminButton from "../components/AdminButton";
import SkillForm from "../components/SkillForm";

// Fallback skills data (will be used if Firebase is empty or fails)
const fallbackSkillsData: Skill[] = [
  {
    id: "fallback-1",
    name: "React",
    category: "frontend",
    proficiency: 90,
    experience: "3 years",
    description: "Building modern web applications with React, including hooks, context, and state management.",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"
  },
  {
    id: "fallback-2",
    name: "TypeScript",
    category: "frontend",
    proficiency: 85,
    experience: "2 years",
    description: "Type-safe JavaScript development for better code quality and developer experience.",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg"
  },
  {
    id: "fallback-3",
    name: "Node.js",
    category: "backend",
    proficiency: 80,
    experience: "2.5 years",
    description: "Server-side JavaScript development with Express.js and various databases.",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg"
  },
  {
    id: "fallback-4",
    name: "Java",
    category: "languages",
    proficiency: 88,
    experience: "4 years",
    description: "Object-oriented programming, Spring Framework, and enterprise application development.",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg"
  },
  {
    id: "fallback-5",
    name: "MongoDB",
    category: "databases",
    proficiency: 75,
    experience: "2 years",
    description: "NoSQL database design, aggregation pipelines, and performance optimization.",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg"
  },
  {
    id: "fallback-6",
    name: "Git",
    category: "tools",
    proficiency: 85,
    experience: "3 years",
    description: "Version control, branching strategies, and collaborative development workflows.",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg"
  },
  {
    id: "fallback-7",
    name: "AWS",
    category: "cloud",
    proficiency: 70,
    experience: "1.5 years",
    description: "Cloud infrastructure management, deployment, and serverless architecture.",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg"
  },
  {
    id: "fallback-8",
    name: "Python",
    category: "languages",
    proficiency: 75,
    experience: "2 years",
    description: "Data analysis, automation scripts, and backend development.",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg"
  }
];

// Category info for styling and organization
const categoryInfo = {
  frontend: {
    color: "from-blue-500 to-cyan-500",
    icon: "🎨",
    label: "Frontend"
  },
  backend: {
    color: "from-green-500 to-emerald-500",
    icon: "⚙️",
    label: "Backend"
  },
  databases: {
    color: "from-purple-500 to-violet-500",
    icon: "🗄️",
    label: "Databases"
  },
  tools: {
    color: "from-orange-500 to-red-500",
    icon: "🛠️",
    label: "Tools"
  },
  languages: {
    color: "from-pink-500 to-rose-500",
    icon: "💻",
    label: "Languages"
  },
  cloud: {
    color: "from-sky-500 to-blue-500",
    icon: "☁️",
    label: "Cloud"
  }
} as const;

type CategoryType = keyof typeof categoryInfo;

export default function Skills() {
  const { isAdmin } = useAuth();
  const { skills: firebaseSkills, loading, error, addSkill, updateSkill, deleteSkill } = useSkills();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [isSkillFormOpen, setIsSkillFormOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);

  // Use Firebase skills if available, otherwise fallback data
  const skills = useMemo(() => {
    console.log('Skills state:', { firebaseSkills: firebaseSkills?.length, loading, error });
    
    if (loading) return [];
    if (error || !firebaseSkills || firebaseSkills.length === 0) {
      console.log('Using fallback skills data');
      return fallbackSkillsData;
    }
    return firebaseSkills;
  }, [firebaseSkills, loading, error]);

  // Get unique categories
  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(skills.map(skill => skill.category))];
    return ["All", ...uniqueCategories];
  }, [skills]);

  // Filter skills by selected category
  const filteredSkills = useMemo(() => {
    if (selectedCategory === "All") return skills;
    return skills.filter(skill => skill.category === selectedCategory);
  }, [skills, selectedCategory]);

  const handleSkillSubmit = async (skillData: Omit<Skill, 'id'>) => {
    try {
      if (editingSkill && editingSkill.id) {
        await updateSkill(editingSkill.id, skillData);
      } else {
        await addSkill(skillData);
      }
      setIsSkillFormOpen(false);
      setEditingSkill(null);
    } catch (error) {
      console.error('Error saving skill:', error);
      alert('Failed to save skill. Please try again.');
    }
  };

  const handleEditSkill = (skill: Skill) => {
    if (!skill.id) {
      alert('Cannot edit skill: Invalid skill ID');
      return;
    }
    setEditingSkill(skill);
    setIsSkillFormOpen(true);
  };

  const handleDeleteSkill = async (skillId: string) => {
    if (!isAdmin) {
      alert('You must be signed in as admin to delete skills.');
      return;
    }

    if (!skillId) {
      alert('Cannot delete skill: Invalid skill ID');
      return;
    }
    
    const confirmDelete = window.confirm('Are you sure you want to delete this skill? This action cannot be undone.');
    if (!confirmDelete) return;

    try {
      console.log('Attempting to delete skill with ID:', skillId);
      await deleteSkill(skillId);
      console.log('Skill deleted successfully');
      alert('Skill deleted successfully!');
    } catch (error) {
      console.error('Error deleting skill:', error);
      alert('Failed to delete skill. Please try again.');
    }
  };

  // Fixed animation variants with proper Framer Motion easing
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1] as const
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1] as const
      }
    },
    hover: {
      y: -10,
      scale: 1.05,
      transition: {
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1] as const
      }
    }
  };

  return (
    <motion.div
      className="min-h-screen w-full relative bg-gradient-to-br from-slate-50 via-purple-50 to-pink-100 dark:from-gray-900 dark:via-purple-900 dark:to-pink-900 overflow-x-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={`bg-${i}`}
            className={`absolute w-2 h-2 rounded-full ${
              i % 6 === 0 ? "bg-blue-400/20" : 
              i % 6 === 1 ? "bg-purple-400/20" : 
              i % 6 === 2 ? "bg-pink-400/20" :
              i % 6 === 3 ? "bg-green-400/20" :
              i % 6 === 4 ? "bg-yellow-400/20" : "bg-red-400/20"
            }`}
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
              scale: [1, 2, 1],
              opacity: [0.1, 0.5, 0.1],
            }}
            transition={{
              duration: 12 + i * 2,
              repeat: Infinity,
              ease: [0.4, 0, 0.6, 1],
              repeatType: "loop"
            }}
            style={{
              left: `${5 + i * 6}%`,
              top: `${10 + (i * 5)}%`,
            }}
          />
        ))}
      </div>

      <AdminButton onAdminModeToggle={() => {}} />

      <div className="relative z-10 w-full min-h-screen px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          className="max-w-7xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Header Section */}
          <motion.div
            className="text-center mb-12"
            variants={itemVariants}
          >
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            >
              <motion.span
                className="bg-gradient-to-r from-blue-600 via-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                style={{ backgroundSize: "300% 300%" }}
              >
                My Skills
              </motion.span>
            </motion.h1>
            <motion.p
              className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              A comprehensive overview of my technical expertise and proficiency levels
              across various technologies and tools.
            </motion.p>
          </motion.div>

          {/* Admin Add Button */}
          {isAdmin && (
            <motion.div
              className="flex justify-center mb-8"
              variants={itemVariants}
            >
              <motion.button
                onClick={() => {
                  setEditingSkill(null);
                  setIsSkillFormOpen(true);
                }}
                className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 transition-all duration-300 flex items-center gap-2 relative overflow-hidden group"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="absolute inset-0 bg-white/20 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out"></div>
                <span className="relative z-10">✨</span>
                <span className="relative z-10">Add New Skill</span>
              </motion.button>
            </motion.div>
          )}

          {/* Error Display */}
          {error && (
            <motion.div
              className="bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 rounded-xl p-6 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <p className="text-red-700 dark:text-red-300 text-center">
                Error loading skills: {error}
              </p>
            </motion.div>
          )}

          {/* Category Filter */}
          <motion.div
            className="flex flex-wrap justify-center gap-3 mb-12"
            variants={itemVariants}
          >
            {categories.map((category) => {
              const categoryKey = category as CategoryType;
              const categoryData = categoryInfo[categoryKey];
              
              return (
                <motion.button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                    selectedCategory === category
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                      : "bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-700 shadow-md"
                  }`}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {category === "All" ? "🎯" : (categoryData?.icon || "📦")} {categoryData?.label || category}
                </motion.button>
              );
            })}
          </motion.div>

          {/* Loading State */}
          {loading && (
            <motion.div
              className="flex justify-center items-center py-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <motion.div
                className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
            </motion.div>
          )}

          {/* Skills Grid */}
          {!loading && (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
              variants={containerVariants}
            >
              {filteredSkills.map((skill, index) => {
                const categoryKey = skill.category as CategoryType;
                const categoryData = categoryInfo[categoryKey];
                const proficiencyValue = typeof skill.proficiency === 'number' ? skill.proficiency : 0;
                
                return (
                  <motion.div
                    key={skill.id}
                    className="group relative bg-white/90 dark:bg-gray-900/90 backdrop-blur-3xl rounded-2xl p-4 border border-white/30 dark:border-gray-700/30 transition-all duration-700 overflow-hidden hover:bg-white/95 dark:hover:bg-gray-900/95 hover:border-white/50 dark:hover:border-gray-600/50"
                    variants={cardVariants}
                    whileHover="hover"
                    style={{
                      boxShadow: '0 8px 25px rgba(0, 0, 0, 0.06), 0 1px 3px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                    }}
                  >
                    {/* Animated gradient overlay with multiple layers */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 rounded-2xl">
                      <div 
                        className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${categoryData?.color || "from-gray-400 to-gray-500"}`}
                        style={{ 
                          background: `linear-gradient(135deg, ${categoryData?.color?.includes('blue') ? '#3b82f620' : categoryData?.color?.includes('green') ? '#10b98120' : categoryData?.color?.includes('purple') ? '#8b5cf620' : categoryData?.color?.includes('pink') ? '#ec489920' : categoryData?.color?.includes('orange') ? '#f59e0b20' : categoryData?.color?.includes('sky') ? '#0ea5e920' : '#6b728020'}, ${categoryData?.color?.includes('cyan') ? '#06b6d410' : categoryData?.color?.includes('emerald') ? '#05966910' : categoryData?.color?.includes('violet') ? '#7c3aed10' : categoryData?.color?.includes('rose') ? '#f43f5e10' : categoryData?.color?.includes('red') ? '#ef444410' : categoryData?.color?.includes('blue') ? '#2563eb10' : '#4b556310'})`
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-white/5 rounded-2xl" />
                    </div>
                    
                    {/* Compact floating orb decorations */}
                    <div className="absolute -top-4 -right-4 w-16 h-16 rounded-full bg-gradient-to-br from-blue-400/15 to-purple-400/15 blur-xl group-hover:scale-150 group-hover:rotate-180 transition-all duration-1000" />
                    <div className="absolute -bottom-4 -left-4 w-12 h-12 rounded-full bg-gradient-to-tr from-pink-400/15 to-orange-400/15 blur-lg group-hover:scale-125 group-hover:-rotate-90 transition-all duration-1000" />
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-gradient-to-r from-cyan-400/5 to-purple-400/5 blur-2xl group-hover:scale-110 transition-all duration-1000" />

                    {/* Content */}
                    <div className="relative z-10">
                      {/* Compact Skill Icon */}
                      <motion.div
                        className="w-12 h-12 mx-auto mb-3 flex items-center justify-center bg-gradient-to-br from-white/90 to-gray-50/90 dark:from-gray-800/90 dark:to-gray-700/90 rounded-xl backdrop-blur-sm border border-white/60 dark:border-gray-600/60 group-hover:scale-110 group-hover:rotate-12 transition-all duration-700 shadow-md group-hover:shadow-lg"
                        whileHover={{ 
                          scale: 1.15, 
                          rotate: [0, -8, 8, 0],
                          boxShadow: "0 15px 30px rgba(0, 0, 0, 0.2)"
                        }}
                        transition={{ duration: 0.6, type: "spring", stiffness: 200 }}
                      >
                        {skill.icon && skill.icon.startsWith('http') ? (
                          <img
                            src={skill.icon}
                            alt={skill.name}
                            className="w-7 h-7 object-contain transition-all duration-500 group-hover:scale-125 drop-shadow-md"
                            onError={(e) => {
                              const target = e.currentTarget;
                              const nextSibling = target.nextElementSibling as HTMLElement;
                              target.style.display = 'none';
                              if (nextSibling) {
                                nextSibling.style.display = 'block';
                              }
                            }}
                          />
                        ) : null}
                        <span 
                          className={`text-xl transition-all duration-500 group-hover:scale-125 drop-shadow-md ${skill.icon && skill.icon.startsWith('http') ? 'hidden' : ''}`}
                        >
                          {skill.icon && !skill.icon.startsWith('http') ? skill.icon : '⚡'}
                        </span>
                      </motion.div>

                      {/* Compact Skill Name and Experience */}
                      <div className="text-center mb-3">
                        <motion.h3 
                          className="text-base font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-500"
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.2 }}
                        >
                          {skill.name}
                        </motion.h3>
                        <div className="flex items-center justify-center gap-2 px-2 py-1 bg-gray-50/80 dark:bg-gray-800/80 rounded-full backdrop-blur-sm border border-gray-200/50 dark:border-gray-600/50 group-hover:bg-gray-100/80 dark:group-hover:bg-gray-700/80 transition-all duration-500">
                          <div className="w-1 h-1 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 animate-pulse"></div>
                          <p className="text-xs text-gray-600 dark:text-gray-400 font-medium tracking-wide">
                            {skill.experience}
                          </p>
                          <div className="w-1 h-1 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 animate-pulse"></div>
                        </div>
                      </div>

                      {/* Compact Category Badge */}
                      <div className="flex justify-center mb-3">
                        <motion.span 
                          className={`px-3 py-1 rounded-xl text-xs font-bold text-white bg-gradient-to-r ${
                            categoryData?.color || "from-gray-500 to-gray-600"
                          } shadow-lg backdrop-blur-sm border border-white/30 group-hover:scale-105 transition-all duration-500`}
                          whileHover={{ scale: 1.1, y: -2 }}
                          transition={{ duration: 0.2 }}
                        >
                          <span className="mr-1 text-xs">{categoryData?.icon || "📦"}</span>
                          <span className="text-xs">{categoryData?.label || skill.category}</span>
                        </motion.span>
                      </div>

                      {/* Compact Proficiency Level */}
                      <div className="mb-3">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wide flex items-center gap-1">
                            <div className="w-1 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                            Level
                          </span>
                          <motion.span 
                            className="text-xs font-bold text-white bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 px-2 py-1 rounded-lg shadow-md backdrop-blur-sm border border-white/20"
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.2 }}
                          >
                            {proficiencyValue}%
                          </motion.span>
                        </div>
                        <div className="relative">
                          <div className="w-full h-2 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded-full overflow-hidden backdrop-blur-sm shadow-inner">
                            <motion.div
                              className="h-full rounded-full relative overflow-hidden shadow-md"
                              style={{
                                background: `linear-gradient(90deg, #3b82f6, #8b5cf6, #ec4899)`,
                                width: `${proficiencyValue}%`
                              }}
                              initial={{ width: 0 }}
                              animate={{ width: `${proficiencyValue}%` }}
                              transition={{ duration: 1.5, delay: index * 0.05, ease: "easeOut" }}
                            >
                              {/* Shimmer effect */}
                              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 animate-pulse" />
                            </motion.div>
                          </div>
                        </div>
                      </div>

                      {/* Compact Description */}
                      <div className="relative mb-4">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-purple-50/50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <p className="relative text-xs text-gray-600 dark:text-gray-400 text-center leading-relaxed line-clamp-2 group-hover:text-gray-800 dark:group-hover:text-gray-300 transition-colors duration-500 p-2">
                          {skill.description}
                        </p>
                      </div>

                      {/* Compact Admin Controls */}
                      {isAdmin && (
                        <motion.div 
                          className="border-t border-gray-200/50 dark:border-gray-600/50 pt-3 mt-3"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 }}
                        >
                          <div className="flex gap-2">
                            <motion.button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleEditSkill(skill);
                              }}
                              className="flex-1 px-2 py-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white text-xs font-semibold rounded-lg transition-all duration-300 flex items-center justify-center gap-1 shadow-md hover:shadow-lg backdrop-blur-sm border border-blue-400/20"
                              whileHover={{ scale: 1.02, y: -1 }}
                              whileTap={{ scale: 0.98 }}
                              type="button"
                            >
                              <span>✏️</span>
                              <span>Edit</span>
                            </motion.button>
                            <motion.button
                              onClick={(e) => {
                                e.stopPropagation();
                                console.log('Delete button clicked for skill:', skill.id);
                                if (skill.id) {
                                  handleDeleteSkill(skill.id);
                                } else {
                                  alert('Skill ID is missing. Cannot delete this skill.');
                                }
                              }}
                              className="flex-1 px-2 py-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white text-xs font-semibold rounded-lg transition-all duration-300 flex items-center justify-center gap-1 shadow-md hover:shadow-lg backdrop-blur-sm border border-red-400/20"
                              whileHover={{ scale: 1.02, y: -1 }}
                              whileTap={{ scale: 0.98 }}
                              type="button"
                            >
                              <span>🗑️</span>
                              <span>Delete</span>
                            </motion.button>
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}

          {/* Empty State */}
          {!loading && filteredSkills.length === 0 && (
            <motion.div
              className="text-center py-20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                No skills found
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {selectedCategory === "All" 
                  ? "No skills available yet." 
                  : `No skills found in the "${selectedCategory}" category.`
                }
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Skill Form Modal */}
      <SkillForm
        isOpen={isSkillFormOpen}
        onClose={() => {
          setIsSkillFormOpen(false);
          setEditingSkill(null);
        }}
        onSubmit={handleSkillSubmit}
        editingSkill={editingSkill}
      />
    </motion.div>
  );
}