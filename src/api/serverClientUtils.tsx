import toast from 'react-hot-toast';
import { SecurityIcon } from '../components/elements';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const serverClientUtils = () => {
  const tooManyRequestToast = (): void => {
    toast.error('Too Many Requests. Try again later.', {
      icon: <SecurityIcon color="secondary" />,
      duration: 10000,
    });
  };
  return {
    tooManyRequestToast,
  };
};
