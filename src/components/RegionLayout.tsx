import { useEffect } from 'react';
import { Outlet, useParams, useNavigate } from 'react-router-dom';
import { useRegion } from '@/contexts/RegionContext';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';

const RegionLayout = () => {
  const { region: urlRegion } = useParams<{ region: string }>();
  const { region, setRegion } = useRegion();
  const navigate = useNavigate();

  useEffect(() => {
    if (urlRegion === 'india' || urlRegion === 'us') {
      if (region !== urlRegion) {
        setRegion(urlRegion);
      }
    } else {
      navigate('/', { replace: true });
    }
  }, [urlRegion, region, setRegion, navigate]);

  if (urlRegion !== 'india' && urlRegion !== 'us') return null;

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1 pt-14 md:pt-16">
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  );
};

export default RegionLayout;
