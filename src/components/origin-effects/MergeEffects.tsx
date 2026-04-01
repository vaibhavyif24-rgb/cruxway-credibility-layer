import { motion } from 'framer-motion';

interface Props {
  isMobile: boolean;
  isDark: boolean;
}

const MergeEffects = ({ isMobile, isDark }: Props) => {
  const sparkCount = isMobile ? 4 : 8;
  const sparkColor = isDark ? 'hsl(43 78% 50%)' : 'hsl(43 70% 40%)';
  const sparkGlow = isDark ? 'hsl(43 78% 50% / 0.3)' : 'hsl(43 70% 40% / 0.2)';

  return (
    <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 4 }}>
      {/* Convergence Sparks – drift from edges toward center */}
      {[...Array(sparkCount)].map((_, i) => {
        const fromLeft = i % 2 === 0;
        const startX = fromLeft ? -80 : 80;
        const startY = -40 + (i % 4) * 25;
        const duration = 12 + (i % 3) * 3;

        return (
          <motion.div
            key={`spark-${i}`}
            className="absolute rounded-full"
            style={{
              width: 3,
              height: 3,
              left: '50%',
              top: '50%',
              backgroundColor: sparkColor,
              boxShadow: `0 0 8px 2px ${sparkGlow}`,
            }}
            animate={{
              x: [startX, 0],
              y: [startY, 0],
              opacity: [0, 0.8, 0],
              scale: [0.5, 1, 0.3],
            }}
            transition={{
              duration,
              delay: i * 1.8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        );
      })}

      {/* Central Radial Pulse */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          width: isMobile ? '70%' : '50%',
          height: isMobile ? '50%' : '40%',
          borderRadius: '50%',
          background: isDark
            ? 'radial-gradient(circle, hsl(43 78% 50% / 0.06), transparent 70%)'
            : 'radial-gradient(circle, hsl(43 70% 45% / 0.04), transparent 70%)',
        }}
        animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Energy Lines – sweep inward from edges */}
      <motion.div
        className="absolute top-1/2 left-0 -translate-y-1/2"
        style={{
          width: '50%',
          height: '2px',
          background: isDark
            ? 'linear-gradient(90deg, hsl(43 78% 50% / 0.15), transparent)'
            : 'linear-gradient(90deg, hsl(43 70% 45% / 0.10), transparent)',
        }}
        animate={{ x: ['0%', '40%', '0%'], opacity: [0, 0.6, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute top-1/2 right-0 -translate-y-1/2"
        style={{
          width: '50%',
          height: '2px',
          background: isDark
            ? 'linear-gradient(270deg, hsl(43 78% 50% / 0.15), transparent)'
            : 'linear-gradient(270deg, hsl(43 70% 45% / 0.10), transparent)',
        }}
        animate={{ x: ['0%', '-40%', '0%'], opacity: [0, 0.6, 0] }}
        transition={{ duration: 20, delay: 2, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
};

export default MergeEffects;
