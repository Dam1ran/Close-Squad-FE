import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { AuthRole } from '../../../../models/auth';
import { useAuth } from '../../../../support/hooks';

export interface RequireRoleProps {
  roles?: AuthRole[];
}
export const RequireRoles: React.FC<RequireRoleProps> = ({ roles = [] }): JSX.Element => {
  const { hasAnyOf, isLoggedIn } = useAuth();
  const location = useLocation();
  return hasAnyOf(roles) ? (
    <Outlet />
  ) : isLoggedIn() ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};
