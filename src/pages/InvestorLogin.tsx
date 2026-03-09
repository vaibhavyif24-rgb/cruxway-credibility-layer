import { useState } from 'react';
import { toast } from 'sonner';

const InvestorLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.error('Account not registered. Please contact your relationship manager for access.');
  };

  return (
    <div className="min-h-screen bg-primary flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-12">
          <h1 className="font-serif text-3xl text-primary-foreground tracking-tight">
            Cruxway
          </h1>
          <div className="w-10 h-px bg-gold-muted mx-auto mt-4 mb-3" />
          <p className="text-caption text-primary-foreground/50">
            Investor Portal
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="font-sans text-xs tracking-wider uppercase text-primary-foreground/50 mb-2 block">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-transparent border border-primary-foreground/20 text-primary-foreground px-4 py-3 font-sans text-sm focus:outline-none focus:border-primary-foreground/50 transition-colors placeholder:text-primary-foreground/20"
              placeholder="investor@example.com"
            />
          </div>
          <div>
            <label className="font-sans text-xs tracking-wider uppercase text-primary-foreground/50 mb-2 block">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-transparent border border-primary-foreground/20 text-primary-foreground px-4 py-3 font-sans text-sm focus:outline-none focus:border-primary-foreground/50 transition-colors placeholder:text-primary-foreground/20"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground font-sans text-xs tracking-widest uppercase py-3.5 hover:bg-primary-foreground/20 transition-all duration-200 mt-2"
          >
            Sign In
          </button>
        </form>

        <p className="text-center mt-8 text-primary-foreground/30 font-sans text-xs">
          Access is restricted to registered investors.
          <br />
          Contact your relationship manager for credentials.
        </p>
      </div>
    </div>
  );
};

export default InvestorLogin;
