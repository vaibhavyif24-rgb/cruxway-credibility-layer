import { useRegion } from '@/contexts/RegionContext';
import { Link } from 'react-router-dom';
import { SectionLabel, FadeIn, GoldRule, HeroDivider } from '@/components/ui/Section';
import { motion } from 'framer-motion';
import LogoMarquee from '@/components/LogoMarquee';
import DarkSectionEffects from '@/components/DarkSectionEffects';
import GlassCard from '@/components/GlassCard';
import heroImage from '@/assets/hero-crossroads.jpg';

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
  { num: '01', title: 'Identify', description: 'Source founder-led businesses in essential B2B sectors with durable competitive advantages.' },
  { num: '02', title: 'Evaluate', description: 'Rigorous due diligence across financials, operations, and culture.' },
  { num: '03', title: 'Invest', description: 'Majority stakes preserving continuity for employees, clients, and stakeholders.' },
  { num: '04', title: 'Build', description: 'Hands-on operational partnership to accelerate growth and professionalise systems.' },
];

const processStepsIndia = [
  { num: '01', title: 'Identify', description: 'Source founder-led businesses with strong fundamentals and operational upside.' },
  { num: '02', title: 'Evaluate', description: 'Rigorous due diligence across financials, operations, and culture.' },
  { num: '03', title: 'Invest', description: 'Majority stakes preserving continuity for employees, clients, and stakeholders.' },
  { num: '04', title: 'Build', description: 'Hands-on partnership to professionalise systems and accelerate growth.' },
];

const StatBlock = ({ val, lbl, delay = 0, light = false }: { val: string; lbl: string; delay?: number; light?: boolean }) => (
  <motion.div
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
);

const Home = () => {
  const { region } = useRegion();
  const isIndia = region === 'india';

  return (
    <div>
      {/* Hero — crossroads photo with Ken Burns */}
      <section className="relative text-primary-foreground overflow-hidden min-h-[80vh] md:min-h-[85vh] flex items-end">
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.02 }}
          animate={{ scale: 1.12 }}
          transition={{ duration: 20, ease: 'linear', repeat: Infinity, repeatType: 'reverse' }}
        >
          <img src={heroImage} alt="" className="w-full h-full object-cover" loading="eager" aria-hidden="true" />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/90 via-prussian/65 to-navy-deep/50" />
        <DarkSectionEffects variant="hero" />

        <div className="relative max-w-[1080px] mx-auto px-5 md:px-10 lg:px-16 pb-12 md:pb-16 lg:pb-20 pt-32">
          <FadeIn>
            <SectionLabel light>{isIndia ? 'Cruxway India' : 'Investment Firm'}</SectionLabel>
          </FadeIn>
          <FadeIn delay={0.04}>
            <p className="font-sans text-[12px] md:text-[14px] font-medium uppercase tracking-[0.22em] text-gold/55 mb-4">
              Built for Owners Thinking Long-Term
            </p>
          </FadeIn>
          <FadeIn delay={0.08}>
            <h1 className="font-serif text-[clamp(2.2rem,5vw,3.8rem)] text-white max-w-[680px] leading-[1.08] tracking-[-0.03em]">
              {isIndia
                ? 'Investing in India\'s Next Generation of Essential Companies'
                : 'Building the Next Generation of Essential U.S.\u00a0Companies'}
            </h1>
          </FadeIn>
          <FadeIn delay={0.14}>
            <p className="font-sans text-[14px] md:text-[16px] text-white/55 leading-[1.75] mt-5 max-w-[520px]">
              {isIndia
                ? 'We invest in majority stakes in founder-led companies across India\'s essential sectors, providing long-term capital and operational expertise.'
                : 'We invest in majority stakes in founder-led companies across the United States in essential B2B services, providing long-term capital and a commitment to preserving what works.'}
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

      {/* What We Do */}
      <section className="bg-background px-5 md:px-10 lg:px-16 py-10 md:py-14 lg:py-16">
        <div className="max-w-[1080px] mx-auto">
          <div className="grid lg:grid-cols-12 gap-6 md:gap-8 lg:gap-14">
            <div className="lg:col-span-5">
              <FadeIn>
                <SectionLabel>What We Do</SectionLabel>
                <h2 className="font-serif text-[clamp(1.5rem,3vw,2.4rem)] text-foreground leading-[1.15]">
                  {isIndia
                    ? 'Investing in & Building Companies Across India'
                    : 'Investing in & Building Essential U.S. Companies'}
                </h2>
                <GoldRule className="mt-3" />
              </FadeIn>
            </div>
            <div className="lg:col-span-7">
              <FadeIn delay={0.08}>
                <p className="font-sans text-[15px] md:text-[16px] text-muted-foreground leading-[1.8] mb-4">
                  {isIndia
                    ? 'Cruxway invests in majority stakes in founder-led and family-owned businesses across India\'s lower middle market. We focus on manufacturing, industrial services, and essential sectors where operational improvement and deep client relationships define long-term value.'
                    : 'Cruxway invests in majority stakes in founder-led and family-owned businesses in critical B2B services across the United States. We focus on regulated, compliance-driven sectors where reliability, deep client relationships, and high barriers to entry define long-term value.'}
                </p>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* Market Thesis — dark section */}
      <section className="relative bg-primary text-primary-foreground overflow-hidden">
        <DarkSectionEffects />
        <div className="relative max-w-[1080px] mx-auto px-5 md:px-10 lg:px-16 py-10 md:py-14 lg:py-16">
          <div className="grid lg:grid-cols-12 gap-6 md:gap-8 lg:gap-14">
            <div className="lg:col-span-5">
              <FadeIn>
                <SectionLabel light>{isIndia ? 'The Opportunity' : 'Our Thesis'}</SectionLabel>
                <h2 className="font-serif text-[clamp(1.4rem,3vw,2.2rem)] text-primary-foreground leading-[1.15]">
                  {isIndia ? 'Why India\'s Lower Middle Market' : 'Why U.S. Essential Services'}
                </h2>
                <GoldRule className="mt-3" />
              </FadeIn>
            </div>
            <div className="lg:col-span-7">
              <FadeIn delay={0.08}>
                <p className="font-sans text-[15px] md:text-[16px] text-primary-foreground/55 leading-[1.8] mb-4">
                  {isIndia
                    ? 'India\'s lower middle market is one of the most under-served segments in global investing. Thousands of founder-led businesses generate strong cash flows and dominate local markets, yet lack access to institutional capital.'
                    : 'The United States is home to tens of thousands of founder-led businesses in essential B2B services that maintain critical infrastructure and keep the economy running.'}
                </p>
                <p className="font-sans text-[15px] md:text-[16px] text-primary-foreground/55 leading-[1.8]">
                  {isIndia
                    ? 'We believe this gap represents a generational opportunity: companies proven over decades are ready for a partner who can help them scale with discipline.'
                    : 'Cruxway provides patient capital and operational expertise to preserve what founders built while unlocking the next chapter of growth.'}
                </p>
              </FadeIn>
              <FadeIn delay={0.16}>
                <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-primary-foreground/[0.06]">
                  {isIndia ? (
                    <>
                      <StatBlock val="63M+" lbl="MSMEs in India" delay={0} light />
                      <StatBlock val="<1%" lbl="Institutionally Backed" delay={0.08} light />
                      <StatBlock val="$5T" lbl="Economy by 2028" delay={0.16} light />
                    </>
                  ) : (
                    <>
                      <StatBlock val="10M+" lbl="U.S. Small Businesses" delay={0} light />
                      <StatBlock val="$10T+" lbl="Transition Value" delay={0.08} light />
                      <StatBlock val="70%+" lbl="Lack Succession Plans" delay={0.16} light />
                    </>
                  )}
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* Our Process — Glass Bento */}
      <section className="bg-background px-5 md:px-10 lg:px-16 py-10 md:py-14 lg:py-16">
        <div className="max-w-[1080px] mx-auto">
          <FadeIn>
            <SectionLabel>Our Process</SectionLabel>
            <h2 className="font-serif text-[clamp(1.5rem,3vw,2.4rem)] text-foreground leading-[1.15] max-w-[480px] mb-3">
              From Discovery to Partnership
            </h2>
            <GoldRule className="mb-8 md:mb-10" />
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
            {(isIndia ? processStepsIndia : processStepsUS).map((step, i) => (
              <GlassCard key={step.num} index={i} className="p-5 md:p-7">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full border border-gold/15 group-hover:border-gold/35 flex items-center justify-center transition-colors duration-500">
                    <span className="font-sans text-[10px] font-semibold tracking-wider text-gold/40 group-hover:text-gold/65 transition-colors duration-300">
                      {step.num}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-serif text-[1.15rem] md:text-[1.3rem] text-foreground tracking-[-0.01em] mb-2">
                      {step.title}
                    </h3>
                    <p className="font-sans text-[13px] md:text-[14px] text-muted-foreground leading-[1.7] group-hover:text-foreground/75 transition-colors duration-300">
                      {step.description}
                    </p>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Our Presence — logical region-aware with links */}
      <section className="relative bg-primary text-primary-foreground overflow-hidden">
        <DarkSectionEffects />
        <div className="relative max-w-[1080px] mx-auto px-5 md:px-10 lg:px-16 py-10 md:py-14 lg:py-16">
          <FadeIn>
            <SectionLabel light>Our Presence</SectionLabel>
            <h2 className="font-serif text-[clamp(1.4rem,2.8vw,2.1rem)] text-primary-foreground leading-[1.15] mb-6 md:mb-8">
              {isIndia ? 'Operating Across India & the U.S.' : 'Headquartered in the U.S., Operating Globally'}
            </h2>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-4 md:gap-5">
            <GlassCard index={0} variant="dark" className="p-6 md:p-8">
              <p className="font-sans text-[10px] font-medium uppercase tracking-[0.22em] text-gold/55 mb-1.5">
                {isIndia ? 'U.S. Headquarters' : 'Headquarters'}
              </p>
              <h3 className="font-serif text-[1.2rem] md:text-[1.4rem] text-primary-foreground leading-[1.2] mb-2">
                San Diego, California
              </h3>
              <p className="font-sans text-[13px] text-primary-foreground/40 leading-[1.65] mb-4">
                {isIndia
                  ? 'Our founding team operates from San Diego, bringing global PE experience to Indian markets.'
                  : 'Headquartered on the West Coast with a nationwide investment focus across the United States.'}
              </p>
              {isIndia && (
                <Link
                  to="/us"
                  className="font-sans text-[10px] font-medium uppercase tracking-[0.16em] text-gold/50 hover:text-gold/80 transition-colors duration-300 inline-flex items-center gap-1.5"
                >
                  View U.S. Operations →
                </Link>
              )}
            </GlassCard>

            <GlassCard index={1} variant="dark" className="p-6 md:p-8">
              <p className="font-sans text-[10px] font-medium uppercase tracking-[0.22em] text-gold/55 mb-1.5">
                {isIndia ? 'India Operations' : 'East Coast & India'}
              </p>
              <h3 className="font-serif text-[1.2rem] md:text-[1.4rem] text-primary-foreground leading-[1.2] mb-2">
                {isIndia ? 'GK II, Delhi' : 'New York City & Delhi'}
              </h3>
              <p className="font-sans text-[13px] text-primary-foreground/40 leading-[1.65] mb-4">
                {isIndia
                  ? 'Our India team operates from Delhi, with a network spanning key industrial regions nationwide.'
                  : 'East Coast presence for deal sourcing, plus our India team operating from Delhi for cross-border opportunities.'}
              </p>
              {!isIndia && (
                <Link
                  to="/india"
                  className="font-sans text-[10px] font-medium uppercase tracking-[0.16em] text-gold/50 hover:text-gold/80 transition-colors duration-300 inline-flex items-center gap-1.5"
                >
                  View India Operations →
                </Link>
              )}
            </GlassCard>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <div className="bg-background">
        <div className="max-w-[1080px] mx-auto px-5 md:px-10 lg:px-16 pt-10 md:pt-12 pb-4">
          <FadeIn>
            <SectionLabel>Institutional Experience</SectionLabel>
            <h2 className="font-serif text-[clamp(1.4rem,2.5vw,1.8rem)] text-foreground leading-[1.2] max-w-[520px]">
              {isIndia
                ? 'Global institutional experience brought to Indian markets'
                : 'Our team has invested and operated across leading global institutions'}
            </h2>
            <GoldRule className="mt-3" />
          </FadeIn>
        </div>
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
