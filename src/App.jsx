import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Layout & UI components
import Header from './components/Header';
import Footer from './components/Footer';
import Loader from './components/Loader';
import ScrollToTop from './components/ScrollToTop';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Portfolio from './pages/Portfolio';
import CaseStudies from './pages/CaseStudies';
import Technologies from './pages/Technologies';
import Team from './pages/Team';
import Pricing from './pages/Pricing';
import Blog from './pages/Blog';
import FAQ from './pages/FAQ';
import Contact from './pages/Contact';
import Careers from './pages/Careers';
import ClientPortal from './pages/ClientPortal';
import Legal from './pages/Legal';

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/case-studies" element={<CaseStudies />} />
        <Route path="/technologies" element={<Technologies />} />
        <Route path="/team" element={<Team />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/portal" element={<ClientPortal />} />
        <Route path="/legal/:policyId" element={<Legal />} />
        {/* Fallback route redirection */}
        <Route path="*" element={<Home />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);

  return (
    <Router>
      <ScrollToTop />
      
      {/* Elegantly delay page rendering until loader exits */}
      {loading ? (
        <Loader finishLoading={() => setLoading(false)} />
      ) : (
        <div className="flex flex-col min-h-screen bg-brand-darker text-slate-100 relative transition-colors duration-300">
          {/* Accent lighting behind pages */}
          <div className="absolute top-0 left-1/4 w-[600px] h-[400px] bg-brand-primary/5 rounded-full blur-[140px] pointer-events-none" />
          
          <Header />
          <main className="flex-grow">
            <AnimatedRoutes />
          </main>
          <Footer />
        </div>
      )}
    </Router>
  );
}
