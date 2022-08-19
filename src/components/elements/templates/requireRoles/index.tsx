import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { AuthRole, AuthService } from '../../../../support/services';

export interface RequireRoleProps {
  roles?: AuthRole[];
}
export const RequireRoles: React.FC<RequireRoleProps> = ({ roles = [] }): JSX.Element => {
  const location = useLocation();
  return AuthService.hasRoles(roles) ? (
    <Outlet />
  ) : AuthService.isLoggedIn() ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};
