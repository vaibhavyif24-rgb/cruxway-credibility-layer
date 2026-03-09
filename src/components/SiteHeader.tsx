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
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile nav on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-prussian/98 backdrop-blur-md shadow-[0_1px_0_0_hsl(var(--primary-foreground)/0.06)]'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 md:px-10 lg:px-16">
          <div className="flex items-center justify-between h-14 md:h-[4.5rem]">
            {/* Logo */}
            <Link
              to={prefix}
              className="font-serif text-[1.35rem] md:text-[1.5rem] text-primary-foreground tracking-tight transition-opacity hover:opacity-80"
            >
              Cruxway
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center">
              <div className="flex items-center gap-7 xl:gap-9">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`relative font-sans text-nav uppercase py-1 transition-colors duration-300 ${
                      isActive(item.path)
                        ? 'text-primary-foreground'
                        : 'text-primary-foreground/40 hover:text-primary-foreground/70'
                    }`}
                  >
                    {item.label}
                    {isActive(item.path) && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute -bottom-0.5 left-0 right-0 h-px bg-gold/50"
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />
                    )}
                  </Link>
                ))}
              </div>

              <div className="w-px h-4 bg-primary-foreground/10 mx-7" />

              <Link
                to={`/${otherRegion}`}
                onClick={() => setRegion(otherRegion)}
                className="font-sans text-nav uppercase text-primary-foreground/25 hover:text-primary-foreground/50 transition-colors duration-300 mr-7"
              >
                {otherRegion === 'india' ? 'India' : 'US'}
              </Link>

              <Link
                to="/investor-login"
                className="font-sans text-nav uppercase tracking-[0.15em] px-5 py-2 border border-gold/25 text-gold/80 hover:border-gold/50 hover:text-gold transition-all duration-300"
              >
                Investor Login
              </Link>
            </nav>

            {/* Mobile Toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden text-primary-foreground/60 hover:text-primary-foreground transition-colors p-1"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={18} strokeWidth={1.5} /> : <Menu size={18} strokeWidth={1.5} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-prussian"
          >
            <div className="flex flex-col justify-center items-center h-full px-6">
              <nav className="flex flex-col items-center gap-8">
                {navItems.map((item, i) => (
                  <motion.div
                    key={item.path}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08, duration: 0.4 }}
                  >
                    <Link
                      to={item.path}
                      className={`font-serif text-2xl transition-colors ${
                        isActive(item.path) ? 'text-primary-foreground' : 'text-primary-foreground/40'
                      }`}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.35, duration: 0.4 }}
                  className="flex flex-col items-center gap-6 mt-4 pt-6 border-t border-primary-foreground/10"
                >
                  <Link
                    to={`/${otherRegion}`}
                    onClick={() => setRegion(otherRegion)}
                    className="font-sans text-caption uppercase text-primary-foreground/30"
                  >
                    Switch to {otherRegion === 'india' ? 'India' : 'United States'}
                  </Link>
                  <Link
                    to="/investor-login"
                    className="font-sans text-caption uppercase tracking-[0.15em] px-8 py-3 border border-gold/25 text-gold/70"
                  >
                    Investor Login
                  </Link>
                </motion.div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SiteHeader;
