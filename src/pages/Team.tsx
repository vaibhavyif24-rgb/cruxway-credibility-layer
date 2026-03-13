import { useRegion } from '@/contexts/RegionContext';
import { Section, SectionLabel, FadeIn, GoldRule, HeroDivider } from '@/components/ui/Section';
import { motion } from 'framer-motion';

// Photos
import harinPhoto from '@/assets/team/harin-gupta.jpg';
import bensonPhoto from '@/assets/team/benson-zhang.jpg';
import vaibhavPhoto from '@/assets/team/vaibhav-sharma.webp';

// Logos — Founders
import warburgLogo from '@/assets/logos/warburg-pincus.png';
import jpMorganLogo from '@/assets/logos/jp-morgan.png';
import evercoreLogo from '@/assets/logos/evercore.png';
import deutscheBankLogo from '@/assets/logos/deutsche-bank.png';
import blackrockLogo from '@/assets/logos/blackrock.png';
import creditSuisseLogo from '@/assets/logos/credit-suisse.png';
import hggcLogo from '@/assets/logos/hggc.png';

// Logos — Vaibhav
import nitiAayogLogo from '@/assets/logos/niti-aayog.png';
import ashokaLogo from '@/assets/logos/ashoka.png';
import iicLogo from '@/assets/logos/iic.jpg';
import treeforestLogo from '@/assets/logos/treeforest.jpg';

interface TeamMember {
  name: string;
  role: string;
  photo?: string;
  summary: string;
  highlights: string[];
  logos?: { src: string; alt: string }[];
}

const founders: TeamMember[] = [
  {
    name: 'Harin Gupta',
    role: 'Co-Founder',
    photo: harinPhoto,
    summary:
      'Over a decade of experience investing in and operating companies across business services and consumer sectors.',
    highlights: [
      'Warburg Pincus — Business Services Group; global PE firm with $85bn+ AUM',
      'Board of Directors, RMS Energy — high-voltage electrical testing and maintenance',
      'Honest Hospitality Group — scaled from ideation to 100+ locations globally; Board of Directors',
      'Investment banking: J.P. Morgan, Evercore, Deutsche Bank',
    ],
    logos: [
      { src: warburgLogo, alt: 'Warburg Pincus' },
      { src: jpMorganLogo, alt: 'J.P. Morgan' },
      { src: evercoreLogo, alt: 'Evercore' },
      { src: deutscheBankLogo, alt: 'Deutsche Bank' },
    ],
  },
  {
    name: 'Benson Zhang',
    role: 'Co-Founder',
    photo: bensonPhoto,
    summary:
      'Over a decade of experience in private equity and finance across technology and business services.',
    highlights: [
      'BlackRock — Direct Private Equity; led sale of stake in Authentic Brands Group',
      'HGGC — Led investments in IDERA and RPX; Board Observer',
      'Credit Suisse — Technology Investment Banking; 7 deals, $30bn in aggregate deal value',
    ],
    logos: [
      { src: blackrockLogo, alt: 'BlackRock' },
      { src: hggcLogo, alt: 'HGGC' },
      { src: creditSuisseLogo, alt: 'Credit Suisse' },
    ],
  },
];

const indiaPartner: TeamMember = {
  name: 'Vaibhav Sharma',
  role: 'Partner',
  photo: vaibhavPhoto,
  summary:
    'Founder, operator, and investor with on-ground experience across Indian growth-stage businesses.',
  highlights: [
    'NITI Aayog — Policy and strategy advisory to the Government of India',
    'Swishin Ventures — VC fund partnering with multiple family offices across India',
    'Three-time founder; on-ground consulting across strategy, market entry, and operations',
    'Select investments: Lohum, Porter, Waaree Solar',
    'Stanford University — Research grant recipient',
  ],
  logos: [
    { src: nitiAayogLogo, alt: 'NITI Aayog' },
    { src: ashokaLogo, alt: 'Ashoka University' },
    { src: iicLogo, alt: 'Impact Investors Council' },
    { src: treeforestLogo, alt: 'TreeForest Capital' },
  ],
};

/* ─── Profile Card ─── */
const ProfileCard = ({ member, index }: { member: TeamMember; index: number }) => (
  <FadeIn delay={index * 0.08}>
    <motion.div
      whileHover={{ backgroundColor: 'hsl(40 18% 95% / 0.5)' }}
      transition={{ duration: 0.3 }}
      className="py-8 md:py-10 border-b border-foreground/[0.06] last:border-b-0 -mx-3 px-3 rounded-sm"
    >
      <div className="grid md:grid-cols-12 gap-5 md:gap-8 items-start">
        {/* Photo + Identity */}
        <div className="md:col-span-3 flex flex-col items-start">
          {member.photo ? (
            <div className="w-[100px] h-[100px] md:w-[120px] md:h-[120px] rounded-full overflow-hidden bg-muted border-2 border-foreground/[0.04] mb-4 shadow-[0_4px_20px_-4px_hsl(var(--prussian)/0.12)]">
              <img
                src={member.photo}
                alt={member.name}
                className="w-full h-full object-cover object-top grayscale hover:grayscale-0 transition-[filter] duration-500"
              />
            </div>
          ) : (
            <div className="w-[100px] h-[100px] md:w-[120px] md:h-[120px] rounded-full bg-muted border-2 border-dashed border-foreground/[0.08] mb-4 flex items-center justify-center shadow-[0_4px_20px_-4px_hsl(var(--prussian)/0.08)]">
              <span className="font-serif text-[1.5rem] text-muted-foreground/30">
                {member.name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
          )}
          <h3 className="font-serif text-[1.15rem] md:text-[1.3rem] text-foreground tracking-[-0.02em] leading-[1.2]">
            {member.name}
          </h3>
          <p className="font-sans text-[9px] font-medium uppercase tracking-[0.22em] text-gold-dim mt-1">
            {member.role}
          </p>
        </div>

        {/* Bio + Logos */}
        <div className="md:col-span-9">
          <p className="font-sans text-[13px] text-muted-foreground leading-[1.75] mb-3">
            {member.summary}
          </p>
          <ul className="space-y-1.5 mb-5">
            {member.highlights.map((line, i) => (
              <li
                key={i}
                className="font-sans text-[12px] text-muted-foreground/70 leading-[1.65] flex gap-2.5 items-start"
              >
                <span className="shrink-0 mt-[7px] w-1.5 h-px bg-gold/25" />
                <span>{line}</span>
              </li>
            ))}
          </ul>
          {member.logos && member.logos.length > 0 && (
            <div className="flex flex-wrap items-center gap-6 md:gap-8 pt-4 border-t border-foreground/[0.04]">
              {member.logos.map((logo) => (
                <div
                  key={logo.alt}
                  className="h-[20px] md:h-[24px] flex items-center"
                >
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    className="h-full w-auto max-w-[80px] md:max-w-[100px] object-contain opacity-30 grayscale hover:opacity-50 transition-opacity duration-300"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  </FadeIn>
);

const Team = () => {
  const { region } = useRegion();
  const isIndia = region === 'india';

  return (
    <div>
      {/* Hero */}
      <section className="relative hero-gradient-animated text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/40 via-transparent to-navy-deep/20 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[300px] bg-gold/[0.015] rounded-full blur-[100px] pointer-events-none" />
        <div className="relative max-w-[1080px] mx-auto px-5 md:px-10 lg:px-16 pt-28 pb-14 md:pt-34 md:pb-18 lg:pt-36 lg:pb-20">
          <FadeIn>
            <SectionLabel light>Team</SectionLabel>
          </FadeIn>
          <FadeIn delay={0.08}>
            <h1 className="font-serif text-[clamp(1.8rem,4.5vw,3rem)] text-primary-foreground max-w-[460px] leading-[1.12] tracking-[-0.025em]">
              {isIndia ? 'India Leadership' : 'Leadership'}
            </h1>
          </FadeIn>
          <FadeIn delay={0.12}>
            <p className="font-sans text-[13px] text-primary-foreground/40 leading-[1.7] mt-4 max-w-[420px]">
              Operators and investors building alongside founders.
            </p>
          </FadeIn>
          <FadeIn delay={0.16}>
            <GoldRule className="mt-6" />
          </FadeIn>
        </div>
        <HeroDivider />
      </section>

      {isIndia ? (
        <>
          {/* India Partner — top */}
          <Section>
            <div className="mb-5 md:mb-7">
              <FadeIn>
                <SectionLabel>India</SectionLabel>
                <GoldRule className="mt-1" />
              </FadeIn>
            </div>
            <div className="border-t border-foreground/[0.06]">
              <ProfileCard member={indiaPartner} index={0} />
            </div>
          </Section>

          {/* Founders below */}
          <section className="bg-cream px-5 md:px-10 lg:px-16 py-12 md:py-16 lg:py-20">
            <div className="max-w-[1080px] mx-auto">
              <div className="mb-5 md:mb-7">
                <FadeIn>
                  <SectionLabel>Founders</SectionLabel>
                  <GoldRule className="mt-1" />
                </FadeIn>
              </div>
              <div className="border-t border-foreground/[0.06]">
                {founders.map((m, i) => (
                  <ProfileCard key={m.name} member={m} index={i} />
                ))}
              </div>
            </div>
          </section>
        </>
      ) : (
        <>
          {/* US — Founders */}
          <Section>
            <div className="mb-5 md:mb-7">
              <FadeIn>
                <SectionLabel>Founders</SectionLabel>
                <GoldRule className="mt-1" />
              </FadeIn>
            </div>
            <div className="border-t border-foreground/[0.06]">
              {founders.map((m, i) => (
                <ProfileCard key={m.name} member={m} index={i} />
              ))}
            </div>
          </Section>

          {/* US — Regional Partners */}
          <section className="bg-cream px-5 md:px-10 lg:px-16 py-12 md:py-16 lg:py-20">
            <div className="max-w-[1080px] mx-auto">
              <div className="mb-5 md:mb-7">
                <FadeIn>
                  <SectionLabel>Regional Partners</SectionLabel>
                  <GoldRule className="mt-1" />
                </FadeIn>
              </div>
              <div className="border-t border-foreground/[0.06]">
                <ProfileCard member={indiaPartner} index={0} />
              </div>
            </div>
          </section>
        </>
      )}

      {/* Network */}
      <Section>
        <div className="grid lg:grid-cols-12 gap-5 lg:gap-14">
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