import { SectionLabel, FadeIn, GoldRule, HeroDivider } from '@/components/ui/Section';
import { useRegion } from '@/contexts/RegionContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Link } from 'react-router-dom';
import DarkSectionEffects from '@/components/DarkSectionEffects';
import StickyCardStack from '@/components/StickyCardStack';


import GlassCard from '@/components/GlassCard';
import CriteriaCarousel from '@/components/CriteriaCarousel';

import CinematicHero from '@/components/CinematicHero';
import ScrollRevealText from '@/components/ScrollRevealText';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

import heroIndiaCriteria from '@/assets/hero-india-criteria.jpg';
import heroUSCriteria from '@/assets/hero-us-criteria.jpg';

const investmentProfile = {
  us: [
    { label: 'Revenue Range', value: '$5M – $50M' },
    { label: 'EBITDA Range', value: '$1.5M – $10M' },
    { label: 'Enterprise Value', value: '$5M – $75M' },
    { label: 'Structure', value: 'Majority control' },
    { label: 'Hold Period', value: 'Long-term / permanent' },
    { label: 'Geography', value: 'United States' },
  ],
  india: [
    { label: 'Revenue Range', value: '₹20Cr – ₹500Cr' },
    { label: 'EBITDA Range', value: '₹5Cr – ₹75Cr' },
    { label: 'Enterprise Value', value: '₹30Cr – ₹750Cr' },
    { label: 'Structure', value: 'Majority stakes' },
    { label: 'Hold Period', value: 'Long-term partnership' },
    { label: 'Geography', value: 'Pan-India' },
  ],
};

const usSectors = [
  {
    label: 'Electrical & Infrastructure',
    desc: 'High-voltage services, grid modernisation, and critical infrastructure maintenance',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
  },
  {
    label: 'Environmental Services',
    desc: 'Compliance-driven remediation, waste management, and sustainability services',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
        <path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66L12 14l-4 2c.5-2.5 2.5-6 8-8l1-4z" />
      </svg>
    ),
  },
  {
    label: 'Facility Services',
    desc: 'Building maintenance, security, and specialised facility management',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
        <rect x="4" y="2" width="16" height="20" rx="2" />
        <path d="M9 22v-4h6v4" /><line x1="9" y1="6" x2="10" y2="6" /><line x1="14" y1="6" x2="15" y2="6" />
        <line x1="9" y1="10" x2="10" y2="10" /><line x1="14" y1="10" x2="15" y2="10" />
        <line x1="9" y1="14" x2="10" y2="14" /><line x1="14" y1="14" x2="15" y2="14" />
      </svg>
    ),
  },
  {
    label: 'Engineering & Technical',
    desc: 'Inspection, testing, calibration, and specialised engineering solutions',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
      </svg>
    ),
  },
  {
    label: 'Compliance & Safety',
    desc: 'Regulatory compliance, audit, and risk management services',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    label: 'Industrial Distribution',
    desc: 'Specialised parts, equipment, and supply chain solutions for essential industries',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
        <rect x="1" y="6" width="22" height="12" rx="2" /><path d="M1 10h22" /><path d="M8 6v12" /><path d="M16 6v12" />
      </svg>
    ),
  },
];

/** Core criteria — unique to this page, not on Home */
const whatWeLookFor = [
  { title: 'Founder Succession & Transition', desc: 'Partnering with owners planning their next chapter while honouring legacy.' },
  { title: 'Essential Regulated Services', desc: 'Compliance-driven B2B businesses with recurring revenue and high switching costs.' },
  { title: 'Proven Customer Retention', desc: 'Consistent delivery earning trust that creates durable competitive advantages.' },
  { title: 'Growth Through Consolidation', desc: 'Platform strategy in fragmented industries driving superior returns.' },
  { title: 'Operational Upside', desc: 'Professionalisation of systems creating meaningful enterprise value.' },
  { title: 'Cultural & Values Alignment', desc: 'Integrity, stewardship, and long-term thinking — non-negotiable.' },
];

/** Animated stat counter */
const StatBlock = ({ label, value, delay = 0 }: { label: string; value: string; delay?: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-20px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 12 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      className="group text-center"
    >
      <div className="font-serif text-[clamp(1.3rem,2.5vw,1.8rem)] text-gold leading-none tracking-[-0.02em] mb-1.5 group-hover:text-gold/90 transition-colors duration-300">
        {value}
      </div>
      <div className="font-sans text-[10px] md:text-[11px] font-medium uppercase tracking-[0.18em] text-primary-foreground/35 group-hover:text-primary-foreground/50 transition-colors duration-300">
        {label}
      </div>
    </motion.div>
  );
};

const InvestmentCriteria = () => {
  const { region } = useRegion();
  const { theme } = useTheme();
  const isIndia = region === 'india';
  const profile = isIndia ? investmentProfile.india : investmentProfile.us;

  return (
    <div className="overflow-x-hidden">
      {/* Hero */}
      <section className="relative text-primary-foreground overflow-hidden min-h-[50vh] md:min-h-[55vh] flex items-end">
        <CinematicHero imageSrc={isIndia ? heroIndiaCriteria : heroUSCriteria} overlay="strong" />
        <DarkSectionEffects variant="hero" />
        <div className="relative z-10 max-w-[1080px] mx-auto px-5 md:px-10 lg:px-16 pt-28 pb-10 md:pt-36 md:pb-14 lg:pt-40 lg:pb-16">
          <FadeIn>
            <SectionLabel light>{isIndia ? 'Investment Criteria, India' : 'Investment Criteria'}</SectionLabel>
          </FadeIn>
          <FadeIn delay={0.08}>
            <h1 className="font-serif text-[clamp(2.2rem,5vw,3.6rem)] text-white max-w-[600px] leading-[1.1] tracking-[-0.03em] drop-shadow-[0_2px_12px_rgba(0,0,0,0.4)]">
              {isIndia ? <>Disciplined Capital for <span className="text-gold">India's</span> Best</> : <>What We Invest In and <span className="text-gold">Why</span></>}
            </h1>
          </FadeIn>
          <FadeIn delay={0.14}>
            <p className="font-sans text-[15px] md:text-[16px] text-white/65 leading-[1.75] mt-5 max-w-[480px] drop-shadow-[0_1px_6px_rgba(0,0,0,0.3)]">
              {isIndia
                ? 'A rigorous framework for identifying, evaluating, and partnering with India\'s most promising founder-led companies.'
                : 'Our disciplined criteria for identifying exceptional founder-led businesses with enduring competitive advantages.'}
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <GoldRule className="mt-4 md:mt-5" />
          </FadeIn>
        </div>
        <HeroDivider />
      </section>

      {/* Investment Profile — dark stats band */}
      <section className="relative bg-primary text-primary-foreground overflow-hidden">
        <DarkSectionEffects variant="cta" />
        <div className="relative max-w-[1080px] mx-auto px-5 md:px-10 lg:px-16 py-8 md:py-10">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-8">
            {profile.map((stat, i) => (
              <StatBlock key={stat.label} label={stat.label} value={stat.value} delay={i * 0.06} />
            ))}
          </div>
        </div>
      </section>

      {/* What We Look For — Carousel */}
      <section className="bg-background px-5 md:px-10 lg:px-16 py-10 md:py-14 lg:py-16">
        <div className="max-w-[1080px] mx-auto">
          <FadeIn>
            <SectionLabel>Investment Criteria</SectionLabel>
            <h2 className="font-serif text-[clamp(1.5rem,2.8vw,2.2rem)] text-foreground leading-[1.15] max-w-[480px] mb-2">
              What We Look For
            </h2>
            <p className="font-sans text-[14px] md:text-[15px] text-muted-foreground leading-[1.75] max-w-[540px] mb-4">
              We evaluate opportunities through a rigorous lens, seeking businesses with enduring competitive advantages and alignment with our long-term partnership model.
            </p>
            <GoldRule className="mt-3 mb-4 md:mb-5" />
          </FadeIn>
          <CriteriaCarousel
            items={whatWeLookFor.map((item) => ({
              title: item.title,
              desc: item.desc,
            }))}
          />
        </div>
      </section>

      {/* Evaluation Framework — Sticky Card Stack */}
      <section className="relative bg-primary text-primary-foreground">
        <DarkSectionEffects />
        <div className="relative max-w-[1080px] mx-auto px-5 md:px-10 lg:px-16 pt-10 md:pt-14 lg:pt-16">
          <FadeIn>
            <SectionLabel light>Evaluation Framework</SectionLabel>
            <h2 className="font-serif text-[clamp(1.5rem,2.8vw,2.2rem)] text-primary-foreground leading-[1.15]">
              How We Evaluate Opportunities
            </h2>
            <GoldRule className="mt-3 mb-6 md:mb-8" />
          </FadeIn>
        </div>
        <div className="relative">
          <StickyCardStack
            cards={[
              { num: '01', title: 'Discovery', description: 'We go beyond deal brokers. Our proprietary networks and deep sector relationships surface opportunities that never reach a market process.' },
              { num: '02', title: 'Evaluation', description: 'Strategic fit, market position, culture alignment, and growth vectors — every dimension is assessed with institutional rigour before we proceed.' },
              { num: '03', title: 'Diligence', description: 'Deep financial, operational, legal, and commercial analysis. We leave no stone unturned because conviction requires evidence.' },
              { num: '04', title: 'Structuring', description: 'Ownership, governance, and capital structures designed for decades — not exits. Every term reflects our commitment to lasting partnership.' },
            ]}
            variant="dark"
          />
        </div>
      </section>

      {/* Our Edge — scroll reveal intro */}
      <ScrollRevealText
        label="Our Edge"
        heading="A disciplined, repeatable framework for building lasting value in every business we partner with."
        variant="light"
      />

      {/* Value Creation Playbook cards */}
      {/* Value Creation Playbook — Carousel */}
      <section className="bg-background px-5 md:px-10 lg:px-16 pb-10 md:pb-14 lg:pb-16 -mt-10">
        <div className="max-w-[1080px] mx-auto">
          <CriteriaCarousel
            items={[
              { title: 'Stabilise & Professionalise', desc: 'Implement institutional-grade systems, reporting, and governance from day one.' },
              { title: 'Optimise Operations', desc: 'Drive margin improvement through operational excellence and best-practice deployment.' },
              { title: 'Invest in Growth', desc: 'Deploy capital into organic expansion, adjacent markets, and strategic acquisitions.' },
              { title: 'Compound Value', desc: 'Long-term hold periods allow compounding of operational improvements and market position.' },
            ]}
          />
        </div>
      </section>

      {/* Target Sectors — US only */}
      {!isIndia && (
        <section className="relative bg-primary text-primary-foreground overflow-hidden">
          <DarkSectionEffects />
          <div className="relative max-w-[1080px] mx-auto px-5 md:px-10 lg:px-16 py-10 md:py-14 lg:py-16">
            <FadeIn>
              <SectionLabel light>Target Sectors</SectionLabel>
              <h2 className="font-serif text-[clamp(1.3rem,2.5vw,1.8rem)] text-primary-foreground leading-[1.2] max-w-[480px] mb-2">
                Essential B2B Services Across the <span className="text-gold">United States</span>
              </h2>
              <p className="font-sans text-[14px] md:text-[15px] text-primary-foreground/40 leading-[1.75] max-w-[520px] mb-6 md:mb-8">
                We focus on sectors characterised by recurring revenue, regulatory requirements, and critical infrastructure dependency.
              </p>
              <GoldRule className="mb-6 md:mb-8" />
            </FadeIn>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
              {usSectors.map((sector, i) => (
                <GlassCard key={sector.label} index={i} variant="dark" className="p-5 md:p-6">
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 opacity-60 group-hover:opacity-90 transition-opacity duration-300 text-foreground">{sector.icon}</span>
                    <div>
                      <h4 className="font-serif text-[1rem] md:text-[1.1rem] text-primary-foreground leading-[1.3] mb-2">
                        {sector.label}
                      </h4>
                      <div className="w-5 h-px bg-gold/20 group-hover:bg-gold/40 group-hover:w-8 transition-all duration-500 mb-2" />
                      <p className="font-sans text-[13px] md:text-[14px] text-primary-foreground/40 leading-[1.7] group-hover:text-primary-foreground/60 transition-colors duration-300">
                        {sector.desc}
                      </p>
                    </div>
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>
        </section>
      )}

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
                  ? 'If you\'re building a business meant to last, we\'d welcome a conversation about partnership.'
                  : 'If you\'re a founder considering your next chapter, we\'d welcome the conversation.'}
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

export default InvestmentCriteria;