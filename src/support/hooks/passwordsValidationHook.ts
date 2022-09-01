import { useEffect, useState } from 'react';
import { usePassword } from './passwordValidationHook';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const usePasswords = (minLength: number, maxLength: number) => {
  const passwordHalfMinLength = Math.trunc(minLength / 2);

  const {
    password: password,
    setPassword: setPassword,
    isPasswordValid: isPasswordValid,
    passwordErrorText: passwordErrorText,
    reset: passwordReset,
    showPassword,
    setShowPassword,
  } = usePassword(minLength, maxLength);
  const {
    password: repeatPassword,
    setPassword: setRepeatPassword,
    isPasswordValid: isRepeatPasswordValid,
    passwordErrorText: repeatPasswordErrorText,
    reset: passwordRepeatReset,
  } = usePassword(minLength, maxLength);
  const [isMatch, setIsMatch] = useState(true);
  const [matchErrorText, setMatchErrorText] = useState('');

  useEffect(() => {
    if (repeatPasswordErrorText === '') {
      if (repeatPassword.length >= passwordHalfMinLength) {
        const match = password === repeatPassword;
        setIsMatch(match);
        if (match) {
          setMatchErrorText('');
        } else {
          setMatchErrorText('Passwords does not match.');
        }
      } else {
        setMatchErrorText('');
      }
    } else {
      setMatchErrorText(repeatPasswordErrorText);
    }
  }, [password, repeatPassword, repeatPasswordErrorText, passwordHalfMinLength]);

  const reset = (): void => {
    setIsMatch(true);
    setMatchErrorText('');
    passwordReset();
    passwordRepeatReset();
  };

  return {
    password,
    setPassword,
    isPasswordValid,
    passwordErrorText,
    repeatPassword,
    setRepeatPassword,
    isRepeatPasswordValid: isRepeatPasswordValid && isMatch,
    passwordRepeatErrorText: matchErrorText,
    showPassword,
    setShowPassword,
    reset,
  };
};
