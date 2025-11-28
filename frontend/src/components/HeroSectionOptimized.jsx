import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Bed, Bath, Square, MapPin } from 'lucide-react';
import { propertyData } from '../data/propertyData';

const HeroSectionOptimized = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, 100]);
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 300]);

  const stats = [
    { icon: Bed, value: propertyData.beds, label: 'Bedrooms' },
    { icon: Bath, value: propertyData.baths, label: 'Bathrooms' },
    { icon: Square, value: propertyData.sqftFormatted, label: 'Interior' },
    { icon: MapPin, value: propertyData.priceFormatted, label: 'List Price' }
  ];

  const handleBooking = () => {
    window.open('https://www.realtor.ca/real-estate/29133848/131-grosvenor-avenue-burnaby', '_blank');
  };

  return (
    <section 
      id="hero" 
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-charcoal"
    >
      {/* Background Image with Parallax */}
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ y: imageY }}
      >
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(https://customer-assets.emergentagent.com/job_image-showcase-71/artifacts/gg7w7vuh_Gemini_Generated_Image_qh7cwcqh7cwcqh7c.png)',
            transform: 'scale(1.1)',
            imageRendering: 'high-quality'
          }}
        />
        
        {/* Overlays for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/70 via-charcoal/50 to-charcoal pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/50 via-transparent to-charcoal/50 pointer-events-none" />
        
        {/* Vignette */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, transparent 50%, rgba(0,0,0,0.6) 100%)'
        }} />
      </motion.div>
      
      {/* Content */}
      <motion.div 
        className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-32"
        style={{ opacity: heroOpacity, y: heroY }}
      >
        <div className="text-center">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex items-center justify-center gap-4 mb-8"
          >
            <div className="h-px w-12 bg-gold" />
            <p className="text-gold tracking-[0.4em] text-xs sm:text-sm uppercase">
              131 Grosvenor Avenue · Capitol Hill · Burnaby
            </p>
            <div className="h-px w-12 bg-gold" />
          </motion.div>
          
          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="font-playfair text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-ivory leading-tight mb-8"
          >
            Capitol Hill's most<br />
            <span className="text-gold italic">cinematic</span> view residence.
          </motion.h1>
          
          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-white/60 text-lg sm:text-xl max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            Sweeping views of downtown Vancouver, water and North Shore mountains. 
            {propertyData.beds} beds, {propertyData.baths} baths, {propertyData.sqftFormatted}.
          </motion.p>
          
          {/* CTA Button */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            onClick={scrollToContact}
            className="inline-flex items-center gap-3 px-10 py-4 bg-gold text-charcoal font-medium tracking-wider uppercase rounded-full hover:bg-gold-light hover:shadow-[0_0_40px_rgba(201,162,39,0.3)] transition-all duration-300"
          >
            <span className="w-2 h-2 bg-charcoal rounded-full animate-pulse" />
            Book a Private Viewing
          </motion.button>
        </div>
        
        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.3 + index * 0.1 }}
              whileHover={{ y: -5 }}
              className="glass-card p-6 text-center group"
            >
              <stat.icon className="w-5 h-5 text-gold mx-auto mb-3 group-hover:scale-110 transition-transform duration-300" />
              <p className="font-playfair text-2xl sm:text-3xl text-ivory mb-1">{stat.value}</p>
              <p className="text-xs tracking-widest text-white/50 uppercase">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
      
      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <p className="text-white/40 text-xs tracking-[0.2em] uppercase">Scroll</p>
        <div className="w-5 h-8 border border-white/20 rounded-full flex items-start justify-center p-1.5">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1 h-1.5 bg-gold rounded-full"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSectionOptimized;
