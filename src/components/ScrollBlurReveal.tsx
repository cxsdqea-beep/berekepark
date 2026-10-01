import React from 'react';
import { motion } from 'framer-motion';

interface ScrollBlurRevealProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  blurAmount?: number;
  yOffset?: number;
}

const isClient = typeof window !== 'undefined';
const isTouchOrMobile = isClient && (
  window.innerWidth < 768 ||
  /Android|iPhone|iPad|iPod/i.test(navigator.userAgent)
);

export const ScrollBlurReveal: React.FC<ScrollBlurRevealProps> = ({
  children,
  delay = 0,
  duration = 0.55,
  className = '',
  blurAmount = 8,
  yOffset = 24,
}) => {
  if (isTouchOrMobile) {
    // Ultra-lightweight native CSS fade & translateY on mobile: 0 resize listeners, 0 blur filters, 120fps smooth!
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-20px' }}
        transition={{
          duration: 0.3,
          delay: Math.min(delay, 0.1),
          ease: 'easeOut',
        }}
        className={className}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{
        opacity: 0,
        filter: `blur(${blurAmount}px)`,
        y: yOffset,
      }}
      whileInView={{
        opacity: 1,
        filter: 'none',
        y: 0,
      }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
