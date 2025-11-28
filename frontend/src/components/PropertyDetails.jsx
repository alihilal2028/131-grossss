import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  Calendar, 
  MapPin, 
  Bed, 
  Bath, 
  Square, 
  Home,
  Thermometer,
  Receipt,
  Building
} from 'lucide-react';
import { propertyData, propertyImages } from '../data/propertyData';

const PropertyDetails = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const details = [
    { icon: MapPin, label: 'Address', value: propertyData.address.full },
    { icon: Building, label: 'Community', value: propertyData.community },
    { icon: Bed, label: 'Bedrooms', value: propertyData.beds },
    { icon: Bath, label: 'Bathrooms', value: propertyData.baths },
    { icon: Square, label: 'Interior', value: propertyData.sqftFormatted },
    { icon: Home, label: 'Lot Size', value: propertyData.lotSize },
    { icon: Calendar, label: 'Year Built', value: propertyData.yearBuilt },
    { icon: Thermometer, label: 'Heating', value: propertyData.heating },
    { icon: Receipt, label: 'Taxes', value: propertyData.taxes }
  ];

  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="details" ref={ref} className="relative py-32 bg-charcoal overflow-hidden">
      {/* Parallax Background Image */}
      <div className="absolute inset-0 opacity-20">
        <img
          src={propertyImages.bedrooms[0].url}
          alt="Property background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal via-charcoal/90 to-charcoal" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <p className="text-gold tracking-[0.3em] text-sm uppercase mb-4">Property Information</p>
          <h2 className="font-playfair text-4xl md:text-5xl text-ivory mb-6">
            The Details
          </h2>
          <div className="w-24 h-px bg-gold/50 mx-auto" />
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Left Content - Description */}
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h3 className="font-playfair text-3xl text-ivory mb-6">A Lifestyle Statement</h3>
              
              {propertyData.description.split('\n\n').map((paragraph, index) => (
                <motion.p
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  className="text-white/70 leading-relaxed mb-6"
                >
                  {paragraph}
                </motion.p>
              ))}
            </motion.div>

            {/* Feature Categories */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="grid sm:grid-cols-2 gap-8 mt-12"
            >
              {Object.entries(propertyData.features).map(([category, features], catIndex) => (
                <div key={category} className="space-y-4">
                  <h4 className="text-gold uppercase tracking-widest text-sm border-b border-gold/30 pb-2">
                    {category}
                  </h4>
                  <ul className="space-y-2">
                    {features.slice(0, 4).map((feature, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: 10 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.4, delay: 0.8 + catIndex * 0.1 + index * 0.05 }}
                        className="text-white/60 text-sm flex items-center gap-2"
                      >
                        <span className="w-1 h-1 bg-gold rounded-full" />
                        {feature}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Side - Sticky Facts Card */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="lg:sticky lg:top-28"
            >
              <div className="glass-card p-8 border-gold/20">
                {/* Price */}
                <div className="text-center mb-8 pb-8 border-b border-white/10">
                  <p className="text-white/50 text-sm uppercase tracking-widest mb-2">List Price</p>
                  <p className="font-playfair text-4xl text-gold">{propertyData.priceFormatted}</p>
                  <p className="text-white/40 text-sm mt-2">MLS® {propertyData.mls}</p>
                </div>

                {/* Details Grid */}
                <div className="space-y-4 mb-8">
                  {details.map((detail, index) => (
                    <motion.div
                      key={detail.label}
                      initial={{ opacity: 0, y: 10 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.4, delay: 0.5 + index * 0.05 }}
                      className="flex items-center justify-between py-2 border-b border-white/5"
                    >
                      <div className="flex items-center gap-3">
                        <detail.icon className="w-4 h-4 text-gold" />
                        <span className="text-white/50 text-sm">{detail.label}</span>
                      </div>
                      <span className="text-ivory text-sm text-right max-w-[180px]">{detail.value}</span>
                    </motion.div>
                  ))}
                </div>

                {/* CTA Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={scrollToContact}
                  className="w-full py-4 bg-gold text-charcoal font-medium tracking-wider uppercase transition-all duration-300 hover:bg-gold/90"
                >
                  Book a Private Viewing
                </motion.button>

                {/* Agent Info */}
                <div className="mt-8 pt-6 border-t border-white/10 text-center">
                  <p className="text-white/50 text-xs uppercase tracking-widest mb-2">Listed By</p>
                  <p className="text-ivory font-medium">{propertyData.agent.name}</p>
                  <p className="text-white/40 text-sm">{propertyData.agent.brokerage}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PropertyDetails;
