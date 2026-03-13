import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface ApproachItem {
  t: string;
  d: string;
}

interface ApproachTableProps {
  items: ApproachItem[];
  variant?: 'light' | 'dark';
}

const ApproachCard = ({ item, index, variant }: { item: ApproachItem; index: number; variant: 'light' | 'dark' }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-20px' });
  const isDark = variant === 'dark';

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 18 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="group"
    >
      <motion.div
        whileHover={{ y: -3 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className={`relative h-full p-5 md:p-6 lg:p-7 rounded-[3px] border transition-all duration-400 ${
          isDark
            ? 'bg-primary-foreground/[0.025] border-primary-foreground/[0.06] hover:border-gold/20 hover:bg-primary-foreground/[0.05] backdrop-blur-sm'
            : 'bg-background border-foreground/[0.06] hover:border-gold/25 hover:shadow-[0_6px_24px_-8px_hsl(var(--gold)/0.1)]'
        }`}
      >
        {/* Top accent line */}
        <div className="absolute top-0 left-5 md:left-6 lg:left-7 right-5 md:right-6 lg:right-7 h-px overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-gold/30 via-gold/50 to-gold/30"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: index * 0.12 + 0.2, ease: [0.22, 1, 0.36, 1] }}
            style={{ originX: 0 }}
          />
        </div>

        {/* Number + Title row */}
        <div className="flex items-baseline gap-3 mb-3 md:mb-4">
          <motion.span
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.4, delay: index * 0.1 + 0.2 }}
            className={`font-serif text-[1.5rem] md:text-[1.75rem] lg:text-[2rem] tabular-nums leading-none tracking-[-0.03em] transition-colors duration-500 ${
              isDark
                ? 'text-gold/25 group-hover:text-gold/50'
                : 'text-gold/25 group-hover:text-gold/45'
            }`}
          >
            {String(index + 1).padStart(2, '0')}
          </motion.span>

          <h3 className={`font-serif text-[1.05rem] md:text-[1.15rem] leading-[1.2] tracking-[-0.01em] transition-colors duration-300 ${
            isDark ? 'text-primary-foreground' : 'text-foreground'
          }`}>
            {item.t}
          </h3>
        </div>

        {/* Subtle divider */}
        <div className="relative h-px mb-3 md:mb-4">
          <div className={isDark ? 'absolute inset-0 bg-primary-foreground/[0.04]' : 'absolute inset-0 bg-foreground/[0.05]'} />
          <motion.div
            className="absolute inset-y-0 left-0 bg-gold/25"
            initial={{ width: 0 }}
            animate={isInView ? { width: '40%' } : {}}
            transition={{ duration: 0.7, delay: index * 0.12 + 0.35, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>

        {/* Description */}
        <p className={`font-sans text-[12.5px] md:text-[13px] leading-[1.75] transition-colors duration-400 ${
          isDark
            ? 'text-primary-foreground/35 group-hover:text-primary-foreground/55'
            : 'text-muted-foreground/70 group-hover:text-muted-foreground/95'
        }`}>
          {item.d}
        </p>
      </motion.div>
    </motion.div>
  );
};

const ApproachTable = ({ items, variant = 'light' }: ApproachTableProps) => {
  return (
    <div className="grid sm:grid-cols-2 gap-3 md:gap-4">
      {items.map((item, i) => (
        <ApproachCard key={item.t} item={item} index={i} variant={variant} />
      ))}
    </div>
  );
};

export default ApproachTable;
