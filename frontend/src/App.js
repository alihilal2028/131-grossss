import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import GallerySection from './components/GallerySection';
import PropertyDetails from './components/PropertyDetails';
import FloorplanSection from './components/FloorplanSection';
import AgentPanel from './components/AgentPanel';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import './App.css';

// Main property page component
const PropertyPage = () => {
  return (
    <div className="min-h-screen bg-charcoal">
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <GallerySection />
        <PropertyDetails />
        <FloorplanSection />
        <AgentPanel />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PropertyPage />} />
          <Route path="*" element={<PropertyPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
