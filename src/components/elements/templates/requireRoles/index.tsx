import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { AuthRole } from '../../../../models/auth';
import { useAuthServiceHelper } from '../../../../support/services';

export interface RequireRoleProps {
  roles?: AuthRole[];
}
export const RequireRoles: React.FC<RequireRoleProps> = ({ roles = [] }): JSX.Element => {
  const { hasAnyOf } = useAuthServiceHelper();
  const location = useLocation();

  return hasAnyOf(roles) ? <Outlet /> : <Navigate to="/unauthorized" state={{ from: location.pathname }} replace />;
};
