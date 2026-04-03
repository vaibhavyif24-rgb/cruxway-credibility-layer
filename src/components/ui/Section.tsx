import { motion } from 'framer-motion';
import React, { forwardRef } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { useIsMobile } from '@/hooks/use-mobile';

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  y?: number;
}

export const FadeIn = forwardRef<HTMLDivElement, FadeInProps>(
  ({ children, delay = 0, className = '', y = 14 }, ref) => {
    const isMobile = useIsMobile();
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: isMobile ? 10 : y, scale: 0.98, filter: isMobile ? 'none' : 'blur(3px)' }}
        whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
        viewport={{ once: true, margin: isMobile ? '-30px' : '-60px' }}
        transition={{ duration: isMobile ? 0.4 : 0.6, delay: isMobile ? delay * 0.5 : delay, ease: [0.22, 1, 0.36, 1] }}
        className={className}
      >
        {children}
      </motion.div>
    );
  }
);

FadeIn.displayName = 'FadeIn';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  dark?: boolean;
  narrow?: boolean;
}

export const Section = ({ children, className = '', dark = false, narrow = false }: SectionProps) => (
  <section
    className={`
      px-5 md:px-10 lg:px-16
      py-10 md:py-14 lg:py-14
      ${dark ? 'hero-gradient-animated text-primary-foreground' : 'bg-background text-foreground'}
      ${className}
    `}
  >
    <div className={`mx-auto ${narrow ? 'max-w-3xl' : 'max-w-[1080px]'}`}>
      {children}
    </div>
  </section>
);

export const SectionLabel = forwardRef<HTMLParagraphElement, { children: React.ReactNode; light?: boolean }>(
  ({ children, light }, ref) => {
    const { theme } = useTheme();
    const shouldUseGold = light !== undefined ? light : theme === 'dark';

    return (
      <motion.p
        ref={ref}
        initial={{ letterSpacing: '0.15em' }}
        whileInView={{ letterSpacing: '0.28em' }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className={`
          font-sans text-[11px] font-bold uppercase
          mb-2.5 md:mb-3 tracking-[0.25em]
          ${shouldUseGold ? 'text-gold' : 'text-[hsl(228,45%,45%)]/60'}
        `}
      >
        {children}
      </motion.p>
    );
  }
);
SectionLabel.displayName = 'SectionLabel';

export const GoldRule = forwardRef<HTMLDivElement, { className?: string }>(
  ({ className = '' }, ref) => (
    <div ref={ref} className={`flex items-center gap-2.5 ${className}`}>
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: 32 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="h-px bg-gold/40"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.3 }}
        whileHover={{ rotate: 180, scale: 1.4 }}
        className="w-1.5 h-1.5 rotate-45 border border-gold/35"
      />
    </div>
  )
);
GoldRule.displayName = 'GoldRule';

export const HeroDivider = () => (
  <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-foreground/[0.05] to-transparent" />
);
