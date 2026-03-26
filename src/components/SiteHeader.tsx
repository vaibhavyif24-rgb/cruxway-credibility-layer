import { Link, useLocation } from 'react-router-dom';
import { useRegion } from '@/contexts/RegionContext';
import { useTheme } from '@/contexts/ThemeContext';
import { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const SiteHeader = () => {
  const { region, setRegion } = useRegion();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const prefix = `/${region}`;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const navItems = [
    { label: 'Home', path: prefix },
    { label: 'About Us', path: `${prefix}/about` },
    { label: 'Investment Criteria', path: `${prefix}/criteria` },
    { label: 'Team', path: `${prefix}/team` },
    { label: 'Contact', path: `${prefix}/contact` },
  ];

  const isActive = (path: string) => location.pathname === path;
  const otherRegion = region === 'india' ? 'us' : 'india';

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 hero-gradient-animated transition-all duration-300 ${
          scrolled ? 'shadow-[0_2px_16px_-2px_hsl(210_60%_4%/0.5)]' : ''
        }`}
      >
        <div className="h-px bg-gradient-to-r from-transparent via-gold/8 to-transparent" />

        <div className="max-w-[1200px] mx-auto px-5 md:px-10 lg:px-16">
          <div className="flex items-center justify-between h-16 md:h-[72px]">
            <Link
              to={prefix}
              className="font-serif text-3xl md:text-4xl text-primary-foreground tracking-[-0.02em] transition-opacity hover:opacity-75 font-bold"
            >
              Cruxway
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center">
              <div className="flex items-center gap-4 lg:gap-5 xl:gap-7">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`relative font-sans text-[11.5px] font-medium uppercase tracking-[0.12em] py-1.5 px-2.5 rounded-sm transition-all duration-200 active:scale-[0.93] active:bg-gold/[0.06] ${
                      isActive(item.path)
                        ? 'text-primary-foreground bg-primary-foreground/[0.04]'
                        : 'text-primary-foreground/40 hover:text-primary-foreground/70 hover:bg-primary-foreground/[0.03]'
                    }`}
                  >
                    {item.label}
                    {isActive(item.path) && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute -bottom-0.5 left-0 right-0 h-px bg-gold/30"
                        transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                      />
                    )}
                  </Link>
                ))}
              </div>

              <div className="w-px h-3.5 bg-primary-foreground/[0.06] mx-6" />

              {/* Dark mode toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 text-primary-foreground/40 hover:text-primary-foreground/70 transition-colors duration-300 mr-4"
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
                className="btn-premium font-sans text-[10px] font-medium uppercase tracking-[0.16em] px-5 py-2.5 border border-gold/12 text-gold/55 hover:border-gold/30 hover:text-gold/85 transition-all duration-300"
              >
                Investor Login
              </Link>
            </nav>

            {/* Mobile controls */}
            <div className="lg:hidden flex items-center gap-2">
              <button
                onClick={toggleTheme}
                className="text-primary-foreground/30 hover:text-primary-foreground/60 transition-colors p-2"
                aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
              >
                {theme === 'light' ? <Moon size={16} strokeWidth={1.3} /> : <Sun size={16} strokeWidth={1.3} />}
              </button>
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="text-primary-foreground/40 hover:text-primary-foreground transition-colors p-2 -mr-2"
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X size={18} strokeWidth={1.3} /> : <Menu size={18} strokeWidth={1.3} />}
              </button>
            </div>
          </div>
        </div>

        <div className={`h-px transition-opacity duration-300 ${scrolled ? 'bg-primary-foreground/[0.05] opacity-100' : 'opacity-0'}`} />
      </header>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 hero-gradient-animated flex flex-col"
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
                        isActive(item.path) ? 'text-primary-foreground' : 'text-primary-foreground/25'
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
                className="flex flex-col items-center gap-4 mt-8 pt-6 border-t border-primary-foreground/[0.05] w-48"
              >
                <Link
                  to={`/${otherRegion}`}
                  onClick={() => setRegion(otherRegion)}
                  className="font-sans text-[10px] font-medium uppercase tracking-[0.2em] text-primary-foreground/20 active:text-primary-foreground/45"
                >
                  Switch to {otherRegion === 'india' ? 'India' : 'United States'}
                </Link>
                <Link
                  to="/investor-login"
                  className="btn-premium font-sans text-[10px] font-medium uppercase tracking-[0.16em] px-7 py-2.5 border border-gold/12 text-gold/45 active:text-gold/70"
                >
                  Investor Login
                </Link>
              </motion.div>
            </div>

            <div className="pb-6 text-center">
              <p className="font-sans text-[8px] text-primary-foreground/[0.06] tracking-[0.2em] uppercase">
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
