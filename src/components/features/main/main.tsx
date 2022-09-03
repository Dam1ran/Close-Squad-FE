import { Navigate, Route, Routes } from 'react-router-dom';
import { AuthRole } from '../../../support/services';
import { Layout, RequireRoles } from '../../elements/templates';
import {
  ConfirmEmailPage,
  RegisterPage,
  HomePage,
  LoginPage,
  ResendConfirmationPage,
  ChangePasswordPage,
  SendEmailChangePasswordPage,
} from '../../pages';
import { useCookiePolicyAgreement } from './useCookiesPolicyAgreement';

export const Main = (): JSX.Element => {
  useCookiePolicyAgreement();
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="home" element={<HomePage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="confirm-email" element={<ConfirmEmailPage />} />
        <Route path="resend-confirmation" element={<ResendConfirmationPage />} />
        <Route path="send-email-change-password" element={<SendEmailChangePasswordPage />} />
        <Route path="change-password" element={<ChangePasswordPage />} />

        <Route element={<RequireRoles roles={[AuthRole.ADM]} />}>
          <Route path="/temp" element={'<Unauthorized />'} />
        </Route>

        <Route path="*" element={'<Page not found />'} />
      </Route>
    </Routes>
  );
};
