import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { Bed, Bath, Square, MapPin } from 'lucide-react';
import Hero3DEnhanced from './Hero3DEnhanced';
import MagneticButton from './MagneticButton';
import { FadeInOnScroll, TextReveal } from './ScrollAnimations';
import { propertyData } from '../data/propertyData';

// Animated counter component
const AnimatedNumber = ({ value, suffix = '' }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.9', 'start 0.5']
  });

  React.useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (progress) => {
      const numValue = typeof value === 'string' ? parseInt(value.replace(/[^0-9]/g, '')) : value;
      setDisplayValue(Math.floor(numValue * Math.min(progress * 2, 1)));
    });
    return () => unsubscribe();
  }, [scrollYProgress, value]);

  const formatValue = () => {
    if (typeof value === 'string' && value.includes('$')) {
      return `$${displayValue.toLocaleString()}`;
    }
    if (typeof value === 'string' && value.includes(',')) {
      return displayValue.toLocaleString() + suffix;
    }
    return displayValue + suffix;
  };

  return <span ref={ref}>{formatValue()}</span>;
};

// Split text animation
const SplitText = ({ children, className = '', delay = 0 }) => {
  const words = children.split(' ');
  
  return (
    <span className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden">
          <motion.span
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 0.8,
              delay: delay + i * 0.08,
              ease: [0.23, 1, 0.32, 1]
            }}
            className="inline-block"
          >
            {word}&nbsp;
          </motion.span>
        </span>
      ))}
    </span>
  );
};

const HeroSectionEnhanced = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  });

  // Parallax transforms
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, 100]);
  const textY = useTransform(scrollYProgress, [0, 0.3], [0, -50]);

  const smoothOpacity = useSpring(heroOpacity, { damping: 30, stiffness: 100 });
  const smoothScale = useSpring(heroScale, { damping: 30, stiffness: 100 });
  const smoothY = useSpring(heroY, { damping: 30, stiffness: 100 });
  const smoothTextY = useSpring(textY, { damping: 30, stiffness: 100 });

  const stats = [
    { icon: Bed, value: propertyData.beds, label: 'Bedrooms', suffix: '' },
    { icon: Bath, value: propertyData.baths, label: 'Bathrooms', suffix: '' },
    { icon: Square, value: '3587', label: 'Sq Ft', suffix: ' sq ft' },
    { icon: MapPin, value: '$3188000', label: 'List Price', suffix: '' }
  ];

  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="hero" 
      ref={containerRef}
      className="relative min-h-[120vh] flex items-center justify-center overflow-hidden bg-charcoal"
    >
      {/* 3D Background */}
      <motion.div 
        className="absolute inset-0"
        style={{ scale: smoothScale, y: smoothY }}
      >
        <Hero3DEnhanced />
      </motion.div>
      
      {/* Content */}
      <motion.div 
        className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-32"
        style={{ opacity: smoothOpacity, y: smoothTextY }}
      >
        <div className="text-center">
          {/* Eyebrow with line animation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="flex items-center justify-center gap-4 mb-8"
          >
            <motion.div 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="h-px w-12 bg-gold origin-right"
            />
            <p className="text-gold tracking-[0.4em] text-xs sm:text-sm uppercase">
              131 Grosvenor Avenue · Capitol Hill · Burnaby
            </p>
            <motion.div 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="h-px w-12 bg-gold origin-left"
            />
          </motion.div>
          
          {/* Main Title with split animation */}
          <h1 className="font-playfair text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-ivory leading-tight mb-8">
            <SplitText delay={0.3}>Capitol Hill's most</SplitText>
            <br />
            <span className="text-gold italic">
              <SplitText delay={0.6}>cinematic</SplitText>
            </span>
            <SplitText delay={0.8}> view residence.</SplitText>
          </h1>
          
          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2, ease: [0.23, 1, 0.32, 1] }}
            className="text-white/60 text-lg sm:text-xl max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            Sweeping views of downtown Vancouver, water and North Shore mountains. 
            {propertyData.beds} beds, {propertyData.baths} baths, {propertyData.sqftFormatted}.
          </motion.p>
          
          {/* CTA Button with magnetic effect */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
          >
            <MagneticButton
              onClick={scrollToContact}
              className="inline-flex items-center gap-3 px-10 py-4 bg-gold text-charcoal font-medium tracking-wider uppercase rounded-full transition-all duration-500 hover:shadow-[0_0_60px_rgba(201,162,39,0.4)]"
              strength={0.2}
              data-cursor-hover
            >
              <motion.span 
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-2 h-2 bg-charcoal rounded-full"
              />
              Book a Private Viewing
            </MagneticButton>
          </motion.div>
        </div>
        
        {/* Stats Row with staggered animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.6 }}
          className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                duration: 0.8, 
                delay: 1.8 + index * 0.15,
                ease: [0.23, 1, 0.32, 1]
              }}
              whileHover={{ 
                y: -8, 
                transition: { duration: 0.3 } 
              }}
              className="glass-card p-6 text-center group cursor-default"
              data-cursor-hover
            >
              <motion.div
                whileHover={{ rotate: [0, -10, 10, 0] }}
                transition={{ duration: 0.5 }}
              >
                <stat.icon className="w-5 h-5 text-gold mx-auto mb-3 group-hover:scale-110 transition-transform duration-300" />
              </motion.div>
              <p className="font-playfair text-2xl sm:text-3xl text-ivory mb-1">
                <AnimatedNumber value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="text-xs tracking-widest text-white/50 uppercase">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
      
      {/* Scroll Indicator with enhanced animation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
      >
        <motion.p
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-white/40 text-xs tracking-[0.3em] uppercase"
        >
          Scroll to explore
        </motion.p>
        <motion.div
          className="w-6 h-10 border border-white/20 rounded-full flex items-start justify-center p-2"
        >
          <motion.div
            animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-1 h-2 bg-gold rounded-full"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSectionEnhanced;
