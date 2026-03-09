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
      <div className="h-px bg-primary-foreground/[0.04]" />

      <div className="max-w-[1080px] mx-auto px-5 md:px-10 lg:px-16 py-10 md:py-14">
        <div className="flex flex-col md:flex-row justify-between items-start gap-6 md:gap-16 mb-10">
          <div>
            <p className="font-serif text-lg text-primary-foreground tracking-[-0.02em]">Cruxway</p>
            <div className="w-6 h-px bg-gold/15 mt-3" />
          </div>

          <div className="grid grid-cols-2 gap-x-10 gap-y-2.5">
            {links.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="font-sans text-[9px] font-medium uppercase tracking-[0.16em] text-primary-foreground/15 hover:text-primary-foreground/35 transition-colors duration-300"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="h-px bg-primary-foreground/[0.04] mb-5" />

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-1.5">
          <p className="font-sans text-[9px] text-primary-foreground/10 tracking-[0.06em]">
            &copy; {year} Cruxway LLC. All rights reserved.
          </p>
          <p className="font-sans text-[8px] text-primary-foreground/[0.06] tracking-[0.12em] uppercase">
            Privileged &amp; Confidential
          </p>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
