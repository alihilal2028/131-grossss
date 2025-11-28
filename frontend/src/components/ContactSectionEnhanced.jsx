import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { Send, MapPin, User, Mail, DollarSign, MessageSquare, CheckCircle } from 'lucide-react';
import { FadeInOnScroll } from './ScrollAnimations';
import MagneticButton from './MagneticButton';
import { propertyData } from '../data/propertyData';

// Animated input component
const AnimatedInput = ({ icon: Icon, label, type = 'text', name, value, onChange, required = false }) => {
  const [isFocused, setIsFocused] = useState(false);
  const hasValue = value && value.length > 0;

  return (
    <motion.div
      className="relative"
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.2 }}
    >
      <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30 transition-colors duration-300" 
        style={{ color: isFocused ? '#c9a227' : '' }}
      />
      
      {/* Floating label */}
      <motion.label
        className="absolute left-12 text-white/50 pointer-events-none"
        animate={{
          top: isFocused || hasValue ? '0.25rem' : '50%',
          y: isFocused || hasValue ? 0 : '-50%',
          fontSize: isFocused || hasValue ? '0.65rem' : '0.875rem',
          color: isFocused ? '#c9a227' : 'rgba(255,255,255,0.5)'
        }}
        transition={{ duration: 0.2 }}
      >
        {label}
      </motion.label>
      
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="w-full pl-12 pr-4 pt-5 pb-3 bg-white/5 border border-white/10 text-ivory focus:border-gold/50 focus:bg-white/[0.07] focus:outline-none transition-all duration-300"
      />
      
      {/* Focus glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none border border-gold/50 opacity-0"
        animate={{ opacity: isFocused ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      />
    </motion.div>
  );
};

// Animated select
const AnimatedSelect = ({ icon: Icon, label, name, value, onChange, options }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <motion.div
      className="relative"
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.2 }}
    >
      <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30 transition-colors duration-300"
        style={{ color: isFocused ? '#c9a227' : '' }}
      />
      
      <select
        name={name}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 text-ivory focus:border-gold/50 focus:bg-white/[0.07] focus:outline-none transition-all duration-300 appearance-none cursor-pointer"
      >
        <option value="" className="bg-charcoal">{label}</option>
        {options.map(option => (
          <option key={option} value={option} className="bg-charcoal">{option}</option>
        ))}
      </select>
    </motion.div>
  );
};

// Animated textarea
const AnimatedTextarea = ({ icon: Icon, label, name, value, onChange }) => {
  const [isFocused, setIsFocused] = useState(false);
  const hasValue = value && value.length > 0;

  return (
    <motion.div
      className="relative"
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.2 }}
    >
      <Icon className="absolute left-4 top-4 w-5 h-5 text-white/30 transition-colors duration-300"
        style={{ color: isFocused ? '#c9a227' : '' }}
      />
      
      <motion.label
        className="absolute left-12 text-white/50 pointer-events-none"
        animate={{
          top: isFocused || hasValue ? '0.25rem' : '1rem',
          fontSize: isFocused || hasValue ? '0.65rem' : '0.875rem',
          color: isFocused ? '#c9a227' : 'rgba(255,255,255,0.5)'
        }}
        transition={{ duration: 0.2 }}
      >
        {label}
      </motion.label>
      
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        rows={4}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="w-full pl-12 pr-4 pt-5 pb-3 bg-white/5 border border-white/10 text-ivory focus:border-gold/50 focus:bg-white/[0.07] focus:outline-none transition-all duration-300 resize-none"
      />
    </motion.div>
  );
};

// Animated Map Pin
const AnimatedMapPin = () => {
  return (
    <div className="relative w-80 h-80 flex items-center justify-center">
      {/* Outer pulsing rings */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border border-gold/20"
          style={{
            width: `${(i + 1) * 80}px`,
            height: `${(i + 1) * 80}px`,
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.1, 0.3],
          }}
          transition={{
            duration: 3,
            delay: i * 0.4,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
      ))}
      
      {/* Rotating dashed circle */}
      <motion.div
        className="absolute w-48 h-48 rounded-full border border-dashed border-gold/30"
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
      />
      
      {/* Inner glowing circle */}
      <motion.div
        className="absolute w-20 h-20 rounded-full bg-gold/10 backdrop-blur-sm"
        animate={{
          boxShadow: [
            '0 0 20px rgba(201,162,39,0.3)',
            '0 0 40px rgba(201,162,39,0.5)',
            '0 0 20px rgba(201,162,39,0.3)'
          ]
        }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      
      {/* Center pin */}
      <motion.div
        className="relative z-10"
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="w-8 h-8 bg-gold rounded-full shadow-lg shadow-gold/50 flex items-center justify-center">
          <MapPin className="w-4 h-4 text-charcoal" />
        </div>
        {/* Pin shadow */}
        <motion.div
          className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-6 h-1 bg-black/30 rounded-full blur-sm"
          animate={{ scale: [1, 0.8, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
      
      {/* Address label */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center whitespace-nowrap"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        viewport={{ once: true }}
      >
        <p className="text-gold font-playfair text-lg">{propertyData.address.street}</p>
        <p className="text-white/50 text-sm">{propertyData.address.neighborhood}, {propertyData.address.city}</p>
      </motion.div>
    </div>
  );
};

const ContactSectionEnhanced = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    city: '',
    budget: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const bgY = useTransform(scrollYProgress, [0, 1], [0, -50]);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setSubmitted(true);
    setFormData({ name: '', email: '', city: '', budget: '', message: '' });
  };

  const budgetOptions = ['$2M - $3M', '$3M - $4M', '$4M - $5M', '$5M+'];

  return (
    <section id="contact" ref={ref} className="relative py-32 bg-charcoal-light overflow-hidden">
      {/* Animated background */}
      <motion.div 
        className="absolute inset-0 opacity-10"
        style={{ y: bgY }}
      >
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(201,162,39,0.2) 1px, transparent 0)`,
          backgroundSize: '60px 60px'
        }} />
      </motion.div>

      {/* Ambient glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <FadeInOnScroll className="text-center mb-16">
          <motion.p 
            className="text-gold tracking-[0.3em] text-sm uppercase mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Get In Touch
          </motion.p>
          <motion.h2 
            className="font-playfair text-4xl md:text-5xl lg:text-6xl text-ivory mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Request a Private Viewing
          </motion.h2>
          <motion.div 
            className="w-24 h-px bg-gold/50 mx-auto"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          />
        </FadeInOnScroll>

        <div className="grid lg:grid-cols-2 gap-16 items-center" style={{ perspective: '1500px' }}>
          {/* Contact Form with 3D */}
          <motion.div
            initial={{ opacity: 0, x: -50, rotateY: -10, z: -80 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0, z: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            style={{ transformStyle: 'preserve-3d' }}
          >
            <motion.div 
              className="glass-card p-8 md:p-10 relative overflow-visible"
              whileHover={{ 
                boxShadow: '0 25px 60px rgba(201,162,39,0.2)',
                z: 50,
                scale: 1.02,
                rotateY: 2
              }}
              transition={{ duration: 0.5 }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Decorative corner */}
              <div className="absolute top-0 right-0 w-20 h-20 border-t border-r border-gold/20" />
              <div className="absolute bottom-0 left-0 w-20 h-20 border-b border-l border-gold/20" />
              
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', duration: 0.5 }}
                    className="w-20 h-20 mx-auto mb-6 rounded-full bg-gold/20 flex items-center justify-center"
                  >
                    <CheckCircle className="w-10 h-10 text-gold" />
                  </motion.div>
                  <h3 className="font-playfair text-3xl text-ivory mb-3">Thank You</h3>
                  <p className="text-white/60 mb-6">Your inquiry has been received. We will be in touch shortly.</p>
                  <motion.button
                    onClick={() => setSubmitted(false)}
                    whileHover={{ scale: 1.05 }}
                    className="text-gold text-sm hover:underline"
                  >
                    Send another message
                  </motion.button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <AnimatedInput
                    icon={User}
                    label="Your Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />

                  <AnimatedInput
                    icon={Mail}
                    label="Email Address"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />

                  <div className="grid sm:grid-cols-2 gap-4">
                    <AnimatedInput
                      icon={MapPin}
                      label="Preferred City"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                    />
                    <AnimatedSelect
                      icon={DollarSign}
                      label="Budget Range"
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      options={budgetOptions}
                    />
                  </div>

                  <AnimatedTextarea
                    icon={MessageSquare}
                    label="Your Message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                  />

                  <MagneticButton
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-gold text-charcoal font-medium tracking-wider uppercase transition-all duration-500 hover:shadow-[0_0_40px_rgba(201,162,39,0.3)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                    strength={0.1}
                  >
                    {isSubmitting ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        className="w-5 h-5 border-2 border-charcoal/30 border-t-charcoal rounded-full"
                      />
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Request Private Contact
                      </>
                    )}
                  </MagneticButton>
                </form>
              )}
            </motion.div>
          </motion.div>

          {/* Interactive Map with 3D */}
          <motion.div
            initial={{ opacity: 0, x: 50, rotateY: -15, z: -100 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0, z: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            style={{ 
              perspective: '1500px',
              transformStyle: 'preserve-3d'
            }}
            className="relative"
          >
            <motion.div
              className="relative overflow-hidden rounded-lg border border-gold/20 shadow-2xl"
              whileHover={{ 
                scale: 1.02, 
                z: 50,
                rotateY: 2,
                boxShadow: '0 30px 60px rgba(201,162,39,0.2)'
              }}
              transition={{ duration: 0.5 }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Google Maps Embed */}
              <div className="relative w-full h-[500px] bg-charcoal-light">
                <iframe
                  title="Property Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2604.0757468!2d-122.9866!3d49.2388!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x548676c3c3c3c3c3%3A0x0!2s131%20Grosvenor%20Avenue%2C%20Burnaby%2C%20BC!5e0!3m2!1sen!2sca!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="grayscale contrast-125 brightness-90"
                />
                
                {/* Gold overlay gradient */}
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-gold/5 via-transparent to-gold/10" />
                
                {/* Location marker overlay */}
                <motion.div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  style={{ translateZ: 50 }}
                >
                  <div className="relative">
                    <div className="w-12 h-12 bg-gold rounded-full shadow-lg shadow-gold/50 flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-charcoal" />
                    </div>
                    {/* Pulsing ring */}
                    <motion.div
                      className="absolute inset-0 rounded-full border-2 border-gold"
                      animate={{ scale: [1, 2, 2], opacity: [0.5, 0, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </div>
                </motion.div>
              </div>
              
              {/* Address card overlay */}
              <motion.div
                className="absolute bottom-4 left-4 right-4 glass-card p-4 border-gold/30"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
                style={{ translateZ: 60 }}
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <p className="text-ivory font-medium text-sm mb-1">{propertyData.address.street}</p>
                    <p className="text-white/50 text-xs">{propertyData.address.neighborhood}, {propertyData.address.city}, {propertyData.address.province}</p>
                    <motion.a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(propertyData.address.full)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gold text-xs mt-2 inline-flex items-center gap-1 hover:underline"
                      whileHover={{ x: 4 }}
                    >
                      Get Directions
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSectionEnhanced;
