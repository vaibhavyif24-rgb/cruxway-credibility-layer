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
      {/* Ambient gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/80 via-transparent to-navy-deep/50 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_hsl(207_65%_15%/0.3)_0%,_transparent_70%)] pointer-events-none" />

      {/* Top accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/10 to-transparent" />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 text-center"
      >
        <h1 className="font-serif text-[2.75rem] md:text-7xl lg:text-8xl font-normal text-primary-foreground tracking-[-0.03em]">
          Cruxway
        </h1>

        <div className="flex items-center justify-center gap-4 mt-8 mb-3">
          <div className="w-10 h-px bg-gold/25" />
          <div className="w-[5px] h-[5px] rotate-45 border border-gold/20" />
          <div className="w-10 h-px bg-gold/25" />
        </div>

        <p className="font-sans text-[10px] font-medium uppercase text-primary-foreground/25 tracking-[0.25em]">
          Investment &amp; Partnership
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.7 }}
        className="relative z-10 mt-20 md:mt-24"
      >
        <p className="font-sans text-[9px] font-medium uppercase text-primary-foreground/18 tracking-[0.2em] text-center mb-5">
          Select Region
        </p>
        <div className="flex flex-col sm:flex-row gap-px">
          {(['india', 'us'] as const).map((r) => (
            <button
              key={r}
              onClick={() => selectRegion(r)}
              className="group relative px-14 md:px-20 py-4 bg-primary-foreground/[0.03] text-primary-foreground/50 font-sans text-[11px] font-medium uppercase tracking-[0.2em] transition-all duration-500 hover:bg-primary-foreground/[0.07] hover:text-primary-foreground/80 active:bg-primary-foreground/[0.1]"
            >
              {r === 'india' ? 'India' : 'United States'}
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-px bg-gold/30 transition-all duration-500 group-hover:w-full" />
            </button>
          ))}
        </div>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 font-sans text-[8px] text-primary-foreground/10 tracking-[0.25em] uppercase"
      >
        Privileged &amp; Confidential
      </motion.p>
    </div>
  );
};

export default Landing;
