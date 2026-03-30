import { Link } from 'react-router-dom';
import { useRegion } from '@/contexts/RegionContext';
import { useTheme } from '@/contexts/ThemeContext';
import { FadeIn, GoldRule } from '@/components/ui/Section';
import { motion } from 'framer-motion';
import LightSectionEffects from '@/components/LightSectionEffects';
import DarkSectionEffects from '@/components/DarkSectionEffects';

const SiteFooter = () => {
  const year = new Date().getFullYear();
  const { region, setRegion } = useRegion();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const prefix = `/${region}`;
  const otherRegion = region === 'india' ? 'us' : 'india';

  const links = [
    { label: 'About Us', path: `${prefix}/about` },
    { label: 'Investment Criteria', path: `${prefix}/criteria` },
    { label: 'Team', path: `${prefix}/team` },
    { label: 'Contact', path: `${prefix}/contact` },
    { label: 'Investor Login', path: '/investor-login' },
  ];

  return (
    <footer className={`relative overflow-hidden transition-colors duration-300 ${isDark ? 'bg-primary' : 'bg-background'}`}>
      {!isDark && <LightSectionEffects variant="section" />}
      {isDark && <DarkSectionEffects variant="default" />}

      {/* Shimmer line at top */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-px z-10"
        style={{ background: 'linear-gradient(90deg, transparent, hsl(38 48% 52% / 0.15), transparent)' }}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      />

      <div className={`h-px ${isDark ? 'bg-[hsl(40,28%,95%)]/[0.04]' : 'bg-border/40'}`} />

      <motion.div
        className="max-w-[1080px] mx-auto px-5 md:px-10 lg:px-16 py-8 md:py-12 relative z-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <FadeIn>
          <div className="flex flex-col md:flex-row justify-between items-start gap-5 md:gap-14 mb-8">
            <div className="relative">
              {/* Gold glow behind logo */}
              <div
                className="absolute -inset-8 rounded-full pointer-events-none"
                style={{
                  background: isDark
                    ? 'radial-gradient(ellipse at center, hsl(38, 45%, 55%, 0.06) 0%, transparent 70%)'
                    : 'radial-gradient(ellipse at center, hsl(38, 45%, 55%, 0.04) 0%, transparent 70%)',
                }}
              />
              <p className={`font-serif text-xl tracking-[-0.02em] relative ${isDark ? 'text-[hsl(40,28%,95%)]' : 'text-foreground'}`}>Cruxway</p>
              <GoldRule className="mt-3" />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-x-10 gap-y-2.5">
              {links.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative font-sans text-[10px] font-medium uppercase tracking-[0.16em] transition-colors duration-300 group ${
                    isDark
                      ? 'text-[hsl(40,28%,95%)]/15 hover:text-[hsl(40,28%,95%)]/35'
                      : 'text-muted-foreground/60 hover:text-foreground/70'
                  }`}
                >
                  {item.label}
                  <span className="absolute bottom-0 left-0 w-0 h-px bg-gradient-to-r from-gold/40 to-gold/10 group-hover:w-full transition-all duration-500" />
                </Link>
              ))}
            </div>
          </div>
        </FadeIn>

        <div className={`h-px mb-4 ${isDark ? 'bg-[hsl(40,28%,95%)]/[0.04]' : 'bg-border/40'}`} />

        <FadeIn delay={0.08}>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-1.5">
            <p className={`font-sans text-[10px] tracking-[0.06em] ${isDark ? 'text-[hsl(40,28%,95%)]/10' : 'text-muted-foreground/40'}`}>
              &copy; {year} Cruxway LLC. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <Link
                to={`/${otherRegion}`}
                onClick={() => setRegion(otherRegion)}
                className={`relative font-sans text-[10px] font-medium uppercase tracking-[0.16em] transition-colors duration-300 group ${
                  isDark
                    ? 'text-[hsl(40,28%,95%)]/15 hover:text-[hsl(40,28%,95%)]/35'
                    : 'text-muted-foreground/50 hover:text-foreground/60'
                }`}
              >
                Switch to {otherRegion === 'india' ? 'India' : 'United States'}
                <span className="absolute bottom-0 left-0 w-0 h-px bg-gradient-to-r from-gold/40 to-gold/10 group-hover:w-full transition-all duration-500" />
              </Link>
              <span className={`w-px h-2.5 ${isDark ? 'bg-[hsl(40,28%,95%)]/[0.06]' : 'bg-border/40'}`} />
              <p className={`font-sans text-[8px] tracking-[0.12em] uppercase ${isDark ? 'text-[hsl(40,28%,95%)]/[0.06]' : 'text-muted-foreground/30'}`}>
                Privileged &amp; Confidential
              </p>
            </div>
          </div>
        </FadeIn>
      </motion.div>
    </footer>
  );
};

export default SiteFooter;
