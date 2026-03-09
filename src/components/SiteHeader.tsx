import { Link, useLocation } from 'react-router-dom';
import { useRegion } from '@/contexts/RegionContext';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const SiteHeader = () => {
  const { region, setRegion } = useRegion();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const prefix = `/${region}`;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const navItems = [
    { label: 'Home', path: prefix },
    { label: 'About', path: `${prefix}/about` },
    { label: 'Team', path: `${prefix}/team` },
    { label: 'Contact', path: `${prefix}/contact` },
  ];

  const isActive = (path: string) => location.pathname === path;
  const otherRegion = region === 'india' ? 'us' : 'india';

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          scrolled
            ? 'bg-prussian/[0.97] backdrop-blur-lg'
            : 'bg-transparent'
        }`}
      >
        {/* Top accent line */}
        <div className="h-[1px] bg-gradient-to-r from-transparent via-gold/15 to-transparent" />

        <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link
              to={prefix}
              className="font-serif text-xl md:text-[1.4rem] text-primary-foreground tracking-[-0.02em] transition-opacity hover:opacity-75"
            >
              Cruxway
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center">
              <div className="flex items-center gap-8 xl:gap-10">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`relative font-sans text-[11px] font-medium uppercase tracking-[0.16em] py-1 transition-all duration-300 ${
                      isActive(item.path)
                        ? 'text-primary-foreground'
                        : 'text-primary-foreground/35 hover:text-primary-foreground/65'
                    }`}
                  >
                    {item.label}
                    {isActive(item.path) && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute -bottom-1 left-0 right-0 h-[1px] bg-gold/40"
                        transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                      />
                    )}
                  </Link>
                ))}
              </div>

              <div className="w-px h-4 bg-primary-foreground/8 mx-8" />

              <Link
                to={`/${otherRegion}`}
                onClick={() => setRegion(otherRegion)}
                className="font-sans text-[11px] font-medium uppercase tracking-[0.16em] text-primary-foreground/20 hover:text-primary-foreground/45 transition-colors duration-300 mr-8"
              >
                {otherRegion === 'india' ? 'India' : 'US'}
              </Link>

              <Link
                to="/investor-login"
                className="font-sans text-[10px] font-medium uppercase tracking-[0.18em] px-6 py-2.5 border border-gold/20 text-gold/70 hover:border-gold/40 hover:text-gold transition-all duration-400"
              >
                Investor Login
              </Link>
            </nav>

            {/* Mobile Toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden text-primary-foreground/50 hover:text-primary-foreground transition-colors p-2 -mr-2"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={20} strokeWidth={1.2} /> : <Menu size={20} strokeWidth={1.2} />}
            </button>
          </div>
        </div>

        {/* Bottom border when scrolled */}
        {scrolled && <div className="h-px bg-primary-foreground/5" />}
      </header>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 bg-prussian flex flex-col"
          >
            {/* Spacer for header */}
            <div className="h-16" />

            <div className="flex-1 flex flex-col justify-center items-center px-8">
              <nav className="flex flex-col items-center gap-7">
                {navItems.map((item, i) => (
                  <motion.div
                    key={item.path}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 + i * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Link
                      to={item.path}
                      className={`font-serif text-[1.75rem] tracking-[-0.02em] transition-colors duration-300 ${
                        isActive(item.path) ? 'text-primary-foreground' : 'text-primary-foreground/30 active:text-primary-foreground/60'
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
                transition={{ delay: 0.35, duration: 0.5 }}
                className="flex flex-col items-center gap-5 mt-10 pt-8 border-t border-primary-foreground/6 w-48"
              >
                <Link
                  to={`/${otherRegion}`}
                  onClick={() => setRegion(otherRegion)}
                  className="font-sans text-[10px] font-medium uppercase tracking-[0.2em] text-primary-foreground/25 active:text-primary-foreground/50"
                >
                  Switch to {otherRegion === 'india' ? 'India' : 'United States'}
                </Link>
                <Link
                  to="/investor-login"
                  className="font-sans text-[10px] font-medium uppercase tracking-[0.18em] px-8 py-3 border border-gold/20 text-gold/60 active:text-gold/80"
                >
                  Investor Login
                </Link>
              </motion.div>
            </div>

            {/* Bottom */}
            <div className="pb-8 text-center">
              <p className="font-sans text-[9px] text-primary-foreground/10 tracking-[0.2em] uppercase">
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
