/* eslint-disable @typescript-eslint/explicit-function-return-type */
import axios from 'axios';
import toast from 'react-hot-toast';
import { captchaCheckModalOverlay } from '../components/elements';
import {
  ChangePasswordDto,
  ChangePasswordEmailDto,
  ConfirmEmailDto,
  ResendConfirmationDto,
  ServerAnnouncementDto,
  UserLoginDto,
  UserRegisterDto,
} from '../models/api.models';
import { AuthService, CaptchaService, SessionService } from '../support/services';
import { ClearAuthHandler, Constants, getCookieToken, NavigateHandler } from '../support/utils';
import { serverClientUtils } from './serverClientUtils';

axios.defaults.withCredentials = true;

export const ServerClient = () => {
  const instance = axios.create({ baseURL: process.env.REACT_APP_BASE_URL });
  instance.defaults.headers.common[Constants.XsrfTokenHeaderName] = getCookieToken(Constants.CookieTokenHeaderName);

  const getAntiforgeryTokenCookie = (signal?: AbortSignal) => instance.post('antiforgery', null, { signal });

  const refreshToken = (signal?: AbortSignal) =>
    instance.post<string>('auth/refresh-token', { sessionId: SessionService().get() }, { signal });

  instance.interceptors.response.use(
    (response) => {
      // all good
      return response;
    },
    async (error) => {
      if (error?.code === 'ERR_NETWORK') {
        toast.error('No server connection. Try again later.', { icon: '😕', duration: 10000 });
      }
      if (error?.response?.status === 500) {
        toast.error('Server error. Try again later.', { icon: '🤖', duration: 10000 });
      }
      if (error?.response?.status === 429) {
        serverClientUtils().tooManyRequestToast(error?.response?.data?.code === 'UserThrottle');
      }

      const prevRequest = error?.config;
      if (
        error?.response?.status === 400 &&
        error?.response?.headers[Constants.CookieTokenHeaderName] === '' &&
        !prevRequest?._retry400
      ) {
        prevRequest._retry400 = true;

        await new Promise((r) => setTimeout(r, 500));
        await getAntiforgeryTokenCookie();
        await new Promise((r) => setTimeout(r, 500));

        return instance(prevRequest);
      }

      if (error?.response?.status === 400 && error?.response?.data?.code === 'CaptchaCheck') {
        captchaCheckModalOverlay();
      }

      if (error?.response?.status === 401 && prevRequest.url !== 'auth/refresh-token' && !prevRequest?._retry401) {
        prevRequest._retry401 = true;
        console.log('Refreshing token.');
        document.body.style.cursor = 'wait';

        await refreshToken()
          .then(async (r) => {
            AuthService().setToken(r.data);

            await getAntiforgeryTokenCookie().catch(() => {
              console.error('XSRF request failed.');
            });
          })
          .catch((err) => {
            if (err?.response?.status === 401) {
              ClearAuthHandler.clear();
              NavigateHandler.navigate('/login', { state: { from: { pathname: location.pathname } }, replace: true });
              document.body.style.cursor = 'default';
            }
            return Promise.reject(error);
          });

        document.body.style.cursor = 'default';
        return instance(prevRequest);
      }

      return Promise.reject(error);
    },
  );

  instance.interceptors.request.use(
    (config) => {
      console.log(`Request to: ${config.url}`);

      const captcha = CaptchaService.getCode();
      if (captcha !== undefined) {
        config.params = { ...config.params, captcha };
        CaptchaService.clearCode();
      }

      const token = AuthService().getToken();
      if (token && config.headers) {
        config.headers[Constants.XsrfTokenHeaderName] = getCookieToken(Constants.CookieTokenHeaderName);
        config.headers[Constants.AuthorizationHeaderName] = `Bearer ${token}`;
      }

      return config;
    },
    (error) => Promise.reject(error),
  );

  const getCaptcha = (signal: AbortSignal) => instance.get<Blob>('captcha', { responseType: 'blob', signal });

  const validateCaptcha = (captcha: string, signal: AbortSignal) =>
    instance.patch('captcha', null, { params: { captcha }, signal });

  const register = (userRegisterDto: UserRegisterDto, signal: AbortSignal) =>
    instance.post('auth/register', { ...userRegisterDto }, { signal });

  const confirmEmail = (confirmEmailDto: ConfirmEmailDto, signal: AbortSignal) =>
    instance.post('auth/confirm-email', { ...confirmEmailDto }, { signal });

  const resendConfirmation = (resendConfirmationDto: ResendConfirmationDto, signal: AbortSignal) =>
    instance.post('auth/resend-confirmation', { ...resendConfirmationDto }, { signal });

  const login = async (userLoginDto: UserLoginDto, signal: AbortSignal) =>
    instance.post('auth/login', { ...userLoginDto }, { signal });

  const sendChangePasswordEmail = (changePasswordEmailDto: ChangePasswordEmailDto, signal: AbortSignal) =>
    instance.post('auth/send-change-password', { ...changePasswordEmailDto }, { signal });

  const changePassword = (changePasswordDto: ChangePasswordDto, signal: AbortSignal) =>
    instance.post('auth/change-password', { ...changePasswordDto }, { signal });

  const logout = (signal: AbortSignal) => instance.post('auth/logout', null, { signal });

  const test = (signal: AbortSignal) => instance.post<string>('auth/test', null, { signal });
  const test2 = (signal: AbortSignal) => instance.post<string>('auth/test2', null, { signal });

  const getAnnouncements = async (signal: AbortSignal) => {
    // REWORK
    return instance
      .get<ServerAnnouncementDto[]>('announcement/announcements', { signal })
      .then((response) => {
        return response.data;
      })
      .catch(() => {
        return null;
      });
  };

  return {
    getCaptcha,
    validateCaptcha,
    register,
    confirmEmail,
    resendConfirmation,
    login,
    sendChangePasswordEmail,
    changePassword,
    refreshToken,
    getAntiforgeryTokenCookie,
    logout,
    getAnnouncements,
    test,
    test2,
  };
};
