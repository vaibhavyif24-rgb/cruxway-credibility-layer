import React, { useState } from 'react';
import { SectionLabel, FadeIn, GoldRule, HeroDivider } from '@/components/ui/Section';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { useRegion } from '@/contexts/RegionContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Link } from 'react-router-dom';
import DarkSectionEffects from '@/components/DarkSectionEffects';
import LightSectionEffects from '@/components/LightSectionEffects';
import CinematicHero from '@/components/CinematicHero';
import WaveBackground from '@/components/WaveBackground';
import { motion, AnimatePresence, useInView, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

import heroIndiaCriteria from '@/assets/hero-india-criteria.jpg';
import heroUSCriteria from '@/assets/hero-us-criteria.jpg';

const investmentProfile = {
  us: [
    { label: 'Revenue Range', value: '$1M – $10M' },
    { label: 'EBITDA Range', value: '$500K – $2.5M+' },
    { label: 'Structure', value: 'Primarily majority control, with structured minority investments where alignment is strong' },
    { label: 'Hold Period', value: 'Long-term ownership with no predefined exit horizon' },
    { label: 'Aligned Partnerships', value: 'Prioritize situations where owners reinvest and teams remain in place' },
  ],
  india: [
    { label: 'Revenue Range', value: '₹10Cr – ₹100Cr' },
    { label: 'EBITDA Range', value: '₹5Cr – ₹25Cr+' },
    { label: 'Structure', value: 'Primarily majority control, with structured minority investments where alignment is strong' },
    { label: 'Hold Period', value: 'Long-term ownership with no predefined exit horizon' },
    { label: 'Aligned Partnerships', value: 'Prioritize situations where owners reinvest and teams remain in place' },
  ],
};

const whatWeLookFor = [
  { num: '01', title: 'Ownership Succession', desc: 'Partnering with owners ready for the next chapter: retirees, families, and founders seeking continuity for the businesses and teams they built.' },
  { num: '02', title: 'Essential & Regulated Services', desc: 'Compliance-driven B2B sectors across underserved and overlooked markets where reliability, safety, and recurring demand create natural moats.' },
  { num: '03', title: 'Recurring Revenue & Retention', desc: 'Businesses with established customer trust, high switching costs, and proven persistency that generates predictable, compounding cash flows.' },
  { num: '04', title: 'Platform & Consolidation Potential', desc: 'Fragmented, underserved markets where disciplined investment compounds value over a long hold period across multiple stages of growth.' },
  { num: '05', title: 'Operational Improvement Runway', desc: 'Undermanaged businesses where professionalized systems, reporting, and governance unlock enterprise value while preserving the culture that built the company.' },
  { num: '06', title: 'Prudent Capital Structure', desc: 'Conservative leverage philosophy focused on business building and cash flow generation, not financial engineering.' },
];

const indiaSectors = {
  left: {
    heading: 'Industrials',
    items: [
      { name: 'Process & Flow Control', desc: 'Valves, pumps, instrumentation' },
      { name: 'Value-Added Distribution', desc: 'Technical & industrial products' },
      { name: 'Industrial Services', desc: 'Maintenance, repair & operations' },
      { name: 'Packaging & Containers', desc: 'Speciality & industrial packaging' },
    ],
  },
  right: {
    heading: 'Business & Industrial Services',
    items: [
      { name: 'Facility & Support Services', desc: 'Cleaning, security, staffing' },
      { name: 'Testing & Certification', desc: 'Quality assurance & compliance' },
      { name: 'Infrastructure Services', desc: 'Utilities, telecom, transport' },
      { name: 'Industrial Technology', desc: 'Automation & process software' },
    ],
  },
};

const usSectors = {
  left: {
    heading: 'Financial and Compliance Services',
    items: [
      { name: 'RIAs and Wealth Management', desc: 'Registered investment advisers and wealth platforms' },
      { name: 'Accounting, Bookkeeping, and Tax', desc: 'Full-cycle financial operations and compliance' },
      { name: 'SOC Compliance and Related Services', desc: 'Security audits, attestation, and regulatory frameworks' },
    ],
  },
  right: {
    heading: 'Power and IT Services',
    items: [
      { name: 'Electrical Testing and Maintenance', desc: 'High-voltage testing, commissioning, and maintenance' },
      { name: 'Transformer and Power Engineering', desc: 'Design, protection, controls, and automation engineering' },
      { name: 'Cybersecurity and MSPs', desc: 'Managed security services and IT infrastructure providers' },
    ],
  },
};

const OurFocus = () => {
  const { region } = useRegion();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const isIndia = region === 'india';
  const isMobile = useIsMobile();
  const profile = isIndia ? investmentProfile.india : investmentProfile.us;
  const sectors = isIndia ? indiaSectors : usSectors;

  const numberCards = profile.slice(0, 2);
  const textCards = profile.slice(2);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="overflow-x-clip">
      {/* Hero */}
      <section className={`relative overflow-hidden min-h-[50vh] md:min-h-[55vh] flex items-end ${isDark ? 'text-primary-foreground' : 'text-foreground'}`}>
        <CinematicHero imageSrc={isIndia ? heroIndiaCriteria : heroUSCriteria} overlay="strong" />
        {isDark ? <DarkSectionEffects variant="hero" /> : <LightSectionEffects variant="hero" />}
        <div className="relative z-10 max-w-[1080px] mx-auto px-5 md:px-10 lg:px-16 pt-28 pb-10 md:pt-36 md:pb-14 lg:pt-40 lg:pb-14">
          <FadeIn>
            <SectionLabel light={isDark}>{isIndia ? 'Our Focus, India' : 'Our Focus'}</SectionLabel>
          </FadeIn>
          <FadeIn delay={0.08}>
            <h1 className={`text-shimmer-gold font-serif text-[clamp(2.2rem,5vw,3.6rem)] max-w-[600px] leading-[1.1] tracking-[-0.03em] ${isDark ? 'text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.4)]' : 'text-foreground drop-shadow-[0_1px_8px_rgba(0,0,0,0.12)]'}`}>
              {isIndia ? <><span className="text-gold">Disciplined</span> Capital for India's Best</> : <>Where <span className="text-gold">Conviction</span> Meets Capital</>}
            </h1>
          </FadeIn>
          <FadeIn delay={0.14}>
            <p className={`font-sans text-[15px] md:text-[16px] leading-[1.75] mt-5 max-w-[480px] ${isDark ? 'text-white/65 drop-shadow-[0_1px_6px_rgba(0,0,0,0.3)]' : 'text-muted-foreground drop-shadow-[0_1px_4px_rgba(0,0,0,0.08)]'}`}>
              {isIndia
                ? 'A rigorous framework for identifying, evaluating, and partnering with India\'s most promising founder-led companies.'
                : 'Our disciplined criteria for identifying exceptional businesses with enduring competitive advantages.'}
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <GoldRule className="mt-4 md:mt-5" />
          </FadeIn>
        </div>
        <HeroDivider />
      </section>


      {/* Investment Profile */}
      <section id="investment-profile" className={`relative overflow-hidden ${
        isDark ? 'bg-primary text-primary-foreground' : 'bg-[hsl(40,18%,96%)] text-foreground border-y border-[hsl(38,12%,90%)]'
      }`}>
        {isDark ? <DarkSectionEffects variant="cta" /> : <LightSectionEffects variant="section" />}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute inset-0" style={{
            background: 'linear-gradient(105deg, transparent 40%, hsl(40,65%,44%,0.03) 50%, transparent 60%)',
            backgroundSize: '300% 100%',
            animation: 'shimmer-sweep 8s linear infinite',
          }} />
        </div>
        <motion.div
          className="absolute top-0 left-0 right-0 h-px z-10"
          style={{ background: 'linear-gradient(90deg, transparent, hsl(43 78% 50% / 0.15), transparent)' }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        />
        <div className="relative max-w-[1080px] mx-auto px-5 md:px-10 lg:px-16 py-10 md:py-14">
          <FadeIn>
            <SectionLabel light={isDark}>Investment Profile</SectionLabel>
            <h2 className={`font-serif text-[clamp(1.5rem,3vw,2.2rem)] leading-[1.15] mb-2 ${isDark ? 'text-primary-foreground' : 'text-foreground'}`}>
              {isIndia ? 'Our Target Parameters, India' : 'Our Target Parameters'}
            </h2>
            <GoldRule className="mb-8 md:mb-10" />
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-12 mb-8 md:mb-10">
            {numberCards.map((stat, i) => (
              <TypographicNumber key={stat.label} label={stat.label} value={stat.value} delay={i * 0.08} isDark={isDark} />
            ))}
          </div>
          <motion.div
            className="h-px bg-gold/20 mb-8 md:mb-10 origin-left"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {textCards.map((stat, i) => (
              <TypographicText key={stat.label} label={stat.label} value={stat.value} delay={(i + 2) * 0.08} isDark={isDark} />
            ))}
          </div>
        </div>
      </section>

      {/* Sectors We Cover */}
      <section id="sectors" className={`relative overflow-hidden px-5 md:px-10 lg:px-16 py-8 md:py-12 ${isDark ? 'bg-primary' : 'bg-background'}`}>
        {isDark ? <DarkSectionEffects /> : <LightSectionEffects variant="section" />}
        <div className="relative max-w-[1080px] mx-auto">
          <FadeIn>
            <SectionLabel light={isDark}>Sectors We Cover</SectionLabel>
            <h2 className={`font-serif text-[clamp(1.5rem,2.8vw,2.2rem)] leading-[1.15] max-w-[480px] mb-2 ${isDark ? 'text-primary-foreground' : 'text-foreground'}`}>
              Where We Invest
            </h2>
            <GoldRule className="mt-3 mb-8 md:mb-10" />
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 relative">
            {/* Vertical divider on desktop */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gold/15" />

            {/* Left column */}
            <FadeIn delay={0}>
              <div>
                <h3 className={`font-serif text-[1.2rem] md:text-[1.4rem] mb-4 ${isDark ? 'text-primary-foreground' : 'text-foreground'}`}>
                  {sectors.left.heading}
                </h3>
                <ul className="space-y-3">
                  {sectors.left.items.map((item, i) => (
                    <FadeIn key={i} delay={i * 0.06}>
                      <li className="flex items-start gap-2.5">
                        <span className="w-[7px] h-[7px] rotate-45 bg-gold/50 shrink-0 mt-[6px]" />
                        <div>
                          <span className={`font-serif text-[1rem] md:text-[1.1rem] leading-[1.3] block ${isDark ? 'text-primary-foreground' : 'text-foreground'}`}>
                            {item.name}
                          </span>
                          <span className={`font-sans text-[13px] leading-[1.5] ${isDark ? 'text-primary-foreground/50' : 'text-muted-foreground'}`}>
                            {item.desc}
                          </span>
                        </div>
                      </li>
                    </FadeIn>
                  ))}
                </ul>
              </div>
            </FadeIn>

            {/* Right column */}
            <FadeIn delay={0.08}>
              <div>
                <h3 className={`font-serif text-[1.2rem] md:text-[1.4rem] mb-4 ${isDark ? 'text-primary-foreground' : 'text-foreground'}`}>
                  {sectors.right.heading}
                </h3>
                <ul className="space-y-3">
                  {sectors.right.items.map((item, i) => (
                    <FadeIn key={i} delay={0.08 + i * 0.06}>
                      <li className="flex items-start gap-2.5">
                        <span className="w-[7px] h-[7px] rotate-45 bg-gold/50 shrink-0 mt-[6px]" />
                        <div>
                          <span className={`font-serif text-[1rem] md:text-[1.1rem] leading-[1.3] block ${isDark ? 'text-primary-foreground' : 'text-foreground'}`}>
                            {item.name}
                          </span>
                          <span className={`font-sans text-[13px] leading-[1.5] ${isDark ? 'text-primary-foreground/50' : 'text-muted-foreground'}`}>
                            {item.desc}
                          </span>
                        </div>
                      </li>
                    </FadeIn>
                  ))}
                </ul>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* What We Look For — Tabbed Desktop / Accordion Mobile */}
      <section id="investment-criteria" className={`overflow-hidden px-5 md:px-10 lg:px-16 py-8 md:py-12 lg:py-14 ${isDark ? 'bg-background' : 'bg-background'}`}>
        <div className="max-w-[1080px] mx-auto">
          <FadeIn>
            <SectionLabel>Investment Criteria</SectionLabel>
            <h2 className={`font-serif text-[clamp(1.6rem,3.2vw,2.4rem)] leading-[1.15] max-w-[480px] mb-2 ${isDark ? 'text-primary-foreground' : 'text-foreground'}`}>
              What We Look For
            </h2>
            <GoldRule className="mt-3 mb-8 md:mb-10" />
          </FadeIn>

          {isMobile ? (
            <CriteriaAccordion items={whatWeLookFor} isDark={isDark} />
          ) : (
            <CriteriaTabs items={whatWeLookFor} isDark={isDark} />
          )}
        </div>
      </section>

      {/* CTA */}
      <section className={`relative overflow-hidden px-5 md:px-10 lg:px-16 py-12 md:py-16 lg:py-20 ${
        isDark ? 'hero-gradient-animated text-primary-foreground' : 'bg-[hsl(40,20%,91%)] text-foreground border-t border-gold/20'
      }`}>
        <WaveBackground variant="section" />
        {isDark ? <DarkSectionEffects variant="cta" /> : <LightSectionEffects variant="cta" />}
        <div className="relative max-w-[1080px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div className="flex-1 max-w-[560px]">
              <FadeIn>
                <SectionLabel light={isDark}>Connect</SectionLabel>
                <h2 className={`font-serif text-[clamp(1.6rem,3.5vw,2.6rem)] leading-[1.15] mb-4 ${isDark ? 'text-primary-foreground' : 'text-foreground'}`}>
                  {isIndia ? 'Partner With Us in India' : 'Start a Conversation'}
                </h2>
                <p className={`font-sans text-[13px] md:text-[15px] leading-[1.8] ${isDark ? 'text-primary-foreground/50' : 'text-muted-foreground'}`}>
                  {isIndia
                    ? "If you're building a business meant to last, we'd welcome a conversation about partnership."
                    : "If you're a founder considering your next chapter, we'd welcome the conversation."}
                </p>
              </FadeIn>
            </div>
            <FadeIn delay={0.1}>
              <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}>
                <Link
                  to={`/${region}/contact`}
                  className="group relative inline-flex items-center gap-3 font-sans text-[11px] md:text-[12px] font-semibold uppercase tracking-[0.16em] border-2 border-gold text-gold px-10 py-5 md:px-12 md:py-6 transition-all duration-300 hover:bg-gold hover:text-white overflow-hidden"
                >
                  Get in Touch
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </motion.div>
            </FadeIn>
          </div>
        </div>
      </section>
    </div>
  );
};

/* ─── Criteria Tabs (Desktop) ─── */
const CriteriaTabs = ({ items, isDark }: { items: typeof whatWeLookFor; isDark: boolean }) => {
  const [active, setActive] = useState(0);

  return (
    <div>
      {/* Tab row */}
      <div className="flex border-b border-gold/10">
        {items.map((item, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`flex-1 text-left relative py-3 px-3 transition-all duration-300 ${
              i > 0 ? 'border-l border-gold/10' : ''
            }`}
          >
            <div className="absolute top-0 left-0 right-0 h-[2px] overflow-hidden">
              {i === active && <div className="h-full w-full bg-gold" />}
            </div>
            <span className={`font-sans text-[10px] font-semibold uppercase tracking-[0.2em] transition-colors duration-300 ${
              i === active ? 'text-gold' : isDark ? 'text-primary-foreground/20' : 'text-foreground/20'
            }`}>
              {item.num}
            </span>
            <span className={`block font-serif text-[0.8rem] tracking-[-0.02em] mt-0.5 transition-colors duration-300 ${
              i === active
                ? isDark ? 'text-primary-foreground' : 'text-foreground'
                : isDark ? 'text-primary-foreground/30' : 'text-foreground/30'
            }`}>
              {item.title}
            </span>
          </button>
        ))}
      </div>

      {/* Step dots */}
      <div className="flex justify-center gap-1.5 mt-4">
        {items.map((_, i) => (
          <div key={i} className={`h-[3px] rounded-full transition-all duration-300 ${
            i === active ? 'w-5 bg-gold' : `w-2 ${isDark ? 'bg-primary-foreground/10' : 'bg-foreground/10'}`
          }`} />
        ))}
      </div>

      {/* Content */}
      <div className="mt-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className={`rounded-sm border p-8 md:p-10 relative overflow-hidden ${
              isDark
                ? 'border-primary-foreground/10 bg-primary-foreground/[0.03]'
                : 'border-[hsl(38,15%,90%)]/50 bg-[hsl(40,20%,98%)]/80'
            }`}
          >
            {/* Watermark number */}
            <span className={`absolute top-4 right-6 font-serif text-[6rem] leading-none select-none pointer-events-none ${
              isDark ? 'text-primary-foreground/[0.04]' : 'text-foreground/[0.04]'
            }`}>
              {items[active].num}
            </span>

            <div className="relative">
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-sans text-[10px] font-semibold uppercase tracking-[0.25em] text-gold/60 block mb-2"
              >
                {items[active].num}
              </motion.span>
              <h3 className={`font-serif text-[clamp(1.4rem,3vw,2rem)] leading-[1.2] tracking-[-0.02em] mb-3 ${isDark ? 'text-primary-foreground' : 'text-foreground'}`}>
                {items[active].title}
              </h3>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: 40 }}
                transition={{ duration: 0.4, delay: 0.15 }}
                className="h-[1.5px] bg-gold/30 mb-4"
              />
              <p className={`font-sans text-[15px] md:text-[17px] leading-[1.85] max-w-[640px] ${isDark ? 'text-primary-foreground/65' : 'text-muted-foreground'}`}>
                {items[active].desc}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

/* ─── Criteria Accordion (Mobile) ─── */
const CriteriaAccordion = ({ items, isDark }: { items: typeof whatWeLookFor; isDark: boolean }) => {
  const [open, setOpen] = useState(-1);

  return (
    <div className="space-y-0">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={i} className={`border-b ${isDark ? 'border-primary-foreground/[0.06]' : 'border-border/30'}`}>
            <button
              onClick={() => setOpen(isOpen ? -1 : i)}
              className={`w-full flex items-center justify-between py-4 min-h-[44px] text-left`}
            >
              <div className="flex items-center gap-3">
                <span className={`font-serif text-[1.5rem] leading-none ${isOpen ? 'text-gold/40' : isDark ? 'text-primary-foreground/10' : 'text-foreground/10'}`}>
                  {item.num}
                </span>
                <span className={`font-serif text-[1rem] tracking-[-0.02em] ${
                  isOpen
                    ? isDark ? 'text-primary-foreground' : 'text-foreground'
                    : isDark ? 'text-primary-foreground/50' : 'text-foreground/50'
                }`}>
                  {item.title}
                </span>
              </div>
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                <ChevronDown className={`w-4 h-4 ${isDark ? 'text-gold/40' : 'text-gold/50'}`} />
              </motion.div>
            </button>
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div className="pb-5 pl-[calc(1.5rem+12px)]">
                    <div className="w-8 h-[1.5px] bg-gold/30 mb-3" />
                    <p className={`font-sans text-[13px] leading-[1.75] ${isDark ? 'text-primary-foreground/55' : 'text-muted-foreground'}`}>
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};

/* ─── Typographic Number Card (Revenue/EBITDA) ─── */
const TypographicNumber = ({ label, value, delay, isDark }: { label: string; value: string; delay: number; isDark: boolean }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-20px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className="relative pl-4"
    >
      <motion.div
        className="absolute left-0 top-0 w-[2px] bg-gold/30"
        initial={{ height: 0 }}
        animate={isInView ? { height: '100%' } : {}}
        transition={{ duration: 0.6, delay: delay + 0.2, ease: [0.22, 1, 0.36, 1] }}
      />
      <p className={`font-sans text-[10px] md:text-[11px] font-medium uppercase tracking-[0.22em] mb-3 ${isDark ? 'text-gold/75' : 'text-gold/75'}`}>
        {label}
      </p>
      <motion.p
        className="font-serif text-[clamp(1.8rem,3.5vw,2.8rem)] text-gold leading-none tracking-[-0.02em]"
        animate={isInView ? {
          textShadow: ['0 0 0px hsl(43 78% 50% / 0)', '0 0 30px hsl(43 78% 50% / 0.4)', '0 0 0px hsl(43 78% 50% / 0)'],
        } : {}}
        transition={{ duration: 2, delay: delay + 0.5, ease: 'easeInOut' }}
      >
        {value}
      </motion.p>
      <motion.div
        initial={{ width: 0 }}
        animate={isInView ? { width: 32 } : {}}
        transition={{ duration: 0.6, delay: delay + 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="h-[1.5px] bg-gold/25 mt-3"
      />
    </motion.div>
  );
};

/* ─── Typographic Text Card (Structure/Hold/Partnerships) ─── */
const TypographicText = ({ label, value, delay, isDark }: { label: string; value: string; delay: number; isDark: boolean }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-20px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 12 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      <p className={`font-sans text-[10px] md:text-[11px] font-medium uppercase tracking-[0.22em] mb-2 flex items-center gap-1.5 ${isDark ? 'text-gold/75' : 'text-gold/75'}`}>
        <span className="w-1.5 h-1.5 rounded-full bg-gold/30" />
        {label}
      </p>
      <p className={`font-sans text-[14.5px] leading-[1.7] ${isDark ? 'text-primary-foreground/60' : 'text-foreground/85'}`}>
        {value}
      </p>
    </motion.div>
  );
};

export default OurFocus;