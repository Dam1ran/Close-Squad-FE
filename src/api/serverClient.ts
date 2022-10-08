/* eslint-disable @typescript-eslint/explicit-function-return-type */
import axios from 'axios';
import toast from 'react-hot-toast';
import { captchaCheckModalOverlay } from '../components/elements';
import {
  ChangePasswordDto,
  ChangePasswordEmailDto,
  CharacterCreationDto,
  ConfirmEmailDto,
  CreateServerAnnouncementViewModel,
  ResendConfirmationDto,
  ServerAnnouncementDto,
  UserLoginDto,
  UserRegisterDto,
} from '../models/api.models';
import { GameSettings } from '../support/contexts/signalRContext/signalRContext.state';
import { AuthService, CaptchaService, SessionService } from '../support/services';
import { ClearAuthHandler, Constants, getCookieToken, NavigateHandler } from '../support/utils';
import { serverClientUtils } from './serverClientUtils';

axios.defaults.timeout = 20000;
axios.defaults.withCredentials = true;

export const ServerClient = (incomeAbortSignal?: AbortSignal) => {
  const signal = incomeAbortSignal;
  const instance = axios.create({ baseURL: process.env.REACT_APP_BASE_URL });
  instance.defaults.headers.common[Constants.XsrfTokenHeaderName] = getCookieToken(Constants.CookieTokenHeaderName);

  const getAntiforgeryTokenCookie = () => instance.post('antiforgery', null, { signal });

  const refreshToken = () => instance.post<string>('auth/refresh-token', { sessionId: SessionService().get() }, { signal });

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
      if (error?.response?.status === 403) {
        serverClientUtils().unauthorizedToast();
        return Promise.reject(error);
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

  const getCaptcha = () => instance.get<Blob>('captcha', { responseType: 'blob', signal });

  const validateCaptcha = (captcha: string) => instance.patch('captcha', null, { params: { captcha }, signal });

  const register = (userRegisterDto: UserRegisterDto) => instance.post('auth/register', { ...userRegisterDto }, { signal });

  const confirmEmail = (confirmEmailDto: ConfirmEmailDto) =>
    instance.post('auth/confirm-email', { ...confirmEmailDto }, { signal });

  const resendConfirmation = (resendConfirmationDto: ResendConfirmationDto) =>
    instance.post('auth/resend-confirmation', { ...resendConfirmationDto }, { signal });

  const login = async (userLoginDto: UserLoginDto) => instance.post('auth/login', { ...userLoginDto }, { signal });

  const sendChangePasswordEmail = (changePasswordEmailDto: ChangePasswordEmailDto) =>
    instance.post('auth/send-change-password', { ...changePasswordEmailDto }, { signal });

  const changePassword = (changePasswordDto: ChangePasswordDto) =>
    instance.post('auth/change-password', { ...changePasswordDto }, { signal });

  const logout = () => instance.post('auth/logout', null, { signal });

  const getAnnouncements = async () => instance.get<ServerAnnouncementDto[]>('announcement/announcements', { signal });

  const createAnnouncement = async (model: CreateServerAnnouncementViewModel) =>
    instance.post('announcement/create', { ...model }, { signal });

  const deleteAnnouncement = async (id: number) => instance.delete(`announcement/delete/${id}`, { signal });

  const createCharacter = async (characterCreationDto: CharacterCreationDto) =>
    instance.post('character/create', { ...characterCreationDto }, { signal });

  const getGameSettings = async () => instance.get<GameSettings>('settings/game', { signal });

  const test1 = () => instance.get('tryout/test1', { signal });
  const test2 = () => instance.get('tryout/test2', { signal });
  const test3 = () => instance.get('tryout/test3', { signal });
  const test4 = () => instance.get('tryout/test4', { signal });
  const test5 = () => instance.get('tryout/test5', { signal });

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
    createAnnouncement,
    deleteAnnouncement,
    createCharacter,
    getGameSettings,
    test1,
    test2,
    test3,
    test4,
    test5,
  };
};
