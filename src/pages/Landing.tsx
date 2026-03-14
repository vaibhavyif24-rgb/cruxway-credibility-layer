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
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 text-center"
      >
        <h1 className="font-serif text-[clamp(2.4rem,7vw,4.5rem)] font-normal text-primary-foreground tracking-[-0.035em] leading-[1]">
          Cruxway
        </h1>

        <div className="flex items-center justify-center gap-3 mt-6 mb-2.5">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 32 }}
            transition={{ duration: 0.3, delay: 0.15 }}
            className="h-px bg-gold/25"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2, delay: 0.2 }}
            className="w-1 h-1 rotate-45 border border-gold/18"
          />
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 32 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="h-px bg-gold/25"
          />
        </div>

        <p className="font-sans text-[9px] font-medium uppercase text-primary-foreground/25 tracking-[0.25em]">
          Investment &amp; Partnership
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="relative z-10 mt-20 sm:mt-24"
      >
        <p className="font-sans text-[8px] font-medium uppercase text-primary-foreground/15 tracking-[0.3em] text-center mb-8">
          Select Region
        </p>
        <div className="flex gap-4 sm:gap-5">
          {regions.map((r, i) => {
            const isSelected = selected === r.key;
            const isOther = selected !== null && !isSelected;
            return (
              <motion.button
                key={r.key}
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: isOther ? 0.3 : 1,
                  y: 0,
                  scale: isSelected ? 1.03 : isOther ? 0.97 : 1,
                }}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                whileHover={!selected ? { y: -3 } : {}}
                whileTap={!selected ? { scale: 0.98 } : {}}
                onClick={() => !selected && selectRegion(r.key)}
                disabled={selected !== null}
                className="group relative w-[160px] sm:w-[190px] aspect-[4/3] flex items-center justify-center cursor-pointer overflow-hidden"
              >
                {/* Outer border — subtle, refines on hover */}
                <span className={`
                  absolute inset-0 border transition-all duration-700 ease-out
                  ${isSelected
                    ? 'border-gold/30'
                    : 'border-primary-foreground/[0.07] group-hover:border-primary-foreground/[0.14]'
                  }
                `} />

                {/* Inner fill */}
                <span className={`
                  absolute inset-[1px] transition-all duration-700 ease-out
                  ${isSelected
                    ? 'bg-gold/[0.08]'
                    : 'bg-primary-foreground/[0.02] group-hover:bg-primary-foreground/[0.05]'
                  }
                `} />

                {/* Corner accents — top-left & bottom-right */}
                <span className={`
                  absolute top-0 left-0 w-4 h-px transition-all duration-500 delay-100
                  ${isSelected ? 'bg-gold/50 w-8' : 'bg-gold/0 group-hover:bg-gold/25'}
                `} />
                <span className={`
                  absolute top-0 left-0 h-4 w-px transition-all duration-500 delay-100
                  ${isSelected ? 'bg-gold/50 h-8' : 'bg-gold/0 group-hover:bg-gold/25'}
                `} />
                <span className={`
                  absolute bottom-0 right-0 w-4 h-px transition-all duration-500 delay-100
                  ${isSelected ? 'bg-gold/50 w-8' : 'bg-gold/0 group-hover:bg-gold/25'}
                `} />
                <span className={`
                  absolute bottom-0 right-0 h-4 w-px transition-all duration-500 delay-100
                  ${isSelected ? 'bg-gold/50 h-8' : 'bg-gold/0 group-hover:bg-gold/25'}
                `} />

                {/* Label */}
                <span className={`
                  relative z-10 font-sans text-[11px] sm:text-[13px] font-semibold uppercase tracking-[0.28em]
                  transition-all duration-500
                  ${isSelected
                    ? 'text-gold'
                    : 'text-primary-foreground/35 group-hover:text-primary-foreground/70'
                  }
                `}>
                  {r.label}
                </span>

                {/* Selection glow pulse */}
                <AnimatePresence>
                  {isSelected && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0, 0.6, 0.3] }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                      className="absolute inset-0 bg-gradient-radial from-gold/[0.1] via-gold/[0.03] to-transparent pointer-events-none"
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
        transition={{ delay: 0.5, duration: 0.5 }}
        className="absolute bottom-5 font-sans text-[7.5px] text-primary-foreground/[0.08] tracking-[0.22em] uppercase"
      >
        Privileged &amp; Confidential
      </motion.p>
    </div>
  );
};

export default Landing;