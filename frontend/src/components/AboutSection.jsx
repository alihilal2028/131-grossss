import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Check, Home, Mountain, Sparkles, Thermometer } from 'lucide-react';
import { propertyData, propertyImages } from '../data/propertyData';

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const featureIcons = [
    { icon: Home, label: 'Smart Home' },
    { icon: Mountain, label: 'View Residence' },
    { icon: Sparkles, label: 'Premium Finishes' },
    { icon: Thermometer, label: 'Climate Control' }
  ];

  return (
    <section ref={ref} className="relative py-32 bg-charcoal overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(201,162,39,0.3) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>
      
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <p className="text-gold tracking-[0.3em] text-sm uppercase mb-4">About This Home</p>
          <h2 className="font-playfair text-4xl md:text-5xl text-ivory mb-6">
            An Architectural Masterpiece
          </h2>
          <div className="w-24 h-px bg-gold/50 mx-auto" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative aspect-[4/5] overflow-hidden">
              <img
                src={propertyImages.living[0].url}
                alt={propertyImages.living[0].alt}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent" />
            </div>
            
            {/* Floating Stats Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="absolute -bottom-8 -right-8 glass-card p-6 max-w-xs hidden md:block"
            >
              <p className="text-gold text-4xl font-playfair mb-2">{propertyData.priceFormatted}</p>
              <p className="text-white/60 text-sm">MLS® {propertyData.mls}</p>
            </motion.div>
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {/* Feature Icons */}
            <div className="flex gap-6 mb-8">
              {featureIcons.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                  className="flex flex-col items-center gap-2"
                >
                  <div className="w-12 h-12 rounded-full border border-gold/30 flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-gold" />
                  </div>
                  <span className="text-xs text-white/50">{item.label}</span>
                </motion.div>
              ))}
            </div>

            {/* Description */}
            <p className="text-white/70 leading-relaxed mb-8 text-lg">
              {propertyData.description.split('\n\n')[0]}
            </p>

            {/* Highlights */}
            <div className="space-y-4 mb-10">
              {propertyData.highlights.slice(0, 6).map((highlight, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <div className="w-5 h-5 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-gold" />
                  </div>
                  <span className="text-white/80">{highlight}</span>
                </motion.div>
              ))}
            </div>

            {/* Open House Banner */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 1 }}
              className="glass-card p-6 border-gold/30"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gold/20 rounded-full flex items-center justify-center">
                  <Home className="w-6 h-6 text-gold" />
                </div>
                <div>
                  <p className="text-ivory font-medium">Open House</p>
                  <p className="text-gold">{propertyData.openHouse.date} · {propertyData.openHouse.time}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
