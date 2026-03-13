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

const ApproachRow = ({ item, index, variant }: { item: ApproachItem; index: number; variant: 'light' | 'dark' }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-20px' });
  const isDark = variant === 'dark';

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 14 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.09, ease: [0.22, 1, 0.36, 1] }}
      className="group relative"
    >
      <motion.div
        whileHover={{ x: 3 }}
        transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className={`relative grid grid-cols-[36px_1fr] md:grid-cols-[44px_1fr] lg:grid-cols-[48px_160px_1fr] items-baseline gap-x-2 md:gap-x-3 lg:gap-x-6 py-5 md:py-6 transition-all duration-300 ${
          isDark
            ? 'border-b border-primary-foreground/[0.05] group-hover:border-gold/15'
            : 'border-b border-foreground/[0.06] group-hover:border-gold/20'
        }`}
      >
        {/* Left gold accent bar */}
        <motion.div
          className={`absolute left-0 top-0 bottom-0 w-[2px] transition-all duration-500 ${
            isDark ? 'bg-gold/0 group-hover:bg-gold/30' : 'bg-gold/0 group-hover:bg-gold/25'
          }`}
          initial={{ scaleY: 0 }}
          animate={isInView ? { scaleY: 1 } : {}}
          transition={{ duration: 0.4, delay: index * 0.09 + 0.25, ease: [0.22, 1, 0.36, 1] }}
          style={{ originY: 0 }}
        />

        {/* Number */}
        <motion.span
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: index * 0.09 + 0.15 }}
          className={`font-serif text-[1.15rem] md:text-[1.3rem] tabular-nums leading-none tracking-[-0.03em] transition-colors duration-500 ${
            isDark
              ? 'text-gold/20 group-hover:text-gold/45'
              : 'text-gold/18 group-hover:text-gold/40'
          }`}
        >
          {String(index + 1).padStart(2, '0')}
        </motion.span>

        {/* Title */}
        <h3 className={`font-serif text-[0.95rem] md:text-[1.05rem] leading-[1.25] tracking-[-0.01em] transition-colors duration-300 ${
          isDark ? 'text-primary-foreground' : 'text-foreground'
        }`}>
          {item.t}
        </h3>

        {/* Description — below title on mobile, third column on lg */}
        <p className={`col-start-2 lg:col-start-3 font-sans text-[12px] md:text-[12.5px] leading-[1.7] mt-1 lg:mt-0 transition-colors duration-400 ${
          isDark
            ? 'text-primary-foreground/30 group-hover:text-primary-foreground/50'
            : 'text-muted-foreground/60 group-hover:text-muted-foreground/85'
        }`}>
          {item.d}
        </p>
      </motion.div>
    </motion.div>
  );
};

const ApproachTable = ({ items, variant = 'light' }: ApproachTableProps) => {
  const isDark = variant === 'dark';

  return (
    <div className="relative">
      {/* Top border */}
      <div className={`h-px ${isDark ? 'bg-primary-foreground/[0.06]' : 'bg-foreground/[0.06]'}`} />
      {items.map((item, i) => (
        <ApproachRow key={item.t} item={item} index={i} variant={variant} />
      ))}
    </div>
  );
};

export default ApproachTable;
