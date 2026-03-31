import { useState } from 'react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';
import DarkSectionEffects from '@/components/DarkSectionEffects';
import LightSectionEffects from '@/components/LightSectionEffects';
import WaveBackground from '@/components/WaveBackground';
import { GoldRule } from '@/components/ui/Section';
import { Lock, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const InvestorLogin = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.error('Account not registered. Please contact your relationship manager for access.', {
        duration: 5000,
        style: { fontFamily: 'Inter, sans-serif', fontSize: '13px' },
      });
    }, 900);
  };

  return (
    <div className={`min-h-[100dvh] flex flex-col items-center justify-center px-6 relative overflow-hidden transition-colors duration-300 ${isDark ? 'bg-primary' : 'bg-background'}`}>
      {/* Ambient background effects */}
      {isDark ? <DarkSectionEffects variant="hero" /> : <LightSectionEffects variant="hero" />}
      <WaveBackground variant="hero" />

      {/* Subtle gradient overlays */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: isDark
            ? 'linear-gradient(to bottom, hsl(228 58% 8% / 0.7), transparent 50%, hsl(228 58% 8% / 0.4))'
            : 'linear-gradient(to bottom, hsl(40 20% 97% / 0.5), transparent 50%, hsl(40 20% 97% / 0.3))',
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: isDark
            ? 'radial-gradient(ellipse at center, hsl(228 58% 18% / 0.2), transparent 60%)'
            : 'radial-gradient(ellipse at center, hsl(43 70% 50% / 0.04), transparent 60%)',
        }}
      />

      {/* Back link */}
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="absolute top-6 left-6 z-20"
      >
        <Link
          to="/"
          className={`flex items-center gap-1.5 font-sans text-[10px] font-medium uppercase tracking-[0.16em] transition-colors duration-300 ${
            isDark
              ? 'text-primary-foreground/25 hover:text-primary-foreground/50'
              : 'text-muted-foreground/50 hover:text-foreground/70'
          }`}
        >
          <ArrowLeft className="w-3 h-3" />
          Back
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-[340px] relative z-10"
      >
        {/* Brand */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-14"
        >
          <a
            href="/"
            className={`font-serif text-2xl tracking-[-0.02em] hover:opacity-75 transition-opacity ${
              isDark ? 'text-primary-foreground' : 'text-foreground'
            }`}
          >
            Cruxway
          </a>
          <div className="flex justify-center mt-4">
            <GoldRule />
          </div>
          <p className={`font-sans text-[9px] font-medium uppercase tracking-[0.25em] mt-3 ${
            isDark ? 'text-primary-foreground/20' : 'text-muted-foreground/50'
          }`}>
            Investor Portal
          </p>
        </motion.div>

        {/* Form card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className={`relative p-8 rounded-sm backdrop-blur-sm ${
            isDark
              ? 'bg-[hsl(228,42%,11%)]/60 border border-primary-foreground/[0.06]'
              : 'bg-white/70 border border-border/40 shadow-[0_8px_32px_-8px_hsl(38,45%,52%,0.06)]'
          }`}
        >
          {/* Lock icon */}
          <motion.div
            initial={{ opacity: 0, rotate: -15 }}
            animate={{ opacity: 1, rotate: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex justify-center mb-6"
          >
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
              isDark ? 'bg-primary-foreground/[0.04]' : 'bg-muted/60'
            }`}>
              <Lock className="w-4 h-4 text-gold/50" />
            </div>
          </motion.div>

          {/* Gold corner accents with animation */}
          <motion.span initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.6, delay: 0.5 }} className="absolute top-0 left-0 w-8 h-px bg-gold/30 origin-left" />
          <motion.span initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ duration: 0.6, delay: 0.5 }} className="absolute top-0 left-0 h-8 w-px bg-gold/30 origin-top" />
          <motion.span initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.6, delay: 0.6 }} className="absolute bottom-0 right-0 w-8 h-px bg-gold/30 origin-right" />
          <motion.span initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ duration: 0.6, delay: 0.6 }} className="absolute bottom-0 right-0 h-8 w-px bg-gold/30 origin-bottom" />

          <form onSubmit={handleSubmit} className="space-y-7">
            {/* Email field */}
            <div className="relative">
              <label className={`font-sans text-[9px] font-medium tracking-[0.22em] uppercase mb-3 block transition-colors duration-300 ${
                focused === 'email'
                  ? 'text-gold/70'
                  : isDark ? 'text-primary-foreground/20' : 'text-muted-foreground/50'
              }`}>
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setFocused('email')}
                onBlur={() => setFocused(null)}
                required
                autoComplete="email"
                className={`w-full bg-transparent border-b pb-3 pt-1 font-sans text-[15px] focus:outline-none transition-all duration-300 ${
                  isDark
                    ? 'border-primary-foreground/[0.08] text-primary-foreground focus:border-gold/30 placeholder:text-primary-foreground/[0.08]'
                    : 'border-border/60 text-foreground focus:border-gold/40 placeholder:text-muted-foreground/25'
                }`}
                placeholder="name@firm.com"
              />
              {/* Animated focus underline */}
              <motion.div
                animate={{ scaleX: focused === 'email' ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                className="absolute bottom-0 left-0 right-0 h-px bg-gold/40 origin-left"
              />
            </div>

            {/* Password field */}
            <div className="relative">
              <label className={`font-sans text-[9px] font-medium tracking-[0.22em] uppercase mb-3 block transition-colors duration-300 ${
                focused === 'password'
                  ? 'text-gold/70'
                  : isDark ? 'text-primary-foreground/20' : 'text-muted-foreground/50'
              }`}>
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setFocused('password')}
                onBlur={() => setFocused(null)}
                required
                autoComplete="current-password"
                className={`w-full bg-transparent border-b pb-3 pt-1 font-sans text-[15px] focus:outline-none transition-all duration-300 ${
                  isDark
                    ? 'border-primary-foreground/[0.08] text-primary-foreground focus:border-gold/30 placeholder:text-primary-foreground/[0.08]'
                    : 'border-border/60 text-foreground focus:border-gold/40 placeholder:text-muted-foreground/25'
                }`}
                placeholder="••••••••••"
              />
              <motion.div
                animate={{ scaleX: focused === 'password' ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                className="absolute bottom-0 left-0 right-0 h-px bg-gold/40 origin-left"
              />
            </div>

            {/* Submit button */}
            <div className="pt-4">
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full font-sans text-[10px] font-medium uppercase tracking-[0.2em] py-4 transition-all duration-300 disabled:opacity-30 ${
                  isDark
                    ? 'bg-primary-foreground/[0.04] border border-primary-foreground/[0.08] text-primary-foreground/45 hover:bg-primary-foreground/[0.08] hover:text-primary-foreground/70 hover:border-primary-foreground/15'
                    : 'bg-foreground/[0.03] border border-border/50 text-foreground/50 hover:bg-foreground/[0.06] hover:text-foreground/70 hover:border-border'
                }`}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="spinner-gold" />
                    Verifying...
                  </span>
                ) : 'Sign In'}
              </motion.button>
            </div>
          </form>
        </motion.div>

        {/* Help text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className={`text-center mt-12 font-sans text-[10px] leading-[1.6] tracking-[0.04em] ${
            isDark ? 'text-primary-foreground/30' : 'text-muted-foreground/50'
          }`}
        >
          Access is restricted to registered investors.
          <br />
          Contact your relationship manager for credentials.
        </motion.p>
      </motion.div>

      {/* Bottom badge */}
      <p className={`absolute bottom-6 sm:bottom-7 font-sans text-[8px] tracking-[0.25em] uppercase ${
        isDark ? 'text-primary-foreground/20' : 'text-muted-foreground/25'
      }`}>
        Privileged &amp; Confidential
      </p>
    </div>
  );
};

export default InvestorLogin;
