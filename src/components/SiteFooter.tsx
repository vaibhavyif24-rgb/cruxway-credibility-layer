import { Link } from 'react-router-dom';
import { useRegion } from '@/contexts/RegionContext';
import { useTheme } from '@/contexts/ThemeContext';

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
  const email = isIndia ? 'india@cruxway.com' : 'us@cruxway.com';

  const navLinks = [
    { label: 'Home', path: prefix },
    { label: 'Our Identity', path: `${prefix}/principles` },
    { label: 'Our Focus', path: `${prefix}/focus` },
    { label: 'Our Playbook', path: `${prefix}/playbook` },
    { label: 'Team', path: `${prefix}/team` },
    { label: 'Contact', path: `${prefix}/contact` },
  ];

  const navLinkClass = `font-sans text-[12px] font-medium uppercase tracking-[0.12em] transition-colors duration-200 ${
    isDark
      ? 'text-primary-foreground/40 hover:text-primary-foreground/70'
      : 'text-foreground/50 hover:text-foreground/75'
  }`;

  const dividerClass = `h-px ${isDark ? 'bg-primary-foreground/[0.06]' : 'bg-foreground/[0.08]'}`;

  return (
    <footer className={`relative transition-colors duration-300 ${isDark ? 'bg-primary' : 'bg-[hsl(40,15%,94%)]'}`}>
      {/* Gold top border */}
      <div className="h-px" style={{ background: 'linear-gradient(90deg, transparent, hsl(40,65%,44%,0.15), transparent)' }} />

      <div className="max-w-[1200px] mx-auto px-5 md:px-10 lg:px-16">
        {/* Row 1: Brand */}
        <div className="flex flex-col items-center text-center md:flex-row md:items-center md:justify-between md:text-left gap-1 md:gap-3 py-4">
          <div className="flex flex-col items-center md:flex-row md:items-center gap-1 md:gap-3 shrink-0">
            <span className={`font-serif text-lg tracking-[-0.02em] ${isDark ? 'text-primary-foreground' : 'text-foreground'}`}>
              Cruxway
            </span>
            <span className={`hidden md:inline h-3 w-px ${isDark ? 'bg-primary-foreground/10' : 'bg-foreground/15'}`} />
            <span className={`font-sans text-[10px] uppercase tracking-[0.16em] ${isDark ? 'text-primary-foreground/20' : 'text-foreground/35'}`}>
              Lower Middle Market Private Equity
            </span>
          </div>
        </div>

        <div className={dividerClass} />

        {/* Row 2: Navigation — grid on mobile, inline on desktop */}
        {/* Mobile: 2-col grid */}
        <div className="grid grid-cols-2 gap-y-3 gap-x-4 py-4 md:hidden">
          {navLinks.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`${navLinkClass} text-center py-1`}
            >
              {item.label}
            </Link>
          ))}
        </div>
        {/* Desktop: inline */}
        <div className="hidden md:flex justify-center items-center py-3">
          <nav className="flex items-center gap-6 md:gap-8">
            {navLinks.map((item, i) => (
              <span key={item.path} className="flex items-center gap-6 md:gap-8">
                <Link to={item.path} className={navLinkClass}>
                  {item.label}
                </Link>
                {i < navLinks.length - 1 && (
                  <span className={`text-[8px] ${isDark ? 'text-primary-foreground/10' : 'text-foreground/20'}`}>·</span>
                )}
              </span>
            ))}
          </nav>
        </div>

        <div className={dividerClass} />

        {/* Row 3: Email + Region */}
        <div className="flex flex-col items-center gap-2 py-3 md:flex-row md:justify-end md:gap-3">
          <a
            href={`mailto:${email}`}
            className={`font-sans text-[12px] tracking-[0.04em] transition-colors duration-200 ${isDark ? 'text-primary-foreground/35 hover:text-gold' : 'text-foreground/45 hover:text-gold'}`}
          >
            {email}
          </a>
          <span className={`hidden md:inline h-3 w-px ${isDark ? 'bg-primary-foreground/10' : 'bg-foreground/15'}`} />
          <Link
            to={`/${otherRegion}`}
            onClick={() => setRegion(otherRegion)}
            className={`inline-flex items-center gap-1.5 font-sans text-[10px] font-medium uppercase tracking-[0.14em] transition-colors duration-200 ${
              isDark
                ? 'text-primary-foreground/30 hover:text-primary-foreground/55'
                : 'text-foreground/40 hover:text-foreground/65'
            }`}
          >
            {otherRegion === 'india' ? <IndiaFlag size={12} /> : <USFlag size={12} />}
            Switch to {otherRegion === 'india' ? 'India' : 'United States'}
          </Link>
        </div>

        <div className={dividerClass} />

        {/* Row 4: Copyright + Legal */}
        <div className="flex flex-col items-center gap-1.5 py-2.5 sm:flex-row sm:justify-between">
          <p className={`font-sans text-[11px] tracking-[0.06em] ${isDark ? 'text-primary-foreground/18' : 'text-foreground/30'}`}>
            &copy; {year} Cruxway LLC. All rights reserved.
          </p>
          <div className="flex items-center gap-3">
            <span className={`font-sans text-[11px] tracking-[0.06em] cursor-pointer transition-colors duration-200 ${isDark ? 'text-primary-foreground/15 hover:text-primary-foreground/30' : 'text-foreground/25 hover:text-foreground/45'}`}>
              Privacy Policy
            </span>
            <span className={`font-sans text-[11px] tracking-[0.06em] cursor-pointer transition-colors duration-200 ${isDark ? 'text-primary-foreground/15 hover:text-primary-foreground/30' : 'text-foreground/25 hover:text-foreground/45'}`}>
              Terms
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
