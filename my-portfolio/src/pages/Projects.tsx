import { motion } from "framer-motion";
import { useState, useMemo } from "react";
import { useProjects } from "../hooks/useFirebase";
import type { Project } from "../hooks/useFirebase";
import { useAuth } from "../contexts/AuthContext";
import AdminButton from "../components/AdminButton";
import ProjectForm from "../components/ProjectForm";

// Fallback projects data (will be used if Firebase is empty or fails)
const fallbackProjectsData: Project[] = [
  {
    id: "fallback-1",
    title: "Portfolio Website",
    description: "A modern, responsive portfolio website built with React, TypeScript, and Tailwind CSS. Features smooth animations, dark mode, and a clean design.",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Framer Motion", "Vite"],
    images: ["https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600&h=400&fit=crop"],
    liveUrl: "https://your-portfolio.com",
    githubUrl: "https://github.com/yourusername/portfolio",
    featured: true
  },
  {
    id: "fallback-2",
    title: "E-commerce Platform",
    description: "Full-stack e-commerce solution with user authentication, payment processing, and admin dashboard.",
    technologies: ["Next.js", "Node.js", "MongoDB", "Stripe", "Redux"],
    images: ["https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop"],
    liveUrl: "https://your-ecommerce.com",
    githubUrl: "https://github.com/yourusername/ecommerce",
    featured: true
  },
  {
    id: "fallback-3",
    title: "Task Management App",
    description: "A collaborative task management application with real-time updates and team collaboration features.",
    technologies: ["React", "Firebase", "Material-UI", "Node.js"],
    images: ["https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop"],
    githubUrl: "https://github.com/yourusername/task-manager",
    featured: false
  }
];

export default function Projects() {
  const { isAdmin } = useAuth();
  const { projects: firebaseProjects, loading, error, addProject, updateProject, deleteProject } = useProjects();
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);
  const [isProjectFormOpen, setIsProjectFormOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  // Use Firebase projects if available, otherwise fallback data
  const projects = useMemo(() => {
    console.log('Projects state:', { firebaseProjects: firebaseProjects?.length, loading, error });
    
    if (loading) return [];
    if (error || !firebaseProjects || firebaseProjects.length === 0) {
      console.log('Using fallback projects data');
      return fallbackProjectsData;
    }
    return firebaseProjects;
  }, [firebaseProjects, loading, error]);

  // Filter projects
  const filteredProjects = useMemo(() => {
    if (showFeaturedOnly) {
      return projects.filter(project => project.featured);
    }
    return projects;
  }, [projects, showFeaturedOnly]);

  const handleProjectSubmit = async (projectData: Omit<Project, 'id'>) => {
    try {
      if (editingProject && editingProject.id) {
        await updateProject(editingProject.id, projectData);
      } else {
        await addProject(projectData);
      }
      setIsProjectFormOpen(false);
      setEditingProject(null);
    } catch (error) {
      console.error('Error saving project:', error);
      alert('Failed to save project. Please try again.');
    }
  };

  const handleEditProject = (project: Project) => {
    setEditingProject(project);
    setIsProjectFormOpen(true);
  };

  const handleDeleteProject = async (projectId: string) => {
    if (!isAdmin) {
      alert('You must be signed in as admin to delete projects.');
      return;
    }
    
    const confirmDelete = window.confirm('Are you sure you want to delete this project? This action cannot be undone.');
    if (!confirmDelete) return;

    try {
      console.log('Attempting to delete project with ID:', projectId);
      await deleteProject(projectId);
      console.log('Project deleted successfully');
      alert('Project deleted successfully!');
    } catch (error) {
      console.error('Error deleting project:', error);
      alert('Failed to delete project. Please try again.');
    }
  };

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
      scale: 1.02,
      transition: {
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1] as const
      }
    }
  };

  return (
    <motion.div
      className="min-h-screen w-full relative bg-gradient-to-br from-gray-50 via-purple-50 to-pink-100 dark:from-gray-900 dark:via-purple-900 dark:to-pink-900 overflow-x-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={`bg-${i}`}
            className={`absolute w-3 h-3 rounded-full ${
              i % 4 === 0 ? "bg-purple-400/20" : 
              i % 4 === 1 ? "bg-pink-400/20" : 
              i % 4 === 2 ? "bg-blue-400/20" : "bg-green-400/20"
            }`}
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
              scale: [1, 1.5, 1],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 15 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              repeatType: "loop"
            }}
            style={{
              left: `${10 + i * 8}%`,
              top: `${15 + (i * 6)}%`,
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
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <motion.span
                className="bg-gradient-to-r from-purple-600 via-pink-600 via-blue-600 to-green-500 bg-clip-text text-transparent"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                style={{ backgroundSize: "300% 300%" }}
              >
                My Projects
              </motion.span>
            </motion.h1>
            <motion.p
              className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              A showcase of my latest work and personal projects. Each project represents
              a unique challenge and learning experience in my development journey.
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
                  setEditingProject(null);
                  setIsProjectFormOpen(true);
                }}
                className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-500 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:from-purple-700 hover:via-pink-700 hover:to-red-600 transition-all duration-300 flex items-center gap-2 relative overflow-hidden group"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="absolute inset-0 bg-white/20 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out"></div>
                <span className="relative z-10">✨</span>
                <span className="relative z-10">Add New Project</span>
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
                Error loading projects: {error}
              </p>
            </motion.div>
          )}

          {/* Filter Buttons */}
          <motion.div
            className="flex justify-center gap-4 mb-12"
            variants={itemVariants}
          >
            <motion.button
              onClick={() => setShowFeaturedOnly(false)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                !showFeaturedOnly
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
                  : "bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-700 shadow-md"
              }`}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              🎯 All Projects
            </motion.button>
            <motion.button
              onClick={() => setShowFeaturedOnly(true)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                showFeaturedOnly
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
                  : "bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-700 shadow-md"
              }`}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              ⭐ Featured Only
            </motion.button>
          </motion.div>

          {/* Loading State */}
          {loading && (
            <motion.div
              className="flex justify-center items-center py-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <motion.div
                className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
            </motion.div>
          )}

          {/* Projects Grid */}
          {!loading && (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={containerVariants}
            >
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  className="group relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl border border-gray-100/50 dark:border-gray-700/50 transition-all duration-300"
                  variants={cardVariants}
                  whileHover="hover"
                >
                  {/* Animated gradient background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-purple-50/30 to-pink-50/50 dark:from-blue-900/20 dark:via-purple-900/10 dark:to-pink-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Featured Badge - Only show on image when image exists */}
                  {project.featured && project.images && project.images.length > 0 && (
                    <div className="absolute top-4 right-4 z-20">
                      <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-white px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
                        ⭐ Featured
                      </span>
                    </div>
                  )}

                  {/* Project Image */}
                  {project.images && project.images.length > 0 && (
                    <div className="relative h-48 overflow-hidden">
                      <motion.img
                        src={project.images[0]}
                        alt={project.title}
                        className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                        onError={(e) => {
                          e.currentTarget.src = "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=400&fit=crop";
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent group-hover:from-black/20 transition-colors duration-300" />
                      
                      {/* Hover overlay with links */}
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                        {project.liveUrl && (
                          <motion.a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 bg-white/90 text-gray-900 rounded-lg font-semibold text-sm hover:bg-white transition-colors duration-200"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            🌐 Live Demo
                          </motion.a>
                        )}
                        {project.githubUrl && (
                          <motion.a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 bg-gray-900/90 text-white rounded-lg font-semibold text-sm hover:bg-gray-900 transition-colors duration-200"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            📱 GitHub
                          </motion.a>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="p-6 relative z-10">
                    {/* Project Title with featured badge for projects without images */}
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 leading-tight">
                        {project.title}
                      </h3>
                      {/* Show featured badge only when no image exists */}
                      {project.featured && (!project.images || project.images.length === 0) && (
                        <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg flex-shrink-0">
                          ⭐ Featured
                        </span>
                      )}
                    </div>

                    {/* Project Description */}
                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4 line-clamp-3">
                      {project.description}
                    </p>

                    {/* Technologies */}
                    {project.technologies && project.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies.slice(0, 4).map((tech, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-700 dark:text-blue-300 rounded-full text-xs font-semibold shadow-sm"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 3 && (
                          <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-xs font-medium">
                            +{project.technologies.length - 3} more
                          </span>
                        )}
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex gap-3 mb-4">
                      {project.liveUrl && (
                        <motion.a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2 px-4 rounded-lg text-sm font-medium text-center hover:shadow-lg transition-all duration-300"
                          whileHover={{ scale: 1.02, y: -1 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          🚀 Live Demo
                        </motion.a>
                      )}
                      {project.githubUrl && (
                        <motion.a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 bg-gray-800 dark:bg-gray-600 text-white py-2 px-4 rounded-lg text-sm font-medium text-center hover:shadow-lg transition-all duration-300"
                          whileHover={{ scale: 1.02, y: -1 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          💻 Code
                        </motion.a>
                      )}
                    </div>

                    {/* Admin Controls */}
                    {isAdmin && (
                      <div className="border-t border-gray-200/60 dark:border-gray-600/60 pt-4">
                        <div className="flex gap-2">
                          <motion.button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEditProject(project);
                            }}
                            className="flex-1 px-3 py-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white text-sm font-semibold rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-sm hover:shadow-md"
                            whileHover={{ scale: 1.02, y: -1 }}
                            whileTap={{ scale: 0.98 }}
                            type="button"
                          >
                            <span>✏️</span>
                            Edit
                          </motion.button>
                          <motion.button
                            onClick={(e) => {
                              e.stopPropagation();
                              console.log('Delete button clicked for project:', project.id);
                              if (project.id) {
                                handleDeleteProject(project.id);
                              }
                            }}
                            className="flex-1 px-3 py-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white text-sm font-semibold rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-sm hover:shadow-md"
                            whileHover={{ scale: 1.02, y: -1 }}
                            whileTap={{ scale: 0.98 }}
                            type="button"
                          >
                            <span>🗑️</span>
                            Delete
                          </motion.button>
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Empty State */}
          {!loading && filteredProjects.length === 0 && (
            <motion.div
              className="text-center py-20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="text-6xl mb-4">📁</div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                No projects found
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {showFeaturedOnly 
                  ? "No featured projects available yet." 
                  : "No projects available yet."
                }
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Project Form Modal */}
      <ProjectForm
        isOpen={isProjectFormOpen}
        onClose={() => {
          setIsProjectFormOpen(false);
          setEditingProject(null);
        }}
        onSubmit={handleProjectSubmit}
        editingProject={editingProject}
      />
    </motion.div>
  );
}