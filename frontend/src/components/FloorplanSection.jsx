import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const FloorplanSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  // Actual floorplan image URL
  const floorplanImage = "https://customer-assets.emergentagent.com/job_cinematic-villa/artifacts/d3i36xhm_floorplan-BSuvgVun.jpg";

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
          <div className="glass-card p-4 md:p-8">
            {/* Floorplan Image */}
            <motion.div 
              className="relative overflow-hidden bg-charcoal"
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src={floorplanImage}
                alt="Floorplan - 131 Grosvenor Avenue"
                className="w-full h-auto"
              />
              
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/30 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
            </motion.div>

            {/* Caption */}
            <div className="mt-6 text-center">
              <p className="text-gold font-playfair text-lg">131 Grosvenor Avenue</p>
              <p className="text-white/50 text-sm mt-1">3,587 sq ft · 3 Levels · 7 Bedrooms · 7 Bathrooms</p>
            </div>
          </div>
        </motion.div>

        {/* Level indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex justify-center gap-8 mt-10"
        >
          {['Main Level', 'Upper Level', 'Lower Level'].map((level, index) => (
            <div key={level} className="flex items-center gap-2">
              <span 
                className="w-3 h-3 border border-gold/50"
                style={{ backgroundColor: index === 0 ? 'rgba(201,162,39,0.3)' : 'transparent' }}
              />
              <span className="text-white/60 text-sm">{level}</span>
            </div>
          ))}
        </motion.div>

        {/* Note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center text-white/40 text-sm mt-8"
        >
          Floor plans are for illustrative purposes only. Actual dimensions may vary.
        </motion.p>
      </div>
    </section>
  );
};

export default FloorplanSection;
