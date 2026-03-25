import React, { useState } from 'react';
import { useRegion } from '@/contexts/RegionContext';
import { Section, SectionLabel, FadeIn, GoldRule, HeroDivider } from '@/components/ui/Section';
import { motion } from 'framer-motion';
import LogoMarquee from '@/components/LogoMarquee';
import { ArrowUpRight } from 'lucide-react';
import DarkSectionEffects from '@/components/DarkSectionEffects';
import ScrollRevealText from '@/components/ScrollRevealText';
import TeamStickyDeck from '@/components/TeamStickyDeck';

// Photos
import harinPhoto from '@/assets/team/harin-gupta.jpg';
import bensonPhoto from '@/assets/team/benson-zhang.jpg';
import vaibhavPhoto from '@/assets/vaibhav-sharma.png';

// Deal logos — Harin
import rmsEnergyLogo from '@/assets/deals/rms-energy.png';
import bbcElectricLogo from '@/assets/deals/bbc-electric.png';
import pwrLogo from '@/assets/deals/pwr.png';
import flexrayLogo from '@/assets/deals/flexray.webp';
import alignLogo from '@/assets/deals/a-lign.png';
import alliedUniversalLogo from '@/assets/deals/allied-universal.png';
import energizerLogo from '@/assets/deals/energizer.png';
import broadcomLogo from '@/assets/deals/broadcom.png';

// Deal logos — Benson
import abgLogo from '@/assets/deals/abg.png';
import rpxLogo from '@/assets/deals/rpx.png';
import ideraLogo from '@/assets/deals/idera.png';
import westernDigitalLogo from '@/assets/deals/western-digital.png';
import mindbodyLogo from '@/assets/deals/mindbody.png';
import selligentLogo from '@/assets/deals/selligent.png';
import micronLogo from '@/assets/deals/micron.png';

// Logos — Institutional experience
import blackrockLogo from '@/assets/logos/blackrock.png';
import warburgLogo from '@/assets/logos/warburg-pincus.png';
import neosPartnersLogo from '@/assets/logos/neos-partners.png';
import deutscheBankLogo from '@/assets/logos/deutsche-bank.png';
import saltwaterLogo from '@/assets/logos/saltwater-capital.png';
import creditSuisseLogo from '@/assets/logos/credit-suisse.png';
import lamResearchLogo from '@/assets/logos/lam-research.png';
import evercoreLogo from '@/assets/logos/evercore.png';
import dunesPointLogo from '@/assets/logos/dunes-point-capital.png';
import culinaryInstituteLogo from '@/assets/logos/culinary-institute.png';
import berkeleyHaasLogo from '@/assets/logos/berkeley-haas.png';
import depaulLogo from '@/assets/logos/depaul.png';
// Logos — Vaibhav
import nitiAayogLogo from '@/assets/logos/niti-aayog.png';
import ashokaLogo from '@/assets/logos/ashoka.png';
import iicLogo from '@/assets/logos/iic.png';
import treeforestLogo from '@/assets/logos/treeforest.png';
import lodhaGeniusLogo from '@/assets/logos/lodha-genius.png';
import swishinLogo from '@/assets/logos/swishin-ventures.png';

// Deal logos — Vaibhav
import cohomaLogo from '@/assets/deals/cohoma.png';
import porterLogo from '@/assets/deals/porter.webp';
import lohumLogo from '@/assets/deals/lohum.png';
import bytepeLogo from '@/assets/deals/bytepe.png';
import tractorfactoryLogo from '@/assets/deals/tractorfactory.png';
import sonicLambLogo from '@/assets/deals/sonic-lamb.png';
import wareeLogo from '@/assets/deals/waaree.png';
import otplessLogo from '@/assets/deals/otpless.png';

interface LogoItem {
  src: string;
  alt: string;
  small?: boolean;
  scale?: number;
  extraGap?: number;
}

interface TeamMember {
  name: string;
  role: string;
  photo?: string;
  summary: string;
  highlights: string[];
  logos?: LogoItem[];
  dealLogos?: LogoItem[];
  linkedIn?: string;
}

const harinDealLogos: LogoItem[] = [
  { src: rmsEnergyLogo, alt: 'RMS Energy' },
  { src: bbcElectricLogo, alt: 'BBC Electric' },
  { src: pwrLogo, alt: 'PWR' },
  { src: flexrayLogo, alt: 'FlexRay' },
  { src: alignLogo, alt: 'A-LIGN' },
  { src: alliedUniversalLogo, alt: 'Allied Universal' },
  { src: energizerLogo, alt: 'Energizer' },
  { src: broadcomLogo, alt: 'Broadcom' },
];

const bensonDealLogos: LogoItem[] = [
  { src: abgLogo, alt: 'Authentic Brands Group', scale: 2.55 },
  { src: rpxLogo, alt: 'RPX' },
  { src: ideraLogo, alt: 'Idera', scale: 1.75 },
  { src: westernDigitalLogo, alt: 'Western Digital', scale: 1.5 },
  { src: mindbodyLogo, alt: 'Mindbody' },
  { src: selligentLogo, alt: 'Selligent', scale: 1.15 },
  { src: micronLogo, alt: 'Micron' },
];

const founders: TeamMember[] = [
  {
    name: 'Harin Gupta',
    role: 'Managing Partner',
    photo: harinPhoto,
    linkedIn: 'https://www.linkedin.com/in/harin-gupta/',
    summary:
      'Harin has more than a decade of experience investing in and operating companies in the business and consumer sectors. He combines deep operating expertise with long-term capital to help founders transform their businesses while protecting their legacy.',
    highlights: [
      'Invested through the Business Services Group at Warburg Pincus, a global private equity firm with $85bn+ AUM',
      'Served on the Board of Directors for RMS Energy, a provider of services for high-voltage electrical equipment',
      'Successfully helped launch and scale Honest Hospitality Group as a family business from ideation to 100+ locations globally; serves on the Board of Directors',
      'Began his finance career at leading investment banks, including J.P. Morgan, Evercore, and Deutsche Bank',
    ],
    logos: [
      { src: warburgLogo, alt: 'Warburg Pincus' },
      { src: evercoreLogo, alt: 'Evercore' },
      { src: deutscheBankLogo, alt: 'Deutsche Bank' },
    ],
    dealLogos: harinDealLogos,
  },
  {
    name: 'Benson Zhang',
    role: 'Managing Partner',
    photo: bensonPhoto,
    linkedIn: 'https://www.linkedin.com/in/benson8zhang/',
    summary:
      'Benson has over a decade of experience in finance and private equity investing across technology and business services sectors. He brings disciplined capital allocation and deep sector knowledge to every partnership.',
    highlights: [
      'Most recently invested through BlackRock\'s flagship direct private equity group, where he led the sale of BlackRock\'s stake in Authentic Brands Group',
      'At HGGC, led the investments in IDERA and RPX where he served as a board observer',
      'Began his career at Credit Suisse in the Technology Investment Banking Group where he closed 7 deals totaling $30 billion in deal value, primarily in the semiconductor and software spaces',
    ],
    logos: [
      { src: blackrockLogo, alt: 'BlackRock' },
      { src: creditSuisseLogo, alt: 'Credit Suisse' },
    ],
    dealLogos: bensonDealLogos,
  },
];

const vaibhavDealLogos: LogoItem[] = [
  { src: porterLogo, alt: 'Porter', scale: 1.3 },
  { src: lohumLogo, alt: 'Lohum', scale: 2.4 },
  { src: wareeLogo, alt: 'Waaree', scale: 0.88 },
  { src: otplessLogo, alt: 'OTPless', scale: 1.3 },
  { src: cohomaLogo, alt: 'Cohoma Coffee', scale: 2.4 },
  { src: bytepeLogo, alt: 'BytePe' },
  { src: tractorfactoryLogo, alt: 'TractorFactory', scale: 1.4 },
  { src: sonicLambLogo, alt: 'Sonic Lamb', scale: 1.05, extraGap: -8 },
];

const indiaPartner: TeamMember = {
  name: 'Vaibhav Sharma',
  role: 'Partner, India',
  photo: vaibhavPhoto,
  linkedIn: 'https://www.linkedin.com/in/vaibhavnabha/',
  summary:
    'Vaibhav brings hands-on experience across early-stage investing, venture capital, and startup building in India. He developed a conviction for lower middle-market businesses in manufacturing and industrial services, where operational improvement drives outsized value.',
  highlights: [
    'Led investments and due diligence across a venture fund and family office, spanning cleantech, deeptech, manufacturing, and marketplace sectors',
    'Co-founded and scaled multiple ventures with direct P&L ownership across product, growth, and operations',
    'Exposure to fundraising across early-stage, growth, and late-stage rounds, spanning venture capital, private equity, and multiple asset classes',
  ],
  logos: [
    { src: iicLogo, alt: 'Impact Investors Council' },
    { src: treeforestLogo, alt: 'TreeForest Capital' },
    { src: lodhaGeniusLogo, alt: 'Lodha Genius' },
    { src: swishinLogo, alt: 'Swishin Ventures' },
  ],
  dealLogos: vaibhavDealLogos,
};

const foundersLogos = [
  { src: blackrockLogo, alt: 'BlackRock' },
  { src: warburgLogo, alt: 'Warburg Pincus' },
  { src: neosPartnersLogo, alt: 'Neos Partners' },
  { src: deutscheBankLogo, alt: 'Deutsche Bank', small: true },
  { src: saltwaterLogo, alt: 'Saltwater Capital' },
  { src: creditSuisseLogo, alt: 'Credit Suisse' },
  { src: lamResearchLogo, alt: 'Lam Research' },
  { src: evercoreLogo, alt: 'Evercore' },
  { src: dunesPointLogo, alt: 'Dunes Point Capital' },
  { src: culinaryInstituteLogo, alt: 'Culinary Institute of America', small: true },
  { src: berkeleyHaasLogo, alt: 'UC Berkeley Haas' },
  { src: depaulLogo, alt: 'DePaul University', small: true },
];

const allLogos = [
  ...foundersLogos,
  { src: ashokaLogo, alt: 'Ashoka University', small: true },
  { src: nitiAayogLogo, alt: 'NITI Aayog' },
  { src: iicLogo, alt: 'Impact Investors Council', small: true },
  { src: treeforestLogo, alt: 'TreeForest Capital' },
  { src: lodhaGeniusLogo, alt: 'Lodha Genius' },
  { src: swishinLogo, alt: 'Swishin Ventures' },
];

/* ─── Deal Logo Marquee ─── */
const DealLogoMarquee = ({ logos, duration = 20, bgClass = 'from-background to-transparent' }: { logos: LogoItem[]; duration?: number; bgClass?: string }) => {
  const [hovered, setHovered] = useState(false);
  const doubled = [...logos, ...logos];
  const goldFilter = 'brightness(0) invert(67%) sepia(65%) saturate(400%) hue-rotate(358deg) brightness(92%)';

  return (
    <div
      className="relative overflow-hidden py-1"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className={`absolute left-0 top-0 bottom-0 w-8 md:w-12 z-10 pointer-events-none bg-gradient-to-r ${bgClass}`} />
      <div className={`absolute right-0 top-0 bottom-0 w-8 md:w-12 z-10 pointer-events-none bg-gradient-to-l ${bgClass}`} />
      <motion.div
        className="flex items-center gap-6 md:gap-7 lg:gap-10 w-max"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ x: { repeat: Infinity, repeatType: 'loop', duration, ease: 'linear' } }}
      >
        {doubled.map((logo, i) => (
          <div
            key={`${logo.alt}-${i}`}
            className="flex items-center justify-center shrink-0 h-[32px] md:h-[38px] lg:h-[44px]"
            style={{ marginRight: logo.extraGap ? `${logo.extraGap}px` : undefined }}
          >
            <img
              src={logo.src}
              alt={logo.alt}
              loading="lazy"
              className="h-[28px] md:h-[34px] lg:h-[40px] w-auto max-w-[100px] md:max-w-[130px] lg:max-w-[150px] object-contain transition-all duration-500"
              style={{
                filter: hovered ? 'none' : goldFilter,
                opacity: hovered ? 1 : 0.8,
                transform: logo.scale ? `scale(${logo.scale})` : undefined,
              }}
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

/* ─── Profile Card ─── */
const ProfileCard = React.forwardRef<HTMLDivElement, { member: TeamMember; index: number; creamBg?: boolean }>(({ member, index, creamBg = false }, ref) => {
  const LinkedWrapper = ({ children, className = '' }: { children: React.ReactNode; className?: string }) =>
    member.linkedIn ? (
      <a href={member.linkedIn} target="_blank" rel="noopener noreferrer" className={`cursor-pointer ${className}`}>
        {children}
      </a>
    ) : (
      <>{children}</>
    );

  const fadeGradientClass = creamBg ? 'from-cream to-transparent' : 'from-background to-transparent';

  return (
    <FadeIn ref={ref} delay={index * 0.08}>
      <div className="py-6 md:py-10 border-b border-foreground/[0.06] last:border-b-0 -mx-3 px-3 rounded-sm overflow-hidden group/card">
        <div className="grid md:grid-cols-12 gap-4 md:gap-8 items-start">
          {/* Photo + Identity */}
          <div className="md:col-span-3 flex flex-row md:flex-col items-center md:items-start gap-3 md:gap-0">
            <LinkedWrapper className="group shrink-0">
              {member.photo ? (
                <div className="relative w-[72px] h-[72px] md:w-[140px] md:h-[140px] md:mb-4">
                  {/* Gold ring on hover — only around image */}
                  <motion.div
                    className="absolute inset-0 rounded-full border border-gold/0 group-hover:border-gold/25 transition-colors duration-700"
                    style={{ margin: -3 }}
                  />
                  <div className="w-full h-full rounded-full overflow-hidden bg-muted border-2 border-foreground/[0.04] shadow-[0_4px_24px_-4px_hsl(var(--prussian)/0.14)] transition-transform duration-500 group-hover/card:scale-[1.03]">
                    <img
                      src={member.photo}
                      alt={member.name}
                      loading="lazy"
                      className="w-full h-full object-cover object-top grayscale group-hover:grayscale-0 transition-[filter] duration-700"
                    />
                  </div>
                </div>
              ) : (
                <div className="w-[72px] h-[72px] md:w-[140px] md:h-[140px] rounded-full bg-muted border-2 border-dashed border-foreground/[0.08] md:mb-4 flex items-center justify-center shadow-[0_4px_20px_-4px_hsl(var(--prussian)/0.08)] transition-transform duration-500 group-hover/card:scale-[1.03]">
                  <span className="font-serif text-[1.2rem] md:text-[1.5rem] text-muted-foreground/30">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
              )}
            </LinkedWrapper>
            <div>
              <LinkedWrapper className="hover:opacity-80 transition-opacity group inline-flex items-center gap-1.5">
                <h3 className="font-serif text-[1.05rem] md:text-[1.3rem] text-foreground tracking-[-0.02em] leading-[1.2] relative">
                  <span className="relative">
                    {member.name}
                    <span className="absolute bottom-0 left-0 w-0 h-px bg-gradient-to-r from-gold/60 to-gold/20 group-hover/card:w-full transition-all duration-500" />
                  </span>
                </h3>
                {member.linkedIn && (
                  <ArrowUpRight className="w-3.5 h-3.5 text-muted-foreground/30 group-hover:text-gold-dim group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-400" />
                )}
              </LinkedWrapper>
              <p className="font-sans text-[9px] font-medium uppercase tracking-[0.22em] text-gold-dim mt-1">
                {member.role}
              </p>
            </div>
          </div>

          {/* Bio */}
          <div className="md:col-span-9 overflow-hidden">
            <p className="font-sans text-[12.5px] md:text-[13px] text-muted-foreground leading-[1.7] md:leading-[1.75] mb-3 md:mb-4">
              {member.summary}
            </p>
            <ul className="space-y-1.5 md:space-y-2">
              {member.highlights.map((line, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.15 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="font-sans text-[11.5px] md:text-[12px] text-muted-foreground/70 leading-[1.6] md:leading-[1.65] flex gap-2 md:gap-2.5 items-start"
                >
                  <span className="shrink-0 mt-[7px] w-1.5 h-px bg-gold/25" />
                  <span>{line}</span>
                </motion.li>
              ))}
            </ul>

            {/* Deal logos */}
            {member.dealLogos && member.dealLogos.length > 0 && (
              <div className="mt-4 md:mt-6 pt-4 md:pt-5 border-t border-foreground/[0.05]">
                <p className="font-sans text-[8px] font-medium uppercase tracking-[0.2em] text-gold-dim/70 mb-2 md:mb-3">
                  Select Investments &amp; Deals
                </p>
                <DealLogoMarquee logos={member.dealLogos} bgClass={fadeGradientClass} />
              </div>
            )}
          </div>
        </div>
      </div>
    </FadeIn>
  );
});
ProfileCard.displayName = 'ProfileCard';

/* ─── Stats Bar ─── */
const StatItem = ({ value, label, delay = 0 }: { value: string; label: string; delay?: number }) => (
  <FadeIn delay={delay} className="text-center">
    <motion.p
      className="font-serif text-[clamp(1.2rem,3vw,2rem)] text-primary-foreground tracking-[-0.03em] leading-none"
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: delay + 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      {value}
    </motion.p>
    <p className="font-sans text-[7.5px] md:text-[9px] font-medium uppercase tracking-[0.18em] md:tracking-[0.2em] text-primary-foreground/25 mt-1.5 md:mt-2">
      {label}
    </p>
  </FadeIn>
);

const Team = () => {
  const { region } = useRegion();
  const isIndia = region === 'india';

  return (
    <div>
      {/* Hero */}
      <section className="relative hero-gradient-animated text-primary-foreground overflow-hidden">
        <DarkSectionEffects variant="hero" />
        <div className="relative max-w-[1080px] mx-auto px-5 md:px-10 lg:px-16 pt-20 pb-10 md:pt-34 md:pb-18 lg:pt-36 lg:pb-20">
          <FadeIn>
            <SectionLabel light>Team</SectionLabel>
          </FadeIn>
          <FadeIn delay={0.08}>
            <h1 className="font-serif text-[clamp(1.6rem,4.5vw,3rem)] text-primary-foreground max-w-[460px] leading-[1.12] tracking-[-0.025em]">
              {isIndia ? 'India Leadership' : 'Leadership'}
            </h1>
          </FadeIn>
          <FadeIn delay={0.12}>
            <p className="font-sans text-[12px] md:text-[13px] text-primary-foreground/40 leading-[1.65] md:leading-[1.7] mt-3 md:mt-4 max-w-[420px]">
              {isIndia
                ? 'Global institutional experience, local conviction. Operators and investors building alongside Indian founders.'
                : 'Operators and investors building alongside founders.'}
            </p>
          </FadeIn>
          <FadeIn delay={0.16}>
            <GoldRule className="mt-4 md:mt-6" />
          </FadeIn>
        </div>

        {/* Stats Bar */}
        <div className="relative border-t border-primary-foreground/[0.06]">
          <div className="max-w-[1080px] mx-auto px-5 md:px-10 lg:px-16 py-4 md:py-8">
            <div className="grid grid-cols-3 gap-2 md:gap-4">
              <StatItem value="25+" label="Years Combined" delay={0.1} />
              <StatItem value="$30B+" label="Deal Experience" delay={0.18} />
              <StatItem value={isIndia ? '3' : '50+'} label={isIndia ? 'Continents Covered' : 'Transactions'} delay={0.26} />
            </div>
          </div>
        </div>

        <HeroDivider />
      </section>

      {/* ScrollRevealText — after hero */}
      <ScrollRevealText
        label="Our People"
        heading="Operators and investors who've built, scaled, and partnered across cycles."
        variant="light"
      />

      {/* Team Sticky Deck — one card per profile */}
      <section className="bg-background">
        <div className="px-5 md:px-10 lg:px-16 pt-6 md:pt-8 lg:pt-10">
          <div className="max-w-[1080px] mx-auto">
            <FadeIn>
              <SectionLabel>{isIndia ? 'Our Team' : 'Managing Partners'}</SectionLabel>
              <GoldRule className="mt-1 mb-4 md:mb-6" />
            </FadeIn>
          </div>
        </div>
        <TeamStickyDeck
          members={
            isIndia
              ? [
                  { ...indiaPartner, dealLogos: vaibhavDealLogos },
                  ...founders.map(f => ({ ...f })),
                ]
              : [
                  ...founders.map(f => ({ ...f })),
                  { ...indiaPartner, dealLogos: vaibhavDealLogos },
                ]
          }
        />
      </section>

      {/* ScrollRevealText — before network */}
      <ScrollRevealText
        label="Network"
        heading="A curated network built over decades of shared conviction and institutional rigour."
        variant="dark"
      />

      {/* Network — Advisors & Operating Partners */}
      <Section>
        <div className="grid lg:grid-cols-12 gap-4 md:gap-6 lg:gap-14">
          <div className="lg:col-span-4">
            <FadeIn>
              <SectionLabel>Advisors &amp; Operating Partners</SectionLabel>
              <h2 className="font-serif text-[clamp(1.3rem,2.5vw,1.85rem)] text-foreground leading-[1.18]">
                Our Network
              </h2>
              <GoldRule className="mt-3 md:mt-4" />
            </FadeIn>
          </div>
          <div className="lg:col-span-8 flex items-center">
            <FadeIn delay={0.08}>
              <div className="border-l-0 lg:border-l border-foreground/[0.06] pl-0 lg:pl-8">
                <p className="font-sans text-[12.5px] md:text-[13px] text-muted-foreground leading-[1.7] md:leading-[1.8] mb-2 md:mb-3">
                  {isIndia
                    ? 'Our advisory network spans senior operators, industry veterans, and institutional leaders across India and the United States.'
                    : 'Our advisory network includes senior operators, industry veterans, and institutional leaders across the United States.'}
                </p>
                <p className="font-sans text-[10.5px] md:text-[11px] text-muted-foreground/40 leading-[1.6]">
                  Details on our advisory network are shared selectively with prospective partners.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </Section>

      {/* Institutional Experience Marquee — below network */}
      <div className="bg-background">
        <div className="max-w-[1080px] mx-auto px-5 md:px-10 lg:px-16 pt-10 md:pt-14 pb-6">
          <FadeIn>
            <SectionLabel>Institutional Experience</SectionLabel>
            <GoldRule className="mt-1" />
          </FadeIn>
        </div>
        <FadeIn delay={0.1}>
          <LogoMarquee logos={isIndia ? allLogos : foundersLogos} duration={40} variant="dark" />
        </FadeIn>
      </div>
    </div>
  );
};

export default Team;
