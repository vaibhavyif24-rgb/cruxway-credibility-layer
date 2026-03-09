import { Link } from 'react-router-dom';
import { useRegion } from '@/contexts/RegionContext';

const SiteFooter = () => {
  const year = new Date().getFullYear();
  const { region } = useRegion();
  const prefix = `/${region}`;

  return (
    <footer className="bg-prussian border-t border-primary-foreground/5">
      <div className="max-w-7xl mx-auto px-5 md:px-10 lg:px-16 py-14 md:py-20">
        {/* Top section */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-10 md:gap-20 mb-14">
          <div>
            <p className="font-serif text-2xl text-primary-foreground tracking-tight">Cruxway</p>
            <div className="w-6 h-px bg-gold/30 mt-3" />
          </div>

          <div className="grid grid-cols-2 gap-x-16 gap-y-4">
            {[
              { label: 'About', path: `${prefix}/about` },
              { label: 'Team', path: `${prefix}/team` },
              { label: 'Contact', path: `${prefix}/contact` },
              { label: 'Investor Login', path: '/investor-login' },
            ].map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="font-sans text-caption uppercase text-primary-foreground/25 hover:text-primary-foreground/50 transition-colors duration-300"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-primary-foreground/5 mb-8" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
          <p className="font-sans text-[10px] text-primary-foreground/20 tracking-wider">
            &copy; {year} Cruxway LLC. All rights reserved.
          </p>
          <p className="font-sans text-[10px] text-primary-foreground/15 tracking-wider uppercase">
            Privileged &amp; Confidential
          </p>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
