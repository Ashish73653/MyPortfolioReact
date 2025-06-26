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
  // Set base path only for GitHub Pages production deployment
  const basename = import.meta.env.PROD && window.location.hostname.includes('github.io') 
    ? '/MyPortfolioReact' 
    : '';
  
  console.log('🚀 App loading with basename:', basename);
  
  // Handle any remaining redirect parameters after the page loads
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('p') || urlParams.has('q') || urlParams.has('h')) {
      // Clean up any remaining redirect parameters
      const cleanUrl = window.location.origin + window.location.pathname;
      window.history.replaceState({}, '', cleanUrl);
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