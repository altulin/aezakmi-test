import { Navigate, Outlet, useLocation } from 'react-router';
import { useAppSelector } from '@/app/store/hooks';
import { selectIsAuthenticated } from '@/entities/session';

export const ProtectedRoute = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
};
