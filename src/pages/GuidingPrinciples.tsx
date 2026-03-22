import { SectionLabel, FadeIn, GoldRule, HeroDivider } from '@/components/ui/Section';
import { motion, useInView } from 'framer-motion';
import { useRegion } from '@/contexts/RegionContext';
import { Link } from 'react-router-dom';
import DarkSectionEffects from '@/components/DarkSectionEffects';
import AnimatedAccent from '@/components/AnimatedAccent';
import { useRef } from 'react';

const principles = [
  { t: 'Integrity', d: 'Transparency and intellectual honesty in every interaction.', icon: '◆' },
  { t: 'Servant Leadership', d: 'Earn trust through service, not authority.', icon: '◇' },
  { t: 'Humility', d: 'Stay curious. Never stop learning.', icon: '○' },
  { t: 'Grit', d: 'Do hard things, especially when things get hard.', icon: '△' },
  { t: 'Bias to Action', d: 'Execute decisively. Speed matters.', icon: '▽' },
  { t: 'The Golden Rule', d: 'Treat people with respect, fairness, and compassion.', icon: '□' },
];

const PrincipleCard = ({ principle, index }: { principle: typeof principles[0]; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-30px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="group"
    >
      <motion.div
        whileHover={{ y: -3 }}
        transition={{ duration: 0.25 }}
        className="relative p-5 md:p-7 border border-border hover:border-gold/20 transition-all duration-500 rounded-sm overflow-hidden bg-card"
      >
        <div className="absolute top-0 left-0 w-8 h-px bg-gold/0 group-hover:bg-gold/30 transition-all duration-500" />
        <div className="absolute top-0 left-0 h-8 w-px bg-gold/0 group-hover:bg-gold/30 transition-all duration-500" />

        <motion.span
          className="font-serif text-[1.5rem] text-gold/20 group-hover:text-gold/40 transition-colors duration-500 block mb-2"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.4, delay: index * 0.08 + 0.15 }}
        >
          {principle.icon}
        </motion.span>

        <h3 className="font-serif text-[1.05rem] md:text-[1.15rem] text-foreground mb-2 leading-[1.2]">
          {principle.t}
        </h3>
        <div className="w-5 h-px bg-gold/15 group-hover:bg-gold/35 group-hover:w-8 transition-all duration-500 mb-2" />
        <p className="font-sans text-[13px] md:text-[14px] text-muted-foreground leading-[1.65] group-hover:text-foreground/70 transition-colors duration-300">
          {principle.d}
        </p>
      </motion.div>
    </motion.div>
  );
};

const GuidingPrinciples = () => {
  const { region } = useRegion();
  const isIndia = region === 'india';

  return (
    <div>
      {/* Hero */}
      <section className="relative hero-gradient-animated text-primary-foreground overflow-hidden">
        <DarkSectionEffects variant="hero" />
        <div className="relative max-w-[1080px] mx-auto px-5 md:px-10 lg:px-16 pt-24 pb-6 md:pt-32 md:pb-10 lg:pt-36 lg:pb-12">
          <FadeIn>
            <SectionLabel light>{isIndia ? 'About Us — India' : 'About Us'}</SectionLabel>
          </FadeIn>
          <FadeIn delay={0.08}>
            <h1 className="font-serif text-[clamp(2rem,4.5vw,3.4rem)] text-primary-foreground max-w-[520px] leading-[1.12] tracking-[-0.025em]">
              {isIndia ? 'Building Enduring Value Across India' : 'Guiding Principles'}
            </h1>
          </FadeIn>
          <FadeIn delay={0.14}>
            <p className="font-sans text-[14px] md:text-[15px] text-primary-foreground/40 leading-[1.7] mt-4 max-w-[440px]">
              The values and convictions that shape every partnership and every decision we make.
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <GoldRule className="mt-3 md:mt-4" />
          </FadeIn>
        </div>
        <HeroDivider />
      </section>

      {/* Mission with animated accent */}
      <section className="bg-background px-5 md:px-10 lg:px-16 py-7 md:py-10 lg:py-14">
        <div className="max-w-[1080px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-7 lg:gap-12 items-center">
            <div>
              <FadeIn>
                <SectionLabel>Mission</SectionLabel>
                <h2 className="font-serif text-[clamp(1.4rem,2.5vw,2rem)] text-foreground leading-[1.18]">
                  {isIndia
                    ? 'Scale What India Builds. Preserve What Founders Value.'
                    : 'Preserve What Founders Built.\u00a0Scale What\u00a0Matters.'}
                </h2>
                <GoldRule className="mt-3" />
              </FadeIn>
              <FadeIn delay={0.08}>
                <p className="font-sans text-[14px] md:text-[15px] text-muted-foreground leading-[1.75] mt-4 mb-3">
                  {isIndia
                    ? 'Cruxway combines long-term capital with deep operational expertise to help Indian founders transform their businesses into market leaders, while protecting the legacy, culture, and values that built them.'
                    : 'Cruxway invests in majority stakes in founder-led businesses across the United States, combining long-term capital with operating expertise to help owners transform their companies into market leaders, while protecting the legacy and values that built them.'}
                </p>
                {!isIndia && (
                  <p className="font-sans text-[14px] md:text-[15px] text-muted-foreground leading-[1.75]">
                    We believe the best businesses in America were not built to be sold on a five-year timeline. They were built by people who cared deeply about their employees, their customers, and the communities they serve.
                  </p>
                )}
              </FadeIn>
            </div>
            <FadeIn delay={0.15}>
              <AnimatedAccent variant="partnership" />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="bg-cream px-5 md:px-10 lg:px-16 py-7 md:py-10 lg:py-14">
        <div className="max-w-[1080px] mx-auto">
          <FadeIn>
            <SectionLabel>Our Values</SectionLabel>
            <h2 className="font-serif text-[clamp(1.3rem,2.5vw,1.95rem)] text-foreground leading-[1.18] mb-2">
              What Guides Us
            </h2>
            <GoldRule className="mb-6 md:mb-8" />
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5">
            {principles.map((p, i) => (
              <PrincipleCard key={p.t} principle={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Where We Operate — animated version */}
      <section className="relative bg-primary text-primary-foreground overflow-hidden">
        <DarkSectionEffects />
        <div className="relative max-w-[1080px] mx-auto px-5 md:px-10 lg:px-16 py-7 md:py-10 lg:py-14">
          <FadeIn>
            <SectionLabel light>Our Presence</SectionLabel>
            <h2 className="font-serif text-[clamp(1.3rem,2.5vw,1.95rem)] text-primary-foreground leading-[1.18] mb-5 md:mb-7">
              Where We Operate
            </h2>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-5 md:gap-7">
            {/* San Diego */}
            <FadeIn delay={0.08}>
              <div className="relative border border-primary-foreground/[0.06] rounded-sm p-5 md:p-7 overflow-hidden hover:border-gold/15 transition-colors duration-500 group">
                {/* Animated location accent */}
                <svg viewBox="0 0 200 120" className="w-full h-[80px] md:h-[100px] mb-4">
                  <motion.path d="M 20 100 Q 60 40 100 50 T 180 30" initial={{ pathLength: 0, opacity: 0 }} whileInView={{ pathLength: 1, opacity: 0.3 }} viewport={{ once: true }} transition={{ duration: 1.5, delay: 0.3 }} stroke="hsl(38 45% 55%)" strokeWidth="0.5" fill="none" />
                  <motion.circle cx="100" cy="50" r="3" fill="hsl(38 45% 55%)" initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 1 }} opacity={0.4} />
                  <motion.line x1="100" y1="50" x2="100" y2="15" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 1.2 }} stroke="hsl(38 45% 55%)" strokeWidth="0.4" opacity={0.3} />
                </svg>
                <p className="font-sans text-[9px] font-medium uppercase tracking-[0.22em] text-gold/50 mb-1.5">
                  Headquarters
                </p>
                <h3 className="font-serif text-[1.15rem] md:text-[1.3rem] text-primary-foreground leading-[1.2]">
                  San Diego, California
                </h3>
              </div>
            </FadeIn>

            {/* NYC / Delhi */}
            <FadeIn delay={0.16}>
              <div className="relative border border-primary-foreground/[0.06] rounded-sm p-5 md:p-7 overflow-hidden hover:border-gold/15 transition-colors duration-500 group">
                <svg viewBox="0 0 200 120" className="w-full h-[80px] md:h-[100px] mb-4">
                  <motion.rect x="60" y="30" width="30" height="70" initial={{ pathLength: 0, opacity: 0 }} whileInView={{ pathLength: 1, opacity: 0.25 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.3 }} stroke="hsl(38 45% 55%)" strokeWidth="0.4" fill="none" />
                  <motion.rect x="95" y="20" width="25" height="80" initial={{ pathLength: 0, opacity: 0 }} whileInView={{ pathLength: 1, opacity: 0.3 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.5 }} stroke="hsl(38 45% 55%)" strokeWidth="0.5" fill="none" />
                  <motion.rect x="125" y="40" width="20" height="60" initial={{ pathLength: 0, opacity: 0 }} whileInView={{ pathLength: 1, opacity: 0.2 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.7 }} stroke="hsl(38 45% 55%)" strokeWidth="0.4" fill="none" />
                </svg>
                <p className="font-sans text-[9px] font-medium uppercase tracking-[0.22em] text-gold/50 mb-1.5">
                  {isIndia ? 'India Operations' : 'East Coast'}
                </p>
                <h3 className="font-serif text-[1.15rem] md:text-[1.3rem] text-primary-foreground leading-[1.2]">
                  {isIndia ? 'GK II, Delhi' : 'New York City'}
                </h3>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative hero-gradient-animated text-primary-foreground overflow-hidden px-5 md:px-10 lg:px-16 py-7 md:py-10 lg:py-14">
        <DarkSectionEffects variant="cta" />
        <div className="relative max-w-[1080px] mx-auto">
          <div className="max-w-[520px]">
            <FadeIn>
              <SectionLabel light>Connect</SectionLabel>
              <h2 className="font-serif text-[clamp(1.3rem,2.5vw,2rem)] text-primary-foreground leading-[1.18] mb-3">
                {isIndia ? 'Partner With Us in India' : 'Start a Conversation'}
              </h2>
              <p className="font-sans text-[14px] md:text-[15px] text-primary-foreground/40 leading-[1.75] mb-5 md:mb-6">
                If you share our values and are exploring long-term partnership, we'd welcome the conversation.
              </p>
              <Link
                to={`/${region}/contact`}
                className="btn-premium inline-block font-sans text-[11px] font-medium uppercase tracking-[0.16em] px-8 py-3.5 border border-primary-foreground/[0.08] text-primary-foreground/40 hover:border-gold/25 hover:text-primary-foreground/65 transition-all duration-300"
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

export default GuidingPrinciples;
