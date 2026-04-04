import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';

const stages = [
  {
    title: 'Discovery',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
        <circle cx="11" cy="11" r="7" /><path d="M21 21l-4.35-4.35" />
      </svg>
    ),
    desc: 'Sourcing and originating proprietary deal flow through deep networks and relationships.',
  },
  {
    title: 'Evaluation',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
        <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" />
        <rect x="9" y="3" width="6" height="4" rx="1" />
        <path d="M9 14l2 2 4-4" />
      </svg>
    ),
    desc: 'Assessing strategic fit, market position, culture alignment, and growth potential.',
  },
  {
    title: 'Diligence',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
        <path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
      </svg>
    ),
    desc: 'Deep financial, operational, legal, and commercial analysis with rigorous frameworks.',
  },
  {
    title: 'Structuring',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
        <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
        <line x1="12" y1="22.08" x2="12" y2="12" />
      </svg>
    ),
    desc: 'Designing ownership, governance, and capital structures for long-term partnership.',
  },
];

const CriteriaPipeline = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  const [activeStage, setActiveStage] = useState<number | null>(null);

  return (
    <div ref={ref} className="relative">
      {/* Pipeline stages */}
      <div className="relative flex flex-col gap-0">
        {stages.map((stage, i) => (
          <div key={stage.title} className="relative">
            {/* Stage card */}
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
              onMouseEnter={() => setActiveStage(i)}
              onMouseLeave={() => setActiveStage(null)}
              className={`
                group relative flex items-start gap-4 p-4 rounded-sm cursor-pointer
                transition-all duration-400 border border-transparent
                ${activeStage === i
                  ? 'bg-primary-foreground/[0.08] border-gold/20'
                  : 'hover:bg-primary-foreground/[0.04]'
                }
              `}
            >
              {/* Number + icon column */}
              <div className="relative shrink-0 flex flex-col items-center">
                <motion.div
                  className={`
                    w-12 h-12 rounded-sm flex items-center justify-center
                    border transition-all duration-400
                    ${activeStage === i
                      ? 'border-gold/40 bg-gold/20 text-gold'
                      : 'border-primary-foreground/[0.1] bg-primary-foreground/[0.04] text-primary-foreground/40'
                    }
                  `}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  {stage.icon}
                </motion.div>
                {/* Vertical connector below icon */}
                {i < stages.length - 1 && (
                  <motion.div
                    initial={{ scaleY: 0 }}
                    animate={isInView ? { scaleY: 1 } : {}}
                    transition={{ duration: 0.6, delay: 0.5 + i * 0.15 }}
                    className="w-px h-4 bg-gold/20 origin-top mt-0"
                  />
                )}
              </div>

              {/* Content */}
              <div className="flex-1 pt-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className={`
                    font-serif text-[1rem] md:text-[1.1rem] leading-[1.25]
                    transition-colors duration-300
                    ${activeStage === i ? 'text-gold' : 'text-primary-foreground/80'}
                  `}>
                    {stage.title}
                  </h4>
                </div>
                <motion.p
                  className={`
                    font-sans text-[12px] md:text-[13px] leading-[1.7]
                    transition-all duration-400
                    ${activeStage === i ? 'text-primary-foreground/55' : 'text-primary-foreground/30'}
                  `}
                >
                  {stage.desc}
                </motion.p>
                {/* Expanding gold line */}
                <motion.div
                  className="h-px bg-gold/20 mt-3"
                  initial={{ width: '0%' }}
                  animate={activeStage === i ? { width: '100%' } : { width: '20%' }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                />
              </div>
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CriteriaPipeline;
