import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { SectionLabel, GoldRule } from '@/components/ui/Section';

import integrityImg from '@/assets/principles/integrity.jpg';
import servantLeadershipImg from '@/assets/principles/servant-leadership.jpg';
import humilityImg from '@/assets/principles/humility.jpg';
import gritImg from '@/assets/principles/grit.jpg';
import biasToActionImg from '@/assets/principles/bias-to-action.jpg';
import goldenRuleImg from '@/assets/principles/golden-rule.jpg';

const images = [integrityImg, servantLeadershipImg, humilityImg, gritImg, biasToActionImg, goldenRuleImg];

interface Principle {
  t: string;
  d: string;
}

interface PrinciplesSliderProps {
  principles: Principle[];
}

const PrinciplePanel = ({
  principle,
  image,
  index,
  total,
}: {
  principle: Principle;
  image: string;
  index: number;
  total: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: 0.4 });

  return (
    <div
      ref={ref}
      className="relative w-full h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background image */}
      <img
        src={image}
        alt={principle.t}
        loading={index === 0 ? undefined : 'lazy'}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/50 to-black/65" />

      {/* Content — dead center */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 flex flex-col items-center text-center px-6 max-w-[540px]"
      >
        <SectionLabel light>Principles</SectionLabel>

        <h2 className="font-serif text-[clamp(1.6rem,4vw,2.8rem)] text-white leading-[1.1] tracking-[-0.02em] mt-2 drop-shadow-[0_2px_16px_rgba(0,0,0,0.5)]">
          {principle.t}
        </h2>

        <div className="my-4 flex justify-center">
          <GoldRule />
        </div>

        <p className="font-sans text-[14px] md:text-[16px] text-white/60 leading-[1.8] max-w-[400px] drop-shadow-[0_1px_8px_rgba(0,0,0,0.4)]">
          {principle.d}
        </p>
      </motion.div>

      {/* Dot indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex gap-2.5">
        {Array.from({ length: total }).map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full transition-all duration-500 ${
              i === index && isInView
                ? 'bg-gold/80 scale-125'
                : 'bg-white/20'
            }`}
          />
        ))}
      </div>

      {/* Scroll hint on first panel */}
      {index === 0 && (
        <motion.div
          className="absolute bottom-16 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <motion.div
            className="w-px h-6 bg-white/20"
            animate={{ scaleY: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      )}
    </div>
  );
};

const PrinciplesSlider = ({ principles }: PrinciplesSliderProps) => {
  return (
    <div>
      {principles.map((p, i) => (
        <PrinciplePanel
          key={p.t}
          principle={p}
          image={images[i]}
          index={i}
          total={principles.length}
        />
      ))}
    </div>
  );
};

export default PrinciplesSlider;
