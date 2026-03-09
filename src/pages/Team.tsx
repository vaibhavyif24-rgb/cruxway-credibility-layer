import { useRegion } from '@/contexts/RegionContext';
import { Section, SectionLabel, FadeIn, GoldRule, HeroDivider } from '@/components/ui/Section';

interface TeamMember {
  name: string;
  role: string;
  bio: string[];
}

const usTeam: TeamMember[] = [
  {
    name: 'Harin Gupta',
    role: 'Co-Founder',
    bio: [
      'More than a decade of experience investing in and operating companies in the business and consumer sectors.',
      'Invested through the Business Services Group at Warburg Pincus, a global private equity firm with $85bn+ AUM.',
      'Served on the Board of Directors for RMS Energy, a provider of services for high-voltage electrical equipment.',
      'Successfully helped launch and scale Honest Hospitality Group from ideation to 100+ locations globally; serves on the Board of Directors.',
      'Began his finance career at leading investment banks including JP Morgan, Evercore, and Deutsche Bank.',
    ],
  },
  {
    name: 'Benson Zhang',
    role: 'Co-Founder',
    bio: [
      'Over a decade of experience in finance and private equity investing across technology and business services sectors.',
      "Most recently invested through BlackRock's flagship direct private equity group, where he led the sale of BlackRock's stake in Authentic.",
      'At HGGC, led the investments in IDERA and RPX where he served as a board observer.',
      'Began his career at Credit Suisse in the Technology Investment Banking Group, closing 7 deals totaling $30 billion in deal value.',
    ],
  },
];

const indiaTeam: TeamMember[] = [
  {
    name: 'Vaibhav Sharma',
    role: 'Partner, India',
    bio: [
      'Three-time founder with hands-on entrepreneurial experience, including Cleen.pet and Studyenclave.com.',
      'Extensive on-ground consulting experience across strategy, market entry, and operations for growth-stage businesses in India.',
      'Operated within family offices and early-stage investment funds including Swishin Ventures.',
      'Previous experience includes strategic roles at NITI Aayog, advising on national-level policy and economic development initiatives.',
      'Led investments in companies including Lohum, Porter, Tractor Factory, BytePe, Waaree Solar, and Snapmint.',
      'Frugal science engineer and recipient of a research grant from Stanford University.',
    ],
  },
];

const TeamCard = ({ member, index }: { member: TeamMember; index: number }) => (
  <FadeIn delay={index * 0.06}>
    <div className="py-8 md:py-10 border-b border-foreground/[0.06] last:border-b-0">
      <div className="grid md:grid-cols-12 gap-4 md:gap-10">
        {/* Identity */}
        <div className="md:col-span-3">
          <div className="md:sticky md:top-24">
            <h3 className="font-serif text-[1.25rem] md:text-[1.4rem] text-foreground tracking-[-0.02em]">
              {member.name}
            </h3>
            <p className="font-sans text-[9px] font-medium uppercase tracking-[0.2em] text-gold-dim mt-1.5">
              {member.role}
            </p>
            <div className="w-6 h-px bg-gold/15 mt-4 hidden md:block" />
          </div>
        </div>

        {/* Bio */}
        <div className="md:col-span-9">
          <ul className="space-y-2.5">
            {member.bio.map((line, i) => (
              <li
                key={i}
                className="font-sans text-[13px] md:text-[13.5px] text-muted-foreground leading-[1.7] flex gap-3 items-start"
              >
                <span className="shrink-0 mt-[9px] w-2.5 h-px bg-gold/20" />
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  </FadeIn>
);

const Team = () => {
  const { region } = useRegion();
  const isIndia = region === 'india';
  const regionalTeam = isIndia ? indiaTeam : [];

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-prussian text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/50 via-transparent to-navy-deep/15 pointer-events-none" />
        <div className="relative max-w-[1080px] mx-auto px-5 md:px-10 lg:px-16 pt-24 pb-14 md:pt-32 md:pb-20 lg:pt-36 lg:pb-24">
          <FadeIn><SectionLabel light>Leadership</SectionLabel></FadeIn>
          <FadeIn delay={0.08}>
            <h1 className="font-serif text-[clamp(1.75rem,4.5vw,3rem)] text-primary-foreground max-w-[600px] leading-[1.12] tracking-[-0.025em]">
              Operators &amp; Investors Who Understand Founder-Led&nbsp;Businesses
            </h1>
          </FadeIn>
          <FadeIn delay={0.16}><GoldRule className="mt-6 mb-5" /></FadeIn>
          <FadeIn delay={0.22}>
            <p className="font-sans text-[14px] text-primary-foreground/30 max-w-[440px] leading-[1.75]">
              Our team combines decades of investing and operating experience across private equity, investment banking, and high-growth businesses.
            </p>
          </FadeIn>
        </div>
        <HeroDivider />
      </section>

      {/* Founders */}
      <Section>
        <div className="mb-10 md:mb-12">
          <FadeIn>
            <SectionLabel>Founders</SectionLabel>
            <h2 className="font-serif text-[clamp(1.35rem,2.5vw,2rem)] text-foreground leading-[1.15]">
              Leadership
            </h2>
            <GoldRule className="mt-4" />
          </FadeIn>
        </div>
        <div className="border-t border-foreground/[0.06]">
          {usTeam.map((m, i) => (
            <TeamCard key={m.name} member={m} index={i} />
          ))}
        </div>
      </Section>

      {/* Regional Team */}
      {regionalTeam.length > 0 && (
        <section className="bg-cream px-5 md:px-10 lg:px-16 py-14 md:py-20 lg:py-24">
          <div className="max-w-[1080px] mx-auto">
            <div className="mb-10 md:mb-12">
              <FadeIn>
                <SectionLabel>India</SectionLabel>
                <h2 className="font-serif text-[clamp(1.35rem,2.5vw,2rem)] text-foreground leading-[1.15]">
                  Regional Partners
                </h2>
                <GoldRule className="mt-4" />
              </FadeIn>
            </div>
            <div className="border-t border-foreground/[0.06]">
              {regionalTeam.map((m, i) => (
                <TeamCard key={m.name} member={m} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Advisors */}
      <Section>
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-16">
          <div className="lg:col-span-4">
            <FadeIn>
              <SectionLabel>Advisors &amp; Operating Partners</SectionLabel>
              <h2 className="font-serif text-[clamp(1.35rem,2.5vw,2rem)] text-foreground leading-[1.15]">
                Extended Network
              </h2>
              <GoldRule className="mt-5" />
            </FadeIn>
          </div>
          <div className="lg:col-span-8 lg:pt-0.5">
            <FadeIn delay={0.08}>
              <p className="font-sans text-[13.5px] text-muted-foreground leading-[1.8]">
                We bring an established bench of advisors and operators who help us execute with speed, rigor, and real-world expertise. Details on our advisory network are shared selectively with prospective partners.
              </p>
            </FadeIn>
          </div>
        </div>
      </Section>
    </div>
  );
};

export default Team;
