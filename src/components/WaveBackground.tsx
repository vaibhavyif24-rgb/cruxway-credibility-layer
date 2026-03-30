import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';

interface WaveBackgroundProps {
  variant?: 'hero' | 'section' | 'full';
  className?: string;
}

const WaveBackground = ({ variant = 'section', className = '' }: WaveBackgroundProps) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const lineColor = isDark ? 'hsl(228 50% 30%)' : 'hsl(228 40% 70%)';
  const lineOpacity = isDark ? 0.25 : 0.06;
  const lineCount = variant === 'hero' ? 7 : variant === 'full' ? 6 : 4;

  const waves = Array.from({ length: lineCount }, (_, i) => {
    const baseY = 15 + (i * 70) / lineCount;
    const amplitude = 8 + (i % 3) * 4;
    const phase = i * 0.4;
    const duration = 14 + i * 1.2;
    const strokeW = 1.2 + (i % 3) * 0.3;
    return { baseY, amplitude, phase, i, duration, strokeW };
  });

  const makePath = (baseY: number, amplitude: number, offset: number) => {
    const y1 = baseY + Math.sin(offset) * amplitude;
    const y2 = baseY + Math.sin(offset + 1.2) * amplitude * 0.8;
    const y3 = baseY + Math.sin(offset + 2.4) * amplitude;
    const y4 = baseY + Math.sin(offset + 3.6) * amplitude * 0.7;
    return `M 0 ${y1} C 25 ${y2}, 50 ${y3}, 75 ${y4} S 100 ${baseY + Math.sin(offset + 0.8) * amplitude * 0.6}`;
  };

  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        fill="none"
      >
        {waves.map(({ baseY, amplitude, phase, i, duration, strokeW }) => (
          <motion.path
            key={i}
            d={makePath(baseY, amplitude, phase)}
            stroke={lineColor}
            strokeWidth={strokeW}
            strokeOpacity={lineOpacity}
            fill="none"
            vectorEffect="non-scaling-stroke"
            animate={{
              d: [
                makePath(baseY, amplitude, phase),
                makePath(baseY, amplitude, phase + Math.PI),
                makePath(baseY, amplitude, phase + Math.PI * 2),
              ],
            }}
            transition={{
              d: {
                repeat: Infinity,
                repeatType: 'loop',
                duration,
                ease: 'easeInOut',
              },
            }}
          />
        ))}
      </svg>
    </div>
  );
};

export default WaveBackground;