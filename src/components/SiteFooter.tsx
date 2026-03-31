import { Link } from 'react-router-dom';
import { useRegion } from '@/contexts/RegionContext';
import { useTheme } from '@/contexts/ThemeContext';
import { FadeIn, GoldRule } from '@/components/ui/Section';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import DarkSectionEffects from '@/components/DarkSectionEffects';
import LightSectionEffects from '@/components/LightSectionEffects';

const IndiaFlag = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size * 0.67} viewBox="0 0 24 16" className="rounded-[2px]" style={{ border: '0.5px solid rgba(255,255,255,0.08)' }}>
    <rect width="24" height="5.33" fill="#FF9933" />
    <rect y="5.33" width="24" height="5.34" fill="#FFFFFF" />
    <rect y="10.67" width="24" height="5.33" fill="#138808" />
    <circle cx="12" cy="8" r="1.8" fill="none" stroke="#000080" strokeWidth="0.4" />
  </svg>
);

const USFlag = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size * 0.67} viewBox="0 0 24 16" className="rounded-[2px]" style={{ border: '0.5px solid rgba(255,255,255,0.08)' }}>
    <rect width="24" height="16" fill="#B22234" />
    {[1, 3, 5, 7, 9, 11].map(i => (
      <rect key={i} y={i * (16 / 13)} width="24" height={16 / 13} fill="#FFFFFF" />
    ))}
    <rect width="9.6" height="8.6" fill="#3C3B6E" />
  </svg>
);

const SiteFooter = () => {
  const year = new Date().getFullYear();
  const { region, setRegion } = useRegion();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const prefix = `/${region}`;
  const otherRegion = region === 'india' ? 'us' : 'india';
  const isIndia = region === 'india';

  const firmLinks = [
    { label: 'Home', path: prefix },
    { label: 'Our Principles', path: `${prefix}/principles` },
    { label: 'Our Focus', path: `${prefix}/focus` },
    { label: 'Our Playbook', path: `${prefix}/playbook` },
    { label: 'Team', path: `${prefix}/team` },
  ];

  const connectLinks = [
    { label: 'Contact', path: `${prefix}/contact` },
    { label: 'Investor Login', path: '/investor-login' },
  ];

  const email = isIndia ? 'india@cruxway.com' : 'info@cruxway.com';
  const address = isIndia ? 'E-97, GK II, Delhi, India' : 'San Diego, California';

  const linkClass = `group relative font-sans text-[11px] md:text-[12px] font-medium uppercase tracking-[0.14em] leading-[2.4] transition-colors duration-300 ${
    isDark
      ? 'text-primary-foreground/40 hover:text-primary-foreground/70'
      : 'text-foreground/55 hover:text-foreground/80'
  }`;

  const sectionHeaderClass = `font-sans text-[11px] font-semibold uppercase tracking-[0.2em] mb-3 ${isDark ? 'text-gold/60' : 'text-gold/70'}`;

  return (
    <footer className={`relative overflow-hidden transition-colors duration-300 ${isDark ? 'bg-primary' : 'bg-[hsl(40,15%,94%)]'}`}>
      {isDark ? <DarkSectionEffects /> : <LightSectionEffects variant="section" />}

      {/* Grain texture */}
      <div className="absolute inset-0 z-[1] opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")' }}
      />

      {/* Top shimmer line */}
      <div className="absolute top-0 left-0 right-0 h-px z-10" style={{ background: 'linear-gradient(90deg, transparent, hsl(40,65%,44%,0.12), transparent)' }} />
      <div className={`h-px ${isDark ? 'bg-primary-foreground/[0.04]' : 'bg-border/30'}`} />

      <div className="max-w-[1080px] mx-auto px-5 md:px-10 lg:px-16 py-10 md:py-14 relative z-10">
        {/* 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 lg:gap-8 mb-10">
          {/* Column 1: Brand */}
          <FadeIn>
            <div className="relative">
              <div
                className="absolute -inset-8 rounded-full pointer-events-none"
                style={{
                  background: 'radial-gradient(ellipse at center, hsl(40, 60%, 48%, 0.06) 0%, transparent 70%)',
                  animation: 'pulse-glow 6s ease-in-out infinite',
                }}
              />
              <p className={`font-serif text-2xl tracking-[-0.02em] relative ${isDark ? 'text-primary-foreground' : 'text-foreground'}`}>Cruxway</p>
              <GoldRule className="mt-3" />
              <p className={`font-sans text-[11px] font-medium uppercase tracking-[0.2em] mt-3 ${isDark ? 'text-primary-foreground/25' : 'text-foreground/40'}`}>
                Lower Middle Market Private Equity
              </p>
              <p className={`font-sans text-[11px] leading-[1.7] mt-2 ${isDark ? 'text-primary-foreground/20' : 'text-foreground/35'}`}>
                Patient capital for essential businesses
              </p>
            </div>
          </FadeIn>

          {/* Column 2: Firm Navigation */}
          <FadeIn delay={0.06}>
            <div>
              <p className={sectionHeaderClass}>Firm</p>
              <nav className="flex flex-col">
                {firmLinks.map((item, i) => (
                  <motion.div
                    key={item.path}
                    initial={{ opacity: 0, y: 4 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.03, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Link to={item.path} className={linkClass}>
                      {item.label}
                      <span className="absolute bottom-0 left-0 w-0 h-px bg-gold/40 group-hover:w-full transition-all duration-[400ms] ease-out" />
                    </Link>
                  </motion.div>
                ))}
              </nav>
            </div>
          </FadeIn>

          {/* Column 3: Connect */}
          <FadeIn delay={0.12}>
            <div>
              <p className={sectionHeaderClass}>Connect</p>
              <nav className="flex flex-col">
                {connectLinks.map((item, i) => (
                  <motion.div
                    key={item.path}
                    initial={{ opacity: 0, y: 4 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.03 + 0.1, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Link to={item.path} className={linkClass}>
                      {item.label}
                      <span className="absolute bottom-0 left-0 w-0 h-px bg-gold/40 group-hover:w-full transition-all duration-[400ms] ease-out" />
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Region switcher */}
              <div className="mt-4">
                <Link
                  to={`/${otherRegion}`}
                  onClick={() => setRegion(otherRegion)}
                  className={`inline-flex items-center gap-2 font-sans text-[11px] font-medium uppercase tracking-[0.16em] transition-all duration-300 min-h-[44px] px-3 py-1.5 rounded-full border border-gold/20 hover:border-gold/40 hover:bg-gold/[0.05] ${
                    isDark
                      ? 'text-primary-foreground/30 hover:text-primary-foreground/55'
                      : 'text-foreground/45 hover:text-foreground/70'
                  }`}
                >
                  {otherRegion === 'india' ? <IndiaFlag /> : <USFlag />}
                  Switch to {otherRegion === 'india' ? 'India' : 'United States'}
                </Link>
              </div>
            </div>
          </FadeIn>

          {/* Column 4: Contact */}
          <FadeIn delay={0.18}>
            <div>
              <p className={sectionHeaderClass}>Contact</p>
              <a
                href={`mailto:${email}`}
                className={`group relative block font-sans text-[12px] leading-[1.8] transition-colors duration-300 ${isDark ? 'text-primary-foreground/45 hover:text-gold' : 'text-foreground/60 hover:text-gold'}`}
              >
                {email}
                <span className="absolute bottom-0 left-0 w-0 h-px bg-gold/40 group-hover:w-full transition-all duration-[400ms] ease-out" />
              </a>
              <p className={`font-sans text-[12px] leading-[1.8] flex items-center gap-1.5 mt-1 ${isDark ? 'text-primary-foreground/35' : 'text-foreground/45'}`}>
                <MapPin className="w-3 h-3 text-gold/40 shrink-0" />
                {address}
              </p>
            </div>
          </FadeIn>
        </div>

        {/* Animated gold shimmer divider */}
        <div className="relative h-px mb-5 overflow-hidden">
          <motion.div
            className="h-full bg-gold/15 origin-left"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          />
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(90deg, transparent 30%, hsl(43 78% 50% / 0.2) 50%, transparent 70%)',
              backgroundSize: '200% 100%',
              animation: 'shimmer-sweep 6s linear infinite',
            }}
          />
        </div>

        {/* Bottom bar */}
        <FadeIn delay={0.08}>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
            <p className={`font-sans text-[11px] tracking-[0.06em] ${isDark ? 'text-primary-foreground/20' : 'text-foreground/35'}`}>
              &copy; {year} Cruxway LLC. All rights reserved.
            </p>
            <div className="flex items-center gap-4 flex-wrap">
              <span className={`font-sans text-[11px] tracking-[0.08em] ${isDark ? 'text-primary-foreground/15' : 'text-foreground/30'}`}>
                Privileged &amp; Confidential
              </span>
              <span className={`w-px h-2.5 ${isDark ? 'bg-primary-foreground/[0.06]' : 'bg-border/30'}`} />
              <span className={`group relative font-sans text-[11px] tracking-[0.06em] cursor-pointer transition-colors duration-300 ${isDark ? 'text-primary-foreground/15 hover:text-primary-foreground/30' : 'text-foreground/30 hover:text-foreground/50'}`}>
                Privacy Policy
                <span className="absolute bottom-0 left-0 w-0 h-px bg-gold/30 group-hover:w-full transition-all duration-[400ms] ease-out" />
              </span>
              <span className={`group relative font-sans text-[11px] tracking-[0.06em] cursor-pointer transition-colors duration-300 ${isDark ? 'text-primary-foreground/15 hover:text-primary-foreground/30' : 'text-foreground/30 hover:text-foreground/50'}`}>
                Terms
                <span className="absolute bottom-0 left-0 w-0 h-px bg-gold/30 group-hover:w-full transition-all duration-[400ms] ease-out" />
              </span>
            </div>
          </div>
        </FadeIn>
      </div>
    </footer>
  );
};

export default SiteFooter;
