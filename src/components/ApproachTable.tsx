import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface ApproachItem {
  t: string;
  d: string;
}

interface ApproachTableProps {
  items: ApproachItem[];
}

const ApproachRow = ({ item, index, total }: { item: ApproachItem; index: number; total: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: '-40px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="group relative cursor-default"
    >
      {/* Row container */}
      <motion.div
        whileHover={{ x: 6 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className="relative flex items-start gap-4 md:gap-6 lg:gap-8 py-6 md:py-7"
      >
        {/* Animated gold accent line on left */}
        <div className="absolute left-0 top-6 md:top-7 bottom-6 md:bottom-7 w-px overflow-hidden">
          <motion.div
            className="w-full bg-gold/40"
            initial={{ height: 0 }}
            animate={isInView ? { height: '100%' } : { height: 0 }}
            transition={{ duration: 0.5, delay: index * 0.12 + 0.3, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>

        {/* Number */}
        <div className="relative pl-4 md:pl-5 shrink-0">
          <motion.span
            initial={{ opacity: 0.04 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0.04 }}
            transition={{ duration: 0.7, delay: index * 0.12 + 0.2 }}
            className="font-serif text-[1.6rem] md:text-[1.8rem] lg:text-[2rem] leading-none text-gold/20 group-hover:text-gold/45 transition-colors duration-500 block tabular-nums"
          >
            {String(index + 1).padStart(2, '0')}
          </motion.span>
        </div>

        {/* Content */}
        <div className="flex flex-col md:flex-row md:items-baseline md:gap-8 lg:gap-12 flex-1 min-w-0 pt-1 md:pt-1.5">
          <h3 className="font-serif text-[1rem] md:text-[1.08rem] text-foreground md:w-48 lg:w-56 shrink-0 mb-1 md:mb-0 group-hover:text-foreground transition-colors duration-300">
            {item.t}
          </h3>
          <p className="font-sans text-[12.5px] md:text-[13px] text-muted-foreground/70 leading-[1.75] group-hover:text-muted-foreground transition-colors duration-400">
            {item.d}
          </p>
        </div>

        {/* Subtle arrow on hover (desktop) */}
        <motion.div
          className="hidden md:flex items-center shrink-0 self-center"
          initial={{ opacity: 0, x: -8 }}
          whileHover={{ opacity: 1, x: 0 }}
        >
          <span className="text-gold/0 group-hover:text-gold/30 transition-all duration-300 text-[11px]">
            ›
          </span>
        </motion.div>
      </motion.div>

      {/* Bottom border with animated gold highlight */}
      <div className="relative h-px">
        <div className="absolute inset-0 bg-foreground/[0.05]" />
        <motion.div
          className="absolute inset-y-0 left-0 bg-gold/20"
          initial={{ width: 0 }}
          animate={isInView ? { width: '100%' } : { width: 0 }}
          transition={{ duration: 0.8, delay: index * 0.12 + 0.4, ease: [0.22, 1, 0.36, 1] }}
        />
        {/* Brighter gold on hover */}
        <motion.div
          className="absolute inset-y-0 left-0 w-0 group-hover:w-full bg-gold/35 transition-all duration-500 ease-out"
        />
      </div>
    </motion.div>
  );
};

const ApproachTable = ({ items }: ApproachTableProps) => {
  return (
    <div className="relative">
      {/* Top border */}
      <div className="h-px bg-foreground/[0.05]" />

      {items.map((item, i) => (
        <ApproachRow key={item.t} item={item} index={i} total={items.length} />
      ))}
    </div>
  );
};

export default ApproachTable;
