import { motion } from 'framer-motion';
import React, { forwardRef } from 'react';
import { useTheme } from '@/contexts/ThemeContext';

/**
 * Animated background effects for dark/blue sections.
 * Renders floating orbs, shimmer lines, animated particles,
 * and subtle geometric accents for depth and life.
 * Theme-aware: reduces intensity in light mode for clean contrast.
 */
const DarkSectionEffects = forwardRef<HTMLDivElement, { variant?: 'default' | 'hero' | 'cta' }>(
  ({ variant = 'default' }, ref) => {
    const { theme } = useTheme();
    // These effects sit inside intentionally-dark sections (header, CTA, hero)
    // so they should always render, but with slightly reduced intensity in light mode
    const fx = theme === 'light' ? 0.6 : 1;
    return (
      <div ref={ref}>
        {/* Base gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/40 via-transparent to-navy-deep/20 pointer-events-none" />

        {/* Floating gold orb - top right */}
        <div
          className="absolute top-[10%] right-[5%] w-[200px] h-[200px] md:w-[350px] md:h-[250px] rounded-full pointer-events-none float-orb-slow"
          style={{ background: 'radial-gradient(circle, hsl(38 45% 55% / 0.03), transparent 70%)' }}
        />

        {/* Floating prussian orb - bottom left */}
        <div
          className="absolute bottom-[5%] left-[2%] w-[250px] h-[180px] md:w-[400px] md:h-[280px] rounded-full pointer-events-none float-orb-medium"
          style={{ background: 'radial-gradient(circle, hsl(207 50% 18% / 0.3), transparent 70%)' }}
        />

        {/* Central pulsing glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[400px] rounded-full pointer-events-none pulse-glow-effect"
          style={{ background: 'radial-gradient(circle, hsl(38 45% 55% / 1), transparent 60%)' }}
        />

        {/* Horizontal shimmer line - upper */}
        <div className="absolute top-[30%] left-0 right-0 h-px pointer-events-none overflow-hidden">
          <div
            className="w-[200px] h-full shimmer-effect"
            style={{ background: 'linear-gradient(90deg, transparent, hsl(38 45% 55% / 0.1), transparent)' }}
          />
        </div>

        {/* Animated floating particles */}
        {[...Array(variant === 'hero' ? 5 : 3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-[2px] h-[2px] rounded-full pointer-events-none"
            style={{
              background: 'hsl(38 45% 55%)',
              left: `${15 + i * 18}%`,
              top: `${20 + (i * 15) % 60}%`,
            }}
            animate={{
              y: [0, -30, -10, -40, 0],
              x: [0, 10, -5, 15, 0],
              opacity: [0, 0.25, 0.15, 0.3, 0],
              scale: [0, 1, 0.8, 1.2, 0],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              delay: i * 1.5,
              ease: 'easeInOut',
            }}
          />
        ))}

        {/* Corner accent - top left */}
        <motion.div
          className="absolute top-0 left-0 pointer-events-none"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: 0.3 }}
        >
          <svg width="120" height="120" viewBox="0 0 120 120" fill="none" className="opacity-[0.04]">
            <motion.line x1="0" y1="60" x2="60" y2="60" stroke="hsl(38 45% 55%)" strokeWidth="0.5" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.5 }} />
            <motion.line x1="60" y1="0" x2="60" y2="60" stroke="hsl(38 45% 55%)" strokeWidth="0.5" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.8 }} />
            <motion.circle cx="60" cy="60" r="2" fill="hsl(38 45% 55%)" initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.3, delay: 1.2 }} />
          </svg>
        </motion.div>

        {/* Corner accent - bottom right (hero & cta) */}
        {(variant === 'hero' || variant === 'cta') && (
          <motion.div
            className="absolute bottom-0 right-0 pointer-events-none rotate-180"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: 0.5 }}
          >
            <svg width="120" height="120" viewBox="0 0 120 120" fill="none" className="opacity-[0.04]">
              <motion.line x1="0" y1="60" x2="60" y2="60" stroke="hsl(38 45% 55%)" strokeWidth="0.5" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.7 }} />
              <motion.line x1="60" y1="0" x2="60" y2="60" stroke="hsl(38 45% 55%)" strokeWidth="0.5" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1, delay: 1 }} />
              <motion.circle cx="60" cy="60" r="2" fill="hsl(38 45% 55%)" initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.3, delay: 1.4 }} />
            </svg>
          </motion.div>
        )}

        {/* Vertical shimmer accent */}
        {variant !== 'cta' && (
          <div className="absolute top-0 right-[20%] bottom-0 w-px pointer-events-none overflow-hidden">
            <motion.div
              className="w-full h-[100px]"
              style={{ background: 'linear-gradient(180deg, transparent, hsl(38 45% 55% / 0.06), transparent)' }}
              animate={{ y: ['-100px', '500px'] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'linear', delay: 1 }}
            />
          </div>
        )}

        {/* Subtle diagonal lines pattern */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.01]"
          style={{
            backgroundImage: `repeating-linear-gradient(135deg, transparent, transparent 40px, hsl(38 45% 55%) 40px, hsl(38 45% 55%) 40.5px)`,
          }}
        />
      </div>
    );
  }
);

DarkSectionEffects.displayName = 'DarkSectionEffects';

export default DarkSectionEffects;
