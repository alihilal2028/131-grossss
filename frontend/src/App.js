import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavbarEnhanced from './components/NavbarEnhanced';
import HeroSectionOptimized from './components/HeroSectionOptimized';
import AboutSectionEnhanced from './components/AboutSectionEnhanced';
import GallerySectionOptimized from './components/GallerySectionOptimized';
import PropertyDetailsEnhanced from './components/PropertyDetailsEnhanced';
import FloorplanSection from './components/FloorplanSection';
import AgentPanel from './components/AgentPanel';
import ContactSectionEnhanced from './components/ContactSectionEnhanced';
import FooterEnhanced from './components/FooterEnhanced';
import ScrollProgress from './components/ScrollProgress';
import './App.css';

// Page transition wrapper
const PageTransition = ({ children }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return children;
};

// Main property page component
const PropertyPage = () => {
  return (
    <div className="min-h-screen bg-charcoal overflow-x-hidden">
      {/* Scroll progress indicator */}
      <ScrollProgress />
      
      {/* Navigation */}
      <NavbarEnhanced />
      
      {/* Main content */}
      <main>
        <HeroSectionOptimized />
        <AboutSectionEnhanced />
        <GallerySectionOptimized />
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
    </div>
  );
}

export default App;
