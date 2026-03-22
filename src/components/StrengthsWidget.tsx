import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';

const strengths = [
  {
    title: 'Proprietary Network',
    desc: 'Deep relationships with founders, advisors, and intermediaries across essential services verticals.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87" />
        <path d="M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
  },
  {
    title: 'Deal Flow',
    desc: 'Consistent, high-quality pipeline sourced through trusted relationships and market expertise.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
  },
  {
    title: 'Operational Expertise',
    desc: 'Hands-on value creation through professionalisation, systems, and management best practices.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
      </svg>
    ),
  },
  {
    title: 'Cross-Border Reach',
    desc: 'Bi-continental presence spanning India and the United States with localised market intelligence.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
      </svg>
    ),
  },
  {
    title: 'Patient Capital',
    desc: 'Permanent capital structure enabling long-term hold periods aligned with founder timelines.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
  {
    title: 'Sector Depth',
    desc: 'Deep domain expertise across essential B2B services, compliance, and regulated industries.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
        <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" />
      </svg>
    ),
  },
];

const StrengthsWidget = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div ref={ref}>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {strengths.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 14 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.45, delay: 0.1 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
            className={`
              group relative p-4 rounded-sm cursor-pointer
              border transition-all duration-400
              ${hoveredIndex === i
                ? 'border-gold/25 bg-primary-foreground/[0.07]'
                : 'border-primary-foreground/[0.06] bg-primary-foreground/[0.03] hover:bg-primary-foreground/[0.05]'
              }
            `}
          >
            {/* Gold corner accents */}
            <span className={`absolute top-0 left-0 w-0 h-px bg-gold/30 group-hover:w-6 transition-all duration-500`} />
            <span className={`absolute top-0 left-0 h-0 w-px bg-gold/30 group-hover:h-6 transition-all duration-500`} />

            {/* Icon */}
            <div className={`
              mb-3 transition-colors duration-300
              ${hoveredIndex === i ? 'text-gold' : 'text-primary-foreground/30'}
            `}>
              {item.icon}
            </div>

            {/* Title */}
            <h4 className={`
              font-serif text-[0.85rem] md:text-[0.9rem] leading-[1.3] mb-1.5
              transition-colors duration-300
              ${hoveredIndex === i ? 'text-primary-foreground/90' : 'text-primary-foreground/65'}
            `}>
              {item.title}
            </h4>

            {/* Description */}
            <p className={`
              font-sans text-[11px] md:text-[12px] leading-[1.6]
              transition-all duration-400
              ${hoveredIndex === i ? 'text-primary-foreground/45' : 'text-primary-foreground/25'}
            `}>
              {item.desc}
            </p>

            {/* Bottom accent line */}
            <motion.div
              className="absolute bottom-0 left-0 h-px bg-gold/20"
              initial={{ width: '0%' }}
              animate={hoveredIndex === i ? { width: '100%' } : { width: '0%' }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default StrengthsWidget;
