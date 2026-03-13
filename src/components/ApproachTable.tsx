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

const ApproachCard = ({ item, index, total, variant }: { item: ApproachItem; index: number; total: number; variant: 'light' | 'dark' }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  const isDark = variant === 'dark';

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="group relative"
    >
      <motion.div
        whileHover={{ y: -4, scale: 1.01 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className={`relative overflow-hidden rounded-sm p-5 md:p-7 h-full border transition-all duration-500 ${
          isDark
            ? 'bg-primary-foreground/[0.02] border-primary-foreground/[0.06] hover:border-gold/20 hover:bg-primary-foreground/[0.04] backdrop-blur-sm'
            : 'bg-background/60 border-foreground/[0.05] hover:border-gold/25 hover:bg-background/90 hover:shadow-[0_8px_30px_-12px_hsl(var(--gold)/0.08)]'
        }`}
      >
        {/* Animated top border accent */}
        <div className="absolute top-0 left-0 right-0 h-px overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-transparent via-gold/40 to-transparent"
            initial={{ x: '-100%' }}
            animate={isInView ? { x: '100%' } : {}}
            transition={{ duration: 1.2, delay: index * 0.15 + 0.3, ease: [0.22, 1, 0.36, 1] }}
          />
          {/* Persistent hover line */}
          <div className={`absolute inset-0 transition-opacity duration-500 ${
            isDark ? 'bg-gold/0 group-hover:bg-gold/20' : 'bg-gold/0 group-hover:bg-gold/15'
          }`} />
        </div>

        {/* Corner glow on hover */}
        <div className={`absolute top-0 right-0 w-[80px] h-[80px] rounded-bl-full transition-opacity duration-500 opacity-0 group-hover:opacity-100 ${
          isDark ? 'bg-gold/[0.03]' : 'bg-gold/[0.04]'
        }`} />

        {/* Number badge */}
        <div className="flex items-start gap-4 mb-3 md:mb-4">
          <motion.div
            initial={{ scale: 0, rotate: -45 }}
            animate={isInView ? { scale: 1, rotate: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.1 + 0.2, ease: [0.22, 1, 0.36, 1] }}
            className={`relative flex items-center justify-center w-9 h-9 md:w-10 md:h-10 rounded-sm shrink-0 transition-all duration-500 ${
              isDark
                ? 'border border-gold/15 group-hover:border-gold/35 bg-gold/[0.03] group-hover:bg-gold/[0.06]'
                : 'border border-gold/10 group-hover:border-gold/30 bg-gold/[0.03] group-hover:bg-gold/[0.06]'
            }`}
          >
            <span className={`font-serif text-[0.95rem] md:text-[1.05rem] tabular-nums transition-colors duration-500 ${
              isDark ? 'text-gold/30 group-hover:text-gold/60' : 'text-gold/25 group-hover:text-gold/50'
            }`}>
              {String(index + 1).padStart(2, '0')}
            </span>
            {/* Inner glow */}
            <motion.div
              className="absolute inset-0 rounded-sm bg-gold/0 group-hover:bg-gold/[0.04]"
              transition={{ duration: 0.3 }}
            />
          </motion.div>

          {/* Title */}
          <div className="pt-1.5">
            <h3 className={`font-serif text-[1rem] md:text-[1.1rem] leading-[1.2] transition-colors duration-300 ${
              isDark ? 'text-primary-foreground group-hover:text-primary-foreground' : 'text-foreground'
            }`}>
              {item.t}
            </h3>
          </div>
        </div>

        {/* Divider */}
        <div className="relative h-px mb-3 md:mb-4 overflow-hidden">
          <div className={isDark ? 'absolute inset-0 bg-primary-foreground/[0.04]' : 'absolute inset-0 bg-foreground/[0.04]'} />
          <motion.div
            className="absolute inset-y-0 left-0 bg-gold/20"
            initial={{ width: 0 }}
            animate={isInView ? { width: '100%' } : {}}
            transition={{ duration: 0.8, delay: index * 0.12 + 0.4, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>

        {/* Description */}
        <p className={`font-sans text-[12px] md:text-[12.5px] leading-[1.75] transition-colors duration-400 ${
          isDark
            ? 'text-primary-foreground/25 group-hover:text-primary-foreground/45'
            : 'text-muted-foreground/65 group-hover:text-muted-foreground/90'
        }`}>
          {item.d}
        </p>

        {/* Bottom-left animated accent */}
        <motion.div
          className="absolute bottom-3 left-5 md:left-7 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-all duration-500"
        >
          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: 16 } : {}}
            transition={{ duration: 0.4, delay: index * 0.1 + 0.6 }}
            className="h-px bg-gold/15"
          />
          <div className="w-[3px] h-[3px] rotate-45 border border-gold/15 group-hover:border-gold/30 transition-colors duration-300" />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

const ApproachTable = ({ items, variant = 'light' }: ApproachTableProps) => {
  return (
    <div className="grid sm:grid-cols-2 gap-3 md:gap-4">
      {items.map((item, i) => (
        <ApproachCard key={item.t} item={item} index={i} total={items.length} variant={variant} />
      ))}
    </div>
  );
};

export default ApproachTable;
