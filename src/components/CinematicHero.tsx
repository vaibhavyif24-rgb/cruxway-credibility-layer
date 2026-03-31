import { motion, useScroll, useTransform } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';

interface CinematicHeroProps {
  imageSrc: string;
  overlay?: 'strong' | 'medium';
}

const CinematicHero = ({ imageSrc, overlay = 'strong' }: CinematicHeroProps) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const { scrollY } = useScroll();
  const parallaxY = useTransform(scrollY, [0, 500], [0, -60]);

  const lineStyle = {
    stroke: 'hsl(43 70% 50%)',
    strokeWidth: 0.3,
    fill: 'none',
    opacity: 0.25,
  };

  const draw = (delay: number, dur = 1.5) => ({
    initial: { pathLength: 0, opacity: 0 },
    whileInView: { pathLength: 1, opacity: 1 },
    viewport: { once: true },
    transition: { duration: dur, delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  const overlayClass = isDark
    ? overlay === 'strong'
      ? 'bg-gradient-to-t from-navy-deep/95 via-prussian/80 to-navy-deep/70'
      : 'bg-gradient-to-t from-navy-deep/90 via-prussian/65 to-navy-deep/55'
    : overlay === 'strong'
      ? 'bg-gradient-to-t from-[hsl(40,20%,93%)]/[0.96] via-[hsl(40,25%,96%)]/[0.88] to-[hsl(40,20%,93%)]/[0.78]'
      : 'bg-gradient-to-t from-[hsl(40,20%,93%)]/[0.92] via-[hsl(40,25%,96%)]/[0.80] to-[hsl(40,20%,93%)]/[0.65]';

  const vignetteColor = isDark
    ? 'radial-gradient(ellipse at center, transparent 40%, hsl(228 45% 8% / 0.5) 100%)'
    : 'radial-gradient(ellipse at center, transparent 40%, hsl(40 20% 90% / 0.4) 100%)';

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Photo with Ken Burns + parallax */}
      <motion.div
        className="absolute inset-[-5%]"
        style={{ y: parallaxY }}
      >
        <motion.div
          className="w-full h-full"
          initial={{ scale: 1.02, x: 0 }}
          animate={{ scale: 1.14, x: [0, 12, -8, 0] }}
          transition={{
            scale: { duration: 28, ease: 'linear', repeat: Infinity, repeatType: 'reverse' },
            x: { duration: 35, ease: 'easeInOut', repeat: Infinity, repeatType: 'reverse' },
          }}
        >
          <img
            src={imageSrc}
            alt=""
            className="w-full h-full object-cover"
            loading="eager"
            fetchPriority="high"
            aria-hidden="true"
          />
        </motion.div>
      </motion.div>

      {/* Theme-aware overlay */}
      <div className={`absolute inset-0 z-[1] ${overlayClass}`} />

      {/* Vignette */}
      <div className="absolute inset-0 z-[1]" style={{ background: vignetteColor }} />

      {/* Gold geometric overlay */}
      <svg
        viewBox="0 0 1200 800"
        className="absolute inset-0 w-full h-full z-[2] opacity-50"
        preserveAspectRatio="xMidYMid slice"
      >
        <motion.line x1="30" y1="30" x2="100" y2="30" {...draw(0.3, 0.8)} style={lineStyle} />
        <motion.line x1="30" y1="30" x2="30" y2="100" {...draw(0.4, 0.8)} style={lineStyle} />
        <motion.line x1="1170" y1="30" x2="1100" y2="30" {...draw(0.3, 0.8)} style={lineStyle} />
        <motion.line x1="1170" y1="30" x2="1170" y2="100" {...draw(0.4, 0.8)} style={lineStyle} />
        <motion.line x1="30" y1="770" x2="100" y2="770" {...draw(0.5, 0.8)} style={lineStyle} />
        <motion.line x1="30" y1="770" x2="30" y2="700" {...draw(0.6, 0.8)} style={lineStyle} />
        <motion.line x1="1170" y1="770" x2="1100" y2="770" {...draw(0.5, 0.8)} style={lineStyle} />
        <motion.line x1="1170" y1="770" x2="1170" y2="700" {...draw(0.6, 0.8)} style={lineStyle} />
        <motion.line x1="0" y1="600" x2="250" y2="480" {...draw(0.8)} style={{ ...lineStyle, strokeWidth: 0.2, opacity: 0.15 }} />
        <motion.line x1="1200" y1="600" x2="950" y2="480" {...draw(0.9)} style={{ ...lineStyle, strokeWidth: 0.2, opacity: 0.15 }} />
        <motion.line x1="400" y1="720" x2="800" y2="720" {...draw(1.0, 1.2)} style={{ ...lineStyle, strokeWidth: 0.15, opacity: 0.1 }} />
        <motion.path
          d="M600 700 L605 710 L600 720 L595 710 Z"
          {...draw(1.2, 0.6)}
          style={{ ...lineStyle, strokeWidth: 0.25, opacity: 0.18 }}
        />
        <motion.circle cx="250" cy="480" r="1.5" fill="hsl(43 70% 50%)" initial={{ scale: 0, opacity: 0 }} whileInView={{ scale: 1, opacity: 0.2 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 1.8 }} />
        <motion.circle cx="950" cy="480" r="1.5" fill="hsl(43 70% 50%)" initial={{ scale: 0, opacity: 0 }} whileInView={{ scale: 1, opacity: 0.2 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 1.9 }} />
      </svg>

      {/* Ambient gold glow */}
      <motion.div
        className="absolute bottom-[15%] left-1/2 -translate-x-1/2 w-[400px] h-[250px] rounded-full z-[2]"
        style={{ background: 'radial-gradient(circle, hsl(43 70% 50% / 0.04), transparent 70%)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.7, 0.4] }}
        transition={{ duration: 3, delay: 1.5, ease: 'easeOut' }}
      />

      {/* Floating light particles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-0.5 h-0.5 rounded-full bg-gold/20 z-[2]"
          style={{ left: `${10 + i * 11}%`, top: `${25 + (i % 4) * 15}%` }}
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: [0, 0.35, 0], y: [-5, -25] }}
          transition={{ duration: 4 + i * 0.4, delay: 2 + i * 0.6, repeat: Infinity, repeatDelay: 3 + i * 0.5, ease: 'easeOut' }}
        />
      ))}

      {/* Soft horizontal shimmer */}
      <motion.div
        className="absolute top-[40%] left-0 right-0 h-px z-[2]"
        style={{ background: 'linear-gradient(90deg, transparent, hsl(43 70% 50% / 0.06), transparent)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.5, 0] }}
        transition={{ duration: 6, delay: 3, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
};

export default CinematicHero;