import { useEffect } from 'react';
import { Outlet, useParams, useNavigate } from 'react-router-dom';
import { useRegion } from '@/contexts/RegionContext';

const RegionGuard = () => {
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

  return <Outlet />;
};

export default RegionGuard;
