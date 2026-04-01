import { motion } from 'framer-motion';

interface Props {
  isMobile: boolean;
  isDark: boolean;
}

const CrucibleEffects = ({ isMobile, isDark }: Props) => {
  const particleCount = isMobile ? 6 : 12;
  const emberColor = isDark ? 'hsl(43 78% 50%)' : 'hsl(43 70% 42%)';
  const glowColor = isDark ? 'hsl(30 90% 50% / 0.25)' : 'hsl(30 80% 45% / 0.18)';

  return (
    <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 2 }}>
      {/* Rising Embers */}
      {[...Array(particleCount)].map((_, i) => {
        const size = 2 + (i % 3) * 2;
        const left = 8 + ((i * 17) % 84);
        const duration = 5 + (i % 4) * 1.5;
        const delay = i * 0.7;
        const drift = (i % 2 === 0 ? 1 : -1) * (10 + (i % 3) * 8);

        return (
          <motion.div
            key={`ember-${i}`}
            className="absolute rounded-full"
            style={{
              width: size,
              height: size,
              left: `${left}%`,
              bottom: '5%',
              backgroundColor: emberColor,
              boxShadow: `0 0 ${size * 3}px ${size}px ${glowColor}`,
            }}
            animate={{
              y: [0, -300 - (i % 3) * 100],
              x: [0, drift, 0],
              opacity: [0, 0.9, 0.7, 0],
            }}
            transition={{
              duration,
              delay,
              repeat: Infinity,
              ease: 'easeOut',
            }}
          />
        );
      })}

      {/* Heat Pulse – radial glow at bottom center */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2"
        style={{
          bottom: 0,
          width: isMobile ? '80%' : '60%',
          height: '50%',
          background: isDark
            ? 'radial-gradient(ellipse at center bottom, hsl(30 85% 50% / 0.12), transparent 70%)'
            : 'radial-gradient(ellipse at center bottom, hsl(35 80% 50% / 0.08), transparent 70%)',
        }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Smoke Drift – two haze bands */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: isDark
            ? 'linear-gradient(135deg, transparent 30%, hsl(30 40% 30% / 0.06) 50%, transparent 70%)'
            : 'linear-gradient(135deg, transparent 30%, hsl(35 30% 60% / 0.04) 50%, transparent 70%)',
          filter: 'blur(30px)',
        }}
        animate={{ x: ['-10%', '10%', '-10%'] }}
        transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute inset-0"
        style={{
          background: isDark
            ? 'linear-gradient(225deg, transparent 25%, hsl(25 50% 25% / 0.05) 50%, transparent 75%)'
            : 'linear-gradient(225deg, transparent 25%, hsl(30 35% 55% / 0.03) 50%, transparent 75%)',
          filter: 'blur(40px)',
        }}
        animate={{ x: ['8%', '-12%', '8%'] }}
        transition={{ duration: 35, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
};

export default CrucibleEffects;
