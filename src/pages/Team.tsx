import { useRegion } from '@/contexts/RegionContext';
import { Section, SectionLabel, FadeIn, GoldRule, HeroDivider } from '@/components/ui/Section';

interface TeamMember {
  name: string;
  role: string;
  summary: string;
  highlights: string[];
}

const usTeam: TeamMember[] = [
  {
    name: 'Harin Gupta',
    role: 'Co-Founder',
    summary: 'Over a decade of private equity investing and operating experience across business services and consumer sectors.',
    highlights: [
      'Business Services Group, Warburg Pincus ($85bn+ AUM)',
      'Board Director, RMS Energy; Board Director, Honest Hospitality Group (100+ locations)',
      'Prior roles at JP Morgan, Evercore, and Deutsche Bank',
    ],
  },
  {
    name: 'Benson Zhang',
    role: 'Co-Founder',
    summary: 'Over a decade in private equity investing across technology and business services.',
    highlights: [
      'Direct Private Equity, BlackRock',
      'Led investments in IDERA and RPX at HGGC; Board Observer',
      'Prior: Technology Investment Banking, Credit Suisse ($30bn+ deal value)',
    ],
  },
];

const indiaTeam: TeamMember[] = [
  {
    name: 'Vaibhav Sharma',
    role: 'Partner, India',
    summary: 'Founder, operator, and investor with deep on-ground experience across Indian growth-stage businesses.',
    highlights: [
      'Three-time founder including Studyenclave.com',
      'On-ground consulting: strategy, market entry, and operations',
      'Prior: NITI Aayog; family office and early-stage fund experience (Swishin Ventures)',
      'Select investments: Lohum, Porter, Waaree Solar, Snapmint',
      'Stanford University research grant recipient',
    ],
  },
];

const TeamCard = ({ member, index }: { member: TeamMember; index: number }) => (
  <FadeIn delay={index * 0.06}>
    <div className="py-8 md:py-10 border-b border-foreground/[0.06] last:border-b-0">
      <div className="grid md:grid-cols-12 gap-4 md:gap-10">
        <div className="md:col-span-3">
          <h3 className="font-serif text-[1.2rem] md:text-[1.35rem] text-foreground tracking-[-0.02em]">
            {member.name}
          </h3>
          <p className="font-sans text-[9px] font-medium uppercase tracking-[0.2em] text-gold-dim mt-1">
            {member.role}
          </p>
        </div>
        <div className="md:col-span-9">
          <p className="font-sans text-[13px] text-muted-foreground leading-[1.7] mb-3">
            {member.summary}
          </p>
          <ul className="space-y-1.5">
            {member.highlights.map((line, i) => (
              <li key={i} className="font-sans text-[12.5px] text-muted-foreground/70 leading-[1.6] flex gap-2.5 items-start">
                <span className="shrink-0 mt-[8px] w-2 h-px bg-gold/20" />
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
        <div className="relative max-w-[1080px] mx-auto px-5 md:px-10 lg:px-16 pt-28 pb-16 md:pt-36 md:pb-24 lg:pt-40 lg:pb-28">
          <FadeIn>
            <SectionLabel light>Team</SectionLabel>
          </FadeIn>
          <FadeIn delay={0.08}>
            <h1 className="font-serif text-[clamp(1.85rem,4.5vw,3.2rem)] text-primary-foreground max-w-[480px] leading-[1.12] tracking-[-0.025em]">
              Investors &amp;&nbsp;Operators
            </h1>
          </FadeIn>
          <FadeIn delay={0.14}>
            <GoldRule className="mt-7" />
          </FadeIn>
        </div>
        <HeroDivider />
      </section>

      {/* Founders */}
      <Section>
        <div className="mb-8 md:mb-10">
          <FadeIn>
            <SectionLabel>Founders</SectionLabel>
            <GoldRule className="mt-1" />
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
            <div className="mb-8 md:mb-10">
              <FadeIn>
                <SectionLabel>India</SectionLabel>
                <GoldRule className="mt-1" />
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

      {/* Network */}
      <Section>
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-16">
          <div className="lg:col-span-5">
            <FadeIn>
              <SectionLabel>Network</SectionLabel>
              <h2 className="font-serif text-[clamp(1.35rem,2.5vw,2rem)] text-foreground leading-[1.18]">
                Advisors &amp; Operating Partners
              </h2>
              <GoldRule className="mt-5" />
            </FadeIn>
          </div>
          <div className="lg:col-span-7">
            <FadeIn delay={0.08}>
              <p className="font-sans text-[13.5px] text-muted-foreground leading-[1.8]">
                Details on our advisory network are shared selectively with prospective partners.
              </p>
            </FadeIn>
          </div>
        </div>
      </Section>
    </div>
  );
};

export default Team;
