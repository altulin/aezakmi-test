import { Navigate, Outlet, useLocation, type Location } from 'react-router';
import { useAppSelector } from '@/app/store/hooks';
import { selectIsAuthenticated } from '@/entities/session';

type LocationState = { from?: Location } | null;

export const GuestRoute = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const location = useLocation();

  if (isAuthenticated) {
    const from = (location.state as LocationState)?.from?.pathname ?? '/rates';
    return <Navigate to={from} replace />;
  }

  return <Outlet />;
};
