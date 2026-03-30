import React, { useState, useEffect } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { useRegion } from '@/contexts/RegionContext';
import { Section, SectionLabel, FadeIn, GoldRule, HeroDivider } from '@/components/ui/Section';
import { motion, useMotionValue, animate } from 'framer-motion';
import LogoMarquee from '@/components/LogoMarquee';
import { ArrowUpRight } from 'lucide-react';
import DarkSectionEffects from '@/components/DarkSectionEffects';
import LightSectionEffects from '@/components/LightSectionEffects';
import ScrollRevealText from '@/components/ScrollRevealText';
import TeamStickyDeck from '@/components/TeamStickyDeck';

// Photos
import harinPhoto from '@/assets/team/harin-gupta.jpg';
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

// Logos — Institutional experience
import warburgLogo from '@/assets/logos/warburg-pincus.png';
import neosPartnersLogo from '@/assets/logos/neos-partners.png';
import deutscheBankLogo from '@/assets/logos/deutsche-bank.png';
import saltwaterLogo from '@/assets/logos/saltwater-capital.png';
import lamResearchLogo from '@/assets/logos/lam-research.png';
import evercoreLogo from '@/assets/logos/evercore.png';
import dunesPointLogo from '@/assets/logos/dunes-point-capital.png';
import culinaryInstituteLogo from '@/assets/logos/culinary-institute.png';
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
  { src: rmsEnergyLogo, alt: 'RMS Energy', scale: 1.0 },
  { src: bbcElectricLogo, alt: 'BBC Electric', scale: 1.0 },
  { src: pwrLogo, alt: 'PWR', scale: 1.0 },
  { src: flexrayLogo, alt: 'FlexRay', scale: 1.0 },
  { src: alignLogo, alt: 'A-LIGN', scale: 1.0 },
  { src: alliedUniversalLogo, alt: 'Allied Universal', scale: 1.0 },
  { src: energizerLogo, alt: 'Energizer', scale: 1.0 },
  { src: broadcomLogo, alt: 'Broadcom', scale: 1.0 },
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
];

const vaibhavDealLogos: LogoItem[] = [
  { src: porterLogo, alt: 'Porter', scale: 1.0 },
  { src: lohumLogo, alt: 'Lohum', scale: 1.0 },
  { src: wareeLogo, alt: 'Waaree', scale: 1.0 },
  { src: otplessLogo, alt: 'OTPless', scale: 1.0 },
  { src: cohomaLogo, alt: 'Cohoma Coffee', scale: 1.0 },
  { src: bytepeLogo, alt: 'BytePe', scale: 1.0 },
  { src: tractorfactoryLogo, alt: 'TractorFactory', scale: 1.0 },
  { src: sonicLambLogo, alt: 'Sonic Lamb', scale: 1.0 },
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
  { src: warburgLogo, alt: 'Warburg Pincus', scale: 2.2 },
  { src: neosPartnersLogo, alt: 'Neos Partners', scale: 1.3 },
  { src: deutscheBankLogo, alt: 'Deutsche Bank', scale: 1.2 },
  { src: saltwaterLogo, alt: 'Saltwater Capital', scale: 1.3 },
  { src: lamResearchLogo, alt: 'Lam Research', scale: 1.2 },
  { src: evercoreLogo, alt: 'Evercore', scale: 1.3 },
  { src: dunesPointLogo, alt: 'Dunes Point Capital', scale: 1.2 },
  { src: culinaryInstituteLogo, alt: 'Culinary Institute of America', scale: 1.2 },
  { src: depaulLogo, alt: 'DePaul University', scale: 1.2 },
];

const allLogos = [
  ...foundersLogos,
  { src: ashokaLogo, alt: 'Ashoka University', scale: 1.2 },
  { src: nitiAayogLogo, alt: 'NITI Aayog', scale: 2.2 },
  { src: iicLogo, alt: 'Impact Investors Council', scale: 1.2 },
  { src: treeforestLogo, alt: 'TreeForest Capital', scale: 1.3 },
  { src: lodhaGeniusLogo, alt: 'Lodha Genius', scale: 1.3 },
  { src: swishinLogo, alt: 'Swishin Ventures', scale: 2.2 },
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
        className="flex items-center gap-8 md:gap-10 lg:gap-12 w-max"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ x: { repeat: Infinity, repeatType: 'loop', duration, ease: 'linear' } }}
      >
        {doubled.map((logo, i) => (
          <div
            key={`${logo.alt}-${i}`}
            className="flex items-center justify-center shrink-0 h-[36px] md:h-[44px] lg:h-[52px]"
          >
            <img
              src={logo.src}
              alt={logo.alt}
              loading="lazy"
              className="w-auto max-w-[100px] md:max-w-[130px] lg:max-w-[150px] object-contain transition-all duration-500"
              style={{
                height: `${(logo.scale || 1) * 36}px`,
                filter: hovered ? 'none' : goldFilter,
                opacity: hovered ? 1 : 0.8,
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
          <div className="md:col-span-3 flex flex-row md:flex-col items-center md:items-start gap-3 md:gap-0">
            <LinkedWrapper className="group shrink-0">
              {member.photo ? (
                <div className="relative w-[72px] h-[72px] md:w-[140px] md:h-[140px] md:mb-4">
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

/* ─── Counting Stat ─── */
const CountingStat = ({ value, isDark }: { value: string; isDark: boolean }) => {
  const numMatch = value.match(/^(\d+)/);
  const motionVal = useMotionValue(0);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    if (!numMatch) return;
    const target = parseInt(numMatch[1], 10);
    const suffix = value.slice(numMatch[1].length);
    const controls = animate(motionVal, target, {
      duration: 1.5,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(`${Math.round(v)}${suffix}`),
    });
    return () => controls.stop();
  }, [value]);

  return (
    <motion.p
      className={`font-serif text-[clamp(1.2rem,3vw,2rem)] tracking-[-0.03em] leading-none ${isDark ? 'text-primary-foreground' : 'text-gold'}`}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {display}
    </motion.p>
  );
};

/* ─── Stats Bar ─── */
const StatItem = ({ value, label, delay = 0, isDark }: { value: string; label: string; delay?: number; isDark: boolean }) => (
  <FadeIn delay={delay} className="text-center">
    <CountingStat value={value} isDark={isDark} />
    <motion.div
      initial={{ width: 0 }}
      whileInView={{ width: 24 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: delay + 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="h-[1.5px] bg-gold/30 mx-auto mt-2"
    />
    <p className={`font-sans text-[7.5px] md:text-[9px] font-medium uppercase tracking-[0.18em] md:tracking-[0.2em] mt-1.5 md:mt-2 ${isDark ? 'text-primary-foreground/25' : 'text-muted-foreground/50'}`}>
      {label}
    </p>
  </FadeIn>
);

const Team = () => {
  const { region } = useRegion();
  const isIndia = region === 'india';

  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div>
      {/* Hero */}
      <section className={`relative overflow-hidden ${isDark ? 'hero-gradient-animated text-primary-foreground' : 'bg-[hsl(40,18%,96%)] text-foreground'}`}>
        {isDark ? <DarkSectionEffects variant="hero" /> : <LightSectionEffects variant="hero" />}
        <div className="relative max-w-[1080px] mx-auto px-5 md:px-10 lg:px-16 pt-20 pb-10 md:pt-34 md:pb-14 lg:pt-36 lg:pb-14">
          <FadeIn>
            <SectionLabel light={isDark}>Team</SectionLabel>
          </FadeIn>
          <FadeIn delay={0.08}>
            <h1 className={`text-shimmer-gold font-serif text-[clamp(1.6rem,4.5vw,3rem)] max-w-[460px] leading-[1.12] tracking-[-0.025em] ${isDark ? 'text-primary-foreground' : 'text-foreground'}`}>
              {isIndia ? 'India Leadership' : 'Leadership'}
            </h1>
          </FadeIn>
          <FadeIn delay={0.12}>
            <p className={`font-sans text-[12px] md:text-[13px] leading-[1.65] md:leading-[1.7] mt-3 md:mt-4 max-w-[420px] ${isDark ? 'text-primary-foreground/40' : 'text-muted-foreground'}`}>
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
        <div className={`relative border-t ${isDark ? 'border-primary-foreground/[0.06]' : 'border-border/40'}`}>
          <div className="max-w-[1080px] mx-auto px-5 md:px-10 lg:px-16 py-4 md:py-8">
            <div className="grid grid-cols-3 gap-2 md:gap-4">
              <StatItem value="15+" label="Years Combined" delay={0.1} isDark={isDark} />
              <StatItem value="$15B+" label="Deal Experience" delay={0.18} isDark={isDark} />
              <StatItem value={isIndia ? '3' : '50+'} label={isIndia ? 'Continents Covered' : 'Transactions'} delay={0.26} isDark={isDark} />
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

      {/* Team Sticky Deck */}
      <section className="bg-background pt-0 pb-10 md:pb-14">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8 lg:px-12 mb-8 md:mb-10">
          <FadeIn>
            <SectionLabel>{isIndia ? 'Our Team' : 'Team'}</SectionLabel>
            <GoldRule className="mt-1" />
          </FadeIn>
        </div>
        <TeamStickyDeck
          members={[
            ...founders.map(f => ({ ...f })),
            { ...indiaPartner, dealLogos: vaibhavDealLogos },
          ]}
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

      {/* Institutional Experience Marquee */}
      <div className="bg-background">
        <div className="max-w-[1080px] mx-auto px-5 md:px-10 lg:px-16 pt-8 md:pt-10 pb-8 md:pb-10">
          <FadeIn>
            <SectionLabel>Institutional Experience</SectionLabel>
            <GoldRule className="mt-1" />
          </FadeIn>
        </div>
        <FadeIn delay={0.1}>
          <LogoMarquee logos={isIndia ? allLogos : foundersLogos} duration={60} variant="dark" />
        </FadeIn>
      </div>
    </div>
  );
};

export default Team;