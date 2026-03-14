import { useRegion } from '@/contexts/RegionContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Landing = () => {
  const { setRegion } = useRegion();
  const navigate = useNavigate();

  const selectRegion = (region: 'india' | 'us') => {
    setRegion(region);
    navigate(`/${region}`);
  };

  return (
    <div className="min-h-[100dvh] hero-gradient-animated flex flex-col items-center justify-center px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/50 via-transparent to-navy-deep/40 pointer-events-none" />
      {/* Subtle radial glow */}
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
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.5 }}
        className="relative z-10 mt-16 sm:mt-18"
      >
        <p className="font-sans text-[8.5px] font-medium uppercase text-primary-foreground/15 tracking-[0.2em] text-center mb-5">
          Select Region
        </p>
        <div className="grid grid-cols-2 gap-px w-full max-w-[340px]">
          {(['india', 'us'] as const).map((r) => (
            <motion.button
              key={r}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => selectRegion(r)}
              className="btn-premium group relative py-3.5 bg-primary-foreground/[0.04] text-primary-foreground/45 font-sans text-[10px] font-medium uppercase tracking-[0.18em] transition-all duration-400 hover:bg-primary-foreground/[0.08] hover:text-primary-foreground/80"
            >
              {r === 'india' ? 'India' : 'United States'}
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-px bg-gold/30 transition-all duration-400 group-hover:w-full" />
            </motion.button>
          ))}
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