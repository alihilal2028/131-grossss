import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { propertyImages } from '../data/propertyData';

const FloorplanSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  // Using exterior image as placeholder for floorplan
  const floorplanImage = propertyImages.exterior[0].url;

  return (
    <section ref={ref} className="relative py-32 bg-charcoal-light overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-gold tracking-[0.3em] text-sm uppercase mb-4">Spatial Design</p>
          <h2 className="font-playfair text-4xl md:text-5xl text-ivory mb-6">
            Floorplan
          </h2>
          <div className="w-24 h-px bg-gold/50 mx-auto" />
        </motion.div>

        {/* Floorplan Display */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <div className="glass-card p-8 md:p-12">
            {/* Placeholder for floorplan */}
            <div className="relative aspect-[16/10] bg-charcoal/50 flex items-center justify-center overflow-hidden">
              {/* Grid pattern background */}
              <div className="absolute inset-0 opacity-20" style={{
                backgroundImage: `
                  linear-gradient(rgba(201,162,39,0.3) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(201,162,39,0.3) 1px, transparent 1px)
                `,
                backgroundSize: '40px 40px'
              }} />
              
              {/* Placeholder content */}
              <div className="relative z-10 text-center">
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="w-24 h-24 mx-auto mb-6 border-2 border-gold/50 rounded-lg flex items-center justify-center"
                >
                  <svg className="w-12 h-12 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </motion.div>
                <h3 className="font-playfair text-2xl text-ivory mb-2">Floorplan – 131 Grosvenor</h3>
                <p className="text-white/50 text-sm max-w-md mx-auto">
                  {/* REPLACE: Add your floorplan image URL here */}
                  Contact the listing agent for detailed floor plans of all three levels.
                </p>
              </div>
            </div>

            {/* Level indicators */}
            <div className="flex justify-center gap-6 mt-8">
              {['Main Level', 'Upper Level', 'Lower Level'].map((level, index) => (
                <motion.div
                  key={level}
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                  className="flex items-center gap-2"
                >
                  <span className="w-3 h-3 border border-gold/50" style={{
                    backgroundColor: index === 0 ? 'rgba(201,162,39,0.3)' : 'transparent'
                  }} />
                  <span className="text-white/60 text-sm">{level}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center text-white/40 text-sm mt-8"
        >
          {/* REPLACE: Remove this note and add actual floorplan image */}
          Floor plans are for illustrative purposes only. Actual dimensions may vary.
        </motion.p>
      </div>
    </section>
  );
};

export default FloorplanSection;
