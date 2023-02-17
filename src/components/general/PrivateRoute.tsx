import { Navigate, Outlet } from 'react-router-dom';
import { useLoggedIn } from '../../hooks/useLoggedIn';

export const PrivateRoute = () => {
  const isLoggedIn = useLoggedIn();
  return isLoggedIn ? <Outlet /> : <Navigate to="/sign-in" replace />;
};
