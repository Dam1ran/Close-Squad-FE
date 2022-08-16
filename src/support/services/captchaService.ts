import { isNotEmpty } from '../utils';

interface CaptchaMemory {
  code?: string;
}

const captchaMemory: CaptchaMemory = {
  code: undefined,
};

export const CaptchaService = {
  setCode: (value: string): void => {
    if (isNotEmpty(value)) {
      captchaMemory.code = value;
    }
  },
  getCode: (): string | undefined => captchaMemory.code,
  clearCode: (): void => {
    captchaMemory.code = undefined;
  },
};
