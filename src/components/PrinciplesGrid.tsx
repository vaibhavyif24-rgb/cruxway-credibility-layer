import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';
import { GoldRule } from '@/components/ui/Section';
import { ChevronDown } from 'lucide-react';

interface Principle {
  t: string;
  d: string;
}

interface PrinciplesGridProps {
  principles: Principle[];
}

const PrincipleCard = ({
  principle,
  index,
  isExpanded,
  onToggle,
  isDark,
}: {
  principle: Principle;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
  isDark: boolean;
}) => {
  const num = String(index + 1).padStart(2, '0');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.02 }}
      onClick={onToggle}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onToggle(); } }}
      className={`group relative cursor-pointer rounded-sm border transition-all duration-300 overflow-hidden
        ${isExpanded
          ? 'border-gold/30 shadow-[0_8px_32px_-8px_hsl(var(--gold)/0.15)]'
          : 'border-border/40 hover:border-gold/20 hover:shadow-[0_4px_20px_-4px_hsl(var(--gold)/0.1)]'
        }
        ${isDark ? 'bg-card/60 backdrop-blur-sm' : 'bg-card/50 backdrop-blur-sm'}
      `}
    >
      {/* Gold left-border accent on active */}
      <div className={`absolute left-0 top-0 w-[2.5px] bg-gold/60 transition-all duration-500 ease-out ${isExpanded ? 'h-full' : 'h-0 group-hover:h-full'}`} />

      {/* Subtle inner glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(ellipse_at_top_left,hsl(var(--gold)/0.04),transparent_70%)]" />

      {/* Watermark number */}
      <span className="absolute -right-2 -bottom-4 font-serif text-[5rem] md:text-[6rem] leading-none text-gold/[0.04] italic select-none pointer-events-none transition-colors duration-500 group-hover:text-gold/[0.08]">
        {num}
      </span>

      <div className="relative p-6 md:p-7">
        {/* Header row */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.25em] text-gold/40 mb-2 block">
              Principle {num}
            </span>
            <h3 className="font-serif text-[clamp(1.1rem,2vw,1.35rem)] text-foreground leading-[1.2] tracking-[-0.02em]">
              {principle.t}
            </h3>
          </div>
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="mt-1 flex-shrink-0"
          >
            <ChevronDown className="w-4 h-4 text-gold/40 group-hover:text-gold/60 transition-colors duration-300" />
          </motion.div>
        </div>

        {/* Gold divider */}
        <div className={`w-8 h-[1.5px] bg-gold/25 mt-3 transition-all duration-500 ${isExpanded ? 'w-12 bg-gold/40' : 'group-hover:w-12 group-hover:bg-gold/35'}`} />

        {/* Collapsed preview */}
        {!isExpanded && (
          <p className="font-sans text-[13px] md:text-[14px] text-muted-foreground leading-[1.7] mt-3 line-clamp-2">
            {principle.d}
          </p>
        )}

        {/* Expanded content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <p className="font-sans text-[14px] md:text-[15px] text-muted-foreground leading-[1.75] mt-3">
                {principle.d}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

const PrinciplesGrid = ({ principles }: PrinciplesGridProps) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [expandedCards, setExpandedCards] = useState<Set<number>>(new Set());

  const allExpanded = expandedCards.size === principles.length;

  const toggleCard = useCallback((index: number) => {
    setExpandedCards((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  }, []);

  const toggleAll = useCallback(() => {
    if (allExpanded) {
      setExpandedCards(new Set());
    } else {
      setExpandedCards(new Set(principles.map((_, i) => i)));
    }
  }, [allExpanded, principles]);

  return (
    <div className="max-w-[1080px] mx-auto px-5 md:px-10 lg:px-16 pb-8 md:pb-12">
      {/* Expand All / Collapse All toggle */}
      <div className="flex justify-end mb-4 md:mb-5">
        <button
          onClick={toggleAll}
          className="font-sans text-[10px] md:text-[11px] font-medium uppercase tracking-[0.16em] text-gold/50 hover:text-gold/80 transition-colors duration-300 px-3 py-1.5 border border-gold/10 hover:border-gold/25 rounded-sm"
        >
          {allExpanded ? 'Collapse All' : 'Expand All'}
        </button>
      </div>

      {/* 2×3 Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
        {principles.map((principle, i) => (
          <PrincipleCard
            key={i}
            principle={principle}
            index={i}
            isExpanded={expandedCards.has(i)}
            onToggle={() => toggleCard(i)}
            isDark={isDark}
          />
        ))}
      </div>
    </div>
  );
};

export default PrinciplesGrid;
