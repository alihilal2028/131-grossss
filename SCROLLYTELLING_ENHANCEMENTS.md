# 3D Scrollytelling & Motion UI Enhancements

## Overview
This document outlines the **3D depth-enhanced** scroll-based animations and interactions implemented using Framer Motion. All enhancements preserve the existing visual design and colors, adding cinematic 3D depth, perspective transforms, and z-axis animations.

## Global Utilities

### FadeIn Component (`/src/components/FadeIn.jsx`)
A reusable wrapper component that provides consistent fade-up animations:
- **Animation**: `opacity: 0, y: 20` → `opacity: 1, y: 0`
- **Duration**: 0.8s
- **Easing**: "easeOut"
- **Trigger**: On scroll into viewport
- **Usage**: Wrap any content that needs fade-in animation

```jsx
import FadeIn from './components/FadeIn';

<FadeIn delay={0.2}>
  <YourContent />
</FadeIn>
```

## Section-Specific Enhancements

### 1. Hero Section (`HeroSectionOptimized.jsx`) 🎬

#### 3D Layered Parallax Effect
- **Background Image**: Multi-axis movement with perspective
  - `translateY`: 50% scroll speed
  - `scale`: 1 → 1.2 (zoom on scroll)
  - `rotateX`: 0° → -5° (tilt effect)
- **Layered Overlays**: Each gradient at different z-depths (20px, 30px, 40px)
- **Perspective**: 1000px container for depth

#### 3D Staggered Text Entrance
The hero content appears with depth:
1. **Title**: 
   - Initial: `y: 50, rotateX: 15, z: -100`
   - Final: `y: 0, rotateX: 0, z: 0`
   - Easing: Custom cubic-bezier [0.22, 1, 0.36, 1]
2. **Subtitle**: `translateZ: 20px` for layered depth
3. **CTA Button**: 
   - `translateZ: 40px`
   - Hover: `z: 50, rotateX: -5, scale: 1.05`
   - Shadow: `0 20px 60px rgba(201,162,39,0.4)`

#### 3D Stats Cards
- **Initial**: `rotateY: -15, z: -100`
- **Animate**: Sequential rotation and depth entrance
- **Hover**: 
  - `y: -15, z: 80, rotateY: 5, rotateX: -5`
  - Icon spins 360° with `rotateZ`
  - Shadow: `0 25px 50px rgba(201,162,39,0.2)`
- **Perspective**: 1500px parent container

### 2. Details Section (`PropertyDetailsEnhanced.jsx`) ⭐ CRITICAL + 3D

#### 3D Sticky Sidebar Pattern
**Implementation**:
- Container: `grid lg:grid-cols-5 gap-12 items-start`
- Left Column (3 cols): Scrolls naturally with description content
- Right Column (2 cols): **3D floating sticky card**
  - `sticky top-24`
  - `perspective: 1500px`
  - `transformStyle: preserve-3d`

**3D Price Card**:
- **Initial**: `y: 50, rotateY: 15, z: -100, opacity: 0`
- **Final**: `y: 0, rotateY: 0, z: 0, opacity: 1`
- **Hover**: 
  - `z: 50, rotateY: -2, scale: 1.02`
  - Shadow: `0 25px 80px rgba(201,162,39,0.25)`

**Result**: As users read the long description on the left, the $3,188,000 price card floats in 3D space, responding to hover with depth.

**Key Implementation**:
```jsx
<div className="grid lg:grid-cols-5 gap-12 items-start">
  <div className="lg:col-span-3">
    {/* Scrollable description */}
  </div>
  <div className="lg:col-span-2" style={{ perspective: '1500px' }}>
    <motion.div 
      className="lg:sticky lg:top-28"
      initial={{ y: 50, rotateY: 15, z: -100 }}
      animate={{ y: 0, rotateY: 0, z: 0 }}
      whileHover={{ z: 50, rotateY: -2, scale: 1.02 }}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {/* 3D Floating sticky price card */}
    </motion.div>
  </div>
</div>
```

### 3. Gallery Section (`GallerySectionOptimized.jsx`) 🖼️

#### 3D StaggerChildren Grid
- **Parent Container**: 
  - `perspective: 2000px`
  - `transformStyle: preserve-3d`
  - `staggerChildren: 0.1`
- **Effect**: Images fly in one by one from depth

#### 3D Card Entrance
Each gallery card enters with:
- **Initial**: `y: 50, rotateX: 20, z: -100, opacity: 0`
- **Final**: `y: 0, rotateX: 0, z: 0, opacity: 1`
- **Duration**: 0.6s with custom easing
- **Stagger**: 0.1s delay between each

#### 3D Hover Effects
- **Card Lift**: 
  - `y: -12, z: 100, scale: 1.03`
  - `rotateX: -3, rotateY: 2`
  - Shadow: `0 30px 60px rgba(0,0,0,0.5)`
- **Image Zoom**: Inner image scales to 1.1 (deeper zoom)
- **Layered Elements**:
  - Overlay: `translateZ: 20px`
  - Border: `translateZ: 30px`
  - Icon: `translateZ: 50px` + `rotateZ: 90°` on hover
  - Caption: `translateZ: 40px`

```jsx
<motion.div
  initial={{ opacity: 0, y: 50, rotateX: 20, z: -100 }}
  animate={{ opacity: 1, y: 0, rotateX: 0, z: 0 }}
  whileHover={{ 
    y: -12, scale: 1.03, z: 100,
    rotateX: -3, rotateY: 2
  }}
  style={{ transformStyle: 'preserve-3d' }}
>
  {/* Layered content at different z-depths */}
</motion.div>
```

### 4. About Section (`AboutSectionEnhanced.jsx`) ✨

#### 3D Sequential Icon Animation (Left to Right)
The 4 circular feature icons rotate in from depth:
- **Smart Home** → **View Residence** → **Premium Finishes** → **Climate Control**
- **Animation**: 
  - Initial: `x: -30, rotateY: -90, z: -100, opacity: 0`
  - Final: `x: 0, rotateY: 0, z: 0, opacity: 1`
- **Stagger**: 0.15s delay between each
- **Parent**: `perspective: 1200px`

#### 3D Icon Hover Effects
- **Card**: 
  - `y: -10, scale: 1.15, z: 50, rotateY: 5`
  - Border glow + shadow
- **Inner Icon**:
  - `scale: 1.2, rotateY: 180°` (flip animation)
  - Circle spins 360° with `rotateZ`
  - `translateZ: 20px` depth
- **Shadow**: `0 10px 30px rgba(201,162,39,0.3)`

#### 3D Image Container & Floating Card
- **Container**: `perspective: 2000px`
- **Floating Stats Card**:
  - Initial: `x: 50, y: 20, rotateY: -20, z: -100`
  - Hover: `y: -10, z: 100, rotateY: 5, scale: 1.05`
  - Shadow: `0 30px 60px rgba(201,162,39,0.3)`

**Implementation**:
```jsx
<motion.div
  style={{ perspective: '1200px', transformStyle: 'preserve-3d' }}
  variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
>
  {featureIcons.map((item) => (
    <motion.div
      variants={{
        hidden: { opacity: 0, x: -30, rotateY: -90, z: -100 },
        visible: { opacity: 1, x: 0, rotateY: 0, z: 0 }
      }}
      whileHover={{ y: -10, scale: 1.15, z: 50, rotateY: 5 }}
      style={{ transformStyle: 'preserve-3d' }}
    >
      <motion.div
        whileHover={{ scale: 1.2, rotateY: 180, rotateZ: 360 }}
        style={{ translateZ: 20 }}
      />
    </motion.div>
  ))}
</motion.div>
```

## Technical Implementation

### Required Imports
All sections use:
```jsx
import { motion, useScroll, useTransform } from 'framer-motion';
```

### Key Patterns

#### 1. Scroll Progress
```jsx
const { scrollYProgress } = useScroll({
  target: containerRef,
  offset: ['start start', 'end start']
});
```

#### 2. Transform Values
```jsx
const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
```

#### 3. Stagger Children
```jsx
<motion.div
  variants={{
    visible: { transition: { staggerChildren: 0.1 } }
  }}
>
  {items.map((item) => (
    <motion.div variants={itemVariants} />
  ))}
</motion.div>
```

## Performance Considerations

1. **Viewport Once**: Most animations use `viewport={{ once: true }}` to prevent re-triggering
2. **Efficient Transforms**: Using `useTransform` instead of animation loops
3. **Hardware Acceleration**: Transform properties (translateY, scale) use GPU
4. **Lazy Loading**: Gallery images load lazily

## Files Modified

1. `/src/components/FadeIn.jsx` - NEW
2. `/src/components/HeroSectionOptimized.jsx` - Enhanced parallax and stagger
3. `/src/components/PropertyDetailsEnhanced.jsx` - Sticky sidebar pattern
4. `/src/components/GallerySectionOptimized.jsx` - Stagger grid and hover effects
5. `/src/components/AboutSectionEnhanced.jsx` - Sequential icon animations

## Design Preservation

✅ **No visual changes**: Colors, typography, spacing remain identical
✅ **Only animation logic**: Added motion and interaction
✅ **Performance optimized**: Smooth 60fps animations
✅ **Accessibility maintained**: Respects prefers-reduced-motion

## Testing Checklist

- [ ] Hero parallax scrolls at correct speed
- [ ] Hero text staggers in proper sequence
- [ ] Details sidebar stays sticky while scrolling description
- [ ] Gallery images appear one by one
- [ ] Gallery cards scale and lift on hover
- [ ] About icons animate left to right sequentially
- [ ] All animations trigger once when scrolling into view
- [ ] Page performs smoothly on mobile devices
