import { motion } from 'framer-motion';

interface Props {
  isMobile: boolean;
  isDark: boolean;
}

const WayEffects = ({ isMobile, isDark }: Props) => {
  const dustCount = isMobile ? 4 : 8;
  const dustColor = isDark ? 'hsl(43 60% 70%)' : 'hsl(40 70% 75%)';

  return (
    <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 2 }}>
      {/* Sweeping Light Rays */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={`ray-${i}`}
          className="absolute"
          style={{
            top: 0,
            left: `${15 + i * 25}%`,
            width: '15%',
            height: '100%',
            background: isDark
              ? `linear-gradient(${110 + i * 15}deg, transparent 20%, hsl(43 70% 60% / ${0.04 + i * 0.02}) 50%, transparent 80%)`
              : `linear-gradient(${110 + i * 15}deg, transparent 20%, hsl(43 60% 50% / ${0.03 + i * 0.015}) 50%, transparent 80%)`,
            filter: 'blur(20px)',
          }}
          animate={{ x: ['-20%', '60%', '-20%'] }}
          transition={{
            duration: 18 + i * 5,
            delay: i * 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Dust Motes */}
      {[...Array(dustCount)].map((_, i) => {
        const size = 1 + (i % 2);
        return (
          <motion.div
            key={`dust-${i}`}
            className="absolute rounded-full"
            style={{
              width: size,
              height: size,
              left: `${5 + ((i * 13) % 90)}%`,
              top: `${15 + ((i * 11) % 70)}%`,
              backgroundColor: dustColor,
              opacity: 0,
            }}
            animate={{
              x: [0, (i % 2 === 0 ? 20 : -20), 0],
              y: [0, -(15 + (i % 3) * 10), 0],
              opacity: [0, 0.5, 0.3, 0],
            }}
            transition={{
              duration: 10 + i * 1.2,
              delay: i * 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        );
      })}

      {/* Horizon Pulse */}
      <motion.div
        className="absolute left-0 right-0"
        style={{
          top: '40%',
          height: '20%',
          background: isDark
            ? 'linear-gradient(180deg, transparent, hsl(35 60% 50% / 0.04), transparent)'
            : 'linear-gradient(180deg, transparent, hsl(35 50% 55% / 0.03), transparent)',
          filter: 'blur(25px)',
        }}
        animate={{ opacity: [0.3, 0.8, 0.3], scaleY: [0.9, 1.1, 0.9] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
};

export default WayEffects;
