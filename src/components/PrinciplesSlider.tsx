import { useRef, useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionLabel, GoldRule } from '@/components/ui/Section';

import integrityImg from '@/assets/principles/integrity.jpg';
import servantLeadershipImg from '@/assets/principles/servant-leadership.jpg';
import humilityImg from '@/assets/principles/humility.jpg';
import gritImg from '@/assets/principles/grit.jpg';
import biasToActionImg from '@/assets/principles/bias-to-action.jpg';
import goldenRuleImg from '@/assets/principles/golden-rule.jpg';

const images = [integrityImg, servantLeadershipImg, humilityImg, gritImg, biasToActionImg, goldenRuleImg];

// Preload all images on mount for instant transitions
const preloadImages = () => {
  images.forEach((src) => {
    const img = new Image();
    img.src = src;
  });
};

interface Principle {
  t: string;
  d: string;
}

interface PrinciplesSliderProps {
  principles: Principle[];
}

const AUTOPLAY_MS = 4000;

const PrinciplesSlider = ({ principles }: PrinciplesSliderProps) => {
  const [active, setActive] = useState(0);
  const total = principles.length;
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % total);
    }, AUTOPLAY_MS);
  }, [total]);

  useEffect(() => {
    preloadImages();
    resetTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [resetTimer]);

  const goTo = (i: number) => {
    setActive(i);
    resetTimer();
  };

  const principle = principles[active];
  const image = images[active];

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden select-none"
    >
      {/* Background image with crossfade */}
      <AnimatePresence mode="sync">
        <motion.img
          key={active}
          src={image}
          alt={principle.t}
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        />
      </AnimatePresence>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/45 to-black/60" />

      {/* Content — dead center */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center h-full px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center max-w-[540px]"
          >
            <SectionLabel light>Principles</SectionLabel>

            {/* Numbered badge */}
            <div className="w-10 h-10 rounded-full bg-black/70 border border-white/10 flex items-center justify-center mt-3 mb-4">
              <span className="font-sans text-[14px] text-white/90 font-medium">
                {active + 1}
              </span>
            </div>

            <h2 className="font-serif text-[clamp(2rem,5vw,3.2rem)] text-white leading-[1.08] tracking-[-0.02em] drop-shadow-[0_2px_16px_rgba(0,0,0,0.5)]">
              {principle.t}
            </h2>

            <div className="my-5 flex justify-center">
              <GoldRule />
            </div>

            <p className="font-sans text-[15px] md:text-[17px] text-white/55 leading-[1.8] max-w-[420px] drop-shadow-[0_1px_8px_rgba(0,0,0,0.4)]">
              {principle.d}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Right-side vertical dot indicators */}
      <div className="absolute right-6 md:right-10 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-3">
        {Array.from({ length: total }).map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to principle ${i + 1}`}
            className={`w-3 h-3 rounded-full border transition-all duration-500 cursor-pointer ${
              i === active
                ? 'bg-white border-white scale-110'
                : 'bg-transparent border-white/40 hover:border-white/70'
            }`}
          />
        ))}
      </div>

      {/* Scroll hint on first active */}
      {active === 0 && (
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
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

export default PrinciplesSlider;
