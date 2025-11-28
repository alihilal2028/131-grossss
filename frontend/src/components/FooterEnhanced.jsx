import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { MapPin, Phone, Mail, Instagram, Facebook, Linkedin, ArrowUp } from 'lucide-react';
import { propertyData } from '../data/propertyData';

const FooterEnhanced = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end end']
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 0.5], [50, 0]);

  const currentYear = new Date().getFullYear();

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer ref={ref} className="relative bg-charcoal border-t border-white/5 overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gold/5 rounded-full blur-3xl" />
      
      {/* Main Footer */}
      <motion.div 
        className="relative max-w-7xl mx-auto px-6 lg:px-8 py-20"
        style={{ opacity, y }}
      >
        <div className="grid md:grid-cols-3 gap-12 lg:gap-16">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-6">
              <motion.div 
                className="w-14 h-14 border-2 border-gold flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
              >
                <span className="font-playfair text-gold text-2xl font-bold">131</span>
              </motion.div>
              <div>
                <p className="text-ivory font-playfair text-xl">Grosvenor Avenue</p>
                <p className="text-white/50 text-xs tracking-widest uppercase">Capitol Hill</p>
              </div>
            </div>
            <p className="text-white/50 text-sm leading-relaxed max-w-xs">
              A cinematic view residence in Burnaby&apos;s prestigious Capitol Hill neighborhood. 
              Where architectural excellence meets panoramic beauty.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="text-gold uppercase tracking-widest text-sm mb-6">Explore</h4>
            <ul className="space-y-3">
              {[
                { label: 'Home', href: '#hero' },
                { label: 'Gallery', href: '#gallery' },
                { label: 'Details', href: '#details' },
                { label: 'Contact', href: '#contact' }
              ].map((link, index) => (
                <motion.li 
                  key={link.label}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <motion.button
                    onClick={() => scrollToSection(link.href)}
                    whileHover={{ x: 8 }}
                    className="text-white/60 hover:text-gold transition-colors text-sm flex items-center gap-2 group"
                  >
                    <span className="w-0 h-px bg-gold group-hover:w-4 transition-all duration-300" />
                    {link.label}
                  </motion.button>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="text-gold uppercase tracking-widest text-sm mb-6">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-gold mt-1 flex-shrink-0" />
                <span className="text-white/60 text-sm">
                  {propertyData.address.full}
                </span>
              </li>
              <li>
                <motion.a 
                  href={`tel:${propertyData.agent.phone}`}
                  whileHover={{ x: 4 }}
                  className="flex items-center gap-3 text-white/60 hover:text-gold transition-colors text-sm"
                >
                  <Phone className="w-4 h-4 text-gold" />
                  {propertyData.agent.phone}
                </motion.a>
              </li>
              <li>
                <motion.a 
                  href={`mailto:${propertyData.agent.email}`}
                  whileHover={{ x: 4 }}
                  className="flex items-center gap-3 text-white/60 hover:text-gold transition-colors text-sm"
                >
                  <Mail className="w-4 h-4 text-gold" />
                  {propertyData.agent.email}
                </motion.a>
              </li>
            </ul>

            {/* Social Links */}
            <div className="flex gap-3 mt-6">
              {[Instagram, Facebook, Linkedin].map((Icon, index) => (
                <motion.a
                  key={index}
                  href="#"
                  whileHover={{ y: -4, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 border border-white/10 flex items-center justify-center hover:border-gold/50 hover:bg-gold/10 transition-all duration-300 group"
                >
                  <Icon className="w-4 h-4 text-white/50 group-hover:text-gold transition-colors" />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Back to top button */}
        <motion.button
          onClick={scrollToTop}
          whileHover={{ y: -4 }}
          whileTap={{ scale: 0.95 }}
          className="absolute right-8 top-8 w-12 h-12 border border-white/10 flex items-center justify-center hover:border-gold/50 hover:bg-gold/10 transition-all duration-300 group"
        >
          <ArrowUp className="w-5 h-5 text-white/50 group-hover:text-gold transition-colors" />
        </motion.button>
      </motion.div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/30 text-xs">
              © {currentYear} {propertyData.agent.brokerage}. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <span className="text-white/20 text-xs">MLS® {propertyData.mls}</span>
              <span className="text-white/20 text-xs">|</span>
              <span className="text-white/20 text-xs">Listed by {propertyData.agent.name}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative gold line */}
      <motion.div 
        className="h-1 bg-gradient-to-r from-transparent via-gold/50 to-transparent"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      />
    </footer>
  );
};

export default FooterEnhanced;
