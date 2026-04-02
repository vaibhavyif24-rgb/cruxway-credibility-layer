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
  const email = isIndia ? 'india@cruxway.com' : 'info@cruxway.com';

  const navLinks = [
    { label: 'Home', path: prefix },
    { label: 'Our Identity', path: `${prefix}/principles` },
    { label: 'Our Focus', path: `${prefix}/focus` },
    { label: 'Our Playbook', path: `${prefix}/playbook` },
    { label: 'Team', path: `${prefix}/team` },
    { label: 'Contact', path: `${prefix}/contact` },
  ];

  const linkClass = `font-sans text-[11px] font-medium uppercase tracking-[0.12em] transition-colors duration-200 ${
    isDark
      ? 'text-primary-foreground/40 hover:text-primary-foreground/70'
      : 'text-foreground/50 hover:text-foreground/75'
  }`;

  return (
    <footer className={`relative transition-colors duration-300 ${isDark ? 'bg-primary' : 'bg-[hsl(40,15%,94%)]'}`}>
      {/* Gold top border */}
      <div className="h-px" style={{ background: 'linear-gradient(90deg, transparent, hsl(40,65%,44%,0.15), transparent)' }} />

      <div className="max-w-[1140px] mx-auto px-5 md:px-10 lg:px-16">
        {/* Row 1: Brand + Nav + Region/Email */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 py-3">
          {/* Left: Brand */}
          <div className="flex items-center gap-3 shrink-0">
            <span className={`font-serif text-lg tracking-[-0.02em] ${isDark ? 'text-primary-foreground' : 'text-foreground'}`}>
              Cruxway
            </span>
            <span className={`hidden lg:inline h-3 w-px ${isDark ? 'bg-primary-foreground/10' : 'bg-foreground/15'}`} />
            <span className={`hidden lg:inline font-sans text-[10px] uppercase tracking-[0.16em] ${isDark ? 'text-primary-foreground/20' : 'text-foreground/35'}`}>
              Lower Middle Market Private Equity
            </span>
          </div>

          {/* Center: Navigation */}
          <nav className="flex items-center gap-3 md:gap-4 flex-wrap">
            {navLinks.map((item, i) => (
              <span key={item.path} className="flex items-center gap-3 md:gap-4">
                <Link to={item.path} className={linkClass}>
                  {item.label}
                </Link>
                {i < navLinks.length - 1 && (
                  <span className={`text-[8px] ${isDark ? 'text-primary-foreground/10' : 'text-foreground/20'}`}>·</span>
                )}
              </span>
            ))}
          </nav>

          {/* Right: Region + Email */}
          <div className="flex items-center gap-3 shrink-0">
            <a
              href={`mailto:${email}`}
              className={`font-sans text-[11px] tracking-[0.04em] transition-colors duration-200 ${isDark ? 'text-primary-foreground/35 hover:text-gold' : 'text-foreground/45 hover:text-gold'}`}
            >
              {email}
            </a>
            <span className={`h-3 w-px ${isDark ? 'bg-primary-foreground/10' : 'bg-foreground/15'}`} />
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
              {otherRegion === 'india' ? 'India' : 'US'}
            </Link>
          </div>
        </div>

        {/* Divider */}
        <div className={`h-px ${isDark ? 'bg-primary-foreground/[0.06]' : 'bg-foreground/[0.08]'}`} />

        {/* Row 2: Copyright + Legal */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1.5 py-3">
          <p className={`font-sans text-[10px] tracking-[0.06em] ${isDark ? 'text-primary-foreground/18' : 'text-foreground/30'}`}>
            &copy; {year} Cruxway LLC. All rights reserved.
          </p>
          <div className="flex items-center gap-3">
            <span className={`font-sans text-[10px] tracking-[0.06em] cursor-pointer transition-colors duration-200 ${isDark ? 'text-primary-foreground/15 hover:text-primary-foreground/30' : 'text-foreground/25 hover:text-foreground/45'}`}>
              Privacy Policy
            </span>
            <span className={`font-sans text-[10px] tracking-[0.06em] cursor-pointer transition-colors duration-200 ${isDark ? 'text-primary-foreground/15 hover:text-primary-foreground/30' : 'text-foreground/25 hover:text-foreground/45'}`}>
              Terms
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
