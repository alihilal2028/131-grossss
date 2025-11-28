import React from 'react';
import { motion } from 'framer-motion';

/**
 * Reusable FadeIn wrapper component
 * Animates children from { opacity: 0, y: 20 } to { opacity: 1, y: 0 }
 * with a duration of 0.8s and ease: "easeOut"
 */
const FadeIn = ({ 
  children, 
  delay = 0, 
  duration = 0.8,
  className = ''
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ 
        duration, 
        delay,
        ease: "easeOut"
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default FadeIn;
