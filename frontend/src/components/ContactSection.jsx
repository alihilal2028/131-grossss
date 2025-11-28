import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Send, MapPin, User, Mail, DollarSign, MessageSquare } from 'lucide-react';
import { propertyData } from '../data/propertyData';

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    city: '',
    budget: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setSubmitted(true);
    setFormData({ name: '', email: '', city: '', budget: '', message: '' });
  };

  const budgetOptions = [
    '$2M - $3M',
    '$3M - $4M',
    '$4M - $5M',
    '$5M+'
  ];

  return (
    <section id="contact" ref={ref} className="relative py-32 bg-charcoal-light overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(201,162,39,0.2) 1px, transparent 0)`,
          backgroundSize: '60px 60px'
        }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-gold tracking-[0.3em] text-sm uppercase mb-4">Get In Touch</p>
          <h2 className="font-playfair text-4xl md:text-5xl text-ivory mb-6">
            Request a Private Viewing
          </h2>
          <div className="w-24 h-px bg-gold/50 mx-auto" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="glass-card p-8 md:p-10">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gold/20 flex items-center justify-center">
                    <Send className="w-8 h-8 text-gold" />
                  </div>
                  <h3 className="font-playfair text-2xl text-ivory mb-3">Thank You</h3>
                  <p className="text-white/60">Your inquiry has been received. We will be in touch shortly.</p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-6 text-gold text-sm hover:underline"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name */}
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your Name"
                      required
                      className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 text-ivory placeholder:text-white/30 focus:border-gold/50 focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Email */}
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Email Address"
                      required
                      className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 text-ivory placeholder:text-white/30 focus:border-gold/50 focus:outline-none transition-colors"
                    />
                  </div>

                  {/* City & Budget Row */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="relative">
                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="Preferred City"
                        className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 text-ivory placeholder:text-white/30 focus:border-gold/50 focus:outline-none transition-colors"
                      />
                    </div>
                    <div className="relative">
                      <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                      <select
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                        className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 text-ivory focus:border-gold/50 focus:outline-none transition-colors appearance-none cursor-pointer"
                      >
                        <option value="" className="bg-charcoal">Budget Range</option>
                        {budgetOptions.map(option => (
                          <option key={option} value={option} className="bg-charcoal">{option}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="relative">
                    <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-white/30" />
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Your Message"
                      rows={4}
                      className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 text-ivory placeholder:text-white/30 focus:border-gold/50 focus:outline-none transition-colors resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-4 bg-gold text-charcoal font-medium tracking-wider uppercase transition-all duration-300 hover:bg-gold/90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
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
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>

          {/* Map Pin Graphic */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative hidden lg:flex items-center justify-center"
          >
            {/* Abstract Map Pin */}
            <div className="relative w-80 h-80">
              {/* Outer rings */}
              {[...Array(4)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ 
                    scale: [1, 1.1, 1],
                    opacity: [0.3 - i * 0.05, 0.5 - i * 0.1, 0.3 - i * 0.05]
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.5
                  }}
                  className="absolute inset-0 rounded-full border border-gold/30"
                  style={{
                    transform: `scale(${1 - i * 0.15})`
                  }}
                />
              ))}
              
              {/* Center pin */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-6 h-6 bg-gold rounded-full shadow-lg shadow-gold/50"
                />
              </div>
              
              {/* Address label */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-center">
                <p className="text-gold font-playfair text-lg">{propertyData.address.street}</p>
                <p className="text-white/50 text-sm">{propertyData.address.neighborhood}, {propertyData.address.city}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
