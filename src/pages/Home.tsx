import { useRegion } from '@/contexts/RegionContext';
import { Link } from 'react-router-dom';
import { Section, SectionLabel, FadeIn, GoldRule, HeroDivider } from '@/components/ui/Section';
import { motion, useInView } from 'framer-motion';
import LogoMarquee from '@/components/LogoMarquee';
import ApproachTable from '@/components/ApproachTable';
import { useRef } from 'react';

// Logos for social proof
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
  { num: '01', title: 'Identify', description: 'We source founder-led and family-owned businesses across the U.S. in essential B2B sectors with durable competitive advantages and strong client relationships.' },
  { num: '02', title: 'Evaluate', description: 'Rigorous due diligence across financials, operations, and culture to ensure alignment between the business, its people, and our long-term vision.' },
  { num: '03', title: 'Acquire', description: 'We acquire majority stakes through structured transactions designed to preserve continuity for employees, clients, and stakeholders while providing founders a clean transition.' },
  { num: '04', title: 'Build', description: 'Hands-on operational partnership to accelerate growth, professionalise systems, and unlock value without disrupting what already works.' },
];

const processStepsIndia = [
  { num: '01', title: 'Identify', description: 'We source founder-led and family-owned businesses across India\'s lower middle market with strong fundamentals and operational upside.' },
  { num: '02', title: 'Evaluate', description: 'Rigorous due diligence across financials, operations, and culture to ensure alignment between the business, its people, and our long-term vision.' },
  { num: '03', title: 'Acquire', description: 'We acquire majority stakes through structured transactions designed to preserve continuity for employees, clients, and stakeholders while providing founders a clean transition.' },
  { num: '04', title: 'Build', description: 'Hands-on operational partnership to professionalise systems, strengthen governance, and accelerate growth across Indian markets.' },
];

const usSectors = [
  { label: 'Electrical & Infrastructure', desc: 'High-voltage services, grid modernisation, and critical infrastructure maintenance' },
  { label: 'Environmental Services', desc: 'Compliance-driven remediation, waste management, and sustainability services' },
  { label: 'Facility Services', desc: 'Building maintenance, security, and specialised facility management' },
  { label: 'Engineering & Technical', desc: 'Inspection, testing, calibration, and specialised engineering solutions' },
  { label: 'Compliance & Safety', desc: 'Regulatory compliance, audit, and risk management services' },
  { label: 'Industrial Distribution', desc: 'Specialised parts, equipment, and supply chain solutions for essential industries' },
];

/* ── Sector Grid Widget ── */
const SectorCard = ({ sector, index }: { sector: { label: string; desc: string }; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-30px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 12 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className="group relative"
    >
      <motion.div
        whileHover={{ y: -2 }}
        transition={{ duration: 0.2 }}
        className="relative pl-4 py-4 border-l border-foreground/[0.05] hover:border-gold/30 transition-colors duration-400"
      >
        <motion.div
          className="absolute left-[-2.5px] top-5 w-[5px] h-[5px] rounded-full bg-gold/0 group-hover:bg-gold/50 transition-all duration-300"
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ duration: 0.3, delay: index * 0.06 + 0.3 }}
        />
        <h4 className="font-serif text-[0.92rem] md:text-[0.95rem] text-foreground mb-0.5 leading-[1.3]">
          {sector.label}
        </h4>
        <p className="font-sans text-[11px] md:text-[11.5px] text-muted-foreground/60 leading-[1.6] group-hover:text-muted-foreground/80 transition-colors duration-300">
          {sector.desc}
        </p>
      </motion.div>
    </motion.div>
  );
};

/* ── Animated Stat ── */
const StatBlock = ({ val, lbl, delay = 0, light = false }: { val: string; lbl: string; delay?: number; light?: boolean }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    className="text-center"
  >
    <p className={`font-serif text-[clamp(1.2rem,2.5vw,1.65rem)] tracking-[-0.02em] ${light ? 'text-primary-foreground' : 'text-foreground'}`}>
      {val}
    </p>
    <p className={`font-sans text-[9px] font-medium uppercase tracking-[0.18em] mt-1.5 ${light ? 'text-primary-foreground/25' : 'text-muted-foreground/40'}`}>
      {lbl}
    </p>
  </motion.div>
);

const Home = () => {
  const { region } = useRegion();
  const isIndia = region === 'india';

  return (
    <div>
      {/* Hero */}
      <section className="relative hero-gradient-animated text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/40 via-transparent to-navy-deep/20 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-gold/[0.02] rounded-full blur-[120px] pointer-events-none" />
        <div className="relative max-w-[1080px] mx-auto px-5 md:px-10 lg:px-16 pt-24 pb-12 md:pt-36 md:pb-24 lg:pt-44 lg:pb-32">
          <FadeIn>
            <SectionLabel light>{isIndia ? 'Cruxway India' : 'Investment Firm'}</SectionLabel>
          </FadeIn>
          <FadeIn delay={0.06}>
            <h1 className="font-serif text-[clamp(1.85rem,4.5vw,3.4rem)] text-primary-foreground max-w-[620px] leading-[1.1] tracking-[-0.025em]">
              {isIndia
                ? 'Low Market Buyouts & Acquisitions in India'
                : 'The Right Partner for Enduring\u00a0Businesses'}
            </h1>
          </FadeIn>
          <FadeIn delay={0.14}>
            <p className="font-sans text-[13px] md:text-[13.5px] text-primary-foreground/35 leading-[1.7] mt-4 md:mt-5 max-w-[460px]">
              {isIndia
                ? 'We acquire majority stakes in founder-led companies across India\'s essential sectors, providing long-term capital, operational expertise, and a commitment to preserving what works.'
                : 'We acquire majority stakes in founder-led companies across the United States in essential B2B services, providing long-term capital, operational expertise, and a commitment to preserving what works.'}
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <GoldRule className="mt-5 md:mt-7" />
          </FadeIn>
          <FadeIn delay={0.28}>
            <div className="mt-7 md:mt-10 flex flex-wrap gap-2.5 md:gap-3">
              <Link
                to={`/${region}/about`}
                className="btn-premium inline-block font-sans text-[9.5px] font-medium uppercase tracking-[0.16em] px-7 py-3 border border-primary-foreground/[0.1] text-primary-foreground/40 hover:border-gold/25 hover:text-primary-foreground/70 transition-all duration-300"
              >
                Our Approach
              </Link>
              <Link
                to={`/${region}/contact`}
                className="btn-premium inline-block font-sans text-[9.5px] font-medium uppercase tracking-[0.16em] px-7 py-3 border border-gold/15 text-gold/50 hover:border-gold/35 hover:text-gold/80 transition-all duration-300"
              >
                Get in Touch
              </Link>
            </div>
          </FadeIn>
        </div>
        <HeroDivider />
      </section>

      {/* What We Do */}
      <section className="bg-background px-5 md:px-10 lg:px-16 py-9 md:py-14 lg:py-20">
        <div className="max-w-[1080px] mx-auto">
        <div className="grid lg:grid-cols-12 gap-4 md:gap-8 lg:gap-16">
          <div className="lg:col-span-5">
            <FadeIn>
              <SectionLabel>What We Do</SectionLabel>
              <h2 className="font-serif text-[clamp(1.35rem,2.5vw,2rem)] text-foreground leading-[1.18]">
                {isIndia
                  ? 'Acquiring & Building Companies Across India'
                  : 'Acquiring & Building Essential U.S. Companies'}
              </h2>
              <GoldRule className="mt-3 md:mt-5" />
            </FadeIn>
          </div>
          <div className="lg:col-span-7">
            <FadeIn delay={0.08}>
              <p className="font-sans text-[13px] md:text-[13.5px] text-muted-foreground leading-[1.75] md:leading-[1.8] mb-3 md:mb-4">
                {isIndia
                  ? 'Cruxway acquires majority stakes in founder-led and family-owned businesses across India\'s lower middle market. We focus on manufacturing, industrial services, and essential sectors where operational improvement and deep client relationships define long-term value.'
                  : 'Cruxway acquires majority stakes in founder-led and family-owned businesses in critical B2B services across the United States. We focus on regulated, compliance-driven sectors where reliability, deep client relationships, and high barriers to entry define long-term value.'}
              </p>
              <p className="font-sans text-[13px] md:text-[13.5px] text-muted-foreground leading-[1.75] md:leading-[1.8]">
                {isIndia
                  ? 'Our team brings global institutional experience to companies seeking a partner who understands both local markets and world-class standards.'
                  : 'Our team brings institutional investing and operating experience to companies seeking a long-term partner, not a financial sponsor with a five-year clock. We acquire to hold, build, and grow for decades.'}
              </p>
            </FadeIn>
          </div>
        </div>
        </div>
      </section>

      {/* US Market Thesis / India Opportunity */}
      {!isIndia ? (
        <>
          {/* US Market Thesis */}
          <section className="relative bg-primary text-primary-foreground overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-prussian-mid/20 via-transparent to-navy-deep/30 pointer-events-none" />
            <div className="absolute top-0 right-0 w-[350px] h-[250px] bg-gold/[0.01] rounded-full blur-[100px] pointer-events-none" />
            <div className="relative max-w-[1080px] mx-auto px-5 md:px-10 lg:px-16 py-9 md:py-14 lg:py-20">
              <div className="grid lg:grid-cols-12 gap-4 md:gap-8 lg:gap-16">
                <div className="lg:col-span-5">
                  <FadeIn>
                    <SectionLabel light>Our Thesis</SectionLabel>
                    <h2 className="font-serif text-[clamp(1.2rem,2.5vw,1.85rem)] text-primary-foreground leading-[1.18]">
                      Why U.S. Essential Services
                    </h2>
                    <GoldRule className="mt-3 md:mt-5" />
                  </FadeIn>
                </div>
                <div className="lg:col-span-7">
                  <FadeIn delay={0.08}>
                    <p className="font-sans text-[13px] md:text-[13.5px] text-primary-foreground/40 leading-[1.75] md:leading-[1.8] mb-3 md:mb-4">
                      The United States is home to tens of thousands of founder-led businesses in essential B2B services: companies that maintain critical infrastructure, ensure regulatory compliance, and keep the economy running. Many of these businesses were built over decades by owners who are now approaching transition without a clear succession plan.
                    </p>
                    <p className="font-sans text-[13px] md:text-[13.5px] text-primary-foreground/40 leading-[1.75] md:leading-[1.8]">
                      These companies are highly resilient, often counter-cyclical, and deeply embedded in their customer relationships. Yet most are too small for large private equity and too complex for unsophisticated buyers. Cruxway exists to fill this gap: providing patient capital and operational expertise to preserve what founders built while unlocking the next chapter of growth.
                    </p>
                  </FadeIn>
                  <FadeIn delay={0.16}>
                    <div className="grid grid-cols-3 gap-3 md:gap-4 mt-6 md:mt-8 pt-5 md:pt-6 border-t border-primary-foreground/[0.06]">
                      <StatBlock val="10M+" lbl="U.S. Small Businesses" delay={0} light />
                      <StatBlock val="$10T+" lbl="Transition Value" delay={0.08} light />
                      <StatBlock val="70%+" lbl="Lack Succession Plans" delay={0.16} light />
                    </div>
                  </FadeIn>
                </div>
              </div>
            </div>
          </section>

          {/* Target Sectors */}
          <section className="bg-cream px-5 md:px-10 lg:px-16 py-9 md:py-14 lg:py-20">
            <div className="max-w-[1080px] mx-auto">
              <FadeIn>
                <SectionLabel>Target Sectors</SectionLabel>
                <h2 className="font-serif text-[clamp(1.2rem,2vw,1.6rem)] text-foreground leading-[1.2] max-w-[480px] mb-2">
                  Essential B2B services across the United States
                </h2>
                <GoldRule className="mt-3 md:mt-4 mb-5 md:mb-9" />
              </FadeIn>

              <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-4 md:gap-x-8 gap-y-0">
                {usSectors.map((sector, i) => (
                  <SectorCard key={sector.label} sector={sector} index={i} />
                ))}
              </div>
            </div>
          </section>
        </>
      ) : (
        <section className="bg-cream px-5 md:px-10 lg:px-16 py-9 md:py-14 lg:py-20">
          <div className="max-w-[1080px] mx-auto">
            <div className="grid lg:grid-cols-12 gap-4 md:gap-8 lg:gap-16">
              <div className="lg:col-span-5">
                <FadeIn>
                  <SectionLabel>The Opportunity</SectionLabel>
                  <h2 className="font-serif text-[clamp(1.2rem,2.5vw,1.85rem)] text-foreground leading-[1.18]">
                    Why India's Lower Middle Market
                  </h2>
                  <GoldRule className="mt-3 md:mt-5" />
                </FadeIn>
              </div>
              <div className="lg:col-span-7">
                <FadeIn delay={0.08}>
                  <p className="font-sans text-[13.5px] text-muted-foreground leading-[1.8] mb-4">
                    India's lower middle market is one of the most under-served segments in global investing. Thousands of founder-led businesses generate strong cash flows and dominate local markets, yet lack access to institutional capital, operational best practices, and structured succession planning.
                  </p>
                  <p className="font-sans text-[13.5px] text-muted-foreground leading-[1.8]">
                    We believe this gap represents a generational opportunity: companies that have proven their resilience over decades are ready for a partner who can help them scale with discipline, not disrupt what already works.
                  </p>
                </FadeIn>
                <FadeIn delay={0.16}>
                  <div className="grid grid-cols-3 gap-3 md:gap-4 mt-6 md:mt-8 pt-5 md:pt-6 border-t border-foreground/[0.06]">
                    <StatBlock val="63M+" lbl="MSMEs in India" delay={0} />
                    <StatBlock val="<1%" lbl="Institutionally Backed" delay={0.08} />
                    <StatBlock val="$5T" lbl="Economy by 2028" delay={0.16} />
                  </div>
                </FadeIn>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Our Process */}
      <section className="relative bg-primary text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/40 via-transparent to-navy-deep/20 pointer-events-none" />
        <div className="absolute top-1/4 left-0 w-[300px] h-[200px] bg-gold/[0.015] rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[300px] bg-prussian-mid/30 rounded-full blur-[120px] pointer-events-none" />
        <div className="relative max-w-[1080px] mx-auto px-5 md:px-10 lg:px-16 py-10 md:py-18 lg:py-24">
          <FadeIn>
            <SectionLabel light>Our Process</SectionLabel>
            <h2 className="font-serif text-[clamp(1.35rem,2.5vw,2rem)] text-primary-foreground leading-[1.18] max-w-[480px] mb-1.5">
              From Discovery to Partnership
            </h2>
            <GoldRule className="mb-6 md:mb-10 lg:mb-14" />
          </FadeIn>

          {/* Premium vertical timeline */}
          <div className="relative">
            {/* Vertical connector line (mobile) / Horizontal (desktop) */}
            <div className="absolute left-[15px] md:left-[18px] lg:left-0 top-0 bottom-0 lg:top-[22px] lg:bottom-auto lg:right-0 lg:h-px w-px lg:w-full bg-primary-foreground/[0.06]" />

            <div className="space-y-0 lg:space-y-0 lg:grid lg:grid-cols-4 lg:gap-0">
              {(isIndia ? processStepsIndia : processStepsUS).map((step, i) => (
                <FadeIn key={step.num} delay={i * 0.12}>
                  <motion.div
                    whileHover={{ y: -3 }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                    className="group relative pl-10 md:pl-12 lg:pl-0 lg:pr-6 py-5 md:py-6 lg:py-0"
                  >
                    {/* Timeline node */}
                    <div className="absolute left-0 lg:left-auto lg:relative lg:mb-5">
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: i * 0.12 + 0.2, ease: [0.22, 1, 0.36, 1] }}
                        className="relative"
                      >
                        {/* Outer ring */}
                        <div className="w-[30px] h-[30px] md:w-[36px] md:h-[36px] rounded-full border border-gold/20 group-hover:border-gold/40 transition-colors duration-500 flex items-center justify-center bg-primary/80 backdrop-blur-sm">
                          {/* Inner dot */}
                          <motion.div
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.3, delay: i * 0.12 + 0.4 }}
                            className="w-[6px] h-[6px] md:w-[8px] md:h-[8px] rounded-full bg-gold/40 group-hover:bg-gold/70 transition-colors duration-300"
                          />
                        </div>
                        {/* Glow on hover */}
                        <div className="absolute inset-0 rounded-full bg-gold/0 group-hover:bg-gold/[0.06] blur-[8px] transition-all duration-500" />
                      </motion.div>
                    </div>

                    {/* Step number */}
                    <motion.span
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: i * 0.12 + 0.3 }}
                      className="font-sans text-[9px] font-medium uppercase tracking-[0.2em] text-gold/25 group-hover:text-gold/45 transition-colors duration-500 block mb-2"
                    >
                      Step {step.num}
                    </motion.span>

                    {/* Title */}
                    <h3 className="font-serif text-[1.05rem] md:text-[1.15rem] text-primary-foreground tracking-[-0.01em] mb-1.5 group-hover:text-primary-foreground transition-colors duration-300">
                      {step.title}
                    </h3>

                    {/* Description */}
                    <p className="font-sans text-[11.5px] md:text-[12px] text-primary-foreground/25 group-hover:text-primary-foreground/40 leading-[1.7] transition-colors duration-300">
                      {step.description}
                    </p>

                    {/* Bottom accent line on mobile */}
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: 32 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: i * 0.12 + 0.5, ease: [0.22, 1, 0.36, 1] }}
                      className="h-px bg-gold/15 mt-4 lg:mt-5"
                    />
                  </motion.div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Approach */}
      <section className="bg-background px-5 md:px-10 lg:px-16 py-9 md:py-14 lg:py-20">
        <div className="max-w-[1080px] mx-auto">
          <FadeIn>
            <SectionLabel>Our Approach</SectionLabel>
            <GoldRule className="mt-1 mb-5 md:mb-10" />
          </FadeIn>

          <ApproachTable
            items={isIndia
              ? [
                  { t: 'Founder Alignment', d: 'Partnerships designed around the founder\'s vision and growth timeline, not fund constraints.' },
                  { t: 'Operational Depth', d: 'Hands-on involvement alongside management teams to professionalise and scale.' },
                  { t: 'Disciplined Capital', d: 'Leverage as an enabler, not a strategy.' },
                  { t: 'Lower Middle Market', d: 'Deep conviction in India\'s under-served segment where operational improvement unlocks outsized value.' },
                ]
              : [
                  { t: 'Long-Term Alignment', d: 'Hold periods designed around value creation, not fund timelines. We acquire majority stakes to hold and build, not to flip.' },
                  { t: 'Operational Depth', d: 'Hands-on involvement alongside management teams to drive growth, professionalise systems, and expand capabilities.' },
                  { t: 'Disciplined Capital', d: 'Leverage as an enabler, not a strategy. We protect downside while investing for long-term upside.' },
                  { t: 'Selective Focus', d: 'One platform at a time. Deep conviction and concentrated attention, not diversification across dozens of portfolio companies.' },
                ]}
          />
        </div>
      </section>

      {/* Social Proof */}
      <div className="bg-cream">
        <div className="max-w-[1080px] mx-auto px-5 md:px-10 lg:px-16 pt-8 md:pt-12 lg:pt-14 pb-2 md:pb-3">
          <FadeIn>
            <SectionLabel>Institutional Experience</SectionLabel>
            <h2 className="font-serif text-[clamp(1.2rem,2vw,1.6rem)] text-foreground leading-[1.2] max-w-[520px]">
              {isIndia
                ? 'Global institutional experience brought to Indian markets'
                : 'Our team has invested and operated across leading global institutions'}
            </h2>
            <GoldRule className="mt-3 md:mt-4" />
          </FadeIn>
        </div>
        <FadeIn delay={0.1}>
          <LogoMarquee logos={isIndia ? allLogos : foundersLogos} duration={40} variant="dark" />
        </FadeIn>
      </div>

      {/* CTA */}
      <section className="hero-gradient-animated text-primary-foreground px-5 md:px-10 lg:px-16 py-8 md:py-12 lg:py-16">
        <div className="max-w-[1080px] mx-auto">
          <div className="max-w-[480px]">
            <FadeIn>
              <SectionLabel light>Connect</SectionLabel>
              <h2 className="font-serif text-[clamp(1.2rem,2.5vw,1.85rem)] text-primary-foreground leading-[1.18] mb-3 md:mb-4">
                {isIndia ? 'Partner With Us in India' : 'Built for Owners Thinking Long-Term'}
              </h2>
              <p className="font-sans text-[12.5px] md:text-[13.5px] text-primary-foreground/30 leading-[1.75] md:leading-[1.8] mb-5 md:mb-7">
                {isIndia
                  ? 'If you\'re building a business meant to last in India, we\'d welcome a conversation about partnership.'
                  : 'If you\'re a founder or business owner considering your next chapter, we\'d welcome the conversation. No pressure, no timeline, just an honest discussion about what partnership could look like.'}
              </p>
              <Link
                to={`/${region}/contact`}
                className="btn-premium inline-block font-sans text-[9.5px] font-medium uppercase tracking-[0.16em] px-7 py-3 border border-primary-foreground/[0.08] text-primary-foreground/35 hover:border-gold/25 hover:text-primary-foreground/65 transition-all duration-300"
              >
                Start a Conversation
              </Link>
            </FadeIn>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
