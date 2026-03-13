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
  const isInView = useInView(ref, { once: true, margin: '-30px' });
  const isDark = variant === 'dark';

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="group relative"
    >
      <motion.div
        whileHover={{ x: 4 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className={`relative grid grid-cols-[40px_1fr] md:grid-cols-[52px_180px_1fr] lg:grid-cols-[56px_200px_1fr] gap-x-3 md:gap-x-5 lg:gap-x-8 items-start py-5 md:py-6 transition-all duration-300 ${
          isDark
            ? 'border-b border-primary-foreground/[0.05] group-hover:border-gold/15'
            : 'border-b border-foreground/[0.05] group-hover:border-gold/20'
        }`}
      >
        {/* Number */}
        <motion.span
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.4, delay: index * 0.08 + 0.15 }}
          className={`font-serif text-[1.1rem] md:text-[1.25rem] tabular-nums leading-none pt-0.5 transition-colors duration-400 ${
            isDark
              ? 'text-gold/20 group-hover:text-gold/50'
              : 'text-gold/18 group-hover:text-gold/45'
          }`}
        >
          {String(index + 1).padStart(2, '0')}
        </motion.span>

        {/* Title */}
        <h3 className={`font-serif text-[1rem] md:text-[1.1rem] leading-[1.25] pt-0.5 transition-colors duration-300 ${
          isDark ? 'text-primary-foreground' : 'text-foreground'
        }`}>
          {item.t}
        </h3>

        {/* Description — stacks below title on mobile */}
        <p className={`col-start-2 md:col-start-3 font-sans text-[12.5px] md:text-[13px] leading-[1.7] md:leading-[1.75] mt-1.5 md:mt-0 transition-colors duration-400 ${
          isDark
            ? 'text-primary-foreground/28 group-hover:text-primary-foreground/45'
            : 'text-muted-foreground/60 group-hover:text-muted-foreground/85'
        }`}>
          {item.d}
        </p>

        {/* Animated gold accent on hover */}
        <motion.div
          className={`absolute left-0 top-0 bottom-0 w-[2px] rounded-full transition-all duration-500 ${
            isDark
              ? 'bg-gold/0 group-hover:bg-gold/25'
              : 'bg-gold/0 group-hover:bg-gold/20'
          }`}
          initial={{ scaleY: 0 }}
          animate={isInView ? { scaleY: 1 } : {}}
          transition={{ duration: 0.5, delay: index * 0.08 + 0.3, ease: [0.22, 1, 0.36, 1] }}
          style={{ originY: 0 }}
        />
      </motion.div>
    </motion.div>
  );
};

const ApproachTable = ({ items, variant = 'light' }: ApproachTableProps) => {
  const isDark = variant === 'dark';

  return (
    <div className={`relative ${isDark ? '' : ''}`}>
      {/* Top border */}
      <div className={`h-px ${isDark ? 'bg-primary-foreground/[0.06]' : 'bg-foreground/[0.06]'}`} />
      {items.map((item, i) => (
        <ApproachRow key={item.t} item={item} index={i} variant={variant} />
      ))}
    </div>
  );
};

export default ApproachTable;