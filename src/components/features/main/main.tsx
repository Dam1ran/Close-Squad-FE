import { Route, Routes } from 'react-router-dom';
import { Layout } from '../../elements/templates';
import { ConfirmEmailPage, RegisterPage, WelcomePage } from '../../pages';
import { useCookiePolicyAgreement } from './useCookiesPolicyAgreement';

export const Main = (): JSX.Element => {
  useCookiePolicyAgreement();
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="" element={<WelcomePage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="login" element={<RegisterPage />} />
        <Route path="confirm-email" element={<ConfirmEmailPage />} />
      </Route>
    </Routes>
  );
};
