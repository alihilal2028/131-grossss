import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

// Parallax wrapper for scroll-based movement
export const ParallaxSection = ({ children, speed = 0.5, className = '' }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });

  const y = useTransform(scrollYProgress, [0, 1], [100 * speed, -100 * speed]);
  const smoothY = useSpring(y, { damping: 30, stiffness: 100 });

  return (
    <motion.div ref={ref} style={{ y: smoothY }} className={className}>
      {children}
    </motion.div>
  );
};

// Fade in on scroll
export const FadeInOnScroll = ({ 
  children, 
  delay = 0, 
  duration = 0.8,
  direction = 'up', // up, down, left, right
  distance = 60,
  className = '' 
}) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.9', 'start 0.4']
  });

  const directions = {
    up: { x: 0, y: distance },
    down: { x: 0, y: -distance },
    left: { x: distance, y: 0 },
    right: { x: -distance, y: 0 },
  };

  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const x = useTransform(scrollYProgress, [0, 1], [directions[direction].x, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [directions[direction].y, 0]);

  const smoothOpacity = useSpring(opacity, { damping: 30, stiffness: 100 });
  const smoothX = useSpring(x, { damping: 30, stiffness: 100 });
  const smoothY = useSpring(y, { damping: 30, stiffness: 100 });

  return (
    <motion.div
      ref={ref}
      style={{ opacity: smoothOpacity, x: smoothX, y: smoothY }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Scale on scroll
export const ScaleOnScroll = ({ children, className = '' }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'center center']
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.5, 1]);

  const smoothScale = useSpring(scale, { damping: 30, stiffness: 100 });
  const smoothOpacity = useSpring(opacity, { damping: 30, stiffness: 100 });

  return (
    <motion.div
      ref={ref}
      style={{ scale: smoothScale, opacity: smoothOpacity }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Reveal mask animation
export const RevealMask = ({ children, className = '' }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.85', 'start 0.35']
  });

  const clipPath = useTransform(
    scrollYProgress,
    [0, 1],
    ['inset(0 100% 0 0)', 'inset(0 0% 0 0)']
  );

  return (
    <motion.div ref={ref} style={{ clipPath }} className={className}>
      {children}
    </motion.div>
  );
};

// Text reveal animation (word by word)
export const TextReveal = ({ text, className = '', tag: Tag = 'p' }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.9', 'start 0.3']
  });

  const words = text.split(' ');

  return (
    <Tag ref={ref} className={className}>
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + (1 / words.length);
        return (
          <Word key={i} progress={scrollYProgress} range={[start, end]}>
            {word}
          </Word>
        );
      })}
    </Tag>
  );
};

const Word = ({ children, progress, range }) => {
  const opacity = useTransform(progress, range, [0.2, 1]);
  const y = useTransform(progress, range, [10, 0]);
  
  return (
    <motion.span
      style={{ opacity, y }}
      className="inline-block mr-[0.25em]"
    >
      {children}
    </motion.span>
  );
};

// Horizontal scroll section
export const HorizontalScroll = ({ children, className = '' }) => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-75%']);

  return (
    <section ref={targetRef} className={`relative h-[300vh] ${className}`}>
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-8">
          {children}
        </motion.div>
      </div>
    </section>
  );
};
