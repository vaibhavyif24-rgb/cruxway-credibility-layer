import { Link, useLocation } from 'react-router-dom';
import { useRegion } from '@/contexts/RegionContext';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const SiteHeader = () => {
  const { region, setRegion } = useRegion();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const prefix = `/${region}`;

  const navItems = [
    { label: 'Home', path: prefix },
    { label: 'About', path: `${prefix}/about` },
    { label: 'Team', path: `${prefix}/team` },
    { label: 'Contact', path: `${prefix}/contact` },
  ];

  const isActive = (path: string) => location.pathname === path;
  const otherRegion = region === 'india' ? 'us' : 'india';

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-primary/95 backdrop-blur-sm border-b border-primary-foreground/10">
      <div className="container-wide mx-auto px-6 md:px-12 lg:px-20">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link to={prefix} className="font-serif text-xl md:text-2xl text-primary-foreground tracking-tight">
            Cruxway
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`font-sans text-xs tracking-widest uppercase transition-colors duration-200 ${
                  isActive(item.path) ? 'text-primary-foreground' : 'text-primary-foreground/50 hover:text-primary-foreground/80'
                }`}
              >
                {item.label}
              </Link>
            ))}

            <div className="w-px h-5 bg-primary-foreground/20" />

            <Link
              to={`/${otherRegion}`}
              onClick={() => setRegion(otherRegion)}
              className="font-sans text-xs tracking-widest uppercase text-primary-foreground/40 hover:text-primary-foreground/70 transition-colors"
            >
              {otherRegion === 'india' ? 'India' : 'US'}
            </Link>

            <Link
              to="/investor-login"
              className="font-sans text-xs tracking-widest uppercase px-5 py-2 border border-gold-muted/40 text-gold-muted hover:bg-gold-muted/10 transition-all duration-200"
            >
              Investor Login
            </Link>
          </nav>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-primary-foreground"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="md:hidden bg-primary border-t border-primary-foreground/10">
          <div className="px-6 py-6 flex flex-col gap-5">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className={`font-sans text-sm tracking-widest uppercase ${
                  isActive(item.path) ? 'text-primary-foreground' : 'text-primary-foreground/50'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link
              to={`/${otherRegion}`}
              onClick={() => { setRegion(otherRegion); setMobileOpen(false); }}
              className="font-sans text-sm tracking-widest uppercase text-primary-foreground/40"
            >
              Switch to {otherRegion === 'india' ? 'India' : 'US'}
            </Link>
            <Link
              to="/investor-login"
              onClick={() => setMobileOpen(false)}
              className="font-sans text-sm tracking-widest uppercase text-gold-muted border border-gold-muted/40 px-5 py-3 text-center"
            >
              Investor Login
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default SiteHeader;
