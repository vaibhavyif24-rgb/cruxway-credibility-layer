import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';

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
  isDark,
}: {
  principle: Principle;
  index: number;
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
      className={`group relative rounded-sm border transition-all duration-500 overflow-hidden
        ${isDark
          ? 'bg-card/60 backdrop-blur-sm border-border/30 hover:border-gold/20 hover:shadow-[0_8px_32px_-8px_hsl(var(--gold)/0.15)]'
          : 'bg-[hsl(40,20%,97%)]/80 backdrop-blur-sm border-[hsl(38,15%,90%)]/50 hover:border-gold/20 hover:shadow-[0_8px_32px_-8px_hsl(38,45%,52%,0.08)]'
        }
      `}
    >
      {/* Gold left-edge accent — height animates on hover */}
      <div className={`absolute left-0 top-0 w-[2.5px] h-0 transition-all duration-500 ease-out group-hover:h-full ${
        isDark ? 'bg-gold/15 group-hover:bg-gold/50' : 'bg-gold/20 group-hover:bg-gold/50'
      }`} />

      {/* Subtle inner glow on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(ellipse_at_top_left,hsl(var(--gold)/0.04),transparent_70%)]" />

      {/* Watermark number */}
      <span className={`absolute -right-2 -bottom-3 font-serif text-[5.5rem] leading-none italic select-none pointer-events-none transition-colors duration-500 ${
        isDark ? 'text-gold/[0.03] group-hover:text-gold/[0.07]' : 'text-gold/[0.04] group-hover:text-gold/[0.08]'
      }`}>
        {num}
      </span>

      <div className="relative p-6 md:p-7">
        {/* Label */}
        <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.25em] text-gold/40 mb-2 block">
          Principle {num}
        </span>

        {/* Title */}
        <h3 className="font-serif text-[clamp(1.15rem,2vw,1.4rem)] text-foreground leading-[1.2] tracking-[-0.02em]">
          {principle.t}
        </h3>

        {/* Gold divider */}
        <div className="w-8 h-[1.5px] bg-gold/25 mt-3 mb-3 transition-all duration-500 group-hover:w-12 group-hover:bg-gold/40" />

        {/* Description — always visible */}
        <p className="font-sans text-[13.5px] md:text-[14px] text-muted-foreground leading-[1.75]">
          {principle.d}
        </p>
      </div>
    </motion.div>
  );
};

const PrinciplesGrid = ({ principles }: PrinciplesGridProps) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className="relative max-w-[1080px] mx-auto px-5 md:px-10 lg:px-16 pb-8 md:pb-12">
      {/* Ambient gold shimmer sweep */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(105deg, transparent 40%, hsl(38 48% 52% / 0.04) 50%, transparent 60%)',
            animation: 'grid-shimmer 6s linear infinite',
          }}
        />
      </div>

      {/* 2×3 Grid */}
      <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
        {principles.map((principle, i) => (
          <PrincipleCard
            key={i}
            principle={principle}
            index={i}
            isDark={isDark}
          />
        ))}
      </div>
    </div>
  );
};

export default PrinciplesGrid;
