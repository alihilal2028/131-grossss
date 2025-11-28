import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { 
  Calendar, MapPin, Bed, Bath, Square, Home, Thermometer, Receipt, Building
} from 'lucide-react';
import { FadeInOnScroll, ParallaxSection } from './ScrollAnimations';
import MagneticButton from './MagneticButton';
import { propertyData, propertyImages } from '../data/propertyData';

// Staggered detail row with variants
const detailVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1]
    }
  })
};

const DetailRow = ({ icon: Icon, label, value, index }) => (
  <motion.div
    custom={index}
    variants={detailVariants}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-10%" }}
    whileHover={{ 
      x: 8,
      backgroundColor: 'rgba(201,162,39,0.05)',
      transition: { type: "spring", stiffness: 400, damping: 25 }
    }}
    className="flex items-center justify-between py-3 px-2 -mx-2 border-b border-white/5 cursor-default group"
  >
    <div className="flex items-center gap-3">
      <Icon className="w-4 h-4 text-gold group-hover:scale-110 transition-transform" />
      <span className="text-white/50 text-sm">{label}</span>
    </div>
    <span className="text-ivory text-sm text-right max-w-[180px] group-hover:text-gold transition-colors">
      {value}
    </span>
  </motion.div>
);

// Feature category with stagger animation
const FeatureCategory = ({ category, features, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    viewport={{ once: true }}
    className="space-y-4"
  >
    <motion.h4 
      className="text-gold uppercase tracking-widest text-sm border-b border-gold/30 pb-2"
      whileHover={{ letterSpacing: '0.2em' }}
      transition={{ duration: 0.3 }}
    >
      {category}
    </motion.h4>
    <ul className="space-y-2">
      {features.slice(0, 4).map((feature, i) => (
        <motion.li
          key={i}
          initial={{ opacity: 0, x: 10 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 + i * 0.05 }}
          viewport={{ once: true }}
          whileHover={{ x: 8 }}
          className="text-white/60 text-sm flex items-center gap-2 group cursor-default"
        >
          <motion.span 
            className="w-1 h-1 bg-gold rounded-full"
            whileHover={{ scale: 2 }}
          />
          <span className="group-hover:text-white transition-colors">{feature}</span>
        </motion.li>
      ))}
    </ul>
  </motion.div>
);

const PropertyDetailsEnhanced = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  // Parallax effects
  const bgY = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const bgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.2, 1.1, 1]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.1, 0.2, 0.2, 0.1]);

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

  const handleBooking = () => {
    window.open('https://www.realtor.ca/real-estate/29133848/131-grosvenor-avenue-burnaby', '_blank');
  };

  return (
    <section id="details" ref={containerRef} className="relative py-32 bg-charcoal overflow-hidden">
      {/* Parallax Background Image */}
      <motion.div 
        className="absolute inset-0"
        style={{ y: bgY, scale: bgScale, opacity: bgOpacity }}
      >
        <img
          src={propertyImages.bedrooms[0].url}
          alt="Property background"
          className="w-full h-full object-cover"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal via-charcoal/95 to-charcoal" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <FadeInOnScroll className="text-center mb-20">
          <motion.p 
            className="text-gold tracking-[0.3em] text-sm uppercase mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Property Information
          </motion.p>
          <motion.h2 
            className="font-playfair text-4xl md:text-5xl lg:text-6xl text-ivory mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
          >
            The Details
          </motion.h2>
          <motion.div 
            className="w-24 h-px bg-gold/50 mx-auto"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          />
        </FadeInOnScroll>

        <div className="grid lg:grid-cols-5 gap-12 items-start">
          {/* Left Content - Description (Scrolls naturally) */}
          <div className="lg:col-span-3">
            <FadeInOnScroll direction="left">
              <motion.h3 
                className="font-playfair text-3xl lg:text-4xl text-ivory mb-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                A Lifestyle Statement
              </motion.h3>
              
              {propertyData.description.split('\n\n').map((paragraph, index) => (
                <motion.p
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  viewport={{ once: true }}
                  className="text-white/70 leading-relaxed mb-6 text-lg"
                >
                  {paragraph}
                </motion.p>
              ))}
            </FadeInOnScroll>

            {/* Feature Categories */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="grid sm:grid-cols-2 gap-8 mt-12"
            >
              {Object.entries(propertyData.features).map(([category, features], index) => (
                <FeatureCategory 
                  key={category} 
                  category={category} 
                  features={features} 
                  index={index} 
                />
              ))}
            </motion.div>
          </div>

          {/* Right Side - Sticky Facts Card with 3D */}
          <div className="lg:col-span-2" style={{ perspective: '1500px' }}>
            <motion.div
              initial={{ opacity: 0, y: 50, rotateY: 15, z: -100 }}
              whileInView={{ opacity: 1, y: 0, rotateY: 0, z: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
              className="lg:sticky lg:top-28"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <motion.div 
                className="glass-card p-8 border-gold/20 relative overflow-visible"
                whileHover={{ 
                  boxShadow: '0 25px 80px rgba(201,162,39,0.25)',
                  z: 50,
                  rotateY: -2,
                  scale: 1.02
                }}
                transition={{ duration: 0.5 }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Animated corner accents */}
                <motion.div
                  className="absolute top-0 left-0 w-16 h-16 border-l-2 border-t-2 border-gold/30"
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  viewport={{ once: true }}
                />
                <motion.div
                  className="absolute bottom-0 right-0 w-16 h-16 border-r-2 border-b-2 border-gold/30"
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  viewport={{ once: true }}
                />
                
                {/* Price with animation */}
                <div className="text-center mb-8 pb-8 border-b border-white/10">
                  <motion.p 
                    className="text-white/50 text-sm uppercase tracking-widest mb-2"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    viewport={{ once: true }}
                  >
                    List Price
                  </motion.p>
                  <motion.p 
                    className="font-playfair text-4xl lg:text-5xl text-gold"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    viewport={{ once: true }}
                  >
                    {propertyData.priceFormatted}
                  </motion.p>
                  <motion.p 
                    className="text-white/40 text-sm mt-2"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    viewport={{ once: true }}
                  >
                    MLS® {propertyData.mls}
                  </motion.p>
                </div>

                {/* Details Grid */}
                <div className="space-y-1 mb-8">
                  {details.map((detail, index) => (
                    <DetailRow key={detail.label} {...detail} index={index} />
                  ))}
                </div>

                {/* CTA Button */}
                <MagneticButton
                  onClick={handleBooking}
                  className="w-full py-4 bg-gold text-charcoal font-medium tracking-wider uppercase transition-all duration-500 hover:shadow-[0_0_40px_rgba(201,162,39,0.3)] cursor-pointer"
                  strength={0.1}
                >
                  Book a Private Viewing
                </MagneticButton>

                {/* Agent Info */}
                <motion.div 
                  className="mt-8 pt-6 border-t border-white/10 text-center"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  viewport={{ once: true }}
                >
                  <p className="text-white/50 text-xs uppercase tracking-widest mb-2">Listed By</p>
                  <p className="text-ivory font-medium">{propertyData.agent.name}</p>
                  <p className="text-white/40 text-sm">{propertyData.agent.brokerage}</p>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PropertyDetailsEnhanced;
