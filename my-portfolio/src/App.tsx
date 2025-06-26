import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import Layout from "./components/Layout";
import About from "./pages/About";
import Resume from "./pages/Resume";
import GithubRepos from "./pages/GithubRepos";
import Skills from "./pages/Skills";
import Projects from "./pages/Projects";
import ContactMe from "./pages/ContactMe";

function App() {
  // For custom domain, always use empty basename
  // Only use /MyPortfolioReact basename for GitHub Pages subdomain
  const basename = window.location.hostname === 'ashish73653.github.io' 
    ? '/MyPortfolioReact' 
    : '';
  
  console.log('🚀 App loading with basename:', basename, 'hostname:', window.location.hostname);
  
  // Clean up any remaining redirect parameters after the page loads
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('p') || urlParams.has('q') || urlParams.has('h')) {
      // Clean up any remaining redirect parameters
      const cleanUrl = window.location.origin + window.location.pathname;
      window.history.replaceState({}, '', cleanUrl);
      console.log('🧹 Cleaned up redirect parameters');
    }
  }, []);
  
  return (
    <Router basename={basename}>
      <Layout>
        <Routes>
          <Route path="/" element={<About />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/github" element={<GithubRepos />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<ContactMe />} />
          {/* Catch all route - redirect to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;