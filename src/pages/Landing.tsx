import { useRegion } from '@/contexts/RegionContext';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
  const { setRegion } = useRegion();
  const navigate = useNavigate();

  const selectRegion = (region: 'india' | 'us') => {
    setRegion(region);
    navigate(`/${region}`);
  };

  return (
    <div className="min-h-screen bg-primary flex flex-col items-center justify-center px-6">
      <div className="text-center mb-16 md:mb-20">
        <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-medium text-primary-foreground tracking-tight">
          Cruxway
        </h1>
        <div className="w-12 h-px bg-gold-muted mx-auto mt-6 mb-4" />
        <p className="text-caption text-primary-foreground/60">
          Investment &amp; Partnership
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full max-w-md sm:max-w-none sm:w-auto">
        <button
          onClick={() => selectRegion('india')}
          className="group px-12 py-4 border border-primary-foreground/20 text-primary-foreground font-sans text-sm tracking-widest uppercase transition-all duration-300 hover:bg-primary-foreground hover:text-primary"
        >
          India
        </button>
        <button
          onClick={() => selectRegion('us')}
          className="group px-12 py-4 border border-primary-foreground/20 text-primary-foreground font-sans text-sm tracking-widest uppercase transition-all duration-300 hover:bg-primary-foreground hover:text-primary"
        >
          United States
        </button>
      </div>

      <p className="mt-16 text-primary-foreground/30 text-xs font-sans tracking-wider">
        Select your region to continue
      </p>
    </div>
  );
};

export default Landing;
