import { motion } from 'framer-motion';
import { forwardRef } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

const LightSectionEffects = forwardRef<HTMLDivElement, { variant?: 'hero' | 'section' | 'cta' }>(
  ({ variant = 'section' }, ref) => {
    const intensity = variant === 'hero' ? 1.4 : variant === 'cta' ? 1.2 : 1;
    const isMobile = useIsMobile();
    const particleCount = isMobile ? 2 : (variant === 'hero' ? 8 : variant === 'cta' ? 6 : 4);

    return (
      <div ref={ref} className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Drifting gradient blobs — desktop only */}
        {!isMobile && (
          <>
            <motion.div
              className="absolute w-[800px] h-[700px] rounded-full"
              style={{
                top: '-10%',
                right: '-15%',
                background: `radial-gradient(ellipse at center, hsl(43 78% 50% / ${0.07 * intensity}), transparent 70%)`,
              }}
              animate={{ x: [0, 40, -20, 0], y: [0, -30, 20, 0] }}
              transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              className="absolute w-[700px] h-[600px] rounded-full"
              style={{
                bottom: '-15%',
                left: '-10%',
                background: `radial-gradient(ellipse at center, hsl(228 45% 55% / ${0.05 * intensity}), transparent 70%)`,
              }}
              animate={{ x: [0, -30, 25, 0], y: [0, 25, -15, 0] }}
              transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              className="absolute w-[600px] h-[500px] rounded-full"
              style={{
                top: '30%',
                left: '20%',
                background: `radial-gradient(ellipse at center, hsl(40 30% 97% / ${0.08 * intensity}), transparent 70%)`,
              }}
              animate={{ x: [0, 35, -20, 0], y: [0, -20, 30, 0] }}
              transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
            />
          </>
        )}

        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: 'repeating-linear-gradient(135deg, transparent, transparent 40px, hsl(43 70% 50%) 40px, hsl(43 70% 50%) 40.5px)',
          }}
        />

        {/* Floating gold particles */}
        {[...Array(particleCount)].map((_, i) => {
          const isHollow = i % 3 === 2;
          const size = 2 + (i % 4) * 2;
          return (
            <motion.div
              key={i}
              className={`absolute rounded-full ${isHollow ? 'border border-gold/25 bg-transparent' : 'bg-gold/20'}`}
              style={{
                width: `${size}px`,
                height: `${size}px`,
                left: `${8 + i * (80 / particleCount)}%`,
                top: `${12 + (i * 19) % 65}%`,
              }}
              animate={isHollow ? {
                y: [0, -15, 0],
                rotate: [0, 180, 360],
                opacity: [0.2, 0.5, 0.2],
              } : {
                y: [0, -12, 0],
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 4 + i * 0.8,
                repeat: Infinity,
                delay: i * 0.5,
                ease: 'easeInOut',
              }}
            />
          );
        })}

        {/* Shimmer line — bottom edge */}
        <div className="absolute bottom-0 left-0 right-0 h-px overflow-hidden">
          <div
            className="w-full h-full"
            style={{
              background: 'linear-gradient(90deg, transparent 0%, hsl(43 78% 50% / 0.18) 50%, transparent 100%)',
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
                background: 'linear-gradient(90deg, transparent 0%, hsl(43 78% 50% / 0.14) 50%, transparent 100%)',
                backgroundSize: '200% 100%',
                animation: 'shimmer-sweep 6s linear infinite 1s',
              }}
            />
          </div>
        )}

        {/* Corner accent — top left */}
        {!isMobile && (
          <motion.div
            className="absolute top-0 left-0"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: 0.3 }}
          >
            <svg width="80" height="80" viewBox="0 0 80 80" fill="none" className="opacity-[0.06]">
              <line x1="0" y1="40" x2="40" y2="40" stroke="hsl(43 70% 50%)" strokeWidth="0.5" />
              <line x1="40" y1="0" x2="40" y2="40" stroke="hsl(43 70% 50%)" strokeWidth="0.5" />
              <circle cx="40" cy="40" r="1.5" fill="hsl(43 70% 50%)" />
            </svg>
          </motion.div>
        )}
      </div>
    );
  }
);

LightSectionEffects.displayName = 'LightSectionEffects';

export default LightSectionEffects;
