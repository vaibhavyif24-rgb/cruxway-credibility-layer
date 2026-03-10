import { useRegion } from '@/contexts/RegionContext';
import { Section, SectionLabel, FadeIn, GoldRule, HeroDivider } from '@/components/ui/Section';

interface TeamMember {
  name: string;
  role: string;
  summary: string;
  highlights: string[];
}

const founders: TeamMember[] = [
  {
    name: 'Harin Gupta',
    role: 'Co-Founder',
    summary: 'Private equity investing and operating experience across business services and consumer sectors.',
    highlights: [
      'Business Services Group, Warburg Pincus',
      'Board Director, RMS Energy; Board Director, Honest Hospitality Group',
      'Prior: JP Morgan, Evercore, Deutsche Bank',
    ],
  },
  {
    name: 'Benson Zhang',
    role: 'Co-Founder',
    summary: 'Private equity investing across technology and business services.',
    highlights: [
      'Direct Private Equity, BlackRock',
      'Led investments at HGGC; Board Observer',
      'Prior: Technology Investment Banking, Credit Suisse',
    ],
  },
];

const indiaPartner: TeamMember = {
  name: 'Vaibhav Sharma',
  role: 'Partner',
  summary: 'Founder, operator, and investor with on-ground experience across Indian growth-stage businesses.',
  highlights: [
    'Three-time founder including Studyenclave.com',
    'On-ground consulting: strategy, market entry, and operations',
    'Prior: NITI Aayog; family office experience (Swishin Ventures)',
    'Select investments: Lohum, Porter, Waaree Solar',
    'Stanford University research grant recipient',
  ],
};

const TeamCard = ({ member, index }: { member: TeamMember; index: number }) => (
  <FadeIn delay={index * 0.06}>
    <div className="py-7 md:py-9 border-b border-foreground/[0.06] last:border-b-0">
      <div className="grid md:grid-cols-12 gap-3 md:gap-10">
        <div className="md:col-span-3">
          <h3 className="font-serif text-[1.15rem] md:text-[1.3rem] text-foreground tracking-[-0.02em]">
            {member.name}
          </h3>
          <p className="font-sans text-[9px] font-medium uppercase tracking-[0.2em] text-gold-dim mt-1">
            {member.role}
          </p>
        </div>
        <div className="md:col-span-9">
          <p className="font-sans text-[13px] text-muted-foreground leading-[1.7] mb-2.5">
            {member.summary}
          </p>
          <ul className="space-y-1">
            {member.highlights.map((line, i) => (
              <li key={i} className="font-sans text-[12px] text-muted-foreground/65 leading-[1.6] flex gap-2.5 items-start">
                <span className="shrink-0 mt-[7px] w-1.5 h-px bg-gold/20" />
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

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-prussian text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/50 via-transparent to-navy-deep/15 pointer-events-none" />
        <div className="relative max-w-[1080px] mx-auto px-5 md:px-10 lg:px-16 pt-28 pb-14 md:pt-34 md:pb-20 lg:pt-38 lg:pb-24">
          <FadeIn>
            <SectionLabel light>Team</SectionLabel>
          </FadeIn>
          <FadeIn delay={0.08}>
            <h1 className="font-serif text-[clamp(1.8rem,4.5vw,3rem)] text-primary-foreground max-w-[460px] leading-[1.12] tracking-[-0.025em]">
              {isIndia ? 'India Leadership' : 'Leadership'}
            </h1>
          </FadeIn>
          <FadeIn delay={0.14}>
            <GoldRule className="mt-6" />
          </FadeIn>
        </div>
        <HeroDivider />
      </section>

      {isIndia ? (
        <>
          {/* India Partner — first */}
          <Section>
            <div className="mb-6 md:mb-8">
              <FadeIn>
                <SectionLabel>India</SectionLabel>
                <GoldRule className="mt-1" />
              </FadeIn>
            </div>
            <div className="border-t border-foreground/[0.06]">
              <TeamCard member={indiaPartner} index={0} />
            </div>
          </Section>

          {/* Founders below */}
          <section className="bg-cream px-5 md:px-10 lg:px-16 py-12 md:py-18 lg:py-22">
            <div className="max-w-[1080px] mx-auto">
              <div className="mb-6 md:mb-8">
                <FadeIn>
                  <SectionLabel>Founders</SectionLabel>
                  <GoldRule className="mt-1" />
                </FadeIn>
              </div>
              <div className="border-t border-foreground/[0.06]">
                {founders.map((m, i) => (
                  <TeamCard key={m.name} member={m} index={i} />
                ))}
              </div>
            </div>
          </section>
        </>
      ) : (
        /* US — Founders only */
        <Section>
          <div className="mb-6 md:mb-8">
            <FadeIn>
              <SectionLabel>Founders</SectionLabel>
              <GoldRule className="mt-1" />
            </FadeIn>
          </div>
          <div className="border-t border-foreground/[0.06]">
            {founders.map((m, i) => (
              <TeamCard key={m.name} member={m} index={i} />
            ))}
          </div>
        </Section>
      )}

      {/* Network */}
      <Section>
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-14">
          <div className="lg:col-span-4">
            <FadeIn>
              <SectionLabel>Network</SectionLabel>
              <h2 className="font-serif text-[clamp(1.3rem,2.5vw,1.85rem)] text-foreground leading-[1.18]">
                Advisors &amp; Operating Partners
              </h2>
              <GoldRule className="mt-4" />
            </FadeIn>
          </div>
          <div className="lg:col-span-8 flex items-center">
            <FadeIn delay={0.08}>
              <p className="font-sans text-[13px] text-muted-foreground leading-[1.8]">
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
