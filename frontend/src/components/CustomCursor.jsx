import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const cursorDotRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isHoveringCTA, setIsHoveringCTA] = useState(false);
  const [cursorText, setCursorText] = useState('');

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 400 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  const dotSpringConfig = { damping: 35, stiffness: 600 };
  const dotX = useSpring(mouseX, dotSpringConfig);
  const dotY = useSpring(mouseY, dotSpringConfig);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseEnter = (e) => {
      const target = e.target;
      if (target.matches('a, button, [data-cursor-hover]')) {
        setIsHovering(true);
      }
      if (target.matches('[data-cursor-cta]')) {
        setIsHoveringCTA(true);
        setCursorText(target.dataset.cursorText || 'View');
      }
    };

    const handleMouseLeave = (e) => {
      const target = e.target;
      if (target.matches('a, button, [data-cursor-hover]')) {
        setIsHovering(false);
      }
      if (target.matches('[data-cursor-cta]')) {
        setIsHoveringCTA(false);
        setCursorText('');
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter, true);
    document.addEventListener('mouseleave', handleMouseLeave, true);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter, true);
      document.removeEventListener('mouseleave', handleMouseLeave, true);
    };
  }, [mouseX, mouseY]);

  // Hide on mobile/touch devices
  if (typeof window !== 'undefined' && 'ontouchstart' in window) {
    return null;
  }

  return (
    <>
      {/* Main cursor ring */}
      <motion.div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference hidden lg:block"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div
          animate={{
            scale: isHoveringCTA ? 3 : isHovering ? 1.5 : 1,
            opacity: isHoveringCTA ? 1 : 1,
          }}
          transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
          className="w-10 h-10 rounded-full border border-white/50 flex items-center justify-center"
        >
          {isHoveringCTA && (
            <motion.span
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="text-[8px] text-white uppercase tracking-wider font-medium"
            >
              {cursorText}
            </motion.span>
          )}
        </motion.div>
      </motion.div>

      {/* Cursor dot */}
      <motion.div
        ref={cursorDotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] hidden lg:block"
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div
          animate={{
            scale: isHovering || isHoveringCTA ? 0 : 1,
          }}
          transition={{ duration: 0.2 }}
          className="w-1.5 h-1.5 bg-gold rounded-full"
        />
      </motion.div>
    </>
  );
};

export default CustomCursor;
