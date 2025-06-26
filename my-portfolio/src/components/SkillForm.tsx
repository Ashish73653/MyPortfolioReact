import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import type { Skill } from "../hooks/useFirebase";

interface SkillFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (skill: Omit<Skill, 'id'>) => Promise<void>;
  editingSkill?: Skill | null;
}

const categories = [
  { value: 'frontend', label: 'Frontend Development', icon: '🎨' },
  { value: 'backend', label: 'Backend Development', icon: '⚙️' },
  { value: 'languages', label: 'Programming Languages', icon: '💻' },
  { value: 'databases', label: 'Databases', icon: '🗄️' },
  { value: 'tools', label: 'Tools & Technologies', icon: '🛠️' },
  { value: 'cloud', label: 'Cloud & DevOps', icon: '☁️' }
] as const;

export default function SkillForm({ isOpen, onClose, onSubmit, editingSkill }: SkillFormProps) {
  const [formData, setFormData] = useState<Omit<Skill, 'id'>>({
    name: '',
    category: 'frontend',
    proficiency: 50,
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
    description: '',
    experience: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (editingSkill) {
      setFormData({
        name: editingSkill.name,
        category: editingSkill.category,
        proficiency: editingSkill.proficiency,
        icon: editingSkill.icon,
        description: editingSkill.description || '',
        experience: editingSkill.experience || ''
      });
    } else {
      setFormData({
        name: '',
        category: 'frontend',
        proficiency: 50,
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
        description: '',
        experience: ''
      });
    }
  }, [editingSkill, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    setIsSubmitting(true);
    try {
      await onSubmit(formData);
      onClose();
    } catch (error) {
      console.error('Error submitting skill:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'proficiency' ? parseInt(value) : value
    }));
  };

  if (!isOpen) return null;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onClick={onClose}
      />

      {/* Enhanced Form Modal */}
      <motion.div
        className="relative w-full max-w-2xl bg-white/95 dark:bg-gray-900/95 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/50 dark:border-gray-700/50 max-h-[90vh] overflow-hidden"
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        style={{
          boxShadow: '0 25px 50px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.1)',
        }}
      >
        {/* Enhanced Gradient Header */}
        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 p-1 rounded-t-3xl">
          <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-t-3xl p-6 border-b border-gray-200/30 dark:border-gray-700/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-white text-xl shadow-lg">
                  {editingSkill ? '✏️' : '✨'}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {editingSkill ? 'Edit Skill' : 'Add New Skill'}
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {editingSkill ? 'Update your skill information' : 'Add a new skill to your portfolio'}
                  </p>
                </div>
              </div>
              <motion.button
                onClick={onClose}
                className="p-3 rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-all duration-200 border border-gray-200/50 dark:border-gray-700/50"
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </motion.button>
            </div>
          </div>
        </div>

        {/* Scrollable Form Content */}
        <div className="max-h-[calc(90vh-120px)] overflow-y-auto">
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Enhanced Skill Name */}
          <div className="group">
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-3">
              <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full shadow-sm"></div>
              <span className="tracking-wide">Skill Name *</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full px-5 py-4 bg-gray-50/80 dark:bg-gray-800/80 border-2 border-gray-200 dark:border-gray-600 rounded-2xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:bg-gray-100/80 dark:hover:bg-gray-700/80 hover:border-gray-300 dark:hover:border-gray-500"
              placeholder="e.g., React, TypeScript, Python"
            />
          </div>

          {/* Category and Icon */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="group">
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-3">
                <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-sm"></div>
                <span className="tracking-wide">Category *</span>
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-5 py-4 bg-gray-50/80 dark:bg-gray-800/80 border-2 border-gray-200 dark:border-gray-600 rounded-2xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover:bg-gray-100/80 dark:hover:bg-gray-700/80 hover:border-gray-300 dark:hover:border-gray-500 cursor-pointer"
              >
                {categories.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.icon} {cat.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="group">
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-3">
                <div className="w-3 h-3 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full shadow-sm"></div>
                <span className="tracking-wide">Icon * (Emoji or Image URL)</span>
              </label>
              <div className="flex gap-4">
                <div className="flex-1">
                  <input
                    type="text"
                    name="icon"
                    value={formData.icon}
                    onChange={handleInputChange}
                    required
                    className="w-full px-5 py-4 bg-gray-50/80 dark:bg-gray-800/80 border-2 border-gray-200 dark:border-gray-600 rounded-2xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300 hover:bg-gray-100/80 dark:hover:bg-gray-700/80 hover:border-gray-300 dark:hover:border-gray-500"
                    placeholder="🎨 or https://example.com/icon.svg"
                  />
                </div>
                <div className="w-20 h-16 bg-gradient-to-br from-gray-100/80 to-gray-200/80 dark:from-gray-700/80 dark:to-gray-600/80 border-2 border-gray-200 dark:border-gray-600 rounded-2xl flex items-center justify-center transition-all duration-300 hover:bg-gradient-to-br hover:from-gray-200/80 hover:to-gray-300/80 dark:hover:from-gray-600/80 dark:hover:to-gray-500/80 shadow-inner">
                  {formData.icon && formData.icon.startsWith('http') ? (
                    <img 
                      src={formData.icon} 
                      alt="Icon preview"
                      className="w-10 h-10 object-contain drop-shadow-sm"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  ) : (
                    <span className="text-3xl drop-shadow-sm">{formData.icon || '🎨'}</span>
                  )}
                </div>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 flex items-center gap-2">
                <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                Use an emoji (🎨) or image URL (https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg)
              </p>
            </div>
          </div>

          {/* Enhanced Skill Level */}
          <div className="group">
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-4 flex items-center gap-3">
              <div className="w-3 h-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full shadow-sm"></div>
              <span className="tracking-wide">Skill Level:</span>
              <span className="text-lg font-bold text-white bg-gradient-to-r from-blue-500 to-purple-500 px-4 py-1 rounded-full shadow-lg">{formData.proficiency}%</span>
            </label>
            <div className="relative">
              <input
                type="range"
                name="proficiency"
                value={formData.proficiency}
                onChange={handleInputChange}
                min="1"
                max="100"
                className="w-full h-4 bg-gray-200 dark:bg-gray-700 rounded-2xl appearance-none cursor-pointer slider focus:outline-none focus:ring-4 focus:ring-green-500/20 transition-all"
                style={{
                  background: `linear-gradient(to right, #3b82f6 0%, #8b5cf6 ${formData.proficiency/2}%, #ec4899 ${formData.proficiency}%, #e5e7eb ${formData.proficiency}%, #e5e7eb 100%)`
                }}
              />
              <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-3 px-2">
                <span className="flex flex-col items-start">
                  <span className="font-bold text-sm">Beginner</span>
                  <span className="text-gray-400">1-69%</span>
                </span>
                <span className="flex flex-col items-center">
                  <span className="font-bold text-sm">Intermediate</span>
                  <span className="text-gray-400">70-79%</span>
                </span>
                <span className="flex flex-col items-center">
                  <span className="font-bold text-sm">Advanced</span>
                  <span className="text-gray-400">80-89%</span>
                </span>
                <span className="flex flex-col items-end">
                  <span className="font-bold text-sm">Expert</span>
                  <span className="text-gray-400">90-100%</span>
                </span>
              </div>
            </div>
          </div>

          {/* Enhanced Experience */}
          <div className="group">
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-3">
              <div className="w-3 h-3 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full shadow-sm"></div>
              <span className="tracking-wide">Experience</span>
            </label>
            <input
              type="text"
              name="experience"
              value={formData.experience}
              onChange={handleInputChange}
              className="w-full px-5 py-4 bg-gray-50/80 dark:bg-gray-800/80 border-2 border-gray-200 dark:border-gray-600 rounded-2xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 hover:bg-gray-100/80 dark:hover:bg-gray-700/80 hover:border-gray-300 dark:hover:border-gray-500"
              placeholder="e.g., 2+ years, 6 months"
            />
          </div>

          {/* Enhanced Description */}
          <div className="group">
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-3">
              <div className="w-3 h-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full shadow-sm"></div>
              <span className="tracking-wide">Description</span>
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-5 py-4 bg-gray-50/80 dark:bg-gray-800/80 border-2 border-gray-200 dark:border-gray-600 rounded-2xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300 hover:bg-gray-100/80 dark:hover:bg-gray-700/80 hover:border-gray-300 dark:hover:border-gray-500 resize-none"
              placeholder="Brief description of your expertise in this skill..."
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 flex items-center gap-2">
              <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
              Describe your experience, projects, or achievements with this skill.
            </p>
          </div>

          {/* Enhanced Submit Buttons */}
          <div className="flex gap-4 pt-6 border-t border-gray-200/50 dark:border-gray-700/50">
            <motion.button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-4 bg-gray-100/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 rounded-2xl font-bold hover:bg-gray-200/80 dark:hover:bg-gray-700/80 transition-all duration-300 border-2 border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              Cancel
            </motion.button>
            <motion.button
              type="submit"
              disabled={isSubmitting || !formData.name.trim()}
              className="flex-1 px-6 py-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white rounded-2xl font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-2xl hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 transition-all duration-300 relative overflow-hidden group shadow-xl"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="absolute inset-0 bg-white/20 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out"></div>
              {isSubmitting ? (
                <div className="flex items-center justify-center gap-2 relative z-10">
                  <motion.div
                    className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                  <span>Saving...</span>
                </div>
              ) : (
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <span>{editingSkill ? '✏️ Update Skill' : '✨ Add Skill'}</span>
                </span>
              )}
            </motion.button>
          </div>
        </form>
        </div>
      </motion.div>
    </motion.div>
  );
}
