import React, { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { allImages, propertyImages } from '../data/propertyData';

// 3D Gallery Card with depth and hover effects
const GalleryCard = ({ image, index, onClick }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 50, rotateX: 20, z: -100 }}
      animate={{ opacity: 1, y: 0, rotateX: 0, z: 0 }}
      exit={{ opacity: 0, scale: 0.95, rotateY: -20 }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1]
      }}
      whileHover={{ 
        y: -12, 
        scale: 1.03,
        z: 100,
        rotateX: -3,
        rotateY: 2,
        boxShadow: '0 30px 60px rgba(0,0,0,0.5)'
      }}
      onClick={onClick}
      style={{ 
        transformStyle: 'preserve-3d',
        perspective: '1000px'
      }}
      className="relative aspect-[4/3] overflow-hidden cursor-pointer group"
    >
      <motion.img
        src={image.url}
        alt={image.alt}
        className="w-full h-full object-cover"
        loading="lazy"
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.6 }}
        style={{ transformStyle: 'preserve-3d' }}
      />
      
      {/* 3D Layered overlay */}
      <motion.div 
        className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/40 transition-colors duration-300"
        style={{ translateZ: 20 }}
      />
      
      {/* Border with depth */}
      <motion.div 
        className="absolute inset-0 border border-white/0 group-hover:border-gold/40 transition-colors duration-300"
        style={{ translateZ: 30 }}
      />
      
      {/* View icon with 3D pop */}
      <motion.div 
        className="absolute top-4 right-4 w-10 h-10 rounded-full bg-charcoal/60 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ translateZ: 50 }}
        whileHover={{ scale: 1.2, rotateZ: 90 }}
      >
        <Maximize2 className="w-4 h-4 text-gold" />
      </motion.div>
      
      {/* Caption with 3D slide */}
      <motion.div 
        className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-charcoal/80 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300"
        style={{ translateZ: 40 }}
      >
        <p className="text-ivory text-sm">{image.alt}</p>
      </motion.div>
    </motion.div>
  );
};

// Simple Lightbox
const Lightbox = ({ images, currentIndex, onClose, onNext, onPrev }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-charcoal/95 backdrop-blur-lg flex items-center justify-center"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-6 right-6 p-3 text-white/60 hover:text-white transition-colors z-10"
      >
        <X size={28} />
      </button>

      <button
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        className="absolute left-4 md:left-8 p-3 text-white/60 hover:text-gold transition-colors z-10"
      >
        <ChevronLeft size={36} />
      </button>

      <button
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        className="absolute right-4 md:right-8 p-3 text-white/60 hover:text-gold transition-colors z-10"
      >
        <ChevronRight size={36} />
      </button>

      <motion.img
        key={currentIndex}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        src={images[currentIndex]?.url}
        alt={images[currentIndex]?.alt}
        className="max-w-[90vw] max-h-[85vh] object-contain"
        onClick={(e) => e.stopPropagation()}
      />

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4">
        <span className="text-white/50 text-sm">
          {currentIndex + 1} / {images.length}
        </span>
        <div className="w-24 h-0.5 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-gold transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / images.length) * 100}%` }}
          />
        </div>
      </div>
    </motion.div>
  );
};

const GallerySectionOptimized = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeCategory, setActiveCategory] = useState('all');

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

  return (
    <section id="gallery" ref={ref} className="relative py-32 bg-charcoal-light overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-gold tracking-[0.3em] text-sm uppercase mb-4">Visual Journey</p>
          <h2 className="font-playfair text-4xl md:text-5xl text-ivory mb-6">Gallery</h2>
          <div className="w-24 h-px bg-gold/50 mx-auto" />
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`px-5 py-2 text-sm tracking-wider uppercase transition-all duration-300 ${
                activeCategory === cat.key
                  ? 'bg-gold text-charcoal'
                  : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </motion.div>

        {/* Gallery Grid with 3D staggerChildren */}
        <motion.div
          layout
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{
            visible: { transition: { staggerChildren: 0.1 } }
          }}
          style={{ 
            perspective: '2000px',
            transformStyle: 'preserve-3d'
          }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
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
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <button
            onClick={() => setActiveCategory('all')}
            className="px-8 py-3 border border-gold/50 text-gold tracking-wider uppercase hover:bg-gold/10 transition-all duration-300"
          >
            View All {allImages.length} Photos
          </button>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <Lightbox
            images={filteredImages}
            currentIndex={currentImageIndex}
            onClose={() => setLightboxOpen(false)}
            onNext={() => setCurrentImageIndex((prev) => (prev + 1) % filteredImages.length)}
            onPrev={() => setCurrentImageIndex((prev) => (prev - 1 + filteredImages.length) % filteredImages.length)}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default GallerySectionOptimized;
