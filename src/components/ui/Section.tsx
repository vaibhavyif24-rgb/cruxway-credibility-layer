import { motion } from 'framer-motion';
import React, { forwardRef } from 'react';

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  y?: number;
}

export const FadeIn = forwardRef<HTMLDivElement, FadeInProps>(
  ({ children, delay = 0, className = '', y = 14 }, ref) => (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
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
      px-5 md:px-10 lg:px-16
      py-14 md:py-20 lg:py-24
      ${dark ? 'bg-prussian text-primary-foreground' : 'bg-background text-foreground'}
      ${className}
    `}
  >
    <div className={`mx-auto ${narrow ? 'max-w-3xl' : 'max-w-[1080px]'}`}>
      {children}
    </div>
  </section>
);

export const SectionLabel = ({ children, light = false }: { children: React.ReactNode; light?: boolean }) => (
  <p
    className={`
      font-sans text-[9.5px] md:text-[10px] font-medium uppercase tracking-[0.2em]
      mb-4
      ${light ? 'text-gold/45' : 'text-muted-foreground/50'}
    `}
  >
    {children}
  </p>
);

export const GoldRule = ({ className = '' }: { className?: string }) => (
  <div className={`flex items-center gap-2.5 ${className}`}>
    <div className="w-8 h-px bg-gold/20" />
    <div className="w-1 h-1 rotate-45 border border-gold/15" />
  </div>
);

export const HeroDivider = () => (
  <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-foreground/[0.05] to-transparent" />
);
