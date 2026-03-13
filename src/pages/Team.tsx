import React, { useState } from 'react';
import { useRegion } from '@/contexts/RegionContext';
import { Section, SectionLabel, FadeIn, GoldRule, HeroDivider } from '@/components/ui/Section';
import { motion } from 'framer-motion';
import LogoMarquee from '@/components/LogoMarquee';

// Photos
import harinPhoto from '@/assets/team/harin-gupta.jpg';
import bensonPhoto from '@/assets/team/benson-zhang.jpg';
import vaibhavPhoto from '@/assets/team/vaibhav-sharma.webp';

// Deal composite images (original logos)
import harinDealsImg from '@/assets/deals/harin-deals.png';
import bensonDealsImg from '@/assets/deals/benson-deals.png';

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
import iicLogo from '@/assets/logos/iic.png';
import treeforestLogo from '@/assets/logos/treeforest.png';
import lodhaGeniusLogo from '@/assets/logos/lodha-genius.png';
import swishinLogo from '@/assets/logos/swishin-ventures.png';
import berkeleyHaasLogo from '@/assets/logos/berkeley-haas.png';
import culinaryInstituteLogo from '@/assets/logos/culinary-institute.png';

interface LogoItem {
  src: string;
  alt: string;
  small?: boolean;
}

interface TeamMember {
  name: string;
  role: string;
  photo?: string;
  summary: string;
  highlights: string[];
  logos?: LogoItem[];
  dealImage?: string;
  linkedIn?: string;
}

const founders: TeamMember[] = [
  {
    name: 'Harin Gupta',
    role: 'Co-Founder',
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
      { src: jpMorganLogo, alt: 'J.P. Morgan' },
      { src: evercoreLogo, alt: 'Evercore' },
      { src: deutscheBankLogo, alt: 'Deutsche Bank' },
    ],
    dealImage: harinDealsImg,
  },
  {
    name: 'Benson Zhang',
    role: 'Co-Founder',
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
      { src: hggcLogo, alt: 'HGGC' },
      { src: creditSuisseLogo, alt: 'Credit Suisse' },
    ],
    dealImage: bensonDealsImg,
  },
];

const indiaPartner: TeamMember = {
  name: 'Vaibhav Sharma',
  role: 'Partner — India',
  photo: vaibhavPhoto,
  linkedIn: 'https://www.linkedin.com/in/vaibhavnabha/',
  summary:
    'Founder, operator, and investor with on-ground experience across Indian growth-stage businesses.',
  highlights: [
    'NITI Aayog — Policy and strategy advisory to the Government of India',
    'VC fund partnering with multiple family offices across India; early-stage investing and portfolio support',
    'Vermin Console — Institutional advisory on environmental compliance and regulatory frameworks',
    'Impact Investors Council — Policy engagement and ecosystem development for impact capital in India',
    'Young India Fellow, Ashoka University; Stanford University research grant recipient',
  ],
  logos: [
    { src: nitiAayogLogo, alt: 'NITI Aayog' },
    { src: ashokaLogo, alt: 'Ashoka University' },
    { src: iicLogo, alt: 'Impact Investors Council' },
    { src: treeforestLogo, alt: 'TreeForest Capital' },
    { src: lodhaGeniusLogo, alt: 'Lodha Genius' },
    { src: swishinLogo, alt: 'Swishin Ventures' },
  ],
};

// Founders only (US team view)
const foundersLogos = [
  { src: warburgLogo, alt: 'Warburg Pincus' },
  { src: blackrockLogo, alt: 'BlackRock' },
  { src: jpMorganLogo, alt: 'J.P. Morgan' },
  { src: evercoreLogo, alt: 'Evercore' },
  { src: deutscheBankLogo, alt: 'Deutsche Bank' },
  { src: hggcLogo, alt: 'HGGC' },
  { src: creditSuisseLogo, alt: 'Credit Suisse' },
  { src: berkeleyHaasLogo, alt: 'Berkeley Haas' },
  { src: culinaryInstituteLogo, alt: 'Culinary Institute of America', small: true },
];

// All logos merged (India team view)
const allLogos = [
  ...foundersLogos,
  { src: nitiAayogLogo, alt: 'NITI Aayog' },
  { src: ashokaLogo, alt: 'Ashoka University', small: true },
  { src: iicLogo, alt: 'Impact Investors Council', small: true },
  { src: treeforestLogo, alt: 'TreeForest Capital' },
  { src: lodhaGeniusLogo, alt: 'Lodha Genius' },
  { src: swishinLogo, alt: 'Swishin Ventures' },
];

/* ─── Deal Image Display (uses original composite logo images) ─── */
const DealImageDisplay = ({ src, alt }: { src: string; alt: string }) => {
  const [hovered, setHovered] = useState(false);
  const goldFilter = 'brightness(0) invert(67%) sepia(65%) saturate(400%) hue-rotate(358deg) brightness(92%)';

  return (
    <div
      className="relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img
        src={src}
        alt={alt}
        className="w-full max-w-[520px] object-contain transition-all duration-500 cursor-default"
        style={{
          filter: hovered ? 'none' : goldFilter,
          opacity: hovered ? 1 : 0.75,
        }}
        loading="lazy"
      />
    </div>
  );
};

/* ─── Profile Card ─── */
const ProfileCard = ({ member, index }: { member: TeamMember; index: number }) => {
  const LinkedWrapper = ({ children, className = '' }: { children: React.ReactNode; className?: string }) =>
    member.linkedIn ? (
      <a href={member.linkedIn} target="_blank" rel="noopener noreferrer" className={`cursor-pointer ${className}`}>
        {children}
      </a>
    ) : (
      <>{children}</>
    );

  return (
    <FadeIn delay={index * 0.08}>
      <motion.div
        whileHover={{ backgroundColor: 'hsl(40 18% 95% / 0.5)' }}
        transition={{ duration: 0.3 }}
        className="py-8 md:py-10 border-b border-foreground/[0.06] last:border-b-0 -mx-3 px-3 rounded-sm"
      >
        <div className="grid md:grid-cols-12 gap-5 md:gap-8 items-start">
          {/* Photo + Identity */}
          <div className="md:col-span-3 flex flex-col items-start">
            <LinkedWrapper>
              {member.photo ? (
                <div className="w-[100px] h-[100px] md:w-[120px] md:h-[120px] rounded-full overflow-hidden bg-muted border-2 border-foreground/[0.04] mb-4 shadow-[0_4px_20px_-4px_hsl(var(--prussian)/0.12)] group">
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="w-full h-full object-cover object-top grayscale group-hover:grayscale-0 transition-[filter] duration-500"
                  />
                </div>
              ) : (
                <div className="w-[100px] h-[100px] md:w-[120px] md:h-[120px] rounded-full bg-muted border-2 border-dashed border-foreground/[0.08] mb-4 flex items-center justify-center shadow-[0_4px_20px_-4px_hsl(var(--prussian)/0.08)]">
                  <span className="font-serif text-[1.5rem] text-muted-foreground/30">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
              )}
            </LinkedWrapper>
            <LinkedWrapper className="hover:opacity-80 transition-opacity">
              <h3 className="font-serif text-[1.15rem] md:text-[1.3rem] text-foreground tracking-[-0.02em] leading-[1.2]">
                {member.name}
              </h3>
            </LinkedWrapper>
            <p className="font-sans text-[9px] font-medium uppercase tracking-[0.22em] text-gold-dim mt-1">
              {member.role}
            </p>
          </div>

          {/* Bio */}
          <div className="md:col-span-9">
            <p className="font-sans text-[13px] text-muted-foreground leading-[1.75] mb-3">
              {member.summary}
            </p>
            <ul className="space-y-1.5">
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

            {/* Deal logos — original composite image with gold filter */}
            {member.dealImage && (
              <div className="mt-6 pt-4 border-t border-foreground/[0.05]">
                <DealImageDisplay src={member.dealImage} alt={`${member.name} deals`} />
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </FadeIn>
  );
};

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

      {/* Founders */}
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

      {/* Partner */}
      <section className="bg-cream px-5 md:px-10 lg:px-16 py-12 md:py-16 lg:py-20">
        <div className="max-w-[1080px] mx-auto">
          <div className="mb-5 md:mb-7">
            <FadeIn>
              <SectionLabel>Partner</SectionLabel>
              <GoldRule className="mt-1" />
            </FadeIn>
          </div>
          <div className="border-t border-foreground/[0.06]">
            <ProfileCard member={indiaPartner} index={0} />
          </div>
        </div>
      </section>

      {/* Institutional Experience Marquee */}
      <div>
        <div className="max-w-[1080px] mx-auto px-5 md:px-10 lg:px-16 pt-14 md:pt-20 pb-6">
          <FadeIn>
            <SectionLabel>Institutional Experience</SectionLabel>
            <GoldRule className="mt-1" />
          </FadeIn>
        </div>
        <FadeIn delay={0.1}>
          <LogoMarquee logos={isIndia ? allLogos : foundersLogos} duration={40} variant="dark" />
        </FadeIn>
      </div>

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