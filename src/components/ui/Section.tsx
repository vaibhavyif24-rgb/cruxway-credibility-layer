import { motion } from 'framer-motion';
import React from 'react';

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  y?: number;
}

export const FadeIn = ({ children, delay = 0, className = '', y = 20 }: FadeInProps) => (
  <motion.div
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-60px' }}
    transition={{ duration: 0.7, delay, ease: [0.25, 0.1, 0.25, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  dark?: boolean;
}

export const Section = ({ children, className = '', dark = false }: SectionProps) => (
  <section className={`px-5 md:px-10 lg:px-16 py-20 md:py-28 lg:py-36 ${dark ? 'bg-prussian text-primary-foreground' : 'bg-background text-foreground'} ${className}`}>
    <div className="max-w-6xl mx-auto">
      {children}
    </div>
  </section>
);

export const SectionLabel = ({ children, light = false }: { children: React.ReactNode; light?: boolean }) => (
  <p className={`font-sans text-caption uppercase tracking-[0.2em] mb-5 ${light ? 'text-gold/60' : 'text-stone-warm/80'}`}>
    {children}
  </p>
);

export const GoldRule = ({ className = '' }: { className?: string }) => (
  <div className={`flex items-center gap-3 ${className}`}>
    <div className="w-8 h-px bg-gold/30" />
    <div className="w-1 h-1 rotate-45 border border-gold/20" />
  </div>
);
