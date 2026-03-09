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
      'Three-time founder, including Cleen.pet and Studyenclave.com, with extensive experience operating within family offices and early-stage funds including Swishin Ventures.',
      'Brings deep on-ground consulting experience across strategy, market entry, and operations for growth-stage businesses in India.',
      'Previous experience includes strategic roles at NITI Aayog, advising on national-level policy and economic development initiatives.',
      'Led investments in companies including Lohum, Porter, Tractor Factory, BytePe, Waaree Solar, and Snapmint.',
      'Frugal science engineer and recipient of a research grant from Stanford University.',
    ],
  },
];

const TeamCard = ({ member, index }: { member: TeamMember; index: number }) => (
  <FadeIn delay={index * 0.08}>
    <div className="py-10 md:py-14 border-b border-foreground/[0.05] last:border-b-0">
      <div className="grid md:grid-cols-12 gap-6 md:gap-12">
        {/* Identity */}
        <div className="md:col-span-4">
          <div className="md:sticky md:top-32">
            <h3 className="font-serif text-[1.4rem] md:text-[1.6rem] text-foreground tracking-[-0.02em]">
              {member.name}
            </h3>
            <p className="font-sans text-[10px] font-medium uppercase tracking-[0.22em] text-gold-dim mt-2">
              {member.role}
            </p>
            <div className="w-8 h-px bg-gold/20 mt-5 hidden md:block" />
          </div>
        </div>

        {/* Bio */}
        <div className="md:col-span-8">
          <ul className="space-y-3.5">
            {member.bio.map((line, i) => (
              <li
                key={i}
                className="font-sans text-[13.5px] md:text-[14.5px] text-muted-foreground leading-[1.75] flex gap-4 items-start"
              >
                <span className="text-gold/30 mt-[7px] shrink-0 select-none w-3 h-px bg-gold/25 inline-block" />
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
        <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/60 via-transparent to-navy-deep/20 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_hsl(207_50%_18%/0.2)_0%,_transparent_60%)] pointer-events-none" />
        <div className="relative max-w-[1120px] mx-auto px-6 md:px-12 lg:px-20 pt-32 pb-20 md:pt-44 md:pb-28 lg:pt-48 lg:pb-36">
          <FadeIn><SectionLabel light>Leadership</SectionLabel></FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="font-serif text-[clamp(2rem,5vw,3.25rem)] text-primary-foreground max-w-[660px] leading-[1.1] tracking-[-0.03em]">
              Operators &amp; Investors Who Understand Founder-Led&nbsp;Businesses
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <GoldRule className="mt-8 mb-8" />
          </FadeIn>
          <FadeIn delay={0.3}>
            <p className="font-sans text-[15px] text-primary-foreground/35 max-w-[480px] leading-[1.8]">
              Our team combines decades of investing and operating experience across private equity, investment banking, and high-growth businesses.
            </p>
          </FadeIn>
        </div>
        <HeroDivider />
      </section>

      {/* Founders */}
      <Section>
        <div className="mb-12 md:mb-16">
          <FadeIn>
            <SectionLabel>Founders</SectionLabel>
            <h2 className="font-serif text-[clamp(1.5rem,3vw,2.25rem)] text-foreground leading-[1.15]">
              Leadership
            </h2>
            <GoldRule className="mt-5" />
          </FadeIn>
        </div>
        <div className="border-t border-foreground/[0.05]">
          {usTeam.map((m, i) => (
            <TeamCard key={m.name} member={m} index={i} />
          ))}
        </div>
      </Section>

      {/* Regional Team */}
      {regionalTeam.length > 0 && (
        <section className="bg-cream px-6 md:px-12 lg:px-20 py-20 md:py-28 lg:py-36">
          <div className="max-w-[1120px] mx-auto">
            <div className="mb-12 md:mb-16">
              <FadeIn>
                <SectionLabel>India</SectionLabel>
                <h2 className="font-serif text-[clamp(1.5rem,3vw,2.25rem)] text-foreground leading-[1.15]">
                  Regional Partners
                </h2>
                <GoldRule className="mt-5" />
              </FadeIn>
            </div>
            <div className="border-t border-foreground/[0.05]">
              {regionalTeam.map((m, i) => (
                <TeamCard key={m.name} member={m} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Advisors */}
      <Section>
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-20">
          <div className="lg:col-span-5">
            <FadeIn>
              <SectionLabel>Advisors &amp; Operating Partners</SectionLabel>
              <h2 className="font-serif text-[clamp(1.5rem,3vw,2.25rem)] text-foreground leading-[1.15]">
                Extended Network
              </h2>
              <GoldRule className="mt-6" />
            </FadeIn>
          </div>
          <div className="lg:col-span-7 lg:pt-1">
            <FadeIn delay={0.1}>
              <p className="font-sans text-[14.5px] text-muted-foreground leading-[1.85]">
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
