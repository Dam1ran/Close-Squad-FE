import { useEffect, useState } from 'react';
import { usePassword } from './passwordValidationHook';

export const usePasswords = () => {
  const {
    password: password,
    setPassword: setPassword,
    isPasswordValid: isPasswordValid,
    passwordErrorText: passwordErrorText,
    reset: passwordReset,
  } = usePassword();
  const {
    password: repeatPassword,
    setPassword: setRepeatPassword,
    isPasswordValid: isRepeatPasswordValid,
    passwordErrorText: repeatPasswordErrorText,
    reset: passwordRepeatReset,
  } = usePassword();
  const [isMatch, setIsMatch] = useState(true);
  const [matchErrorText, setMatchErrorText] = useState('');
  const [showPasswords, setShowPasswords] = useState(false);

  useEffect(() => {
    if (repeatPasswordErrorText === '') {
      if (repeatPassword.length >= 5) {
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
  }, [password, repeatPassword, repeatPasswordErrorText]);

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
    showPasswords,
    setShowPasswords,
    reset,
  };
};
