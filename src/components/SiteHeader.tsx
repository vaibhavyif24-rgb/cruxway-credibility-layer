import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useRegion } from '@/contexts/RegionContext';
import { useTheme } from '@/contexts/ThemeContext';
import { useState, useEffect, useRef } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence, useScroll } from 'framer-motion';

/* ─── Minimal SVG flag icons ─── */
const IndiaFlag = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size * 0.67} viewBox="0 0 24 16" className="rounded-[2px]" style={{ border: '0.5px solid rgba(255,255,255,0.08)' }}>
    <rect width="24" height="5.33" fill="#FF9933" />
    <rect y="5.33" width="24" height="5.34" fill="#FFFFFF" />
    <rect y="10.67" width="24" height="5.33" fill="#138808" />
    <circle cx="12" cy="8" r="1.8" fill="none" stroke="#000080" strokeWidth="0.4" />
  </svg>
);

const USFlag = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size * 0.67} viewBox="0 0 24 16" className="rounded-[2px]" style={{ border: '0.5px solid rgba(255,255,255,0.08)' }}>
    <rect width="24" height="16" fill="#B22234" />
    {[1, 3, 5, 7, 9, 11].map(i => (
      <rect key={i} y={i * (16 / 13)} width="24" height={16 / 13} fill="#FFFFFF" />
    ))}
    <rect width="9.6" height="8.6" fill="#3C3B6E" />
  </svg>
);

const FlagForRegion = ({ region, size }: { region: string; size?: number }) =>
  region === 'india' ? <IndiaFlag size={size} /> : <USFlag size={size} />;

const SiteHeader = () => {
  const { region, setRegion } = useRegion();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [flagOpen, setFlagOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const flagRef = useRef<HTMLDivElement>(null);
  const prefix = `/${region}`;
  const isDark = theme === 'dark';

  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); setFlagOpen(false); }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  useEffect(() => {
    if (!flagOpen) return;
    const handler = (e: MouseEvent) => {
      if (flagRef.current && !flagRef.current.contains(e.target as Node)) setFlagOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [flagOpen]);

  const navItems = [
    { label: 'Home', path: prefix },
    { label: 'Our Principles', path: `${prefix}/principles` },
    { label: 'Our Focus', path: `${prefix}/focus` },
    { label: 'Our Playbook', path: `${prefix}/playbook` },
    { label: 'Team', path: `${prefix}/team` },
    { label: 'Contact', path: `${prefix}/contact` },
  ];

  const isActive = (path: string) => location.pathname === path;
  const otherRegion = region === 'india' ? 'us' : 'india';

  const handleRegionSwitch = (target: 'india' | 'us') => {
    setRegion(target);
    navigate(`/${target}`);
    setFlagOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isDark
            ? `hero-gradient-animated ${scrolled ? 'shadow-[0_2px_16px_-2px_hsl(228_55%_6%/0.5)]' : ''}`
            : `bg-white/90 backdrop-blur-xl ${scrolled ? 'shadow-[0_2px_20px_-4px_rgba(0,0,0,0.06)] border-b border-[hsl(38,20%,88%)]' : 'border-b border-transparent'}`
        }`}
      >
        {/* Scroll progress bar */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-[2px] bg-gold/40 origin-left z-50"
          style={{ scaleX: scrollYProgress }}
        />

        {/* Animated shimmer line */}
        <div
          className="h-px w-full"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, hsl(40, 65%, 44%, 0.25) 50%, transparent 100%)',
            backgroundSize: '200% 100%',
            animation: 'header-shimmer 4s linear infinite',
          }}
        />

        <div className="max-w-[1200px] mx-auto px-5 md:px-10 lg:px-16">
          <div className="flex items-center justify-between h-16 md:h-[72px]">
            <Link
              to="/"
              className={`font-serif text-3xl md:text-4xl tracking-[-0.02em] transition-colors duration-300 font-normal ${
                isDark
                  ? 'text-primary-foreground hover:opacity-75'
                  : 'text-[hsl(228,58%,18%)] hover:text-gold'
              }`}
            >
              Cruxway
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center">
              <div className="flex items-center gap-3 xl:gap-5">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`relative font-sans text-[10px] font-medium uppercase tracking-[0.08em] py-1.5 px-1.5 rounded-sm transition-all duration-200 active:scale-[0.93] active:bg-gold/[0.06] ${
                      isActive(item.path)
                        ? isDark
                          ? 'text-primary-foreground bg-primary-foreground/[0.04]'
                          : 'text-[hsl(228,58%,18%)] bg-foreground/[0.03]'
                        : isDark
                          ? 'text-primary-foreground/40 hover:text-primary-foreground/70 hover:bg-primary-foreground/[0.03]'
                          : 'text-[hsl(228,8%,46%)] hover:text-foreground hover:bg-foreground/[0.02]'
                    }`}
                  >
                    {item.label}
                    {isActive(item.path) && (
                      <motion.span
                        layoutId="nav-underline"
                        className={`absolute -bottom-0.5 left-0 right-0 h-px ${isDark ? 'bg-gold/30' : 'bg-[hsl(228,45%,45%)]/30'}`}
                        transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                      />
                    )}
                  </Link>
                ))}
              </div>

              <div className={`w-px h-3.5 mx-4 ${isDark ? 'bg-primary-foreground/[0.06]' : 'bg-border/60'}`} />

              {/* Country Flag Switcher */}
              {region && (
                <div ref={flagRef} className="relative mr-3">
                  <button
                    onClick={() => setFlagOpen(!flagOpen)}
                    className={`flex items-center gap-1.5 p-1.5 rounded-sm transition-all duration-200 ${
                      isDark
                        ? 'text-primary-foreground/40 hover:text-primary-foreground/70 hover:bg-primary-foreground/[0.03]'
                        : 'text-muted-foreground hover:text-foreground hover:bg-foreground/[0.02]'
                    }`}
                    aria-label="Switch country"
                  >
                    <FlagForRegion region={region} size={16} />
                    <svg width="8" height="5" viewBox="0 0 8 5" fill="none" className="opacity-40">
                      <path d="M1 1L4 4L7 1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  <AnimatePresence>
                    {flagOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -4, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -4, scale: 0.97 }}
                        transition={{ duration: 0.15, ease: [0.22, 1, 0.36, 1] }}
                        className={`absolute top-full right-0 mt-1.5 min-w-[140px] rounded-md border shadow-lg ${
                          isDark
                            ? 'border-primary-foreground/[0.06] shadow-[0_8px_24px_-6px_rgba(0,0,0,0.4)]'
                            : 'border-border bg-white shadow-lg'
                        }`}
                        style={isDark ? { background: 'hsl(228, 48%, 10%)' } : undefined}
                      >
                        {(['india', 'us'] as const).map((r) => (
                          <button
                            key={r}
                            onClick={() => handleRegionSwitch(r)}
                            className={`flex items-center gap-2.5 w-full px-3 py-2 text-left transition-colors duration-150 first:rounded-t-md last:rounded-b-md ${
                              isDark
                                ? region === r
                                  ? 'bg-primary-foreground/[0.06] text-primary-foreground/80'
                                  : 'text-primary-foreground/40 hover:text-primary-foreground/70 hover:bg-primary-foreground/[0.03]'
                                : region === r
                                  ? 'bg-foreground/[0.04] text-foreground'
                                  : 'text-muted-foreground hover:text-foreground hover:bg-foreground/[0.02]'
                            }`}
                          >
                            <FlagForRegion region={r} size={14} />
                            <span className="font-sans text-[10px] font-medium uppercase tracking-[0.12em]">
                              {r === 'india' ? 'India' : 'United States'}
                            </span>
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}

              {/* Dark mode toggle */}
              <button
                onClick={toggleTheme}
                className={`p-2 transition-colors duration-300 mr-4 ${
                  isDark
                    ? 'text-primary-foreground/40 hover:text-primary-foreground/70'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
                aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
              >
                {theme === 'light' ? (
                  <Moon size={18} strokeWidth={1.5} />
                ) : (
                  <Sun size={18} strokeWidth={1.5} />
                )}
              </button>

              <Link
                to="/investor-login"
                className={`btn-premium font-sans text-[10px] font-medium uppercase tracking-[0.16em] px-5 py-2.5 border transition-all duration-300 ${
                  isDark
                    ? 'border-gold/12 text-gold/55 hover:border-gold/30 hover:text-gold/85'
                    : 'border-gold/20 text-gold hover:border-gold/40 hover:text-foreground'
                }`}
              >
                Investor Login
              </Link>
            </nav>

            {/* Mobile controls */}
            <div className="lg:hidden flex items-center gap-2">
              <button
                onClick={toggleTheme}
                className={`p-2 transition-colors ${
                  isDark
                    ? 'text-primary-foreground/30 hover:text-primary-foreground/60'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
                aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
              >
                {theme === 'light' ? <Moon size={16} strokeWidth={1.3} /> : <Sun size={16} strokeWidth={1.3} />}
              </button>
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className={`p-2 -mr-2 transition-colors ${
                  isDark
                    ? 'text-primary-foreground/40 hover:text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X size={18} strokeWidth={1.3} /> : <Menu size={18} strokeWidth={1.3} />}
              </button>
            </div>
          </div>
        </div>

        <div className={`h-px transition-opacity duration-300 ${
          scrolled
            ? isDark ? 'bg-primary-foreground/[0.05] opacity-100' : 'bg-border/40 opacity-100'
            : 'opacity-0'
        }`} />
      </header>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className={`fixed inset-0 z-40 flex flex-col ${isDark ? 'hero-gradient-animated' : 'bg-white'}`}
          >
            <div className="h-14" />

            <div className="flex-1 flex flex-col justify-center items-center px-8">
              <nav className="flex flex-col items-center gap-5">
                {navItems.map((item, i) => (
                  <motion.div
                    key={item.path}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.03 + i * 0.04, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Link
                      to={item.path}
                      className={`font-serif text-[1.5rem] tracking-[-0.02em] transition-all duration-200 active:scale-95 active:text-gold/60 ${
                        isActive(item.path)
                          ? isDark ? 'text-primary-foreground' : 'text-foreground'
                          : isDark ? 'text-primary-foreground/25' : 'text-muted-foreground'
                      }`}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.25, duration: 0.35 }}
                className={`flex flex-col items-center gap-4 mt-8 pt-6 border-t w-48 ${
                  isDark ? 'border-primary-foreground/[0.05]' : 'border-border/40'
                }`}
              >
                {region && (
                  <button
                    onClick={() => { handleRegionSwitch(otherRegion as 'india' | 'us'); setMobileOpen(false); }}
                    className={`font-sans text-[10px] font-medium uppercase tracking-[0.16em] transition-colors duration-200 py-1 ${
                      isDark
                        ? 'text-primary-foreground/25 active:text-primary-foreground/50'
                        : 'text-muted-foreground active:text-foreground'
                    }`}
                  >
                    Switch to {otherRegion === 'india' ? 'India' : 'United States'}
                  </button>
                )}
                <Link
                  to="/investor-login"
                  className={`btn-premium font-sans text-[10px] font-medium uppercase tracking-[0.16em] px-7 py-2.5 border ${
                    isDark
                      ? 'border-gold/12 text-gold/45 active:text-gold/70'
                      : 'border-gold/20 text-gold active:text-foreground'
                  }`}
                >
                  Investor Login
                </Link>
              </motion.div>
            </div>

            <div className="pb-6 text-center">
              <p className={`font-sans text-[8px] tracking-[0.2em] uppercase ${
                isDark ? 'text-primary-foreground/[0.06]' : 'text-muted-foreground/20'
              }`}>
                Privileged &amp; Confidential
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SiteHeader;