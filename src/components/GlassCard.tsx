import { motion, useInView } from 'framer-motion';
import { useRef, forwardRef } from 'react';

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
 */
const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  ({ children, className = '', index = 0, variant = 'light', hover = true }, _ref) => {
    const internalRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(internalRef, { once: true, margin: '-30px' });

    const isDark = variant === 'dark';

    return (
      <motion.div
        ref={internalRef}
        initial={{ opacity: 0, y: 16 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
        className="group"
      >
        <motion.div
          whileHover={hover ? { y: -4 } : {}}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className={`
            relative overflow-hidden rounded-sm
            ${isDark
              ? 'bg-primary-foreground/[0.04] border border-primary-foreground/[0.08] hover:border-gold/20'
              : 'bg-background/60 dark:bg-card/40 border border-border/60 hover:border-gold/25 dark:border-primary-foreground/[0.06]'
            }
            backdrop-blur-sm transition-all duration-500
            ${className}
          `}
          style={{
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
          }}
        >
          {/* Gold corner accents */}
          <span className={`absolute top-0 left-0 w-0 h-px ${isDark ? 'bg-gold/40' : 'bg-gold/30'} group-hover:w-8 transition-all duration-500`} />
          <span className={`absolute top-0 left-0 h-0 w-px ${isDark ? 'bg-gold/40' : 'bg-gold/30'} group-hover:h-8 transition-all duration-500`} />
          <span className={`absolute bottom-0 right-0 w-0 h-px ${isDark ? 'bg-gold/40' : 'bg-gold/30'} group-hover:w-8 transition-all duration-500`} />
          <span className={`absolute bottom-0 right-0 h-0 w-px ${isDark ? 'bg-gold/40' : 'bg-gold/30'} group-hover:h-8 transition-all duration-500`} />

          {/* Hover glow */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{
              background: `radial-gradient(ellipse at center, hsl(38 45% 55% / ${isDark ? '0.04' : '0.03'}), transparent 70%)`,
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
