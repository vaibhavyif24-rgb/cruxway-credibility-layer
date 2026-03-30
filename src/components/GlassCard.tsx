import { motion, useInView } from 'framer-motion';
import { useRef, forwardRef } from 'react';
import { useTheme } from '@/contexts/ThemeContext';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  index?: number;
  variant?: 'light' | 'dark';
  hover?: boolean;
}

/**
 * Premium glassmorphism card with frosted glass effect,
 * gold border accents, and hover glow.
 * Theme-aware: uses warm white in light mode, dark glass in dark mode.
 */
const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  ({ children, className = '', index = 0, variant, hover = true }, _ref) => {
    const internalRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(internalRef, { once: true, margin: '-30px' });
    const { theme } = useTheme();

    // If variant not explicitly provided, derive from theme
    const isDark = variant ? variant === 'dark' : theme === 'dark';
    const isLight = !isDark;

    return (
      <motion.div
        ref={internalRef}
        initial={{ opacity: 0, y: 16 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
        className="group h-full"
      >
        <motion.div
          whileHover={hover ? { y: -6, rotateX: 2, rotateY: -2 } : {}}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className={`
            relative overflow-hidden rounded-sm h-full
            ${isDark
              ? 'bg-primary-foreground/[0.04] border border-primary-foreground/[0.08] hover:border-gold/20'
              : 'bg-[hsl(40,20%,98%)]/80 border border-[hsl(38,15%,90%)]/50 hover:border-gold/20 hover:shadow-[0_8px_32px_-8px_hsl(38,45%,52%,0.08)]'
            }
            backdrop-blur-sm transition-all duration-500
            ${className}
          `}
          style={{
            transformPerspective: 1200,
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
          }}
        >
          {/* Gold corner accents — boosted opacity in light mode */}
          <span className={`absolute top-0 left-0 w-0 h-px ${isLight ? 'bg-gold/45' : 'bg-gold/40'} group-hover:w-8 transition-all duration-500`} />
          <span className={`absolute top-0 left-0 h-0 w-px ${isLight ? 'bg-gold/45' : 'bg-gold/40'} group-hover:h-8 transition-all duration-500`} />
          <span className={`absolute bottom-0 right-0 w-0 h-px ${isLight ? 'bg-gold/45' : 'bg-gold/40'} group-hover:w-8 transition-all duration-500`} />
          <span className={`absolute bottom-0 right-0 h-0 w-px ${isLight ? 'bg-gold/45' : 'bg-gold/40'} group-hover:h-8 transition-all duration-500`} />

          {/* Hover glow */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{
              background: `radial-gradient(ellipse at center, hsl(38 45% 55% / ${isLight ? '0.04' : '0.04'}), transparent 70%)`,
            }}
          />

          {children}
        </motion.div>
      </motion.div>
    );
  }
);

GlassCard.displayName = 'GlassCard';

export default GlassCard;
