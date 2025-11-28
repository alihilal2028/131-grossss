import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import MagneticButton from './MagneticButton';

const NavbarEnhanced = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      // Detect active section
      const sections = ['hero', 'gallery', 'details', 'contact'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Details', href: '#details' },
    { name: 'Contact', href: '#contact' }
  ];

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          scrolled
            ? 'bg-charcoal/80 backdrop-blur-2xl border-b border-white/5 shadow-lg shadow-black/20'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo with hover effect */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="flex items-center gap-3 cursor-pointer group"
              onClick={() => scrollToSection('#hero')}
              data-cursor-hover
            >
              <motion.div 
                className="w-10 h-10 border-2 border-gold flex items-center justify-center relative overflow-hidden"
                whileHover={{ borderColor: '#d4b84a' }}
              >
                <span className="font-playfair text-gold text-lg font-bold relative z-10">131</span>
                <motion.div
                  className="absolute inset-0 bg-gold/10"
                  initial={{ y: '100%' }}
                  whileHover={{ y: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
              <div className="hidden sm:block">
                <p className="text-xs tracking-[0.3em] text-white/60 uppercase group-hover:text-white/80 transition-colors">Grosvenor</p>
                <p className="text-xs tracking-[0.2em] text-gold uppercase">Capitol Hill</p>
              </div>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <motion.button
                  key={link.name}
                  onClick={() => scrollToSection(link.href)}
                  className="relative text-sm tracking-widest uppercase py-2 group"
                  whileHover={{ y: -2 }}
                  data-cursor-hover
                >
                  <span className={`transition-colors duration-300 ${
                    activeSection === link.href.slice(1) 
                      ? 'text-gold' 
                      : 'text-white/70 group-hover:text-white'
                  }`}>
                    {link.name}
                  </span>
                  {/* Active indicator */}
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-px bg-gold"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: activeSection === link.href.slice(1) ? 1 : 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>
              ))}
              
              <MagneticButton
                onClick={() => scrollToSection('#contact')}
                className="ml-4 px-6 py-2.5 bg-transparent border border-gold/50 text-gold text-sm tracking-wider uppercase hover:bg-gold/10 transition-all duration-300 relative overflow-hidden group"
                strength={0.15}
              >
                <span className="relative z-10">Book Viewing</span>
                <motion.div
                  className="absolute inset-0 bg-gold/10"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </MagneticButton>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              whileTap={{ scale: 0.9 }}
              className="md:hidden p-2 text-white/80 hover:text-gold transition-colors"
            >
              <AnimatePresence mode="wait">
                {mobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={24} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={24} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            {/* Backdrop */}
            <motion.div 
              className="absolute inset-0 bg-charcoal/98 backdrop-blur-2xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            
            {/* Menu content */}
            <div className="relative flex flex-col items-center justify-center h-full gap-8">
              {navLinks.map((link, index) => (
                <motion.button
                  key={link.name}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                  onClick={() => scrollToSection(link.href)}
                  className={`text-3xl tracking-widest uppercase transition-colors duration-300 ${
                    activeSection === link.href.slice(1) ? 'text-gold' : 'text-white/70'
                  }`}
                >
                  {link.name}
                </motion.button>
              ))}
              
              <motion.button
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ delay: 0.4, duration: 0.4 }}
                onClick={() => scrollToSection('#contact')}
                className="mt-4 px-10 py-4 bg-gold text-charcoal text-lg tracking-wider uppercase"
              >
                Book Viewing
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default NavbarEnhanced;
