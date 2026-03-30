import { Link } from 'react-router-dom';
import { useRegion } from '@/contexts/RegionContext';
import { useTheme } from '@/contexts/ThemeContext';
import { FadeIn, GoldRule } from '@/components/ui/Section';
import WaveBackground from '@/components/WaveBackground';

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

  // Footer is always dark (Persian blue) in both modes
  return (
    <footer className="relative overflow-hidden transition-colors duration-300 bg-[hsl(228,58%,18%)]">
      <WaveBackground variant="section" />
      <div className="h-px bg-[hsl(40,28%,95%)]/[0.04]" />

      <div className="max-w-[1080px] mx-auto px-5 md:px-10 lg:px-16 py-8 md:py-12 relative z-10">
        <FadeIn>
          <div className="flex flex-col md:flex-row justify-between items-start gap-5 md:gap-14 mb-8">
            <div className="relative">
              <div className="absolute -inset-8 rounded-full pointer-events-none" style={{ background: 'radial-gradient(ellipse at center, hsl(38, 45%, 55%, 0.06) 0%, transparent 70%)' }} />
              <p className="font-serif text-xl tracking-[-0.02em] relative text-[hsl(40,28%,95%)]">Cruxway</p>
              <GoldRule className="mt-3" />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-x-10 gap-y-2.5">
              {links.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="font-sans text-[10px] font-medium uppercase tracking-[0.16em] transition-colors duration-300 text-[hsl(40,28%,95%)]/15 hover:text-[hsl(40,28%,95%)]/35"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </FadeIn>

        <div className="h-px mb-4 bg-[hsl(40,28%,95%)]/[0.04]" />

        <FadeIn delay={0.08}>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-1.5">
            <p className="font-sans text-[10px] tracking-[0.06em] text-[hsl(40,28%,95%)]/10">
              &copy; {year} Cruxway LLC. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <Link
                to={`/${otherRegion}`}
                onClick={() => setRegion(otherRegion)}
                className="font-sans text-[10px] font-medium uppercase tracking-[0.16em] transition-colors duration-300 text-[hsl(40,28%,95%)]/15 hover:text-[hsl(40,28%,95%)]/35"
              >
                Switch to {otherRegion === 'india' ? 'India' : 'United States'}
              </Link>
              <span className="w-px h-2.5 bg-[hsl(40,28%,95%)]/[0.06]" />
              <p className="font-sans text-[8px] tracking-[0.12em] uppercase text-[hsl(40,28%,95%)]/[0.06]">
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