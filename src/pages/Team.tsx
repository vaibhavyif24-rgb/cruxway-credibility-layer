import { useRegion } from '@/contexts/RegionContext';
import { Section, SectionLabel, FadeIn, GoldRule, HeroDivider } from '@/components/ui/Section';

interface TeamMember {
  name: string;
  role: string;
  bio: string[];
  education?: string;
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
      'Three-time founder, including Cleen.pet and Cropwise, with extensive experience operating within family offices and early-stage funds including Swishin Ventures.',
      'Previous experience includes strategic roles at NITI Aayog and the Boston Consulting Group (BCG).',
      'Led investments in companies including Lohum, Porter, Tractor Factory, BytePe, Waaree Solar, and Snapmint.',
      'Frugal science engineer and recipient of a research grant from Stanford University.',
    ],
    education: 'Ashoka University · Panjab University',
  },
];

const TeamCard = ({ member, index }: { member: TeamMember; index: number }) => (
  <FadeIn delay={index * 0.08}>
    <div className="py-8 md:py-10 border-b border-foreground/[0.06]">
      <div className="grid md:grid-cols-12 gap-5 md:gap-10">
        {/* Name */}
        <div className="md:col-span-4">
          <h3 className="font-serif text-xl md:text-[1.35rem] text-foreground">{member.name}</h3>
          <p className="font-sans text-[10px] font-medium uppercase tracking-[0.2em] text-gold-dim mt-1.5">
            {member.role}
          </p>
          {member.education && (
            <p className="font-sans text-[12px] text-muted-foreground/60 mt-3 italic">
              {member.education}
            </p>
          )}
        </div>

        {/* Bio */}
        <div className="md:col-span-8">
          <ul className="space-y-2.5">
            {member.bio.map((line, i) => (
              <li key={i} className="font-sans text-[14px] text-muted-foreground leading-[1.7] flex gap-3">
                <span className="text-foreground/10 mt-[2px] shrink-0 select-none text-xs">—</span>
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
        <div className="relative max-w-[1120px] mx-auto px-6 md:px-12 lg:px-20 pt-32 pb-20 md:pt-44 md:pb-32 lg:pt-48 lg:pb-36">
          <FadeIn><SectionLabel light>Our Team</SectionLabel></FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="font-serif text-[clamp(2rem,5.5vw,3.5rem)] text-primary-foreground max-w-[640px] leading-[1.1] tracking-[-0.03em]">
              Operators &amp; Investors Who Understand Founder-Led&nbsp;Businesses
            </h1>
          </FadeIn>
          <FadeIn delay={0.25}><GoldRule className="mt-8" /></FadeIn>
        </div>
        <HeroDivider />
      </section>

      {/* Founders */}
      <Section>
        <FadeIn>
          <SectionLabel>Founders</SectionLabel>
          <h2 className="font-serif text-[clamp(1.5rem,3vw,2.25rem)] text-foreground mb-8 md:mb-12">Leadership</h2>
        </FadeIn>
        <div className="border-t border-foreground/[0.06]">
          {usTeam.map((m, i) => (
            <TeamCard key={m.name} member={m} index={i} />
          ))}
        </div>
      </Section>

      {/* Regional Team */}
      {regionalTeam.length > 0 && (
        <section className="bg-cream px-6 md:px-12 lg:px-20 py-20 md:py-28 lg:py-36">
          <div className="max-w-[1120px] mx-auto">
            <FadeIn>
              <SectionLabel>{isIndia ? 'India' : 'United States'}</SectionLabel>
              <h2 className="font-serif text-[clamp(1.5rem,3vw,2.25rem)] text-foreground mb-8 md:mb-12">Regional Partners</h2>
            </FadeIn>
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
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-20">
          <div className="lg:col-span-4">
            <FadeIn>
              <SectionLabel>Advisors &amp; Operating Partners</SectionLabel>
              <h2 className="font-serif text-[clamp(1.5rem,3vw,2.25rem)] text-foreground leading-[1.15]">
                Extended Network
              </h2>
              <GoldRule className="mt-6" />
            </FadeIn>
          </div>
          <div className="lg:col-span-8">
            <FadeIn delay={0.1}>
              <p className="font-sans text-[15px] text-muted-foreground leading-[1.85]">
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
