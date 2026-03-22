import { useRegion } from '@/contexts/RegionContext';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import heroCrossroads from '@/assets/hero-crossroads.jpg';

const regions = [
  { key: 'india' as const, label: 'India' },
  { key: 'us' as const, label: 'UNITED STATES OF AMERICA' },
];

const Landing = () => {
  const { setRegion } = useRegion();
  const navigate = useNavigate();
  const [selected, setSelected] = useState<string | null>(null);

  const selectRegion = (region: 'india' | 'us') => {
    setSelected(region);
    setTimeout(() => {
      setRegion(region);
      navigate(`/${region}`);
    }, 600);
  };

  return (
    <div className="min-h-[100dvh] relative flex flex-col items-center justify-center px-6 overflow-hidden">
      {/* Hero Background Image with subtle zoom animation */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ scale: 1.05 }}
        animate={{ scale: 1 }}
        transition={{ duration: 12, ease: 'easeOut' }}
      >
        <img
          src={heroCrossroads}
          alt=""
          className="w-full h-full object-cover"
          style={{ filter: 'brightness(0.25) contrast(1.1)' }}
        />
      </motion.div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/70 via-navy-deep/40 to-navy-deep/70 pointer-events-none z-[1]" />
      <div className="absolute inset-0 bg-gradient-to-r from-navy-deep/30 via-transparent to-navy-deep/30 pointer-events-none z-[1]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/[0.03] rounded-full blur-[180px] pointer-events-none z-[1]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/10 to-transparent z-[2]" />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 text-center"
      >
        <h1 className="font-serif text-[clamp(3rem,8vw,5.5rem)] font-normal text-primary-foreground tracking-[-0.035em] leading-[1]">
          Cruxway
        </h1>

        <div className="flex items-center justify-center gap-3 mt-7 mb-3">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 48 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="h-px bg-gold/25"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.25, delay: 0.3 }}
            className="w-1.5 h-1.5 rotate-45 border border-gold/20"
          />
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 48 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="h-px bg-gold/25"
          />
        </div>

        <p className="font-sans text-[11px] md:text-[13px] font-medium uppercase text-primary-foreground/30 tracking-[0.3em]">
          Investment &amp; Partnership
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="relative z-10 mt-20 sm:mt-28"
      >
        <p className="font-sans text-[10px] md:text-[11px] font-medium uppercase text-primary-foreground/20 tracking-[0.3em] text-center mb-10">
          Select Region
        </p>
        <div className="flex gap-5 sm:gap-6">
          {regions.map((r, i) => {
            const isSelected = selected === r.key;
            const isOther = selected !== null && !isSelected;
            return (
              <motion.button
                key={r.key}
                initial={{ opacity: 0, y: 16 }}
                animate={{
                  opacity: isOther ? 0.3 : 1,
                  y: 0,
                  scale: isSelected ? 1.03 : isOther ? 0.97 : 1,
                }}
                transition={{ duration: 0.4, delay: 0.25 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                whileHover={!selected ? { y: -4 } : {}}
                whileTap={!selected ? { scale: 0.98 } : {}}
                onClick={() => !selected && selectRegion(r.key)}
                disabled={selected !== null}
                className="group relative w-[180px] sm:w-[220px] aspect-[4/3] flex items-center justify-center cursor-pointer overflow-hidden"
              >
                <span className={`
                  absolute inset-0 border transition-all duration-700 ease-out
                  ${isSelected
                    ? 'border-gold/30'
                    : 'border-primary-foreground/[0.08] group-hover:border-primary-foreground/[0.16]'
                  }
                `} />
                <span className={`
                  absolute inset-[1px] transition-all duration-700 ease-out
                  ${isSelected
                    ? 'bg-gold/[0.08]'
                    : 'bg-primary-foreground/[0.03] group-hover:bg-primary-foreground/[0.06]'
                  }
                `} />

                {/* Corner accents */}
                <span className={`absolute top-0 left-0 w-5 h-px transition-all duration-500 delay-100 ${isSelected ? 'bg-gold/50 w-10' : 'bg-gold/0 group-hover:bg-gold/25'}`} />
                <span className={`absolute top-0 left-0 h-5 w-px transition-all duration-500 delay-100 ${isSelected ? 'bg-gold/50 h-10' : 'bg-gold/0 group-hover:bg-gold/25'}`} />
                <span className={`absolute bottom-0 right-0 w-5 h-px transition-all duration-500 delay-100 ${isSelected ? 'bg-gold/50 w-10' : 'bg-gold/0 group-hover:bg-gold/25'}`} />
                <span className={`absolute bottom-0 right-0 h-5 w-px transition-all duration-500 delay-100 ${isSelected ? 'bg-gold/50 h-10' : 'bg-gold/0 group-hover:bg-gold/25'}`} />

                <span className={`
                  relative z-10 font-sans text-[12px] sm:text-[14px] font-semibold uppercase tracking-[0.28em]
                  transition-all duration-500
                  ${isSelected
                    ? 'text-gold'
                    : 'text-primary-foreground/40 group-hover:text-primary-foreground/75'
                  }
                `}>
                  {r.label}
                </span>

                <AnimatePresence>
                  {isSelected && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0, 0.6, 0.3] }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                      className="absolute inset-0 pointer-events-none"
                      style={{ background: 'radial-gradient(ellipse at center, hsl(var(--gold) / 0.1) 0%, transparent 70%)' }}
                    />
                  )}
                </AnimatePresence>
              </motion.button>
            );
          })}
        </div>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.4 }}
        className="absolute bottom-6 font-sans text-[9px] text-primary-foreground/[0.1] tracking-[0.22em] uppercase z-10"
      >
        Privileged &amp; Confidential
      </motion.p>
    </div>
  );
};

export default Landing;
