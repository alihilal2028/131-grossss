import React from 'react';
import { motion } from 'framer-motion';
import { Bed, Bath, Square, MapPin } from 'lucide-react';
import Hero3D from './Hero3D';
import { propertyData } from '../data/propertyData';

const HeroSection = () => {
  const stats = [
    { icon: Bed, value: propertyData.beds, label: 'Bedrooms' },
    { icon: Bath, value: propertyData.baths, label: 'Bathrooms' },
    { icon: Square, value: propertyData.sqftFormatted, label: 'Interior' },
    { icon: MapPin, value: propertyData.priceFormatted, label: 'List Price' }
  ];

  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-charcoal">
      {/* 3D Background */}
      <Hero3D />
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-32">
        <div className="text-center">
          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-gold tracking-[0.4em] text-xs sm:text-sm uppercase mb-6"
          >
            131 Grosvenor Avenue · Capitol Hill · Burnaby
          </motion.p>
          
          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-playfair text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-ivory leading-tight mb-8"
          >
            Capitol Hill's most<br />
            <span className="text-gold italic">cinematic</span> view residence.
          </motion.h1>
          
          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-white/60 text-lg sm:text-xl max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            Sweeping views of downtown Vancouver, water and North Shore mountains. 
            {propertyData.beds} beds, {propertyData.baths} baths, {propertyData.sqftFormatted}.
          </motion.p>
          
          {/* CTA Button */}
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(201, 162, 39, 0.3)' }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToContact}
            className="inline-flex items-center gap-3 px-10 py-4 bg-gold text-charcoal font-medium tracking-wider uppercase rounded-full transition-all duration-300 hover:bg-gold/90"
          >
            <span className="w-2 h-2 bg-charcoal rounded-full animate-pulse" />
            Book a Private Viewing
          </motion.button>
        </div>
        
        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
              className="glass-card p-6 text-center group hover:border-gold/50 transition-all duration-300"
            >
              <stat.icon className="w-5 h-5 text-gold mx-auto mb-3 group-hover:scale-110 transition-transform duration-300" />
              <p className="font-playfair text-2xl sm:text-3xl text-ivory mb-1">{stat.value}</p>
              <p className="text-xs tracking-widest text-white/50 uppercase">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2"
        >
          <motion.div
            animate={{ opacity: [1, 0, 1], y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-2 bg-gold rounded-full"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
