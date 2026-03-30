import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';
import { useIsMobile } from '@/hooks/use-mobile';

interface Principle {
  t: string;
  d: string;
}

interface PrinciplesGridProps {
  principles: Principle[];
}

const PrinciplesGrid = ({ principles }: PrinciplesGridProps) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const isMobile = useIsMobile();

  return (
    <div className="relative max-w-[1080px] mx-auto px-5 md:px-10 lg:px-16 pb-6 md:pb-8">
      <div className="relative">
        {/* Vertical connecting line — center on desktop, left on mobile */}
        <div
          className={`absolute top-0 bottom-0 w-px ${
            isMobile ? 'left-[1.5rem]' : 'left-1/2 -translate-x-px'
          }`}
        >
          <motion.div
            className="w-full h-full bg-gold/10"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: 'top' }}
          />
          {/* Shimmer pulse on the line */}
          <div
            className="absolute inset-0 w-full"
            style={{
              background: 'linear-gradient(180deg, transparent 0%, hsl(38,48%,52%,0.15) 50%, transparent 100%)',
              backgroundSize: '100% 200%',
              animation: 'shimmer-line-pulse 4s ease-in-out infinite',
            }}
          />
        </div>

        {/* Principles */}
        <div className="relative space-y-8 md:space-y-12">
          {principles.map((principle, i) => {
            const num = String(i + 1).padStart(2, '0');
            const isLeft = i % 2 === 0;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: isMobile ? -20 : isLeft ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className={`relative group ${
                  isMobile
                    ? 'pl-14'
                    : isLeft
                      ? 'md:pr-[calc(50%+2.5rem)] md:text-right'
                      : 'md:pl-[calc(50%+2.5rem)] md:text-left'
                }`}
              >
                {/* Node dot on the line */}
                <div
                  className={`absolute top-1 w-3 h-3 rounded-full border-2 border-gold/30 bg-background group-hover:border-gold/60 group-hover:bg-gold/10 transition-all duration-500 ${
                    isMobile
                      ? 'left-[calc(1.5rem-5px)]'
                      : 'left-[calc(50%-6px)]'
                  }`}
                />

                {/* Large gold number */}
                <motion.span
                  className={`block font-serif text-[3rem] md:text-[3.5rem] leading-none text-gold/20 group-hover:text-gold/40 transition-colors duration-500 select-none ${
                    isMobile ? '' : isLeft ? 'md:text-right' : 'md:text-left'
                  }`}
                >
                  {num}
                </motion.span>

                {/* Title */}
                <h3 className="font-serif text-[clamp(1.15rem,2vw,1.4rem)] text-foreground leading-[1.2] tracking-[-0.02em] mt-1 relative inline-block">
                  {principle.t}
                  {/* Gold underline on hover */}
                  <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-gold/40 group-hover:w-full transition-all duration-500" />
                </h3>

                {/* Description */}
                <p className="font-sans text-[13.5px] md:text-[14px] text-muted-foreground leading-[1.75] mt-2 max-w-[400px] inline-block">
                  {principle.d}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PrinciplesGrid;
