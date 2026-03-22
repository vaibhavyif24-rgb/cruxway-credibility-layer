import { SectionLabel, FadeIn, GoldRule, HeroDivider } from '@/components/ui/Section';
import { motion } from 'framer-motion';
import { useRegion } from '@/contexts/RegionContext';
import { Link } from 'react-router-dom';
import DarkSectionEffects from '@/components/DarkSectionEffects';
import AnimatedAccent from '@/components/AnimatedAccent';
import GlassCard from '@/components/GlassCard';

const principles = [
  { t: 'Integrity', d: 'Transparency and intellectual honesty in every interaction.', icon: '◆' },
  { t: 'Servant Leadership', d: 'Earn trust through service, not authority.', icon: '◇' },
  { t: 'Humility', d: 'Stay curious. Never stop learning.', icon: '○' },
  { t: 'Grit', d: 'Do hard things, especially when things get hard.', icon: '△' },
  { t: 'Bias to Action', d: 'Execute decisively. Speed matters.', icon: '▽' },
  { t: 'The Golden Rule', d: 'Treat people with respect, fairness, and compassion.', icon: '□' },
];

const GuidingPrinciples = () => {
  const { region } = useRegion();
  const isIndia = region === 'india';

  return (
    <div>
      {/* Hero */}
      <section className="relative hero-gradient-animated text-primary-foreground overflow-hidden">
        <DarkSectionEffects variant="hero" />
        <div className="relative max-w-[1080px] mx-auto px-5 md:px-10 lg:px-16 pt-28 pb-10 md:pt-36 md:pb-14 lg:pt-40 lg:pb-16">
          <FadeIn>
            <SectionLabel light>{isIndia ? 'About Us — India' : 'About Us'}</SectionLabel>
          </FadeIn>
          <FadeIn delay={0.08}>
            <h1 className="font-serif text-[clamp(2.2rem,5vw,3.6rem)] text-primary-foreground max-w-[540px] leading-[1.1] tracking-[-0.03em]">
              {isIndia ? 'Building Enduring Value Across India' : 'Guiding Principles'}
            </h1>
          </FadeIn>
          <FadeIn delay={0.14}>
            <p className="font-sans text-[15px] md:text-[16px] text-primary-foreground/45 leading-[1.75] mt-5 max-w-[460px]">
              The values and convictions that shape every partnership and every decision we make.
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <GoldRule className="mt-4 md:mt-5" />
          </FadeIn>
        </div>
        <HeroDivider />
      </section>

      {/* Mission with animated accent */}
      <section className="bg-background px-5 md:px-10 lg:px-16 py-10 md:py-14 lg:py-16">
        <div className="max-w-[1080px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-14 items-center">
            <div>
              <FadeIn>
                <SectionLabel>Mission</SectionLabel>
                <h2 className="font-serif text-[clamp(1.5rem,3vw,2.2rem)] text-foreground leading-[1.15]">
                  {isIndia
                    ? 'Scale What India Builds. Preserve What Founders Value.'
                    : 'Preserve What Founders Built.\u00a0Scale What\u00a0Matters.'}
                </h2>
                <GoldRule className="mt-3" />
              </FadeIn>
              <FadeIn delay={0.08}>
                <p className="font-sans text-[15px] md:text-[16px] text-muted-foreground leading-[1.8] mt-5 mb-4">
                  {isIndia
                    ? 'Cruxway combines long-term capital with deep operational expertise to help Indian founders transform their businesses into market leaders, while protecting the legacy, culture, and values that built them.'
                    : 'Cruxway invests in majority stakes in founder-led businesses across the United States, combining long-term capital with operating expertise to help owners transform their companies into market leaders.'}
                </p>
                {!isIndia && (
                  <p className="font-sans text-[15px] md:text-[16px] text-muted-foreground leading-[1.8]">
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

      {/* Principles — Bento Glass Cards */}
      <section className="bg-cream px-5 md:px-10 lg:px-16 py-10 md:py-14 lg:py-16">
        <div className="max-w-[1080px] mx-auto">
          <FadeIn>
            <SectionLabel>Our Values</SectionLabel>
            <h2 className="font-serif text-[clamp(1.4rem,2.8vw,2.1rem)] text-foreground leading-[1.15] mb-3">
              What Guides Us
            </h2>
            <GoldRule className="mb-8 md:mb-10" />
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {principles.map((p, i) => (
              <GlassCard key={p.t} index={i} className="p-5 md:p-7">
                <motion.span
                  className="font-serif text-[1.5rem] text-gold/25 group-hover:text-gold/50 transition-colors duration-500 block mb-3"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 + 0.15 }}
                >
                  {p.icon}
                </motion.span>
                <h3 className="font-serif text-[1.1rem] md:text-[1.2rem] text-foreground mb-2 leading-[1.2]">
                  {p.t}
                </h3>
                <div className="w-5 h-px bg-gold/15 group-hover:bg-gold/40 group-hover:w-8 transition-all duration-500 mb-3" />
                <p className="font-sans text-[14px] md:text-[15px] text-muted-foreground leading-[1.7] group-hover:text-foreground/75 transition-colors duration-300">
                  {p.d}
                </p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Where We Operate */}
      <section className="relative bg-primary text-primary-foreground overflow-hidden">
        <DarkSectionEffects />
        <div className="relative max-w-[1080px] mx-auto px-5 md:px-10 lg:px-16 py-10 md:py-14 lg:py-16">
          <FadeIn>
            <SectionLabel light>Our Presence</SectionLabel>
            <h2 className="font-serif text-[clamp(1.4rem,2.8vw,2.1rem)] text-primary-foreground leading-[1.15] mb-6 md:mb-8">
              Where We Operate
            </h2>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-4 md:gap-5">
            {/* San Diego */}
            <GlassCard index={0} variant="dark" className="p-6 md:p-8">
              <svg viewBox="0 0 200 80" className="w-full h-[60px] md:h-[70px] mb-4">
                <motion.path d="M 20 70 Q 60 25 100 35 T 180 20" initial={{ pathLength: 0, opacity: 0 }} whileInView={{ pathLength: 1, opacity: 0.35 }} viewport={{ once: true }} transition={{ duration: 1.5, delay: 0.3 }} stroke="hsl(38 45% 55%)" strokeWidth="0.6" fill="none" />
                <motion.circle cx="100" cy="35" r="3" fill="hsl(38 45% 55%)" initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 1 }} opacity={0.5} />
              </svg>
              <p className="font-sans text-[10px] font-medium uppercase tracking-[0.22em] text-gold/55 mb-1.5">
                Headquarters
              </p>
              <h3 className="font-serif text-[1.2rem] md:text-[1.4rem] text-primary-foreground leading-[1.2]">
                San Diego, California
              </h3>
            </GlassCard>

            {/* NYC / Delhi */}
            <GlassCard index={1} variant="dark" className="p-6 md:p-8">
              <svg viewBox="0 0 200 80" className="w-full h-[60px] md:h-[70px] mb-4">
                <motion.rect x="55" y="15" width="22" height="55" initial={{ pathLength: 0, opacity: 0 }} whileInView={{ pathLength: 1, opacity: 0.3 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.3 }} stroke="hsl(38 45% 55%)" strokeWidth="0.5" fill="none" />
                <motion.rect x="85" y="8" width="18" height="62" initial={{ pathLength: 0, opacity: 0 }} whileInView={{ pathLength: 1, opacity: 0.35 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.5 }} stroke="hsl(38 45% 55%)" strokeWidth="0.6" fill="none" />
                <motion.rect x="110" y="22" width="16" height="48" initial={{ pathLength: 0, opacity: 0 }} whileInView={{ pathLength: 1, opacity: 0.25 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.7 }} stroke="hsl(38 45% 55%)" strokeWidth="0.4" fill="none" />
              </svg>
              <p className="font-sans text-[10px] font-medium uppercase tracking-[0.22em] text-gold/55 mb-1.5">
                {isIndia ? 'India Operations' : 'East Coast'}
              </p>
              <h3 className="font-serif text-[1.2rem] md:text-[1.4rem] text-primary-foreground leading-[1.2]">
                {isIndia ? 'GK II, Delhi' : 'New York City'}
              </h3>
            </GlassCard>
          </div>
        </div>
      </section>

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
              <p className="font-sans text-[15px] md:text-[16px] text-primary-foreground/45 leading-[1.8] mb-6">
                If you share our values and are exploring long-term partnership, we'd welcome the conversation.
              </p>
              <Link
                to={`/${region}/contact`}
                className="btn-premium inline-block font-sans text-[11px] md:text-[12px] font-medium uppercase tracking-[0.16em] px-8 py-3.5 border border-primary-foreground/[0.1] text-primary-foreground/45 hover:border-gold/30 hover:text-primary-foreground/70 transition-all duration-300"
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
