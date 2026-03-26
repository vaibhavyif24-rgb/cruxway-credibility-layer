import { Link, useLocation } from 'react-router-dom';
import { useRegion } from '@/contexts/RegionContext';
import { useTheme } from '@/contexts/ThemeContext';
import { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';

const SiteHeader = () => {
  const { region, setRegion } = useRegion();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const prefix = `/${region}`;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

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
          <nav className="hidden lg:flex items-center">
            <div className="flex items-center gap-5 xl:gap-7">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative font-sans text-[11.5px] font-medium uppercase tracking-[0.12em] py-1 transition-all duration-300 active:scale-95 active:text-gold/70 ${
                    isActive(item.path)
                      ? 'text-primary-foreground'
                      : 'text-primary-foreground/40 hover:text-primary-foreground/70'
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

          {/* Mobile/Tablet: theme toggle + Investor Login only */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="text-primary-foreground/30 hover:text-primary-foreground/60 transition-colors p-2"
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              {theme === 'light' ? <Moon size={16} strokeWidth={1.3} /> : <Sun size={16} strokeWidth={1.3} />}
            </button>
            <Link
              to="/investor-login"
              className="btn-premium font-sans text-[9px] font-medium uppercase tracking-[0.14em] px-4 py-2 border border-gold/12 text-gold/45 hover:border-gold/30 hover:text-gold/75 transition-all duration-300"
            >
              Investor Login
            </Link>
          </div>
        </div>
      </div>

      <div className={`h-px transition-opacity duration-300 ${scrolled ? 'bg-primary-foreground/[0.05] opacity-100' : 'opacity-0'}`} />
    </header>
  );
};

export default SiteHeader;
