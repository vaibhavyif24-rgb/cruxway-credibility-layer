import { SectionLabel, FadeIn, GoldRule, HeroDivider } from '@/components/ui/Section';
import { motion, useInView } from 'framer-motion';
import { useRegion } from '@/contexts/RegionContext';
import { Link } from 'react-router-dom';
import DarkSectionEffects from '@/components/DarkSectionEffects';
import { useRef } from 'react';
import heroPartnership from '@/assets/hero-partnership.jpg';
import sanDiegoBeach from '@/assets/cities/san-diego-beach.jpg';
import newYorkSkyline from '@/assets/cities/new-york-skyline.jpg';

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
        className="relative p-6 md:p-8 border border-foreground/[0.06] hover:border-gold/20 transition-all duration-500 rounded-sm overflow-hidden"
      >
        {/* Corner accent */}
        <div className="absolute top-0 left-0 w-8 h-px bg-gold/0 group-hover:bg-gold/30 transition-all duration-500" />
        <div className="absolute top-0 left-0 h-8 w-px bg-gold/0 group-hover:bg-gold/30 transition-all duration-500" />

        <motion.span
          className="font-serif text-[1.5rem] text-gold/20 group-hover:text-gold/40 transition-colors duration-500 block mb-3"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.4, delay: index * 0.08 + 0.15 }}
        >
          {principle.icon}
        </motion.span>

        <h3 className="font-serif text-[1.05rem] md:text-[1.15rem] text-foreground mb-2 leading-[1.2]">
          {principle.t}
        </h3>
        <div className="w-5 h-px bg-gold/15 group-hover:bg-gold/35 group-hover:w-8 transition-all duration-500 mb-3" />
        <p className="font-sans text-[13px] md:text-[14px] text-muted-foreground/60 leading-[1.65] group-hover:text-muted-foreground/85 transition-colors duration-300">
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
        <div className="relative max-w-[1080px] mx-auto px-5 md:px-10 lg:px-16 pt-24 pb-6 md:pt-32 md:pb-12 lg:pt-36 lg:pb-14">
          <FadeIn>
            <SectionLabel light>{isIndia ? 'About Us — India' : 'About Us'}</SectionLabel>
          </FadeIn>
          <FadeIn delay={0.08}>
            <h1 className="font-serif text-[clamp(2rem,4.5vw,3.4rem)] text-primary-foreground max-w-[520px] leading-[1.12] tracking-[-0.025em]">
              {isIndia ? 'Building Enduring Value Across India' : 'Guiding Principles'}
            </h1>
          </FadeIn>
          <FadeIn delay={0.14}>
            <p className="font-sans text-[14px] md:text-[15px] text-primary-foreground/35 leading-[1.7] md:leading-[1.75] mt-4 md:mt-5 max-w-[440px]">
              The values and convictions that shape every partnership and every decision we make.
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <GoldRule className="mt-3 md:mt-5" />
          </FadeIn>
        </div>
        <HeroDivider />
      </section>

      {/* Mission with photo */}
      <section className="bg-background px-5 md:px-10 lg:px-16 py-8 md:py-12 lg:py-16">
        <div className="max-w-[1080px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-14 items-center">
            <div>
              <FadeIn>
                <SectionLabel>Mission</SectionLabel>
                <h2 className="font-serif text-[clamp(1.4rem,2.5vw,2rem)] text-foreground leading-[1.18]">
                  {isIndia
                    ? 'Scale What India Builds. Preserve What Founders Value.'
                    : 'Preserve What Founders Built.\u00a0Scale What\u00a0Matters.'}
                </h2>
                <GoldRule className="mt-3 md:mt-5" />
              </FadeIn>
              <FadeIn delay={0.08}>
                <p className="font-sans text-[14px] md:text-[15px] text-muted-foreground leading-[1.75] md:leading-[1.8] mt-5 mb-4">
                  {isIndia
                    ? 'Cruxway combines long-term capital with deep operational expertise to help Indian founders transform their businesses into market leaders, while protecting the legacy, culture, and values that built them.'
                    : 'Cruxway invests in majority stakes in founder-led businesses across the United States, combining long-term capital with operating expertise to help owners transform their companies into market leaders, while protecting the legacy and values that built them.'}
                </p>
                {!isIndia && (
                  <p className="font-sans text-[14px] md:text-[15px] text-muted-foreground leading-[1.75] md:leading-[1.8]">
                    We believe the best businesses in America were not built to be sold on a five-year timeline. They were built by people who cared deeply about their employees, their customers, and the communities they serve.
                  </p>
                )}
              </FadeIn>
            </div>
            <FadeIn delay={0.15}>
              <div className="relative overflow-hidden rounded-sm aspect-[4/3]">
                <img
                  src={heroPartnership}
                  alt="Partnership"
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-[filter] duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/15 to-transparent" />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="bg-cream px-5 md:px-10 lg:px-16 py-8 md:py-12 lg:py-16">
        <div className="max-w-[1080px] mx-auto">
          <FadeIn>
            <SectionLabel>Our Values</SectionLabel>
            <h2 className="font-serif text-[clamp(1.3rem,2.5vw,1.95rem)] text-foreground leading-[1.18] mb-2">
              What Guides Us
            </h2>
            <GoldRule className="mb-8 md:mb-10" />
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {principles.map((p, i) => (
              <PrincipleCard key={p.t} principle={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Cities / Presence with photography */}
      <section className="relative bg-primary text-primary-foreground overflow-hidden">
        <DarkSectionEffects />
        <div className="relative max-w-[1080px] mx-auto px-5 md:px-10 lg:px-16 py-8 md:py-12 lg:py-16">
          <FadeIn>
            <SectionLabel light>Our Presence</SectionLabel>
            <h2 className="font-serif text-[clamp(1.3rem,2.5vw,1.95rem)] text-primary-foreground leading-[1.18] mb-6 md:mb-8">
              Where We Operate
            </h2>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            {/* San Diego */}
            <FadeIn delay={0.08}>
              <div className="group relative overflow-hidden rounded-sm">
                <div className="aspect-[16/10] overflow-hidden">
                  <motion.img
                    src={sanDiegoBeach}
                    alt="San Diego, California"
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.7 }}
                    loading="lazy"
                    style={{ filter: 'brightness(0.7)' }}
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/80 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
                  <p className="font-sans text-[9px] font-medium uppercase tracking-[0.22em] text-gold/50 mb-1.5">
                    Headquarters
                  </p>
                  <h3 className="font-serif text-[1.2rem] md:text-[1.4rem] text-primary-foreground leading-[1.2]">
                    San Diego, California
                  </h3>
                </div>
              </div>
            </FadeIn>

            {/* New York */}
            <FadeIn delay={0.16}>
              <div className="group relative overflow-hidden rounded-sm">
                <div className="aspect-[16/10] overflow-hidden">
                  <motion.img
                    src={newYorkSkyline}
                    alt="New York City"
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.7 }}
                    loading="lazy"
                    style={{ filter: 'brightness(0.7)' }}
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/80 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
                  <p className="font-sans text-[9px] font-medium uppercase tracking-[0.22em] text-gold/50 mb-1.5">
                    {isIndia ? 'India Operations' : 'East Coast'}
                  </p>
                  <h3 className="font-serif text-[1.2rem] md:text-[1.4rem] text-primary-foreground leading-[1.2]">
                    {isIndia ? 'GK II, Delhi' : 'New York City'}
                  </h3>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative hero-gradient-animated text-primary-foreground overflow-hidden px-5 md:px-10 lg:px-16 py-8 md:py-12 lg:py-16">
        <DarkSectionEffects variant="cta" />
        <div className="relative max-w-[1080px] mx-auto">
          <div className="max-w-[520px]">
            <FadeIn>
              <SectionLabel light>Connect</SectionLabel>
              <h2 className="font-serif text-[clamp(1.3rem,2.5vw,2rem)] text-primary-foreground leading-[1.18] mb-3 md:mb-4">
                {isIndia ? 'Partner With Us in India' : 'Start a Conversation'}
              </h2>
              <p className="font-sans text-[14px] md:text-[15px] text-primary-foreground/35 leading-[1.75] md:leading-[1.8] mb-5 md:mb-7">
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
