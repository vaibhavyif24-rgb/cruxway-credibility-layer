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
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/60 via-transparent to-navy-deep/40 pointer-events-none" />

      {/* Top rule */}
      <div className="absolute top-0 left-0 right-0 h-px bg-primary-foreground/5" />

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
        className="relative z-10 text-center"
      >
        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-normal text-primary-foreground tracking-tight">
          Cruxway
        </h1>

        <div className="flex items-center justify-center gap-4 mt-8 mb-3">
          <div className="w-8 h-px bg-gold/40" />
          <div className="w-1.5 h-1.5 rotate-45 border border-gold/30" />
          <div className="w-8 h-px bg-gold/40" />
        </div>

        <p className="font-sans text-caption uppercase text-primary-foreground/35 tracking-[0.2em]">
          Investment &amp; Partnership
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="relative z-10 mt-16 md:mt-20"
      >
        <p className="font-sans text-caption uppercase text-primary-foreground/25 tracking-[0.15em] text-center mb-6">
          Select Region
        </p>
        <div className="flex flex-col sm:flex-row gap-px bg-primary-foreground/10">
          {(['india', 'us'] as const).map((r) => (
            <button
              key={r}
              onClick={() => selectRegion(r)}
              className="group relative px-14 md:px-18 py-4 bg-prussian text-primary-foreground/70 font-sans text-nav uppercase tracking-[0.2em] transition-all duration-500 hover:bg-prussian-mid hover:text-primary-foreground"
            >
              {r === 'india' ? 'India' : 'United States'}
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-px bg-gold/50 transition-all duration-500 group-hover:w-full" />
            </button>
          ))}
        </div>
      </motion.div>

      {/* Bottom subtle branding */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 font-sans text-[10px] text-primary-foreground/15 tracking-[0.2em] uppercase"
      >
        Privileged &amp; Confidential
      </motion.p>
    </div>
  );
};

export default Landing;
