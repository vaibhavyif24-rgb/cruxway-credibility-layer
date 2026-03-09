import { motion } from 'framer-motion';
import React, { forwardRef } from 'react';

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  y?: number;
}

export const FadeIn = forwardRef<HTMLDivElement, FadeInProps>(
  ({ children, delay = 0, className = '', y = 18 }, ref) => (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
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
      px-6 md:px-12 lg:px-20
      py-20 md:py-28 lg:py-36
      ${dark ? 'bg-prussian text-primary-foreground' : 'bg-background text-foreground'}
      ${className}
    `}
  >
    <div className={`mx-auto ${narrow ? 'max-w-4xl' : 'max-w-[1120px]'}`}>
      {children}
    </div>
  </section>
);

export const SectionLabel = ({ children, light = false }: { children: React.ReactNode; light?: boolean }) => (
  <p
    className={`
      font-sans text-[10px] md:text-[11px] font-medium uppercase tracking-[0.22em]
      mb-5
      ${light ? 'text-gold/50' : 'text-muted-foreground/60'}
    `}
  >
    {children}
  </p>
);

export const GoldRule = ({ className = '' }: { className?: string }) => (
  <div className={`flex items-center gap-3 ${className}`}>
    <div className="w-10 h-px bg-gold/25" />
    <div className="w-[5px] h-[5px] rotate-45 border border-gold/20" />
  </div>
);

export const HeroDivider = () => (
  <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-foreground/6 to-transparent" />
);
