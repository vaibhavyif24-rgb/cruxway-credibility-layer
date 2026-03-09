import { useState } from 'react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

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
        style: {
          fontFamily: 'Inter, sans-serif',
          fontSize: '13px',
        },
      });
    }, 800);
  };

  return (
    <div className="min-h-[100dvh] bg-prussian flex flex-col items-center justify-center px-6 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/60 via-transparent to-navy-deep/30 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        className="w-full max-w-[360px] relative z-10"
      >
        {/* Brand */}
        <div className="text-center mb-14">
          <a href="/" className="font-serif text-3xl text-primary-foreground tracking-tight hover:opacity-80 transition-opacity">
            Cruxway
          </a>
          <div className="flex items-center justify-center gap-3 mt-5 mb-2.5">
            <div className="w-6 h-px bg-gold/30" />
            <div className="w-1 h-1 rotate-45 border border-gold/20" />
            <div className="w-6 h-px bg-gold/30" />
          </div>
          <p className="font-sans text-caption uppercase tracking-[0.2em] text-primary-foreground/30">
            Investor Portal
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="font-sans text-[10px] tracking-[0.2em] uppercase text-primary-foreground/30 mb-2 block">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              className="w-full bg-transparent border-b border-primary-foreground/12 text-primary-foreground font-sans text-body pb-3 focus:outline-none focus:border-primary-foreground/30 transition-colors duration-300 placeholder:text-primary-foreground/12"
              placeholder="name@firm.com"
            />
          </div>
          <div>
            <label className="font-sans text-[10px] tracking-[0.2em] uppercase text-primary-foreground/30 mb-2 block">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              className="w-full bg-transparent border-b border-primary-foreground/12 text-primary-foreground font-sans text-body pb-3 focus:outline-none focus:border-primary-foreground/30 transition-colors duration-300 placeholder:text-primary-foreground/12"
              placeholder="••••••••••"
            />
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary-foreground/6 border border-primary-foreground/10 text-primary-foreground/60 font-sans text-nav uppercase tracking-[0.2em] py-4 hover:bg-primary-foreground/12 hover:text-primary-foreground/80 hover:border-primary-foreground/20 transition-all duration-400 disabled:opacity-40"
            >
              {loading ? 'Verifying...' : 'Sign In'}
            </button>
          </div>
        </form>

        <p className="text-center mt-10 font-sans text-[10px] text-primary-foreground/20 leading-relaxed tracking-wide">
          Access is restricted to registered investors.
          <br />
          Contact your relationship manager for credentials.
        </p>
      </motion.div>

      {/* Bottom */}
      <p className="absolute bottom-6 font-sans text-[9px] text-primary-foreground/10 tracking-[0.2em] uppercase">
        Privileged &amp; Confidential
      </p>
    </div>
  );
};

export default InvestorLogin;
