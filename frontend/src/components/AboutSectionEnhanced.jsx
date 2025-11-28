import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { Check, Home, Mountain, Sparkles, Thermometer } from 'lucide-react';
import { FadeInOnScroll, ParallaxSection, TextReveal } from './ScrollAnimations';
import FadeIn from './FadeIn';
import { propertyData, propertyImages } from '../data/propertyData';

// 3D tilt card component
const TiltCard = ({ children, className = '' }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { damping: 20 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { damping: 20 });

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) / rect.width);
    y.set((e.clientY - centerY) / rect.height);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const AboutSectionEnhanced = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  // Parallax for background elements
  const bgY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.05]);

  const featureIcons = [
    { icon: Home, label: 'Smart Home' },
    { icon: Mountain, label: 'View Residence' },
    { icon: Sparkles, label: 'Premium Finishes' },
    { icon: Thermometer, label: 'Climate Control' }
  ];

  return (
    <section ref={containerRef} className="relative py-32 bg-charcoal overflow-hidden">
      {/* Animated background pattern */}
      <motion.div 
        className="absolute inset-0 opacity-5"
        style={{ y: bgY }}
      >
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(201,162,39,0.3) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </motion.div>
      
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header with reveal animation */}
        <FadeIn className="text-center mb-20">
          <motion.p 
            className="text-gold tracking-[0.3em] text-sm uppercase mb-4"
            initial={{ opacity: 0, letterSpacing: '0.1em' }}
            whileInView={{ opacity: 1, letterSpacing: '0.3em' }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            About This Home
          </motion.p>
          <h2 className="font-playfair text-4xl md:text-5xl lg:text-6xl text-ivory mb-6">
            An Architectural Masterpiece
          </h2>
          <motion.div 
            className="w-24 h-px bg-gold/50 mx-auto"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          />
        </FadeIn>

        <div className="grid lg:grid-cols-2 gap-16 items-center" style={{ perspective: '2000px' }}>
          {/* Image Side with 3D parallax and tilt */}
          <FadeInOnScroll direction="left" className="relative" style={{ transformStyle: 'preserve-3d' }}>
            <TiltCard className="relative aspect-[4/5] overflow-hidden" style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}>
              <motion.div 
                className="absolute inset-0"
                style={{ scale: imageScale }}
              >
                <img
                  src={propertyImages.living[0].url}
                  alt={propertyImages.living[0].alt}
                  className="w-full h-full object-cover"
                />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-transparent to-transparent" />
              
              {/* Shine effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/5 to-white/0 opacity-0 hover:opacity-100 transition-opacity duration-700" />
            </TiltCard>
            
            {/* Floating Stats Card with 3D depth */}
            <motion.div
              initial={{ opacity: 0, x: 50, y: 20, rotateY: -20, z: -100 }}
              whileInView={{ opacity: 1, x: 0, y: 0, rotateY: 0, z: 0 }}
              transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
              whileHover={{ 
                scale: 1.05, 
                y: -10, 
                z: 100,
                rotateY: 5,
                boxShadow: '0 30px 60px rgba(201,162,39,0.3)'
              }}
              style={{ transformStyle: 'preserve-3d' }}
              className="absolute -bottom-8 -right-8 glass-card p-6 max-w-xs hidden md:block cursor-pointer"
              data-cursor-hover
            >
              <motion.p 
                className="text-gold text-4xl font-playfair mb-2"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                viewport={{ once: true }}
              >
                {propertyData.priceFormatted}
              </motion.p>
              <p className="text-white/60 text-sm">MLS® {propertyData.mls}</p>
            </motion.div>
            
            {/* Decorative corner accent */}
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="absolute -top-4 -left-4 w-16 h-16 border-l-2 border-t-2 border-gold/50"
            />
          </FadeInOnScroll>

          {/* Content Side */}
          <div>
            {/* Feature Icons with 3D sequential animation */}
            <motion.div 
              className="flex gap-6 mb-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              style={{ 
                perspective: '1200px',
                transformStyle: 'preserve-3d'
              }}
              variants={{
                visible: { transition: { staggerChildren: 0.15, delayChildren: 0.2 } }
              }}
            >
              {featureIcons.map((item, index) => (
                <motion.div
                  key={item.label}
                  variants={{
                    hidden: { opacity: 0, x: -30, rotateY: -90, z: -100 },
                    visible: { opacity: 1, x: 0, rotateY: 0, z: 0 }
                  }}
                  whileHover={{ 
                    y: -10, 
                    scale: 1.15,
                    z: 50,
                    rotateY: 5,
                    transition: { duration: 0.3 }
                  }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  style={{ transformStyle: 'preserve-3d' }}
                  className="flex flex-col items-center gap-2 cursor-pointer"
                  data-cursor-hover
                >
                  <motion.div 
                    className="w-12 h-12 rounded-full border border-gold/30 flex items-center justify-center relative"
                    whileHover={{ 
                      borderColor: 'rgba(201,162,39,0.8)', 
                      backgroundColor: 'rgba(201,162,39,0.1)',
                      rotateZ: 360,
                      boxShadow: '0 10px 30px rgba(201,162,39,0.3)'
                    }}
                    transition={{ duration: 0.6 }}
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.2, rotateY: 180 }}
                      transition={{ duration: 0.6 }}
                      style={{ translateZ: 20 }}
                    >
                      <item.icon className="w-5 h-5 text-gold" />
                    </motion.div>
                  </motion.div>
                  <span className="text-xs text-white/50">{item.label}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* Description with text reveal */}
            <FadeInOnScroll delay={0.2}>
              <p className="text-white/70 leading-relaxed mb-8 text-lg">
                {propertyData.description.split('\n\n')[0]}
              </p>
            </FadeInOnScroll>

            {/* Highlights with staggered reveal */}
            <div className="space-y-4 mb-10">
              {propertyData.highlights.slice(0, 6).map((highlight, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  viewport={{ once: true }}
                  whileHover={{ x: 8 }}
                  className="flex items-start gap-3 group cursor-default"
                >
                  <motion.div 
                    className="w-5 h-5 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0 mt-0.5"
                    whileHover={{ scale: 1.2, backgroundColor: 'rgba(201,162,39,0.4)' }}
                  >
                    <Check className="w-3 h-3 text-gold" />
                  </motion.div>
                  <span className="text-white/80 group-hover:text-white transition-colors duration-300">
                    {highlight}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Open House Banner */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              className="glass-card p-6 border-gold/30 cursor-default overflow-hidden relative"
              data-cursor-hover
            >
              {/* Animated background gradient */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-gold/5 via-gold/10 to-gold/5"
                animate={{ x: ['-100%', '100%'] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              />
              
              <div className="relative flex items-center gap-4">
                <motion.div 
                  className="w-12 h-12 bg-gold/20 rounded-full flex items-center justify-center"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Home className="w-6 h-6 text-gold" />
                </motion.div>
                <div>
                  <p className="text-ivory font-medium">Open House</p>
                  <p className="text-gold">{propertyData.openHouse.date} · {propertyData.openHouse.time}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSectionEnhanced;
