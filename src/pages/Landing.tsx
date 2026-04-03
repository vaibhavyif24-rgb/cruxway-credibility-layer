import { useRegion } from '@/contexts/RegionContext';
import { useTheme } from '@/contexts/ThemeContext';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import GeometricHero from '@/components/GeometricHero';

const regions = [
  { key: 'india' as const, label: 'India' },
  { key: 'us' as const, label: 'UNITED STATES' },
];

const Landing = () => {
  const { setRegion } = useRegion();
  const { setRegionTheme } = useTheme();
  const navigate = useNavigate();
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    setRegion(null);
    setRegionTheme(null);
  }, [setRegion, setRegionTheme]);

  const selectRegion = (region: 'india' | 'us') => {
    setSelected(region);
    setTimeout(() => {
      setRegion(region);
      setRegionTheme(region);
      navigate(`/${region}`);
    }, 600);
  };

  return (
    <div className="min-h-[100dvh] relative flex flex-col items-center justify-center px-6 overflow-hidden">
      {/* Crossroads photo + Ken Burns + peripheral geometric gold lines */}
      <GeometricHero />

      {/* Extra top/bottom line accents */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/10 to-transparent z-[3]" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/8 to-transparent z-[3]" />

      {/* Main content — high z-index, fully readable */}
      <motion.div
        initial={{ opacity: 1, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 text-center"
      >
        <h1 className="font-serif text-[clamp(3.5rem,9vw,6rem)] font-normal text-white tracking-[-0.035em] leading-[1] drop-shadow-[0_2px_20px_rgba(0,0,0,0.3)]">
          Cruxway
        </h1>

        <div className="flex items-center justify-center gap-3 mt-7 mb-3">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 56 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="h-px bg-gold/35"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.25, delay: 0.3 }}
            className="w-1.5 h-1.5 rotate-45 border border-gold/30"
          />
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 56 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="h-px bg-gold/35"
          />
        </div>

        <p className="font-sans text-[13px] md:text-[15px] font-medium uppercase text-white/50 tracking-[0.3em]">
          Investment &amp; Partnership
        </p>
      </motion.div>

      {/* Region selection */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="relative z-10 mt-20 sm:mt-28"
      >
        <p className="font-sans text-[11px] md:text-[12px] font-medium uppercase text-white/30 tracking-[0.3em] text-center mb-10">
          Select Region
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-5 sm:gap-8">
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
                className="group relative w-[260px] sm:w-[260px] md:w-[280px] h-[72px] sm:h-[80px] flex items-center justify-center cursor-pointer overflow-hidden"
              >
                <span className={`
                  absolute inset-0 border transition-all duration-700 ease-out
                  ${isSelected
                    ? 'border-gold/40'
                    : 'border-white/[0.12] group-hover:border-white/[0.22]'
                  }
                `} />
                <span className={`
                  absolute inset-[1px] transition-all duration-700 ease-out backdrop-blur-sm
                  ${isSelected
                    ? 'bg-gold/[0.12]'
                    : 'bg-white/[0.04] group-hover:bg-white/[0.08]'
                  }
                `} />

                {/* Corner accents */}
                <span className={`absolute top-0 left-0 w-5 h-px transition-all duration-500 delay-100 ${isSelected ? 'bg-gold/50 w-10' : 'bg-gold/0 group-hover:bg-gold/30'}`} />
                <span className={`absolute top-0 left-0 h-5 w-px transition-all duration-500 delay-100 ${isSelected ? 'bg-gold/50 h-10' : 'bg-gold/0 group-hover:bg-gold/30'}`} />
                <span className={`absolute bottom-0 right-0 w-5 h-px transition-all duration-500 delay-100 ${isSelected ? 'bg-gold/50 w-10' : 'bg-gold/0 group-hover:bg-gold/30'}`} />
                <span className={`absolute bottom-0 right-0 h-5 w-px transition-all duration-500 delay-100 ${isSelected ? 'bg-gold/50 h-10' : 'bg-gold/0 group-hover:bg-gold/30'}`} />

                <span className="relative z-10 flex flex-col items-center gap-2">
                  <span className={`
                    font-sans text-[13px] sm:text-[14px] md:text-[15px] font-semibold uppercase tracking-[0.28em]
                    transition-all duration-500
                    ${isSelected
                      ? 'text-gold'
                      : 'text-white/50 group-hover:text-white/85'
                    }
                  `}>
                    {r.label}
                  </span>
                  {isSelected && (
                    <motion.span
                      initial={{ width: 0, opacity: 0 }}
                      animate={{ width: 32, opacity: 1 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="h-[1.5px] bg-gold/40"
                    />
                  )}
                </span>

                <AnimatePresence>
                  {isSelected && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0, 0.6, 0.3] }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                      className="absolute inset-0 pointer-events-none"
                      style={{ background: 'radial-gradient(ellipse at center, hsl(43 78% 50% / 0.15) 0%, transparent 70%)' }}
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
        className="absolute bottom-6 font-sans text-[9px] text-white/[0.12] tracking-[0.22em] uppercase z-10"
      >
        Privileged &amp; Confidential
      </motion.p>
    </div>
  );
};

export default Landing;
