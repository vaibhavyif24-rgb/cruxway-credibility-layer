import React from 'react';
import { useRegion } from '@/contexts/RegionContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Link } from 'react-router-dom';
import { SectionLabel, FadeIn, GoldRule, HeroDivider } from '@/components/ui/Section';
import { motion } from 'framer-motion';
import LogoMarquee from '@/components/LogoMarquee';
import DarkSectionEffects from '@/components/DarkSectionEffects';
import GlassCard from '@/components/GlassCard';
import CinematicHero from '@/components/CinematicHero';
import ScrollRevealText from '@/components/ScrollRevealText';
import StickyCardStack from '@/components/StickyCardStack';

import heroIndiaHome from '@/assets/hero-india-home.jpg';
import heroUSHome from '@/assets/hero-us-home.jpg';

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
import nitiAayogLogo from '@/assets/logos/niti-aayog.png';
import ashokaLogo from '@/assets/logos/ashoka.png';
import iicLogo from '@/assets/logos/iic.png';
import treeforestLogo from '@/assets/logos/treeforest.png';
import lodhaGeniusLogo from '@/assets/logos/lodha-genius.png';
import swishinLogo from '@/assets/logos/swishin-ventures.png';

const foundersLogos = [
  { src: blackrockLogo, alt: 'BlackRock' },
  { src: warburgLogo, alt: 'Warburg Pincus', large: true },
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

const processStepsUS = [
  { num: '01', title: 'Identify', description: 'We go where others don\'t. Deep networks, proprietary sourcing, and years of relationship-building surface businesses before they ever reach a market.' },
  { num: '02', title: 'Evaluate', description: 'Every opportunity is stress-tested across financials, operations, culture, and market position. Rigour is our edge.' },
  { num: '03', title: 'Invest', description: 'Majority stakes structured to preserve what works: continuity for employees, clients, and the legacy founders built.' },
  { num: '04', title: 'Build', description: 'Hands-on partnership from day one. We professionalise systems, deploy capital, and accelerate growth alongside management.' },
];

const processStepsIndia = [
  { num: '01', title: 'Identify', description: 'Deep networks across India\'s industrial heartland surface founder-led businesses with strong fundamentals and operational upside.' },
  { num: '02', title: 'Evaluate', description: 'Every opportunity is stress-tested across financials, operations, culture, and market position with institutional rigour.' },
  { num: '03', title: 'Invest', description: 'Majority stakes structured to preserve what works: continuity for employees, clients, and the legacy founders built.' },
  { num: '04', title: 'Build', description: 'Hands-on partnership from day one. We professionalise systems, deploy capital, and accelerate growth alongside management.' },
];

const StatBlock = React.forwardRef<HTMLDivElement, { val: string; lbl: string; delay?: number; light?: boolean }>(
  ({ val, lbl, delay = 0, light = false }, ref) => (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      className="text-center"
    >
      <p className={`font-serif text-[clamp(1.4rem,3vw,2rem)] tracking-[-0.02em] ${light ? 'text-primary-foreground' : 'text-foreground'}`}>
        {val}
      </p>
      <p className={`font-sans text-[10px] md:text-[11px] font-medium uppercase tracking-[0.18em] mt-1.5 ${light ? 'text-primary-foreground/35' : 'text-muted-foreground/50'}`}>
        {lbl}
      </p>
    </motion.div>
  )
);
StatBlock.displayName = 'StatBlock';

const Home = () => {
  const { region } = useRegion();
  const { theme } = useTheme();
  const isIndia = region === 'india';

  return (
    <div>
      {/* Hero — region-specific cinematic photo with Ken Burns + gold geometric lines */}
      <section className="relative text-primary-foreground overflow-hidden min-h-[80vh] md:min-h-[85vh] flex items-end">
        <CinematicHero imageSrc={isIndia ? heroIndiaHome : heroUSHome} overlay="strong" />
        <DarkSectionEffects variant="hero" />

        <div className="relative z-10 max-w-[1080px] mx-auto px-5 md:px-10 lg:px-16 pb-12 md:pb-16 lg:pb-20 pt-32">
          <FadeIn>
            <SectionLabel light>{isIndia ? 'Cruxway India' : 'Investment Firm'}</SectionLabel>
          </FadeIn>
          <FadeIn delay={0.04}>
            <p className="font-sans text-[12px] md:text-[14px] font-medium uppercase tracking-[0.22em] text-gold/55 mb-4">
              Built for Owners Thinking Long-Term
            </p>
          </FadeIn>
          <FadeIn delay={0.08}>
            <h1 className="font-serif text-[clamp(2.2rem,5vw,3.8rem)] text-white max-w-[680px] leading-[1.08] tracking-[-0.03em] drop-shadow-[0_2px_12px_rgba(0,0,0,0.4)]">
              {isIndia
                ? <>Investing in India's Next Generation of <span className="text-gold">Essential</span> Companies</>
                : <>Building the <span className="text-gold">Next Generation</span> of Essential U.S. Companies</>}
            </h1>
          </FadeIn>
          <FadeIn delay={0.14}>
            <p className="font-sans text-[14px] md:text-[16px] text-white/65 leading-[1.75] mt-5 max-w-[520px] drop-shadow-[0_1px_6px_rgba(0,0,0,0.3)]">
              {isIndia
                ? 'Long-term capital and operational expertise for founder-led companies shaping India\'s economic future.'
                : 'Patient capital and hands-on partnership for essential businesses that keep America running.'}
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <GoldRule className="mt-5 md:mt-6" />
          </FadeIn>
          <FadeIn delay={0.28}>
            <div className="mt-6 md:mt-8 flex flex-wrap gap-3">
              <Link
                to={`/${region}/criteria`}
                className="btn-premium inline-block font-sans text-[11px] md:text-[12px] font-medium uppercase tracking-[0.16em] px-8 py-3.5 border border-white/[0.15] text-white/55 hover:border-gold/30 hover:text-white/80 transition-all duration-300"
              >
                Our Approach
              </Link>
              <Link
                to={`/${region}/contact`}
                className="btn-premium inline-block font-sans text-[11px] md:text-[12px] font-medium uppercase tracking-[0.16em] px-8 py-3.5 border border-gold/25 text-gold/65 hover:border-gold/45 hover:text-gold/90 transition-all duration-300"
              >
                Get in Touch
              </Link>
            </div>
          </FadeIn>
        </div>
        <HeroDivider />
      </section>

      {/* What We Do — Scroll-triggered reveal */}
      <ScrollRevealText
        label="What We Do"
        heading={
          isIndia
            ? 'Investing in and building the next generation of essential companies across India.'
            : 'Investing in and building essential U.S. companies across regulated, compliance-driven sectors.'
        }
        highlights={isIndia ? ['essential', 'building'] : ['essential', 'regulated']}
        subtext={
          isIndia
            ? 'Long-term capital and operational expertise for founder-led companies shaping India\'s economic future.'
            : 'We focus on owner-operated and family-held businesses where reliability, deep client relationships, and high barriers to entry define long-term value.'
        }
        variant="light"
      />

      {/* Market Thesis — Scroll reveal on dark */}
      <ScrollRevealText
        label={isIndia ? 'The Opportunity' : 'Our Thesis'}
        heading={
          isIndia
            ? 'India\'s lower middle market is one of the most under-served segments in global investing. Companies proven over decades are ready for a partner who can help them scale with discipline.'
            : 'Tens of thousands of essential businesses keep America running. Patient capital and operational expertise unlock their next chapter of growth.'
        }
        highlights={isIndia ? ['under-served', 'discipline'] : ['essential', 'Patient']}
        stats={
          isIndia
            ? [{ value: '63M+', label: 'MSMEs' }, { value: '<1%', label: 'Institutionally Backed' }, { value: '$5T', label: 'Economy by 2028' }]
            : [{ value: '10M+', label: 'Small Businesses' }, { value: '$10T+', label: 'Transition Value' }, { value: '70%+', label: 'Lack Succession Plans' }]
        }
        variant="dark"
      />

      {/* Our Process — Sticky Card Stack */}
      <section className="bg-background pt-10 md:pt-14 lg:pt-16 pb-4">
        <div className="max-w-[1080px] mx-auto px-5 md:px-10 lg:px-16">
          <FadeIn>
            <SectionLabel>Our Process</SectionLabel>
            <h2 className="font-serif text-[clamp(1.5rem,3vw,2.4rem)] text-foreground leading-[1.15] max-w-[480px] mb-3">
              From Discovery to Partnership
            </h2>
            <GoldRule className="mb-6 md:mb-8" />
          </FadeIn>
        </div>
        <StickyCardStack cards={isIndia ? processStepsIndia : processStepsUS} variant={theme === 'dark' ? 'dark' : 'light'} />
      </section>

      {/* Social Proof — Scroll-triggered reveal */}
      <ScrollRevealText
        heading={isIndia
          ? "Global institutional expertise applied locally, partnering with the founders shaping India's industrial future."
          : "Decades of institutional experience dedicated to partnering with the owners who built America's essential industries."
        }
        highlights={isIndia ? ['institutional', 'industrial'] : ['institutional', 'essential']}
        variant="light"
      />
      <div className="bg-background">
        <FadeIn delay={0.1}>
          <LogoMarquee logos={isIndia ? allLogos : foundersLogos} duration={40} variant="dark" />
        </FadeIn>
      </div>

      {/* CTA */}
      <section className="relative hero-gradient-animated text-primary-foreground overflow-hidden px-5 md:px-10 lg:px-16 py-10 md:py-14 lg:py-16">
        <DarkSectionEffects variant="cta" />
        <div className="relative max-w-[1080px] mx-auto">
          <div className="max-w-[540px]">
            <FadeIn>
              <SectionLabel light>Connect</SectionLabel>
              <h2 className="font-serif text-[clamp(1.4rem,3vw,2.2rem)] text-primary-foreground leading-[1.15] mb-4">
                {isIndia ? 'Partner With Us in India' : 'Start a Conversation'}
              </h2>
              <p className="font-sans text-[15px] md:text-[16px] text-primary-foreground/50 leading-[1.8] mb-6">
                {isIndia
                  ? 'If you\'re building a business meant to last in India, we\'d welcome a conversation about partnership.'
                  : 'If you\'re a founder considering your next chapter, we\'d welcome an honest discussion about long-term partnership.'}
              </p>
              <Link
                to={`/${region}/contact`}
                className="btn-premium inline-block font-sans text-[11px] md:text-[12px] font-medium uppercase tracking-[0.16em] px-8 py-3.5 border border-primary-foreground/[0.1] text-primary-foreground/50 hover:border-gold/30 hover:text-primary-foreground/75 transition-all duration-300"
              >
                Get in Touch
              </Link>
            </FadeIn>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
