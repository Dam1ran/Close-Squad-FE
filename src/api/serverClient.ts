/* eslint-disable @typescript-eslint/explicit-function-return-type */
import axios from 'axios';
import toast from 'react-hot-toast';
import { captchaCheckModalOverlay } from '../components/elements';
import { ConfirmEmailDto, ResendConfirmationDto, ServerAnnouncementDto, UserRegisterDto } from '../models/api.models';
import { CaptchaService } from '../support/services';
import { Constants, getCookieToken } from '../support/utils';
import { serverClientUtils } from './serverClientUtils';

axios.defaults.withCredentials = true;

export const ServerClient = () => {
  const instance = axios.create({ baseURL: process.env.REACT_APP_BASE_URL });
  instance.defaults.headers.common[Constants.XsrfTokenHeaderName] = getCookieToken(Constants.CookieTokenHeaderName);

  const getAntiforgeryTokenCookie = () => instance.post('antiforgery');

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
        serverClientUtils().tooManyRequestToast();
      }

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

      if (error?.response?.status === 400 && error?.response?.data?.code === 'CaptchaCheck') {
        captchaCheckModalOverlay();
      }

      return Promise.reject(error);
    },
  );

  instance.interceptors.request.use((request) => {
    const captcha = CaptchaService.getCode();
    if (captcha !== undefined) {
      request.params = { ...request.params, captcha };
      CaptchaService.clearCode();
    }

    return request;
  });

  const getCaptcha = () => {
    return instance.get<Blob>('captcha', { responseType: 'blob' });
  };

  const validateCaptcha = (captcha: string) => {
    return instance.patch('captcha', null, { params: { captcha } });
  };

  const register = (userRegisterDto: UserRegisterDto) => {
    return instance.post('auth/register', { ...userRegisterDto });
  };

  const confirmEmail = (confirmEmailDto: ConfirmEmailDto) => {
    return instance.post('auth/confirm-email', { ...confirmEmailDto });
  };

  const resendConfirmation = (resendConfirmationDto: ResendConfirmationDto) => {
    return instance.post('auth/resend-confirmation', { ...resendConfirmationDto });
  };

  const login = async () => {
    // REWORK
    return instance
      .get<string>('auth/login')
      .then((response) => {
        return response.data;
      })
      .catch((e) => {
        console.warn(e);
        return '';
      });
  };

  const getAnnouncements = async () => {
    // REWORK
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
    getCaptcha,
    validateCaptcha,
    register,
    confirmEmail,
    resendConfirmation,
    login,
    getAnnouncements,
  };
};
