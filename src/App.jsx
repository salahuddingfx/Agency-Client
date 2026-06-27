import { useState, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Layout & always-needed components
import Header from './components/Header';
import Footer from './components/Footer';
import Loader from './components/Loader';
import ScrollToTop from './components/ScrollToTop';

// Critical pages — loaded eagerly
import Home from './pages/Home';

// Secondary pages — lazy loaded for performance
const About        = lazy(() => import('./pages/About'));
const Services     = lazy(() => import('./pages/Services'));
const Portfolio    = lazy(() => import('./pages/Portfolio'));
const CaseStudies  = lazy(() => import('./pages/CaseStudies'));
const Technologies = lazy(() => import('./pages/Technologies'));
const Team         = lazy(() => import('./pages/Team'));
const Pricing      = lazy(() => import('./pages/Pricing'));
const Blog         = lazy(() => import('./pages/Blog'));
const FAQ          = lazy(() => import('./pages/FAQ'));
const Contact      = lazy(() => import('./pages/Contact'));
const Careers      = lazy(() => import('./pages/Careers'));
const ClientPortal = lazy(() => import('./pages/ClientPortal'));
const Legal        = lazy(() => import('./pages/Legal'));
const Agreements   = lazy(() => import('./pages/Agreements'));
const NotFound     = lazy(() => import('./pages/NotFound'));

// Minimal suspense fallback — avoids blank flash
function PageFallback() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-8 h-8 border-2 border-brand-primary/30 border-t-brand-primary rounded-full animate-spin" />
    </div>
  );
}

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<PageFallback />}>
        <Routes location={location} key={location.pathname}>
          <Route path="/"                   element={<Home />} />
          <Route path="/about"              element={<About />} />
          <Route path="/services"           element={<Services />} />
          <Route path="/portfolio"          element={<Portfolio />} />
          <Route path="/case-studies"       element={<CaseStudies />} />
          <Route path="/technologies"       element={<Technologies />} />
          <Route path="/team"               element={<Team />} />
          <Route path="/pricing"            element={<Pricing />} />
          <Route path="/blog"               element={<Blog />} />
          <Route path="/faq"                element={<FAQ />} />
          <Route path="/contact"            element={<Contact />} />
          <Route path="/careers"            element={<Careers />} />
          <Route path="/portal"             element={<ClientPortal />} />
          <Route path="/legal/:policyId"    element={<Legal />} />
          <Route path="/agreements"          element={<Agreements />} />
          {/* Proper 404 — no silent redirect */}
          <Route path="*"                   element={<NotFound />} />
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);

  return (
    <Router>
      <ScrollToTop />
      {loading ? (
        <Loader finishLoading={() => setLoading(false)} />
      ) : (
        <div className="flex flex-col min-h-screen bg-brand-darker text-slate-100 relative transition-colors duration-300">
          {/* Global accent glow */}
          <div className="fixed top-0 left-1/4 w-[600px] h-[400px] bg-brand-primary/5 rounded-full blur-[140px] pointer-events-none -z-10" />
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
