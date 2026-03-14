import { useRegion } from '@/contexts/RegionContext';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const regions = [
  { key: 'india' as const, label: 'India' },
  { key: 'us' as const, label: 'USA' },
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
    <div className="min-h-[100dvh] hero-gradient-animated flex flex-col items-center justify-center px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/50 via-transparent to-navy-deep/40 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gold/[0.02] rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/10 to-transparent" />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 text-center"
      >
        <h1 className="font-serif text-[clamp(2.4rem,7vw,4.5rem)] font-normal text-primary-foreground tracking-[-0.035em] leading-[1]">
          Cruxway
        </h1>

        <div className="flex items-center justify-center gap-3 mt-6 mb-2.5">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 32 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="h-px bg-gold/25"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.8 }}
            className="w-1 h-1 rotate-45 border border-gold/18"
          />
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 32 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="h-px bg-gold/25"
          />
        </div>

        <p className="font-sans text-[9px] font-medium uppercase text-primary-foreground/25 tracking-[0.25em]">
          Investment &amp; Partnership
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.6 }}
        className="relative z-10 mt-16 sm:mt-20"
      >
        <p className="font-sans text-[8.5px] font-medium uppercase text-primary-foreground/20 tracking-[0.25em] text-center mb-6">
          Select Region
        </p>
        <div className="grid grid-cols-2 gap-[1px] w-full max-w-[380px] sm:max-w-[420px]">
          {regions.map((r, i) => {
            const isSelected = selected === r.key;
            return (
              <motion.button
                key={r.key}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 + i * 0.1 }}
                whileHover={{ scale: 1.015 }}
                whileTap={{ scale: 0.985 }}
                onClick={() => selectRegion(r.key)}
                disabled={selected !== null}
                className={`
                  group relative py-5 sm:py-6
                  font-sans text-[11px] sm:text-xs font-semibold uppercase tracking-[0.22em]
                  transition-all duration-500 ease-out cursor-pointer
                  border border-primary-foreground/[0.06]
                  ${isSelected
                    ? 'bg-gold/[0.12] text-gold border-gold/20 shadow-[0_0_30px_-5px_hsl(var(--gold)/0.15)]'
                    : 'bg-primary-foreground/[0.03] text-primary-foreground/40 hover:bg-primary-foreground/[0.07] hover:text-primary-foreground/70 hover:border-primary-foreground/[0.12]'
                  }
                `}
              >
                {/* Top accent line on hover */}
                <span className={`
                  absolute top-0 left-1/2 -translate-x-1/2 h-px transition-all duration-500
                  ${isSelected ? 'w-full bg-gold/40' : 'w-0 bg-gold/25 group-hover:w-3/4'}
                `} />

                {/* Label */}
                <span className="relative z-10">{r.label}</span>

                {/* Bottom accent line */}
                <span className={`
                  absolute bottom-0 left-1/2 -translate-x-1/2 h-px transition-all duration-500
                  ${isSelected ? 'w-full bg-gold/40' : 'w-0 bg-gold/25 group-hover:w-3/4'}
                `} />

                {/* Selection glow */}
                <AnimatePresence>
                  {isSelected && (
                    <motion.span
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="absolute inset-0 bg-gradient-to-t from-gold/[0.06] via-transparent to-gold/[0.03] pointer-events-none"
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
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-5 font-sans text-[7.5px] text-primary-foreground/[0.08] tracking-[0.22em] uppercase"
      >
        Privileged &amp; Confidential
      </motion.p>
    </div>
  );
};

export default Landing;