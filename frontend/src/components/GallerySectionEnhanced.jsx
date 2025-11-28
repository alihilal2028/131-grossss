import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { allImages, propertyImages } from '../data/propertyData';

// 3D Tilt Image Card
const GalleryCard = ({ image, index, onClick }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [15, -15]), { damping: 20, stiffness: 150 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-15, 15]), { damping: 20, stiffness: 150 });
  const scale = useSpring(1, { damping: 20, stiffness: 150 });

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) / rect.width);
    y.set((e.clientY - centerY) / rect.height);
  };

  const handleMouseEnter = () => scale.set(1.05);
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    scale.set(1);
  };

  return (
    <motion.div
      ref={ref}
      layout
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.23, 1, 0.32, 1] }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{ 
        rotateX, 
        rotateY, 
        scale,
        transformStyle: 'preserve-3d',
        transformPerspective: 1000
      }}
      className="relative aspect-[4/3] overflow-hidden cursor-pointer group"
      data-cursor-cta
      data-cursor-text="View"
    >
      {/* Image with zoom effect */}
      <motion.img
        src={image.url}
        alt={image.alt}
        className="w-full h-full object-cover"
        loading="lazy"
        style={{ transform: 'translateZ(0)' }}
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
      />
      
      {/* Gradient overlay */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500"
        style={{ transform: 'translateZ(20px)' }}
      />
      
      {/* Shine effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-0 group-hover:opacity-100"
        style={{ transform: 'translateZ(30px)' }}
        initial={{ x: '-100%' }}
        whileHover={{ x: '100%' }}
        transition={{ duration: 0.8 }}
      />
      
      {/* Border glow */}
      <motion.div 
        className="absolute inset-0 border-2 border-gold/0 group-hover:border-gold/40"
        style={{ transform: 'translateZ(40px)' }}
        transition={{ duration: 0.3 }}
      />
      
      {/* View icon */}
      <motion.div
        className="absolute top-4 right-4 w-10 h-10 rounded-full bg-charcoal/60 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100"
        style={{ transform: 'translateZ(50px)' }}
        initial={{ scale: 0 }}
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.3 }}
      >
        <Maximize2 className="w-4 h-4 text-gold" />
      </motion.div>
      
      {/* Caption */}
      <motion.div 
        className="absolute bottom-0 left-0 right-0 p-4"
        style={{ transform: 'translateZ(30px)' }}
        initial={{ y: 20, opacity: 0 }}
        whileHover={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <p className="text-ivory text-sm font-medium">{image.alt}</p>
      </motion.div>
    </motion.div>
  );
};

// Cinematic Lightbox
const CinematicLightbox = ({ images, currentIndex, onClose, onNext, onPrev }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onNext, onPrev]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      {/* Backdrop with blur */}
      <motion.div 
        className="absolute inset-0 bg-charcoal/95 backdrop-blur-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      />
      
      {/* Close button */}
      <motion.button
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        onClick={onClose}
        className="absolute top-6 right-6 p-3 rounded-full bg-white/5 hover:bg-white/10 transition-colors z-10 group"
      >
        <X className="w-6 h-6 text-white/60 group-hover:text-white transition-colors" />
      </motion.button>

      {/* Navigation - Previous */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        className="absolute left-4 md:left-8 p-4 rounded-full bg-white/5 hover:bg-gold/20 transition-all z-10 group"
      >
        <ChevronLeft className="w-8 h-8 text-white/60 group-hover:text-gold transition-colors" />
      </motion.button>

      {/* Navigation - Next */}
      <motion.button
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        className="absolute right-4 md:right-8 p-4 rounded-full bg-white/5 hover:bg-gold/20 transition-all z-10 group"
      >
        <ChevronRight className="w-8 h-8 text-white/60 group-hover:text-gold transition-colors" />
      </motion.button>

      {/* Main Image */}
      <motion.div
        key={currentIndex}
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
        className="relative max-w-[90vw] max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={images[currentIndex]?.url}
          alt={images[currentIndex]?.alt}
          className="max-w-full max-h-[85vh] object-contain shadow-2xl"
          onLoad={() => setIsLoaded(true)}
        />
        
        {/* Image caption */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="absolute -bottom-12 left-1/2 -translate-x-1/2 text-center"
        >
          <p className="text-white/80 text-sm">{images[currentIndex]?.alt}</p>
        </motion.div>
      </motion.div>

      {/* Progress indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4"
      >
        <span className="text-white/40 text-sm font-medium">
          {currentIndex + 1} / {images.length}
        </span>
        
        {/* Progress bar */}
        <div className="w-32 h-0.5 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gold"
            initial={{ width: 0 }}
            animate={{ width: `${((currentIndex + 1) / images.length) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

const GallerySectionEnhanced = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });
  
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeCategory, setActiveCategory] = useState('all');

  // Parallax for header
  const headerY = useTransform(scrollYProgress, [0, 0.3], [50, 0]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  const categories = [
    { key: 'all', label: 'All' },
    { key: 'exterior', label: 'Exterior' },
    { key: 'living', label: 'Living' },
    { key: 'kitchen', label: 'Kitchen' },
    { key: 'bedrooms', label: 'Bedrooms' },
    { key: 'bathrooms', label: 'Bathrooms' },
    { key: 'special', label: 'Features' }
  ];

  const getFilteredImages = () => {
    if (activeCategory === 'all') return allImages.slice(0, 12);
    return propertyImages[activeCategory] || [];
  };

  const filteredImages = getFilteredImages();

  const openLightbox = (index) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => setLightboxOpen(false);
  const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % filteredImages.length);
  const prevImage = () => setCurrentImageIndex((prev) => (prev - 1 + filteredImages.length) % filteredImages.length);

  return (
    <section id="gallery" ref={ref} className="relative py-32 bg-charcoal-light overflow-hidden">
      {/* Animated background gradient */}
      <motion.div
        className="absolute inset-0 opacity-30"
        style={{
          background: 'radial-gradient(ellipse at 50% 0%, rgba(201,162,39,0.1) 0%, transparent 50%)'
        }}
        animate={{ 
          background: [
            'radial-gradient(ellipse at 30% 0%, rgba(201,162,39,0.1) 0%, transparent 50%)',
            'radial-gradient(ellipse at 70% 0%, rgba(201,162,39,0.1) 0%, transparent 50%)',
            'radial-gradient(ellipse at 30% 0%, rgba(201,162,39,0.1) 0%, transparent 50%)'
          ]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          style={{ y: headerY, opacity: headerOpacity }}
          className="text-center mb-16"
        >
          <motion.p 
            className="text-gold tracking-[0.3em] text-sm uppercase mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Visual Journey
          </motion.p>
          <motion.h2 
            className="font-playfair text-4xl md:text-5xl lg:text-6xl text-ivory mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Gallery
          </motion.h2>
          <motion.div 
            className="w-24 h-px bg-gold/50 mx-auto"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          />
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((cat, index) => (
            <motion.button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`px-6 py-2.5 text-sm tracking-wider uppercase transition-all duration-500 relative overflow-hidden ${
                activeCategory === cat.key
                  ? 'bg-gold text-charcoal'
                  : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
              }`}
              data-cursor-hover
            >
              {/* Hover shine effect */}
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full"
                whileHover={{ translateX: '200%' }}
                transition={{ duration: 0.6 }}
              />
              <span className="relative z-10">{cat.label}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Gallery Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          style={{ perspective: 1000 }}
        >
          <AnimatePresence mode="popLayout">
            {filteredImages.map((image, index) => (
              <GalleryCard
                key={image.url}
                image={image}
                index={index}
                onClick={() => openLightbox(index)}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <motion.button
            onClick={() => setActiveCategory('all')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="group px-10 py-4 border border-gold/50 text-gold tracking-wider uppercase relative overflow-hidden"
            data-cursor-hover
          >
            <motion.span
              className="absolute inset-0 bg-gold/10"
              initial={{ x: '-100%' }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
            <span className="relative z-10">View All {allImages.length} Photos</span>
          </motion.button>
        </motion.div>
      </div>

      {/* Cinematic Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <CinematicLightbox
            images={filteredImages}
            currentIndex={currentImageIndex}
            onClose={closeLightbox}
            onNext={nextImage}
            onPrev={prevImage}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default GallerySectionEnhanced;
