import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Phone, Mail, Calendar, MapPin } from 'lucide-react';
import { propertyData } from '../data/propertyData';

const AgentPanel = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="relative py-24 bg-charcoal overflow-hidden">
      {/* Gold accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
      
      <div className="relative max-w-4xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="glass-card p-8 md:p-12"
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Agent Info */}
            <div>
              <p className="text-gold tracking-[0.2em] text-xs uppercase mb-4">Your Listing Agent</p>
              <h3 className="font-playfair text-3xl text-ivory mb-2">{propertyData.agent.name}</h3>
              <p className="text-white/50 text-sm mb-6">{propertyData.agent.brokerage}</p>
              
              <div className="space-y-3">
                <a 
                  href={`tel:${propertyData.agent.phone}`}
                  className="flex items-center gap-3 text-white/70 hover:text-gold transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  <span className="text-sm">{propertyData.agent.phone}</span>
                </a>
                <a 
                  href={`mailto:${propertyData.agent.email}`}
                  className="flex items-center gap-3 text-white/70 hover:text-gold transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  <span className="text-sm">{propertyData.agent.email}</span>
                </a>
              </div>
            </div>

            {/* Open House Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-gold/10 border border-gold/30 p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <Calendar className="w-5 h-5 text-gold" />
                <span className="text-gold uppercase tracking-widest text-sm">Open House</span>
              </div>
              <p className="font-playfair text-2xl text-ivory mb-2">{propertyData.openHouse.date}</p>
              <p className="text-white/60">{propertyData.openHouse.time}</p>
              
              <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gold/20">
                <MapPin className="w-4 h-4 text-gold" />
                <span className="text-white/50 text-sm">{propertyData.address.street}</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AgentPanel;
