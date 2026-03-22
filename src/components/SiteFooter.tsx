import { Link } from 'react-router-dom';
import { useRegion } from '@/contexts/RegionContext';
import { FadeIn, GoldRule } from '@/components/ui/Section';

const SiteFooter = () => {
  const year = new Date().getFullYear();
  const { region, setRegion } = useRegion();
  const prefix = `/${region}`;
  const otherRegion = region === 'india' ? 'us' : 'india';

  const links = [
    { label: 'About Us', path: `${prefix}/about` },
    { label: 'Investment Criteria', path: `${prefix}/criteria` },
    { label: 'Team', path: `${prefix}/team` },
    { label: 'Contact', path: `${prefix}/contact` },
    { label: 'Investor Login', path: '/investor-login' },
  ];

  return (
    <footer className="bg-primary relative overflow-hidden">
      <div className="h-px bg-primary-foreground/[0.04]" />

      <div className="max-w-[1080px] mx-auto px-5 md:px-10 lg:px-16 py-8 md:py-12 relative z-10">
        <FadeIn>
          <div className="flex flex-col md:flex-row justify-between items-start gap-5 md:gap-14 mb-8">
            <div>
              <p className="font-serif text-xl text-primary-foreground tracking-[-0.02em]">Cruxway</p>
              <GoldRule className="mt-3" />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-x-10 gap-y-2.5">
              {links.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="font-sans text-[10px] font-medium uppercase tracking-[0.16em] text-primary-foreground/15 hover:text-primary-foreground/35 transition-colors duration-300"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </FadeIn>

        <div className="h-px bg-primary-foreground/[0.04] mb-4" />

        <FadeIn delay={0.08}>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-1.5">
            <p className="font-sans text-[10px] text-primary-foreground/10 tracking-[0.06em]">
              &copy; {year} Cruxway LLC. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <Link
                to={`/${otherRegion}`}
                onClick={() => setRegion(otherRegion)}
                className="font-sans text-[10px] font-medium uppercase tracking-[0.16em] text-primary-foreground/15 hover:text-primary-foreground/35 transition-colors duration-300"
              >
                Switch to {otherRegion === 'india' ? 'India' : 'United States'}
              </Link>
              <span className="w-px h-2.5 bg-primary-foreground/[0.06]" />
              <p className="font-sans text-[8px] text-primary-foreground/[0.06] tracking-[0.12em] uppercase">
                Privileged &amp; Confidential
              </p>
            </div>
          </div>
        </FadeIn>
      </div>
    </footer>
  );
};

export default SiteFooter;
