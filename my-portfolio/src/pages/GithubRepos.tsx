import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface Repository {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  watchers_count: number;
  open_issues_count: number;
  created_at: string;
  updated_at: string;
  topics: string[];
  size: number;
  private: boolean;
}

interface GitHubStats {
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
}

export default function GithubRepos() {
  const [repos, setRepos] = useState<Repository[]>([]);
  const [stats, setStats] = useState<GitHubStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("updated");

  // Try environment variables first, fallback to hardcoded values for testing
  const username = import.meta.env.VITE_GITHUB_USERNAME || "Ashish73653";
  const token = import.meta.env.VITE_GITHUB_TOKEN;

  useEffect(() => {
    const fetchGitHubData = async () => {
      console.log('Fetching GitHub data for:', username);
      
      if (!username) {
        setError("GitHub username not configured");
        setLoading(false);
        return;
      }

      try {
        const headers: Record<string, string> = {
          'Accept': 'application/vnd.github.v3+json',
        };
        
        if (token) {
          headers['Authorization'] = `token ${token}`;
        }

        // Fetch user stats
        const userResponse = await fetch(`https://api.github.com/users/${username}`, { headers });
        if (userResponse.ok) {
          const userData = await userResponse.json();
          setStats({
            public_repos: userData.public_repos,
            public_gists: userData.public_gists,
            followers: userData.followers,
            following: userData.following,
          });
        }

        // Fetch repositories
        const reposResponse = await fetch(
          `https://api.github.com/users/${username}/repos?per_page=100&sort=${sortBy}&direction=desc`,
          { headers }
        );
        
        if (!reposResponse.ok) {
          // Try without authentication as fallback
          const fallbackResponse = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`);
          if (fallbackResponse.ok) {
            const fallbackData = await fallbackResponse.json();
            setRepos(fallbackData);
            console.log('Successfully fetched', fallbackData.length, 'repositories');
            return;
          }
          throw new Error(`GitHub API error: ${reposResponse.status}`);
        }

        const reposData = await reposResponse.json();
        setRepos(reposData);
        console.log('Successfully fetched', reposData.length, 'repositories');
      } catch (err) {
        console.error('Error fetching GitHub data:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch repositories');
      } finally {
        setLoading(false);
      }
    };

    fetchGitHubData();
  }, [username, token, sortBy]);

  const getLanguageColor = (language: string | null): string => {
    const colors: Record<string, string> = {
      JavaScript: "#F7DF1E",
      TypeScript: "#3178C6",
      Python: "#3776AB",
      Java: "#ED8B00",
      "C++": "#00599C",
      HTML: "#E34F26",
      CSS: "#1572B6",
      React: "#61DAFB",
      Vue: "#4FC08D",
      PHP: "#777BB4",
      Ruby: "#CC342D",
      Go: "#00ADD8",
      Rust: "#000000",
      Swift: "#FA7343",
      Kotlin: "#7F52FF",
    };
    return colors[language || ""] || "#6B7280";
  };

  const filteredRepos = repos.filter(repo => {
    if (filter === "all") return true;
    if (filter === "public") return !repo.private;
    if (filter === "starred") return repo.stargazers_count > 0;
    if (filter === "forked") return repo.forks_count > 0;
    return true;
  });

  if (loading) {
    return (
      <motion.div
        className="min-h-screen w-full relative bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="text-center">
          <motion.div
            className="inline-block w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <motion.p 
            className="mt-4 text-lg text-gray-600 dark:text-gray-300"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Fetching repositories from GitHub...
          </motion.p>
        </div>
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div
        className="min-h-screen w-full relative bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="text-center">
          <motion.div
            className="text-4xl mb-4"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            😅
          </motion.div>
          <h2 className="text-xl font-bold text-red-600 dark:text-red-400 mb-2">
            Oops! Something went wrong
          </h2>
          <p className="text-gray-600 dark:text-gray-300">{error}</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="min-h-screen w-full relative bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-1 h-1 rounded-full ${
              i % 4 === 0 
                ? "bg-blue-400/10" 
                : i % 4 === 1 
                ? "bg-purple-400/10" 
                : i % 4 === 2
                ? "bg-green-400/10"
                : "bg-indigo-400/10"
            }`}
            animate={{
              x: [0, 50, 0],
              y: [0, -50, 0],
              scale: [1, 1.5, 1],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 20 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              left: `${10 + i * 9}%`,
              top: `${15 + (i * 8)}%`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 w-full h-full px-2 sm:px-4 lg:px-8 pt-2 pb-6">
        {/* Compact Header */}
        <motion.div 
          className="text-center mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.h1 
            className="text-3xl lg:text-4xl font-bold mb-1"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <motion.span 
              className="bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent"
              animate={{ 
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              style={{ backgroundSize: "200% 200%" }}
            >
              GitHub Portfolio
            </motion.span>
          </motion.h1>
          <motion.p 
            className="text-base text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {filteredRepos.length} repositories • Open source projects & contributions
          </motion.p>
        </motion.div>

        {/* Compact GitHub Stats */}
        {stats && (
          <motion.div 
            className="grid grid-cols-4 gap-1.5 sm:gap-2 mb-4 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {[
              { label: "Repos", value: stats.public_repos, icon: "📁", color: "from-blue-500 to-cyan-500" },
              { label: "Stars", value: filteredRepos.reduce((acc, repo) => acc + repo.stargazers_count, 0), icon: "⭐", color: "from-yellow-500 to-orange-500" },
              { label: "Forks", value: filteredRepos.reduce((acc, repo) => acc + repo.forks_count, 0), icon: "🍴", color: "from-green-500 to-teal-500" },
              { label: "Languages", value: new Set(filteredRepos.map(repo => repo.language).filter(Boolean)).size, icon: "�", color: "from-purple-500 to-pink-500" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-lg p-2 sm:p-3 shadow-md border border-white/30 text-center"
                whileHover={{ scale: 1.05, y: -3 }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 + 0.3 }}
              >
                <motion.div 
                  className="text-lg sm:text-xl mb-0.5 sm:mb-1"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                >
                  {stat.icon}
                </motion.div>
                <motion.div 
                  className={`text-base sm:text-xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-0.5`}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", delay: 0.3 + index * 0.05 }}
                >
                  {stat.value}
                </motion.div>
                <div className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Compact Filters and Sort */}
        <motion.div 
          className="flex flex-col gap-2 mb-4 mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="flex flex-wrap gap-1.5 sm:gap-2 justify-center">
            {[
              { key: "all", label: "All", icon: "📁" },
              { key: "starred", label: "Starred", icon: "⭐" },
              { key: "forked", label: "Forked", icon: "🍴" }
            ].map((filterOption) => (
              <motion.button
                key={filterOption.key}
                onClick={() => setFilter(filterOption.key)}
                className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded text-xs sm:text-sm font-medium transition-all duration-300 flex items-center gap-1 sm:gap-1.5 ${
                  filter === filterOption.key
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md"
                    : "bg-white/70 dark:bg-gray-800/70 backdrop-blur-md text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-700 shadow-sm"
                }`}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <span className="text-xs">{filterOption.icon}</span>
                <span className="hidden sm:inline">{filterOption.label}</span>
              </motion.button>
            ))}
          </div>
          
          <div className="flex justify-center">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm rounded bg-white/70 dark:bg-gray-800/70 backdrop-blur-md border border-white/20 text-gray-700 dark:text-gray-300 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="updated">Recent</option>
              <option value="created">New</option>
              <option value="pushed">Active</option>
              <option value="full_name">A-Z</option>
            </select>
          </div>
        </motion.div>

        {/* Repository Grid */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-5 lg:gap-6 w-full mx-auto mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          {filteredRepos.length > 0 ? (
            filteredRepos.map((repo, index) => (
              <motion.div
                key={repo.id}
                className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-2xl p-5 shadow-xl border border-white/30 dark:border-gray-700/30 hover:shadow-2xl transition-all duration-500 w-full flex flex-col h-full group relative overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 + 0.7 }}
                whileHover={{ 
                  y: -10, 
                  scale: 1.03,
                  boxShadow: "0 30px 60px rgba(0, 0, 0, 0.25)",
                  borderColor: "rgba(255, 255, 255, 0.5)"
                }}
              >
                {/* Enhanced gradient border effect with multiple layers */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 via-purple-500/30 via-pink-500/30 to-orange-500/30 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-sm" />
                <div className="absolute inset-[1px] bg-gradient-to-br from-cyan-400/20 via-violet-500/20 to-fuchsia-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-700 delay-100" />
                
                {/* Repository Header */}
                <div className="relative z-10 flex items-start justify-between mb-4">
                  <div className="flex-1 min-w-0 pr-2">
                    <motion.h3 
                      className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-all duration-300"
                      whileHover={{ scale: 1.02 }}
                    >
                      <a 
                        href={repo.html_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 group/link"
                      >
                        <motion.span 
                          className="text-lg filter drop-shadow-md"
                          animate={{ 
                            rotate: [0, 3, -3, 0],
                            scale: [1, 1.05, 1]
                          }}
                          transition={{ 
                            duration: 6, 
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        >
                          📁
                        </motion.span>
                        <span className="truncate font-bold tracking-tight">{repo.name}</span>
                        <motion.span 
                          className="text-sm opacity-0 group-hover/link:opacity-100 transition-all duration-300 filter drop-shadow-sm"
                          whileHover={{ scale: 1.3, x: 3 }}
                          animate={{ 
                            y: [0, -1, 0],
                          }}
                          transition={{ 
                            duration: 2, 
                            repeat: Infinity,
                            delay: 0.5
                          }}
                        >
                          ↗️
                        </motion.span>
                      </a>
                    </motion.h3>
                  </div>
                  {repo.private && (
                    <motion.span 
                      className="bg-gradient-to-r from-yellow-100 to-amber-100 dark:from-yellow-900/40 dark:to-amber-900/40 text-yellow-800 dark:text-yellow-300 px-3 py-1.5 rounded-full text-xs font-bold flex-shrink-0 flex items-center gap-1.5 shadow-sm border border-yellow-200/50 dark:border-yellow-800/30"
                      whileHover={{ scale: 1.08, y: -1 }}
                      initial={{ rotate: -2 }}
                      animate={{ rotate: [2, -2, 2] }}
                      transition={{ duration: 4, repeat: Infinity }}
                    >
                      <motion.span
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        🔒
                      </motion.span>
                      <span className="hidden sm:inline font-semibold">Private</span>
                    </motion.span>
                  )}
                </div>

                {/* Description - Fixed height container with better styling */}
                <div className="relative z-10 flex-1 mb-5">
                  {repo.description ? (
                    <motion.div 
                      className="bg-gradient-to-br from-gray-50/80 to-gray-100/80 dark:from-gray-700/50 dark:to-gray-800/50 rounded-xl p-4 border border-gray-200/30 dark:border-gray-600/30 backdrop-blur-sm"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.02 + 0.1 }}
                      whileHover={{ scale: 1.01 }}
                    >
                      <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed h-16 overflow-hidden font-medium">
                        {repo.description.length > 100 ? repo.description.substring(0, 100) + '...' : repo.description}
                      </p>
                    </motion.div>
                  ) : (
                    <motion.div 
                      className="h-16 flex items-center justify-center bg-gradient-to-br from-gray-50/50 to-gray-100/50 dark:from-gray-700/30 dark:to-gray-800/30 rounded-xl border border-gray-200/20 dark:border-gray-600/20 backdrop-blur-sm"
                      whileHover={{ scale: 1.01 }}
                    >
                      <p className="text-gray-400 dark:text-gray-500 text-sm italic font-medium flex items-center gap-2">
                        <motion.span
                          animate={{ opacity: [0.5, 1, 0.5] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          📝
                        </motion.span>
                        No description available
                      </p>
                    </motion.div>
                  )}
                </div>

                {/* Topics with enhanced styling */}
                <div className="relative z-10 mb-5">
                  {repo.topics && repo.topics.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {repo.topics.slice(0, 3).map((topic, topicIndex) => (
                        <motion.span
                          key={topic}
                          className="px-3 py-1.5 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 dark:from-blue-400/30 dark:via-purple-400/30 dark:to-pink-400/30 text-blue-800 dark:text-blue-300 rounded-full text-xs font-bold border border-blue-200/30 dark:border-blue-700/30 backdrop-blur-sm shadow-sm"
                          whileHover={{ 
                            scale: 1.08, 
                            y: -2,
                            boxShadow: "0 8px 16px rgba(59, 130, 246, 0.3)"
                          }}
                          initial={{ scale: 0, rotate: -10 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ 
                            delay: index * 0.02 + topicIndex * 0.05 + 0.2,
                            type: "spring",
                            stiffness: 200
                          }}
                        >
                          <motion.span
                            animate={{ 
                              textShadow: [
                                "0 0 0px rgba(59, 130, 246, 0)",
                                "0 0 8px rgba(59, 130, 246, 0.5)",
                                "0 0 0px rgba(59, 130, 246, 0)"
                              ]
                            }}
                            transition={{ duration: 3, repeat: Infinity, delay: topicIndex * 0.5 }}
                          >
                            #{topic}
                          </motion.span>
                        </motion.span>
                      ))}
                      {repo.topics.length > 3 && (
                        <motion.span 
                          className="px-3 py-1.5 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 text-gray-600 dark:text-gray-300 rounded-full text-xs font-bold border border-gray-300/30 dark:border-gray-500/30 shadow-sm"
                          whileHover={{ scale: 1.08, y: -2 }}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: index * 0.02 + 0.4 }}
                        >
                          +{repo.topics.length - 3} more
                        </motion.span>
                      )}
                    </div>
                  ) : (
                    <div className="h-8 flex items-center">
                      <motion.div 
                        className="px-3 py-1.5 bg-gray-100/50 dark:bg-gray-700/50 text-gray-400 dark:text-gray-500 rounded-full text-xs font-medium border border-gray-200/30 dark:border-gray-600/30"
                        animate={{ opacity: [0.5, 0.8, 0.5] }}
                        transition={{ duration: 3, repeat: Infinity }}
                      >
                        🏷️ No topics
                      </motion.div>
                    </div>
                  )}
                </div>

                {/* Repository Stats with enhanced visual appeal */}
                <div className="relative z-10 flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-5">
                  <div className="flex items-center gap-2">
                    {repo.language && (
                      <motion.div 
                        className="flex items-center gap-2 bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm px-3 py-2 rounded-xl shadow-sm border border-gray-200/30 dark:border-gray-600/30"
                        whileHover={{ 
                          scale: 1.05, 
                          y: -2,
                          boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)"
                        }}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: index * 0.02 + 0.3 }}
                      >
                        <motion.div 
                          className="w-3 h-3 rounded-full shadow-md border border-white/50"
                          style={{ backgroundColor: getLanguageColor(repo.language) }}
                          animate={{ 
                            scale: [1, 1.1, 1],
                            boxShadow: [
                              "0 0 0px rgba(0, 0, 0, 0)",
                              `0 0 8px ${getLanguageColor(repo.language)}40`,
                              "0 0 0px rgba(0, 0, 0, 0)"
                            ]
                          }}
                          transition={{ duration: 2, repeat: Infinity, delay: index * 0.1 }}
                        />
                        <span className="font-bold text-xs tracking-wide">{repo.language}</span>
                      </motion.div>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <motion.div 
                      className="flex items-center gap-1.5 bg-gradient-to-r from-yellow-100/80 to-amber-100/80 dark:from-yellow-900/40 dark:to-amber-900/40 backdrop-blur-sm px-3 py-2 rounded-xl shadow-sm border border-yellow-200/30 dark:border-yellow-800/30"
                      whileHover={{ 
                        scale: 1.05, 
                        y: -2,
                        boxShadow: "0 8px 16px rgba(251, 191, 36, 0.3)"
                      }}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: index * 0.02 + 0.4 }}
                    >
                      <motion.span
                        animate={{ 
                          rotate: [0, 10, -10, 0],
                          scale: [1, 1.1, 1]
                        }}
                        transition={{ duration: 3, repeat: Infinity }}
                      >
                        ⭐
                      </motion.span>
                      <span className="font-bold text-yellow-800 dark:text-yellow-300">{repo.stargazers_count}</span>
                    </motion.div>
                    <motion.div 
                      className="flex items-center gap-1.5 bg-gradient-to-r from-green-100/80 to-emerald-100/80 dark:from-green-900/40 dark:to-emerald-900/40 backdrop-blur-sm px-3 py-2 rounded-xl shadow-sm border border-green-200/30 dark:border-green-800/30"
                      whileHover={{ 
                        scale: 1.05, 
                        y: -2,
                        boxShadow: "0 8px 16px rgba(34, 197, 94, 0.3)"
                      }}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: index * 0.02 + 0.5 }}
                    >
                      <motion.span
                        animate={{ 
                          rotate: [0, -10, 10, 0],
                          scale: [1, 1.1, 1]
                        }}
                        transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
                      >
                        🍴
                      </motion.span>
                      <span className="font-bold text-green-800 dark:text-green-300">{repo.forks_count}</span>
                    </motion.div>
                  </div>
                </div>

                {/* Repository Actions - Always at bottom with enhanced styling */}
                <div className="relative z-10 mt-auto pt-3">
                  <div className="flex gap-3">
                    <motion.a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 text-white py-3 px-5 rounded-xl text-center text-sm font-bold hover:shadow-2xl transition-all duration-500 flex items-center justify-center gap-2 group/btn relative overflow-hidden border border-blue-500/30"
                      whileHover={{ 
                        scale: 1.03, 
                        y: -3,
                        boxShadow: "0 20px 40px rgba(59, 130, 246, 0.4)"
                      }}
                      whileTap={{ scale: 0.97 }}
                      initial={{ y: 30, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: index * 0.02 + 0.6, type: "spring" }}
                    >
                      {/* Animated background gradient */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 opacity-0 group-hover/btn:opacity-20 transition-opacity duration-500"
                        animate={{
                          background: [
                            "linear-gradient(45deg, #06b6d4, #8b5cf6, #ec4899)",
                            "linear-gradient(225deg, #ec4899, #06b6d4, #8b5cf6)",
                            "linear-gradient(45deg, #06b6d4, #8b5cf6, #ec4899)",
                          ]
                        }}
                        transition={{ duration: 4, repeat: Infinity }}
                      />
                      
                      <motion.span
                        className="relative z-10 filter drop-shadow-sm"
                        animate={{ rotate: [0, 10, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        💻
                      </motion.span>
                      <span className="relative z-10 tracking-wide">View Code</span>
                      <motion.span
                        className="relative z-10 opacity-0 group-hover/btn:opacity-100 transition-all duration-300 filter drop-shadow-sm"
                        animate={{ x: [0, 4, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        →
                      </motion.span>
                    </motion.a>
                    {repo.homepage && (
                      <motion.a
                        href={repo.homepage}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white/90 dark:bg-gray-700/90 backdrop-blur-lg text-gray-700 dark:text-gray-300 py-3 px-4 rounded-xl text-sm font-bold hover:bg-white dark:hover:bg-gray-600 transition-all duration-500 border border-gray-200/50 dark:border-gray-600/50 flex-shrink-0 flex items-center justify-center shadow-md hover:shadow-xl"
                        whileHover={{ 
                          scale: 1.08, 
                          y: -3,
                          boxShadow: "0 15px 30px rgba(0, 0, 0, 0.15)"
                        }}
                        whileTap={{ scale: 0.95 }}
                        title="Live Demo"
                        initial={{ x: 30, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: index * 0.02 + 0.7, type: "spring" }}
                      >
                        <motion.span
                          className="filter drop-shadow-sm"
                          animate={{ 
                            scale: [1, 1.15, 1],
                            rotate: [0, 5, -5, 0]
                          }}
                          transition={{ duration: 3, repeat: Infinity }}
                        >
                          🌐
                        </motion.span>
                      </motion.a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <motion.div 
              className="col-span-full text-center py-16"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-white/30 dark:border-gray-700/30 inline-block"
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <motion.div
                  className="text-6xl mb-4"
                  animate={{ 
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  🔍
                </motion.div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">
                  {repos.length > 0 ? 'No matches found' : 'No repositories found'}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-lg">
                  {repos.length > 0 
                    ? `No repositories match filter "${filter}". Total repos: ${repos.length}`
                    : 'No repositories available at the moment'
                  }
                </p>
                {repos.length > 0 && (
                  <motion.button
                    onClick={() => setFilter('all')}
                    className="mt-4 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Show All Repositories
                  </motion.button>
                )}
              </motion.div>
            </motion.div>
          )}
        </motion.div>

        {/* GitHub Profile Link */}
        <motion.div 
          className="text-center mt-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          <motion.a
            href={`https://github.com/${username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-gray-800 to-gray-900 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            whileHover={{ 
              scale: 1.03, 
              y: -2,
              boxShadow: "0 15px 30px rgba(0, 0, 0, 0.2)" 
            }}
            whileTap={{ scale: 0.97 }}
          >
            <motion.span 
              className="text-xl"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              🐙
            </motion.span>
            Visit GitHub Profile
            <motion.span 
              whileHover={{ x: 3 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              ↗️
            </motion.span>
          </motion.a>
        </motion.div>
      </div>
    </motion.div>
  );
}