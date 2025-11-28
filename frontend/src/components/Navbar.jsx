import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
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
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-charcoal/90 backdrop-blur-xl border-b border-white/10'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => scrollToSection('#hero')}
            >
              <div className="w-10 h-10 border-2 border-gold flex items-center justify-center">
                <span className="font-playfair text-gold text-lg font-bold">131</span>
              </div>
              <div className="hidden sm:block">
                <p className="text-xs tracking-[0.3em] text-white/60 uppercase">Grosvenor</p>
                <p className="text-xs tracking-[0.2em] text-gold uppercase">Capitol Hill</p>
              </div>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <motion.button
                  key={link.name}
                  whileHover={{ y: -2 }}
                  onClick={() => scrollToSection(link.href)}
                  className="text-sm tracking-widest text-white/80 hover:text-gold transition-colors duration-300 uppercase"
                >
                  {link.name}
                </motion.button>
              ))}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection('#contact')}
                className="ml-4 px-6 py-2.5 bg-gold/10 border border-gold/50 text-gold text-sm tracking-wider uppercase hover:bg-gold/20 transition-all duration-300"
              >
                Book Viewing
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-white/80 hover:text-gold transition-colors"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <motion.div
        initial={{ opacity: 0, x: '100%' }}
        animate={{ 
          opacity: mobileMenuOpen ? 1 : 0, 
          x: mobileMenuOpen ? 0 : '100%' 
        }}
        transition={{ duration: 0.3 }}
        className={`fixed inset-0 z-40 bg-charcoal/98 backdrop-blur-xl md:hidden ${
          mobileMenuOpen ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navLinks.map((link, index) => (
            <motion.button
              key={link.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: mobileMenuOpen ? 1 : 0, 
                y: mobileMenuOpen ? 0 : 20 
              }}
              transition={{ delay: index * 0.1 }}
              onClick={() => scrollToSection(link.href)}
              className="text-2xl tracking-widest text-white/80 hover:text-gold transition-colors duration-300 uppercase"
            >
              {link.name}
            </motion.button>
          ))}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: mobileMenuOpen ? 1 : 0, 
              y: mobileMenuOpen ? 0 : 20 
            }}
            transition={{ delay: 0.4 }}
            onClick={() => scrollToSection('#contact')}
            className="mt-4 px-8 py-3 bg-gold text-charcoal text-lg tracking-wider uppercase"
          >
            Book Viewing
          </motion.button>
        </div>
      </motion.div>
    </>
  );
};

export default Navbar;
