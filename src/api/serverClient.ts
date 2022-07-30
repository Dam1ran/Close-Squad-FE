import axios from 'axios';
import { ConfirmEmailDto, ServerAnnouncementDto, UserRegisterDto } from '../models/api.models';
import { Constants } from '../support/utils/constants';
import { getCookieToken } from '../support/utils/cookies';

export const serverClient = () => {
  const instance = axios.create({ baseURL: process.env.REACT_APP_BASE_URL });
  instance.defaults.withCredentials = true;
  instance.defaults.headers.common[Constants.XsrfTokenHeaderName] = getCookieToken(Constants.CookieTokenHeaderName);

  const getAntiforgeryTokenCookie = () => instance.post('antiforgery');

  instance.interceptors.response.use(
    (response) => {
      // all good
      return response;
    },
    async (error) => {
      const prevRequest = error?.config;
      if (
        error?.response?.status === 400 &&
        error?.response?.headers[Constants.CookieTokenHeaderName] === '' &&
        !prevRequest?.sent
      ) {
        prevRequest.sent = true;
        await getAntiforgeryTokenCookie();
        prevRequest.headers[Constants.XsrfTokenHeaderName] = getCookieToken(Constants.CookieTokenHeaderName);
        return instance(prevRequest);
      }
      return Promise.reject(error);
    },
  );

  const register = (userRegisterDto: UserRegisterDto) => {
    return instance.post('auth/register', { ...userRegisterDto });
  };

  const confirmEmail = (confirmEmailDto: ConfirmEmailDto) => {
    return instance.post('auth/confirm-email', { ...confirmEmailDto });
  };

  const login = async () => {
    return instance
      .get<string>('auth/login')
      .then((response) => {
        return response.data;
      })
      .catch((e) => {
        // console.warn('asdasd');
        console.warn(e);
        return '';
      });
  };

  const getAnnouncements = async () => {
    return instance
      .get<ServerAnnouncementDto[]>('announcement')
      .then((response) => {
        return response.data;
      })
      .catch(() => {
        return null;
      });
  };

  return {
    getAnnouncements,
    register,
    confirmEmail,
    login,
  };
};
