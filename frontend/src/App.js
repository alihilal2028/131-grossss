import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SmoothScrollProvider } from './context/SmoothScrollContext';
import NavbarEnhanced from './components/NavbarEnhanced';
import HeroSectionEnhanced from './components/HeroSectionEnhanced';
import AboutSectionEnhanced from './components/AboutSectionEnhanced';
import GallerySectionEnhanced from './components/GallerySectionEnhanced';
import PropertyDetailsEnhanced from './components/PropertyDetailsEnhanced';
import FloorplanSection from './components/FloorplanSection';
import AgentPanel from './components/AgentPanel';
import ContactSectionEnhanced from './components/ContactSectionEnhanced';
import FooterEnhanced from './components/FooterEnhanced';
import CustomCursor from './components/CustomCursor';
import ScrollProgress from './components/ScrollProgress';
import './App.css';

// Page transition wrapper
const PageTransition = ({ children }) => {
  useEffect(() => {
    // Ensure page starts at top on load
    window.scrollTo(0, 0);
  }, []);

  return children;
};

// Main property page component
const PropertyPage = () => {
  return (
    <div className="min-h-screen bg-charcoal overflow-x-hidden">
      {/* Custom cursor - desktop only */}
      <CustomCursor />
      
      {/* Scroll progress indicator */}
      <ScrollProgress />
      
      {/* Navigation */}
      <NavbarEnhanced />
      
      {/* Main content */}
      <main>
        <HeroSectionEnhanced />
        <AboutSectionEnhanced />
        <GallerySectionEnhanced />
        <PropertyDetailsEnhanced />
        <FloorplanSection />
        <AgentPanel />
        <ContactSectionEnhanced />
      </main>
      
      {/* Footer */}
      <FooterEnhanced />
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <SmoothScrollProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={
              <PageTransition>
                <PropertyPage />
              </PageTransition>
            } />
            <Route path="*" element={
              <PageTransition>
                <PropertyPage />
              </PageTransition>
            } />
          </Routes>
        </BrowserRouter>
      </SmoothScrollProvider>
    </div>
  );
}

export default App;
