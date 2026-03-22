import { useState } from 'react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import DarkSectionEffects from '@/components/DarkSectionEffects';

const InvestorLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

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
    <div className="min-h-[100dvh] bg-prussian flex flex-col items-center justify-center px-6 relative overflow-hidden">
      <DarkSectionEffects variant="hero" />
      <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/70 via-transparent to-navy-deep/40 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_hsl(207_65%_15%/0.2)_0%,_transparent_60%)] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-[340px] relative z-10"
      >
        {/* Brand */}
        <div className="text-center mb-14">
          <a href="/" className="font-serif text-2xl text-primary-foreground tracking-[-0.02em] hover:opacity-75 transition-opacity">
            Cruxway
          </a>
          <div className="flex items-center justify-center gap-3 mt-6 mb-2.5">
            <div className="w-8 h-px bg-gold/20" />
            <div className="w-[5px] h-[5px] rotate-45 border border-gold/15" />
            <div className="w-8 h-px bg-gold/20" />
          </div>
          <p className="font-sans text-[9px] font-medium uppercase tracking-[0.25em] text-primary-foreground/20">
            Investor Portal
          </p>
        </div>

        {/* Form container with gold corner accents */}
        <div className="relative group">
          {/* Gold corner accents */}
          <span className="absolute top-0 left-0 w-0 h-px bg-gold/30 group-hover:w-8 transition-all duration-500" />
          <span className="absolute top-0 left-0 h-0 w-px bg-gold/30 group-hover:h-8 transition-all duration-500" />
          <span className="absolute bottom-0 right-0 w-0 h-px bg-gold/30 group-hover:w-8 transition-all duration-500" />
          <span className="absolute bottom-0 right-0 h-0 w-px bg-gold/30 group-hover:h-8 transition-all duration-500" />

          <form onSubmit={handleSubmit} className="space-y-7">
            <div>
              <label className="font-sans text-[9px] font-medium tracking-[0.22em] uppercase text-primary-foreground/20 mb-3 block">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                className="w-full bg-transparent border-b border-primary-foreground/8 text-primary-foreground font-sans text-[15px] pb-3 pt-1 focus:outline-none focus:border-primary-foreground/25 transition-colors duration-300 placeholder:text-primary-foreground/8"
                placeholder="name@firm.com"
              />
            </div>
            <div>
              <label className="font-sans text-[9px] font-medium tracking-[0.22em] uppercase text-primary-foreground/20 mb-3 block">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                className="w-full bg-transparent border-b border-primary-foreground/8 text-primary-foreground font-sans text-[15px] pb-3 pt-1 focus:outline-none focus:border-primary-foreground/25 transition-colors duration-300 placeholder:text-primary-foreground/8"
                placeholder="••••••••••"
              />
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary-foreground/[0.04] border border-primary-foreground/8 text-primary-foreground/45 font-sans text-[10px] font-medium uppercase tracking-[0.2em] py-4 hover:bg-primary-foreground/[0.08] hover:text-primary-foreground/70 hover:border-primary-foreground/15 transition-all duration-300 disabled:opacity-30"
              >
                {loading ? 'Verifying...' : 'Sign In'}
              </button>
            </div>
          </form>
        </div>

        <p className="text-center mt-12 font-sans text-[10px] text-primary-foreground/30 leading-[1.6] tracking-[0.04em]">
          Access is restricted to registered investors.
          <br />
          Contact your relationship manager for credentials.
        </p>
      </motion.div>

      <p className="absolute bottom-6 sm:bottom-7 font-sans text-[8px] text-primary-foreground/20 tracking-[0.25em] uppercase">
        Privileged &amp; Confidential
      </p>
    </div>
  );
};

export default InvestorLogin;
