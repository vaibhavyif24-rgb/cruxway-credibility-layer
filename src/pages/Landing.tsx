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
    <div className="min-h-[100dvh] bg-prussian flex flex-col items-center justify-center px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/70 via-transparent to-navy-deep/40 pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/8 to-transparent" />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 text-center"
      >
        <h1 className="font-serif text-[clamp(2.2rem,7vw,5rem)] font-normal text-primary-foreground tracking-[-0.035em] leading-[1]">
          Cruxway
        </h1>

        <div className="flex items-center justify-center gap-3 mt-6 mb-2">
          <div className="w-8 h-px bg-gold/20" />
          <div className="w-1 h-1 rotate-45 border border-gold/15" />
          <div className="w-8 h-px bg-gold/20" />
        </div>

        <p className="font-sans text-[9px] font-medium uppercase text-primary-foreground/18 tracking-[0.25em]">
          Investment &amp; Partnership
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.5 }}
        className="relative z-10 mt-14 sm:mt-16"
      >
        <p className="font-sans text-[8px] font-medium uppercase text-primary-foreground/12 tracking-[0.2em] text-center mb-5">
          Select Region
        </p>
        <div className="flex flex-col sm:flex-row gap-px">
          {(['india', 'us'] as const).map((r) => (
            <button
              key={r}
              onClick={() => selectRegion(r)}
              className="group relative px-10 sm:px-14 md:px-18 py-3.5 bg-primary-foreground/[0.03] text-primary-foreground/40 font-sans text-[10px] font-medium uppercase tracking-[0.18em] transition-all duration-400 hover:bg-primary-foreground/[0.06] hover:text-primary-foreground/75 active:bg-primary-foreground/[0.09]"
            >
              {r === 'india' ? 'India' : 'United States'}
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-px bg-gold/25 transition-all duration-400 group-hover:w-full" />
            </button>
          ))}
        </div>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-5 font-sans text-[7px] text-primary-foreground/[0.06] tracking-[0.22em] uppercase"
      >
        Privileged &amp; Confidential
      </motion.p>
    </div>
  );
};

export default Landing;
