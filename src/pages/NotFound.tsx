import { useTheme } from '@/contexts/ThemeContext';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import LightSectionEffects from '@/components/LightSectionEffects';
import DarkSectionEffects from '@/components/DarkSectionEffects';

const NotFound = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className={`min-h-[100dvh] flex items-center justify-center relative overflow-hidden transition-colors duration-300 ${isDark ? 'bg-primary' : 'bg-background'}`}>
      {isDark ? <DarkSectionEffects /> : <LightSectionEffects variant="section" />}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="text-center relative z-10"
      >
        <h1 className="font-serif text-[clamp(5rem,15vw,10rem)] leading-none tracking-[-0.04em] text-gold/20">
          404
        </h1>
        <p className={`font-sans text-sm font-medium uppercase tracking-[0.2em] mt-4 ${
          isDark ? 'text-primary-foreground/40' : 'text-muted-foreground/60'
        }`}>
          Page Not Found
        </p>
        <p className={`font-sans text-xs mt-3 ${
          isDark ? 'text-primary-foreground/20' : 'text-muted-foreground/40'
        }`}>
          The page you're looking for doesn't exist.
        </p>
        <Link
          to="/"
          className="inline-block mt-8 font-sans text-[10px] font-medium uppercase tracking-[0.2em] text-gold/60 hover:text-gold transition-colors duration-300 border-b border-gold/20 hover:border-gold/40 pb-1"
        >
          Return Home
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;
