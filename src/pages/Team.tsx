import { useRegion } from '@/contexts/RegionContext';
import { Section, SectionLabel, FadeIn, GoldRule } from '@/components/ui/Section';

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
  <FadeIn delay={index * 0.1}>
    <div className="py-10 md:py-12 border-b border-foreground/6 first:border-t first:border-foreground/6">
      <div className="grid md:grid-cols-12 gap-6 md:gap-10">
        {/* Name column */}
        <div className="md:col-span-4">
          <h3 className="font-serif text-subheading text-foreground">{member.name}</h3>
          <p className="font-sans text-caption uppercase tracking-[0.2em] text-gold-dim mt-1.5">
            {member.role}
          </p>
          {member.education && (
            <p className="font-sans text-body text-muted-foreground/70 mt-3 italic text-sm">
              {member.education}
            </p>
          )}
        </div>

        {/* Bio column */}
        <div className="md:col-span-8">
          <ul className="space-y-3">
            {member.bio.map((line, i) => (
              <li key={i} className="font-sans text-body text-muted-foreground flex gap-4">
                <span className="text-foreground/12 mt-0.5 shrink-0 select-none">—</span>
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
        <div className="absolute inset-0 bg-gradient-to-br from-navy-deep/50 via-transparent to-transparent pointer-events-none" />
        <div className="relative max-w-6xl mx-auto px-5 md:px-10 lg:px-16 pt-28 pb-24 md:pt-40 md:pb-36">
          <FadeIn><SectionLabel light>Our Team</SectionLabel></FadeIn>
          <FadeIn delay={0.15}>
            <h1 className="font-serif text-display text-primary-foreground max-w-4xl text-balance">
              Operators &amp; Investors Who Understand Founder-Led&nbsp;Businesses
            </h1>
          </FadeIn>
          <FadeIn delay={0.3}><GoldRule className="mt-8" /></FadeIn>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-foreground/8 to-transparent" />
      </section>

      {/* Founders */}
      <Section>
        <FadeIn>
          <SectionLabel>Founders</SectionLabel>
          <h2 className="font-serif text-heading text-foreground mb-8 md:mb-12">Leadership</h2>
        </FadeIn>
        <div>
          {usTeam.map((m, i) => (
            <TeamCard key={m.name} member={m} index={i} />
          ))}
        </div>
      </Section>

      {/* Regional Team */}
      {regionalTeam.length > 0 && (
        <section className="bg-cream px-5 md:px-10 lg:px-16 py-20 md:py-28 lg:py-36">
          <div className="max-w-6xl mx-auto">
            <FadeIn>
              <SectionLabel>{isIndia ? 'India' : 'United States'}</SectionLabel>
              <h2 className="font-serif text-heading text-foreground mb-8 md:mb-12">Regional Partners</h2>
            </FadeIn>
            <div>
              {regionalTeam.map((m, i) => (
                <TeamCard key={m.name} member={m} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Advisors */}
      <Section>
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
          <div className="lg:col-span-5">
            <FadeIn>
              <SectionLabel>Advisors &amp; Operating Partners</SectionLabel>
              <h2 className="font-serif text-heading text-foreground text-balance">
                Extended Network
              </h2>
              <GoldRule className="mt-6" />
            </FadeIn>
          </div>
          <div className="lg:col-span-7">
            <FadeIn delay={0.15}>
              <p className="font-sans text-body text-muted-foreground leading-[1.9]">
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
