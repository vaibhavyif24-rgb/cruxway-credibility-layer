import { useRegion } from '@/contexts/RegionContext';
import { useTheme } from '@/contexts/ThemeContext';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

const regions = [
  { key: 'india' as const, label: 'India' },
  { key: 'us' as const, label: 'United States' },
];

const Landing = () => {
  const { setRegion } = useRegion();
  const { setRegionTheme } = useTheme();
  const navigate = useNavigate();
  const [selected, setSelected] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

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
    }, 700);
  };

  return (
    <div className="min-h-[100dvh] relative flex flex-col items-center justify-center overflow-hidden bg-[hsl(220,30%,6%)]">
      {/* Deep ambient background */}
      <div className="absolute inset-0 z-[0]" style={{
        background: 'radial-gradient(ellipse at 50% 40%, hsl(220 25% 12%) 0%, hsl(220 30% 6%) 70%)',
      }} />

      {/* Subtle noise texture */}
      <div className="absolute inset-0 z-[1] opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
      }} />

      {/* Top edge accent */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="absolute top-0 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-gold/15 to-transparent z-[3] origin-center"
      />

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center w-full max-w-[600px] px-6">

        {/* Wordmark — refined serif */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-8 sm:mb-10"
        >
          <h1 className="font-serif text-[clamp(2.2rem,6vw,3.2rem)] font-normal text-white/90 tracking-[-0.02em] leading-[1]">
            Cruxway
          </h1>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 40 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="h-px bg-gold/30 mx-auto mt-4"
          />
        </motion.div>

        {/* Video centerpiece */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full aspect-video mb-10 sm:mb-12"
        >
          {/* Outer glow */}
          <div className="absolute -inset-3 sm:-inset-4 rounded-sm opacity-40" style={{
            background: 'radial-gradient(ellipse at center, hsl(43 60% 40% / 0.08) 0%, transparent 70%)',
          }} />

          {/* Video frame border */}
          <div className="absolute inset-0 border border-white/[0.06] rounded-sm z-[2] pointer-events-none" />

          {/* Corner accents */}
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
            className="absolute -top-px -left-px w-6 h-px bg-gold/30 z-[3]" />
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
            className="absolute -top-px -left-px h-6 w-px bg-gold/30 z-[3]" />
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}
            className="absolute -top-px -right-px w-6 h-px bg-gold/30 z-[3]" />
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}
            className="absolute -top-px -right-px h-6 w-px bg-gold/30 z-[3]" />
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.0 }}
            className="absolute -bottom-px -left-px w-6 h-px bg-gold/30 z-[3]" />
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.0 }}
            className="absolute -bottom-px -left-px h-6 w-px bg-gold/30 z-[3]" />
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }}
            className="absolute -bottom-px -right-px w-6 h-px bg-gold/30 z-[3]" />
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }}
            className="absolute -bottom-px -right-px h-6 w-px bg-gold/30 z-[3]" />

          <video
            ref={videoRef}
            src="/cruxway-naming.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover rounded-sm"
          />
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="font-sans text-[10px] sm:text-[11px] font-medium uppercase text-white/30 tracking-[0.35em] text-center mb-12 sm:mb-16"
        >
          Lower Middle Market Private Equity
        </motion.p>

        {/* Region selection */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="w-full"
        >
          <p className="font-sans text-[9px] sm:text-[10px] font-medium uppercase text-white/20 tracking-[0.35em] text-center mb-6">
            Select Region
          </p>

          <div className="flex justify-center gap-4 sm:gap-5">
            {regions.map((r, i) => {
              const isSelected = selected === r.key;
              const isOther = selected !== null && !isSelected;
              return (
                <motion.button
                  key={r.key}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{
                    opacity: isOther ? 0.2 : 1,
                    y: 0,
                    scale: isSelected ? 1.02 : isOther ? 0.97 : 1,
                  }}
                  transition={{ duration: 0.4, delay: 0.9 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={!selected ? { y: -3, borderColor: 'hsl(43 70% 50% / 0.25)' } : {}}
                  whileTap={!selected ? { scale: 0.98 } : {}}
                  onClick={() => !selected && selectRegion(r.key)}
                  disabled={selected !== null}
                  className={`
                    group relative px-8 sm:px-10 py-3.5 sm:py-4 cursor-pointer
                    border transition-all duration-500 ease-out
                    ${isSelected
                      ? 'border-gold/40 bg-gold/[0.08]'
                      : 'border-white/[0.08] bg-white/[0.02] hover:border-white/[0.15] hover:bg-white/[0.04]'
                    }
                  `}
                >
                  <span className={`
                    relative z-10 font-sans text-[11px] sm:text-[12px] font-semibold uppercase tracking-[0.25em]
                    transition-colors duration-500
                    ${isSelected ? 'text-gold' : 'text-white/45 group-hover:text-white/75'}
                  `}>
                    {r.label}
                  </span>

                  <AnimatePresence>
                    {isSelected && (
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 0.5, 0.25] }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        className="absolute inset-0 pointer-events-none"
                        style={{ background: 'radial-gradient(ellipse at center, hsl(43 78% 50% / 0.12) 0%, transparent 70%)' }}
                      />
                    )}
                  </AnimatePresence>
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Bottom confidential */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="absolute bottom-5 font-sans text-[8px] text-white/[0.10] tracking-[0.25em] uppercase z-10"
      >
        Privileged &amp; Confidential
      </motion.p>
    </div>
  );
};

export default Landing;
