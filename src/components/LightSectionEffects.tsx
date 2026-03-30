import { motion } from 'framer-motion';
import React, { forwardRef } from 'react';

/**
 * Ambient gold effects for light-mode sections.
 * Mirrors DarkSectionEffects but uses warm, subtle gold tones.
 */
const LightSectionEffects = forwardRef<HTMLDivElement, { variant?: 'hero' | 'section' | 'cta' }>(
  ({ variant = 'section' }, ref) => {
    const intensity = variant === 'hero' ? 1.4 : variant === 'cta' ? 1.2 : 1;
    const particleCount = variant === 'hero' ? 5 : variant === 'cta' ? 4 : 3;

    return (
      <div ref={ref} className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Warm radial glow — top right */}
        <div
          className="absolute -top-[10%] -right-[10%] w-[500px] h-[400px] rounded-full"
          style={{
            background: `radial-gradient(ellipse at center, hsl(38 48% 52% / ${0.04 * intensity}), transparent 70%)`,
            animation: 'warm-pulse 6s ease-in-out infinite',
          }}
        />

        {/* Secondary glow — bottom left */}
        {(variant === 'hero' || variant === 'cta') && (
          <div
            className="absolute -bottom-[15%] -left-[10%] w-[400px] h-[350px] rounded-full"
            style={{
              background: `radial-gradient(ellipse at center, hsl(38 38% 60% / ${0.03 * intensity}), transparent 70%)`,
              animation: 'warm-pulse 8s ease-in-out infinite 2s',
            }}
          />
        )}

        {/* Floating gold dot particles */}
        {[...Array(particleCount)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-gold/10"
            style={{
              width: `${3 + (i % 3) * 1.5}px`,
              height: `${3 + (i % 3) * 1.5}px`,
              left: `${12 + i * 18}%`,
              top: `${15 + (i * 17) % 65}%`,
              animation: `float-particle ${4 + i * 0.8}s ease-in-out infinite ${i * 0.6}s`,
            }}
          />
        ))}

        {/* Shimmer line — bottom edge */}
        <div className="absolute bottom-0 left-0 right-0 h-px overflow-hidden">
          <div
            className="w-full h-full"
            style={{
              background: 'linear-gradient(90deg, transparent 0%, hsl(38 48% 52% / 0.12) 50%, transparent 100%)',
              backgroundSize: '200% 100%',
              animation: 'shimmer-sweep 5s linear infinite',
            }}
          />
        </div>

        {/* Shimmer line — top edge */}
        {variant !== 'section' && (
          <div className="absolute top-0 left-0 right-0 h-px overflow-hidden">
            <div
              className="w-full h-full"
              style={{
                background: 'linear-gradient(90deg, transparent 0%, hsl(38 48% 52% / 0.08) 50%, transparent 100%)',
                backgroundSize: '200% 100%',
                animation: 'shimmer-sweep 6s linear infinite 1s',
              }}
            />
          </div>
        )}

        {/* Corner accent — top left */}
        <motion.div
          className="absolute top-0 left-0"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: 0.3 }}
        >
          <svg width="80" height="80" viewBox="0 0 80 80" fill="none" className="opacity-[0.06]">
            <line x1="0" y1="40" x2="40" y2="40" stroke="hsl(38 45% 55%)" strokeWidth="0.5" />
            <line x1="40" y1="0" x2="40" y2="40" stroke="hsl(38 45% 55%)" strokeWidth="0.5" />
            <circle cx="40" cy="40" r="1.5" fill="hsl(38 45% 55%)" />
          </svg>
        </motion.div>
      </div>
    );
  }
);

LightSectionEffects.displayName = 'LightSectionEffects';

export default LightSectionEffects;
