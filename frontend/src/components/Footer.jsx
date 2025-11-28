import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Instagram, Facebook, Linkedin } from 'lucide-react';
import { propertyData } from '../data/propertyData';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative bg-charcoal border-t border-white/10">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 border-2 border-gold flex items-center justify-center">
                <span className="font-playfair text-gold text-xl font-bold">131</span>
              </div>
              <div>
                <p className="text-ivory font-playfair text-lg">Grosvenor Avenue</p>
                <p className="text-white/50 text-xs tracking-widest uppercase">Capitol Hill</p>
              </div>
            </div>
            <p className="text-white/50 text-sm leading-relaxed max-w-xs">
              A cinematic view residence in Burnaby&apos;s prestigious Capitol Hill neighborhood. 
              Where architectural excellence meets panoramic beauty.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-gold uppercase tracking-widest text-sm mb-6">Explore</h4>
            <ul className="space-y-3">
              {[
                { label: 'Home', href: '#hero' },
                { label: 'Gallery', href: '#gallery' },
                { label: 'Details', href: '#details' },
                { label: 'Contact', href: '#contact' }
              ].map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-white/60 hover:text-gold transition-colors text-sm"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-gold uppercase tracking-widest text-sm mb-6">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-gold mt-1 flex-shrink-0" />
                <span className="text-white/60 text-sm">
                  {propertyData.address.full}
                </span>
              </li>
              <li>
                <a 
                  href={`tel:${propertyData.agent.phone}`}
                  className="flex items-center gap-3 text-white/60 hover:text-gold transition-colors text-sm"
                >
                  <Phone className="w-4 h-4 text-gold" />
                  {propertyData.agent.phone}
                </a>
              </li>
              <li>
                <a 
                  href={`mailto:${propertyData.agent.email}`}
                  className="flex items-center gap-3 text-white/60 hover:text-gold transition-colors text-sm"
                >
                  <Mail className="w-4 h-4 text-gold" />
                  {propertyData.agent.email}
                </a>
              </li>
            </ul>

            {/* Social Links */}
            <div className="flex gap-4 mt-6">
              {[Instagram, Facebook, Linkedin].map((Icon, index) => (
                <motion.a
                  key={index}
                  href="#"
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="w-10 h-10 border border-white/20 flex items-center justify-center hover:border-gold/50 hover:bg-gold/10 transition-all duration-300"
                >
                  <Icon className="w-4 h-4 text-white/60" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/40 text-xs">
              © {currentYear} {propertyData.agent.brokerage}. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <span className="text-white/30 text-xs">MLS® {propertyData.mls}</span>
              <span className="text-white/30 text-xs">|</span>
              <span className="text-white/30 text-xs">Listed by {propertyData.agent.name}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative gold line */}
      <div className="h-1 bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
    </footer>
  );
};

export default Footer;
