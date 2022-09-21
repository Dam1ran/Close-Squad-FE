/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuthServiceHelper } from '../support/services';
import { useServerClient } from './useServerClient';

export const useRefreshToken = (withRedirectToHome = false) => {
  const { refreshToken, getAntiforgeryTokenCookie } = useServerClient();
  const { setToken, setAuthData } = useAuthServiceHelper();
  const navigate = useNavigate();
  const location = useLocation();

  const refresh = async (): Promise<void> => {
    await refreshToken()
      .then(async (r) => {
        if (setToken(r.data)) {
          await getAntiforgeryTokenCookie();
          setAuthData();
        } else {
          console.warn('Wrong token.');
          setTimeout(() => {
            navigate('/home');
          }, 2000);
        }
      })
      .catch((err) => {
        if (err?.response?.status === 401) {
          navigate('/login', { state: { from: { pathname: location.pathname } }, replace: true });
        } else if (withRedirectToHome) {
          navigate('/home');
        }
      });
  };

  return { refresh };
};
