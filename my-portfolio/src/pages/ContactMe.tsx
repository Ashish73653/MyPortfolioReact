import { motion } from "framer-motion";
import { useState } from "react";
import emailjs from '@emailjs/browser';
import { trackContactFormSubmission, trackExternalLink } from "../utils/analytics";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface SocialLink {
  name: string;
  icon: string;
  url: string;
  color: string;
  hoverColor: string;
  description: string;
}

export default function ContactMe() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const socialLinks: SocialLink[] = [
    {
      name: "GitHub",
      icon: "🐙",
      url: "https://github.com/Ashish73653",
      color: "from-gray-700 to-gray-900",
      hoverColor: "from-gray-600 to-gray-800",
      description: "Check out my code"
    },
    {
      name: "LinkedIn",
      icon: "💼",
      url: "https://linkedin.com/in/ashish73653",
      color: "from-blue-600 to-blue-800",
      hoverColor: "from-blue-500 to-blue-700",
      description: "Professional network"
    },
    {
      name: "Email",
      icon: "✉️",
      url: "mailto:ash1sh.1hakur10@gmail.com",
      color: "from-red-500 to-pink-600",
      hoverColor: "from-red-400 to-pink-500",
      description: "Send me an email"
    },
    {
      name: "Twitter",
      icon: "🐦",
      url: "https://twitter.com/ashish73653",
      color: "from-sky-400 to-blue-500",
      hoverColor: "from-sky-300 to-blue-400",
      description: "Follow me on X"
    },
    {
      name: "Discord",
      icon: "🎮",
      url: "https://discord.gg/ashish73653",
      color: "from-indigo-500 to-purple-600",
      hoverColor: "from-indigo-400 to-purple-500",
      description: "Chat with me"
    },
    {
      name: "WhatsApp",
      icon: "📱",
      url: "https://wa.me/1234567890",
      color: "from-green-500 to-emerald-600",
      hoverColor: "from-green-400 to-emerald-500",
      description: "Quick message"
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error message when user starts typing
    if (errorMessage) setErrorMessage('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset error message
    setErrorMessage('');
    
    // Basic validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.subject.trim() || !formData.message.trim()) {
      setSubmitStatus('error');
      setErrorMessage('Please fill in all fields');
      setTimeout(() => setSubmitStatus('idle'), 3000);
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setSubmitStatus('error');
      setErrorMessage('Please enter a valid email address');
      setTimeout(() => setSubmitStatus('idle'), 3000);
      return;
    }

    setIsSubmitting(true);
    
    try {
      // EmailJS configuration
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      console.log('EmailJS Config:', {
        serviceId: serviceId ? 'Set' : 'Missing',
        templateId: templateId ? 'Set' : 'Missing',
        publicKey: publicKey ? 'Set' : 'Missing'
      });

      // Check if EmailJS is configured
      if (!serviceId || !templateId || !publicKey) {
        console.error('EmailJS configuration missing:', {
          serviceId: !!serviceId,
          templateId: !!templateId,
          publicKey: !!publicKey
        });
        setSubmitStatus('error');
        setErrorMessage('Email service not configured. Please try again later.');
        return;
      }

      // Prepare template parameters
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
        to_name: 'Ashish',
        reply_to: formData.email,
        timestamp: new Date().toLocaleString(),
      };

      console.log('Sending email with params:', templateParams);

      // Send email using EmailJS
      const result = await emailjs.send(serviceId, templateId, templateParams, publicKey);
      
      console.log('EmailJS Result:', result);
      
      if (result.status === 200) {
        setSubmitStatus('success');
        setFormData({ name: "", email: "", subject: "", message: "" });
        console.log('Email sent successfully!', result);
        
        // Track successful contact form submission
        trackContactFormSubmission('email');
      } else {
        throw new Error(`EmailJS returned status: ${result.status}`);
      }
    } catch (error) {
      console.error('Error sending email:', error);
      setSubmitStatus('error');
      
      // More specific error messages
      if (error instanceof Error) {
        if (error.message.includes('400')) {
          setErrorMessage('Invalid email configuration. Please check your template settings.');
        } else if (error.message.includes('401') || error.message.includes('403')) {
          setErrorMessage('Email service authentication failed. Please check your API keys.');
        } else if (error.message.includes('404')) {
          setErrorMessage('Email template not found. Please check your template ID.');
        } else {
          setErrorMessage('Failed to send email. Please try again or contact me directly.');
        }
      } else {
        setErrorMessage('Network error. Please check your internet connection and try again.');
      }
    } finally {
      setIsSubmitting(false);
      setTimeout(() => {
        setSubmitStatus('idle');
        setErrorMessage('');
      }, 5000);
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
        ease: "easeOut" as const
      }
    }
  };

  return (
    <motion.div
      className="min-h-screen w-full relative bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900 overflow-x-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={`bg-${i}`}
            className={`absolute w-2 h-2 rounded-full ${
              i % 5 === 0 
                ? "bg-blue-400/20" 
                : i % 5 === 1 
                ? "bg-purple-400/20" 
                : i % 5 === 2
                ? "bg-pink-400/20"
                : i % 5 === 3
                ? "bg-green-400/20"
                : "bg-yellow-400/20"
            }`}
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
              scale: [1, 2, 1],
              opacity: [0.1, 0.4, 0.1],
            }}
            transition={{
              duration: 15 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              repeatType: "loop"
            }}
            style={{
              left: `${5 + i * 8}%`,
              top: `${10 + (i * 7)}%`,
            }}
          />
        ))}
        
        {/* Floating geometric shapes */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`shape-${i}`}
            className={`absolute ${
              i % 3 === 0 ? "w-16 h-16 rounded-full" :
              i % 3 === 1 ? "w-12 h-12 rounded-lg rotate-45" :
              "w-20 h-1 rounded-full"
            } ${
              i % 4 === 0 ? "bg-gradient-to-r from-blue-500/10 to-purple-500/10" :
              i % 4 === 1 ? "bg-gradient-to-r from-pink-500/10 to-orange-500/10" :
              i % 4 === 2 ? "bg-gradient-to-r from-green-500/10 to-teal-500/10" :
              "bg-gradient-to-r from-yellow-500/10 to-red-500/10"
            }`}
            animate={{
              rotate: [0, 360],
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 20 + i * 3,
              repeat: Infinity,
              ease: "linear",
              repeatType: "loop"
            }}
            style={{
              right: `${10 + i * 12}%`,
              top: `${20 + (i * 10)}%`,
            }}
          />
        ))}
      </div>

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
                className="bg-gradient-to-r from-blue-600 via-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                style={{ backgroundSize: "300% 300%" }}
              >
                Let's Connect
              </motion.span>
            </motion.h1>
            <motion.p
              className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Have a project in mind? Want to collaborate? Or just want to say hello? 
              I'd love to hear from you! Let's create something amazing together.
            </motion.p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Contact Form */}
            <motion.div
              className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-lg rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/30 dark:border-gray-700/30 relative overflow-hidden"
              variants={itemVariants}
              whileHover={{ y: -5, scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {/* Form background effects */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 rounded-3xl" />
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
              
              <div className="relative z-10">
                <motion.h2
                  className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <motion.span
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    💌
                  </motion.span>
                  Send Message
                </motion.h2>

                {/* Error Message Display */}
                {errorMessage && (
                  <motion.div
                    className="mb-4 p-4 bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-xl text-red-700 dark:text-red-300"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <p className="flex items-center gap-2">
                      <span>⚠️</span>
                      {errorMessage}
                    </p>
                  </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name Field */}
                  <motion.div
                    className="relative"
                    whileHover={{ scale: 1.01 }}
                  >
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField(null)}
                      required
                      aria-label="Your full name"
                      className={`w-full px-4 py-4 bg-gray-50/80 dark:bg-gray-700/80 backdrop-blur-sm border-2 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-300 focus:outline-none focus:ring-0 ${
                        focusedField === 'name'
                          ? 'border-blue-500 shadow-lg shadow-blue-500/25'
                          : 'border-gray-200 dark:border-gray-600'
                      }`}
                      placeholder="Your Name"
                    />
                    <motion.div
                      className="absolute right-3 top-1/2 transform -translate-y-1/2"
                      animate={{ scale: focusedField === 'name' ? 1.1 : 1 }}
                    >
                      👤
                    </motion.div>
                  </motion.div>

                  {/* Email Field */}
                  <motion.div
                    className="relative"
                    whileHover={{ scale: 1.01 }}
                  >
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      required
                      aria-label="Your email address"
                      className={`w-full px-4 py-4 bg-gray-50/80 dark:bg-gray-700/80 backdrop-blur-sm border-2 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-300 focus:outline-none focus:ring-0 ${
                        focusedField === 'email'
                          ? 'border-purple-500 shadow-lg shadow-purple-500/25'
                          : 'border-gray-200 dark:border-gray-600'
                      }`}
                      placeholder="your.email@example.com"
                    />
                    <motion.div
                      className="absolute right-3 top-1/2 transform -translate-y-1/2"
                      animate={{ scale: focusedField === 'email' ? 1.1 : 1 }}
                    >
                      📧
                    </motion.div>
                  </motion.div>

                  {/* Subject Field */}
                  <motion.div
                    className="relative"
                    whileHover={{ scale: 1.01 }}
                  >
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField('subject')}
                      onBlur={() => setFocusedField(null)}
                      required
                      aria-label="Message subject"
                      className={`w-full px-4 py-4 bg-gray-50/80 dark:bg-gray-700/80 backdrop-blur-sm border-2 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-300 focus:outline-none focus:ring-0 ${
                        focusedField === 'subject'
                          ? 'border-pink-500 shadow-lg shadow-pink-500/25'
                          : 'border-gray-200 dark:border-gray-600'
                      }`}
                      placeholder="Subject"
                    />
                    <motion.div
                      className="absolute right-3 top-1/2 transform -translate-y-1/2"
                      animate={{ scale: focusedField === 'subject' ? 1.1 : 1 }}
                    >
                      💡
                    </motion.div>
                  </motion.div>

                  {/* Message Field */}
                  <motion.div
                    className="relative"
                    whileHover={{ scale: 1.01 }}
                  >
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField('message')}
                      onBlur={() => setFocusedField(null)}
                      required
                      rows={6}
                      aria-label="Your message"
                      className={`w-full px-4 py-4 bg-gray-50/80 dark:bg-gray-700/80 backdrop-blur-sm border-2 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-300 focus:outline-none focus:ring-0 resize-none ${
                        focusedField === 'message'
                          ? 'border-green-500 shadow-lg shadow-green-500/25'
                          : 'border-gray-200 dark:border-gray-600'
                      }`}
                      placeholder="Your message here..."
                    />
                    <motion.div
                      className="absolute right-3 top-4"
                      animate={{ scale: focusedField === 'message' ? 1.1 : 1 }}
                    >
                      💬
                    </motion.div>
                  </motion.div>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white py-4 px-6 rounded-xl font-bold text-lg shadow-lg hover:shadow-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {/* Button background animation */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500"
                      animate={{
                        x: isSubmitting ? ["-100%", "100%"] : "0%",
                      }}
                      transition={{
                        duration: isSubmitting ? 1.5 : 0,
                        repeat: isSubmitting ? Infinity : 0,
                        ease: "easeInOut"
                      }}
                    />
                    
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {isSubmitting ? (
                        <>
                          <motion.div
                            className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          />
                          Sending...
                        </>
                      ) : submitStatus === 'success' ? (
                        <>
                          <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 500 }}
                          >
                            ✅
                          </motion.span>
                          Message Sent!
                        </>
                      ) : submitStatus === 'error' ? (
                        <>
                          <motion.span
                            animate={{ rotate: [0, 10, -10, 0] }}
                            transition={{ duration: 0.5 }}
                          >
                            ❌
                          </motion.span>
                          Try Again
                        </>
                      ) : (
                        <>
                          <motion.span
                            animate={{ rotate: [0, 10, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            🚀
                          </motion.span>
                          Send Message
                        </>
                      )}
                    </span>
                  </motion.button>
                </form>
              </div>
            </motion.div>

            {/* Contact Info & Social Links */}
            <div className="space-y-8">
              {/* Contact Information Card */}
              <motion.div
                className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-lg rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/30 dark:border-gray-700/30 relative overflow-hidden"
                variants={itemVariants}
                whileHover={{ y: -5, scale: 1.01 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-blue-500/5 to-purple-500/5 rounded-3xl" />
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 via-blue-500 to-purple-500" />
                
                <div className="relative z-10">
                  <motion.h3
                    className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <motion.span
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      📞
                    </motion.span>
                    Get In Touch
                  </motion.h3>

                  <div className="space-y-4">
                    <motion.div
                      className="flex items-center gap-4 p-4 bg-gray-50/80 dark:bg-gray-700/80 rounded-xl hover:bg-gray-100/80 dark:hover:bg-gray-600/80 transition-all duration-300"
                      whileHover={{ scale: 1.02, x: 5 }}
                    >
                      <div className="text-2xl">📧</div>
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">Email</p>
                        <p className="text-gray-600 dark:text-gray-300">ash1sh.1hakur10@gmail.com</p>
                      </div>
                    </motion.div>

                    <motion.div
                      className="flex items-center gap-4 p-4 bg-gray-50/80 dark:bg-gray-700/80 rounded-xl hover:bg-gray-100/80 dark:hover:bg-gray-600/80 transition-all duration-300"
                      whileHover={{ scale: 1.02, x: 5 }}
                    >
                      <div className="text-2xl">📍</div>
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">Location</p>
                        <p className="text-gray-600 dark:text-gray-300">India</p>
                      </div>
                    </motion.div>

                    <motion.div
                      className="flex items-center gap-4 p-4 bg-gray-50/80 dark:bg-gray-700/80 rounded-xl hover:bg-gray-100/80 dark:hover:bg-gray-600/80 transition-all duration-300"
                      whileHover={{ scale: 1.02, x: 5 }}
                    >
                      <div className="text-2xl">⏰</div>
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">Response Time</p>
                        <p className="text-gray-600 dark:text-gray-300">Usually within 24 hours</p>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>

              {/* Social Links */}
              <motion.div
                className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-lg rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/30 dark:border-gray-700/30 relative overflow-hidden"
                variants={itemVariants}
                whileHover={{ y: -5, scale: 1.01 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-pink-500/5 to-orange-500/5 rounded-3xl" />
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500" />
                
                <div className="relative z-10">
                  <motion.h3
                    className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <motion.span
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    >
                      🌐
                    </motion.span>
                    Connect With Me
                  </motion.h3>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {socialLinks.map((link, index) => (
                      <motion.a
                        key={link.name}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => trackExternalLink(link.url, link.name.toLowerCase())}
                        className={`group bg-gradient-to-r ${link.color} text-white p-4 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col items-center gap-2 relative overflow-hidden`}
                        whileHover={{ 
                          scale: 1.05, 
                          y: -5,
                          rotate: [0, 1, -1, 0]
                        }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 + index * 0.1 }}
                      >
                        {/* Hover effect overlay */}
                        <motion.div
                          className={`absolute inset-0 bg-gradient-to-r ${link.hoverColor} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl`}
                        />
                        
                        <motion.div
                          className="relative z-10 text-2xl"
                          animate={{ 
                            scale: [1, 1.1, 1],
                            rotate: [0, 5, -5, 0]
                          }}
                          transition={{ 
                            duration: 3, 
                            repeat: Infinity,
                            delay: index * 0.2
                          }}
                        >
                          {link.icon}
                        </motion.div>
                        <div className="relative z-10 text-center">
                          <p className="font-bold text-sm">{link.name}</p>
                          <p className="text-xs opacity-90 group-hover:opacity-100 transition-opacity">
                            {link.description}
                          </p>
                        </div>

                        {/* Ripple effect on click */}
                        <motion.div
                          className="absolute inset-0 bg-white/20 rounded-xl scale-0"
                          whileTap={{ scale: [0, 1], opacity: [0.5, 0] }}
                          transition={{ duration: 0.3 }}
                        />
                      </motion.a>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Bottom CTA Section */}
          <motion.div
            className="text-center mt-16"
            variants={itemVariants}
          >
            <motion.div
              className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-8 text-white relative overflow-hidden"
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 opacity-0 hover:opacity-20 transition-opacity duration-500"
                animate={{
                  background: [
                    "linear-gradient(45deg, #06b6d4, #8b5cf6, #ec4899)",
                    "linear-gradient(225deg, #ec4899, #06b6d4, #8b5cf6)",
                    "linear-gradient(45deg, #06b6d4, #8b5cf6, #ec4899)",
                  ]
                }}
                transition={{ duration: 8, repeat: Infinity }}
              />
              
              <div className="relative z-10">
                <motion.h3
                  className="text-2xl md:text-3xl font-bold mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  Ready to Start a Project?
                </motion.h3>
                <motion.p
                  className="text-lg opacity-90 mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  Let's discuss your ideas and bring them to life!
                </motion.p>
                <motion.div
                  className="flex flex-wrap justify-center gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                >
                  <motion.button
                    className="bg-white text-gray-900 px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      const form = document.querySelector('form');
                      if (form) {
                        form.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                  >
                    Send Message 💌
                  </motion.button>
                  <motion.a
                    href="mailto:ash1sh.1hakur10@gmail.com"
                    className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-xl font-semibold hover:bg-white hover:text-gray-900 transition-all duration-300"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Quick Email 📧
                  </motion.a>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}