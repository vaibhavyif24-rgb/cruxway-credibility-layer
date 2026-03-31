import { Link } from 'react-router-dom';
import { useRegion } from '@/contexts/RegionContext';
import { useTheme } from '@/contexts/ThemeContext';
import { FadeIn, GoldRule } from '@/components/ui/Section';
import { motion } from 'framer-motion';
import DarkSectionEffects from '@/components/DarkSectionEffects';
import LightSectionEffects from '@/components/LightSectionEffects';

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
    <footer className={`relative overflow-hidden transition-colors duration-300 ${isDark ? 'bg-primary' : 'bg-[hsl(40,12%,91%)]'}`}>
      {isDark ? <DarkSectionEffects /> : <LightSectionEffects variant="section" />}

      {/* Top shimmer line */}
      <div className="absolute top-0 left-0 right-0 h-px z-10" style={{ background: 'linear-gradient(90deg, transparent, hsl(40,65%,44%,0.12), transparent)' }} />

      <div className={`h-px ${isDark ? 'bg-primary-foreground/[0.06]' : 'bg-foreground/15'}`} />

      <div className="max-w-[1080px] mx-auto px-5 md:px-10 lg:px-16 py-8 md:py-12 relative z-10">
        <FadeIn>
          <div className="flex flex-col md:flex-row justify-between items-start gap-5 md:gap-14 mb-8">
            <div className="relative">
              {/* Pulsing gold glow behind wordmark */}
              <div
                className="absolute -inset-8 rounded-full pointer-events-none animate-pulse"
                style={{ background: 'radial-gradient(ellipse at center, hsl(40, 60%, 48%, 0.06) 0%, transparent 70%)' }}
              />
              <p className={`font-serif text-xl tracking-[-0.02em] relative ${isDark ? 'text-primary-foreground' : 'text-foreground'}`}>Cruxway</p>
              <GoldRule className="mt-3" />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-x-10 gap-y-2.5">
              {links.map((item, i) => (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, y: 6 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    to={item.path}
                    className={`group relative font-sans text-[10px] font-medium uppercase tracking-[0.16em] transition-colors duration-300 ${
                      isDark
                        ? 'text-primary-foreground/30 hover:text-primary-foreground/60'
                        : 'text-foreground/55 hover:text-foreground/80'
                    }`}
                  >
                    {item.label}
                    <span className="absolute bottom-0 left-0 w-0 h-px bg-gold/40 group-hover:w-full transition-all duration-500" />
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </FadeIn>

        <div className={`h-px mb-4 ${isDark ? 'bg-primary-foreground/[0.06]' : 'bg-foreground/15'}`} />

        <FadeIn delay={0.08}>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-1.5">
            <p className={`font-sans text-[10px] tracking-[0.06em] ${isDark ? 'text-primary-foreground/20' : 'text-foreground/45'}`}>
              &copy; {year} Cruxway LLC. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <Link
                to={`/${otherRegion}`}
                onClick={() => setRegion(otherRegion)}
                className={`font-sans text-[10px] font-medium uppercase tracking-[0.16em] transition-colors duration-300 ${
                  isDark
                    ? 'text-primary-foreground/30 hover:text-primary-foreground/60'
                    : 'text-foreground/55 hover:text-foreground/80'
                }`}
              >
                Switch to {otherRegion === 'india' ? 'India' : 'United States'}
              </Link>
              <span className={`w-px h-2.5 ${isDark ? 'bg-primary-foreground/[0.06]' : 'bg-foreground/15'}`} />
              <p className={`font-sans text-[8px] tracking-[0.12em] uppercase ${isDark ? 'text-primary-foreground/10' : 'text-foreground/35'}`}>
                Privileged &amp; Confidential
              </p>
            </div>
          </div>
        </FadeIn>
      </div>
    </footer>
  );
};

export default SiteFooter;
