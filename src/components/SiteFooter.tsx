import { Link } from 'react-router-dom';
import { useRegion } from '@/contexts/RegionContext';

const SiteFooter = () => {
  const year = new Date().getFullYear();
  const { region } = useRegion();
  const prefix = `/${region}`;

  const links = [
    { label: 'About', path: `${prefix}/about` },
    { label: 'Team', path: `${prefix}/team` },
    { label: 'Contact', path: `${prefix}/contact` },
    { label: 'Investor Login', path: '/investor-login' },
  ];

  return (
    <footer className="bg-prussian">
      {/* Top rule */}
      <div className="h-px bg-primary-foreground/4" />

      <div className="max-w-[1120px] mx-auto px-6 md:px-12 lg:px-20 py-16 md:py-20">
        {/* Top */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-10 md:gap-20 mb-16">
          <div>
            <p className="font-serif text-xl text-primary-foreground tracking-[-0.02em]">Cruxway</p>
            <div className="w-8 h-px bg-gold/20 mt-4" />
          </div>

          <div className="grid grid-cols-2 gap-x-14 gap-y-3">
            {links.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="font-sans text-[10px] font-medium uppercase tracking-[0.18em] text-primary-foreground/20 hover:text-primary-foreground/45 transition-colors duration-300"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-primary-foreground/4 mb-8" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
          <p className="font-sans text-[10px] text-primary-foreground/15 tracking-[0.08em]">
            &copy; {year} Cruxway LLC. All rights reserved.
          </p>
          <p className="font-sans text-[9px] text-primary-foreground/10 tracking-[0.15em] uppercase">
            Privileged &amp; Confidential
          </p>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
