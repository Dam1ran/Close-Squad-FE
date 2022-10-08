import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { useServerClient } from '../../../api/useServerClient';
import { AuthRole } from '../../../models/auth';
import { useAuthServiceHelper, useSession } from '../../../support/services';
import { ClearAuthHandler, NavigateHandler } from '../../../support/utils';
import { Layout, RequireLoggedIn, RequireNotLoggedIn, RequireRoles } from '../../elements/templates';
import {
  ConfirmEmailPage,
  RegisterPage,
  HomePage,
  LoginPage,
  ResendConfirmationPage,
  ChangePasswordPage,
  SendEmailChangePasswordPage,
  ServerAdministrationPage,
  LobbyPage,
  IconsPage,
} from '../../pages';
import { useCookiePolicyAgreement } from './useCookiesPolicyAgreement';

export const Main = (): JSX.Element => {
  useCookiePolicyAgreement();
  NavigateHandler.navigate = useNavigate();
  const { clear } = useAuthServiceHelper();
  ClearAuthHandler.clear = clear;
  useSession();
  useServerClient();
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="" element={<Navigate to="home" replace />} />
        <Route path="home" element={<HomePage />} />
        <Route path="icons" element={<IconsPage />} />
        <Route path="unauthorized" element={'<Unauthorized />'} />

        <Route element={<RequireNotLoggedIn />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="confirm-email" element={<ConfirmEmailPage />} />
          <Route path="resend-confirmation" element={<ResendConfirmationPage />} />
          <Route path="send-email-change-password" element={<SendEmailChangePasswordPage />} />
          <Route path="change-password" element={<ChangePasswordPage />} />
        </Route>

        <Route element={<RequireLoggedIn />}>
          <Route element={<RequireRoles roles={[AuthRole.USR, AuthRole.ADM, AuthRole.GMA]} />}>
            <Route path="" element={<Navigate to="lobby" replace />} />
            <Route path="lobby" element={<LobbyPage />} />
          </Route>

          <Route path="administration" element={<RequireRoles roles={[AuthRole.ADM, AuthRole.GMA]} />}>
            <Route path="" element={<Navigate to="server" replace />} />
            <Route path="server" element={<ServerAdministrationPage />} />
            <Route path="players" element={'<PlayersAdministrationPage />'} />
          </Route>

          <Route path="game-master" element={<RequireRoles roles={[AuthRole.GMA]} />}>
            <Route path="" element={<Navigate to="server" replace />} />
            <Route path="server" element={<ServerAdministrationPage />} />
            <Route path="players" element={'<PlayersAdministrationPage />'} />
          </Route>
        </Route>

        <Route path="*" element={'<Page not found />'} />
      </Route>
    </Routes>
  );
};
