import toast from 'react-hot-toast';
import { FlashOffIcon, SecurityIcon, RemoveCircleOutlineIcon } from '../components/elements';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const serverClientUtils = () => {
  const tooManyRequestToast = (isThrottle: boolean): void => {
    if (isThrottle) {
      toast.error('Too many requests.', {
        icon: <FlashOffIcon color="primary" />,
        duration: 2000,
      });
    } else {
      toast.error('Too many requests. Try again later.', {
        icon: <SecurityIcon color="secondary" />,
        duration: 10000,
      });
    }
  };

  const unauthorizedToast = (): void => {
    toast.error('Unauthorized access to this source.', {
      icon: <RemoveCircleOutlineIcon color="secondary" />,
      duration: 5000,
    });
  };

  return {
    tooManyRequestToast,
    unauthorizedToast,
  };
};
