import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.02, 0.98, 1], [0, 1, 1, 0]);

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] bg-gold/20 z-[100] origin-left"
      style={{ opacity }}
    >
      <motion.div
        className="h-full bg-gradient-to-r from-gold via-gold-light to-gold origin-left"
        style={{ scaleX }}
      />
    </motion.div>
  );
};

export default ScrollProgress;
