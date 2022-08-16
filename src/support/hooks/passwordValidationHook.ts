import { useEffect, useState } from 'react';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const usePassword = (minLength: number, maxLength: number) => {
  const [password, setStatePassword] = useState('');
  const [isRequired, setIsRequired] = useState(false);
  const [isLengthValid, setIsLengthValid] = useState(true);
  const [isRegexValid, setIsRegexValid] = useState(true);
  const [passwordErrorText, setPasswordErrorText] = useState('');

  useEffect(() => {
    if (!isLengthValid) {
      if (password.length === 0) {
        setPasswordErrorText(`This field is required.`);
        setIsRequired(true);
      } else {
        setIsRequired(false);
        setPasswordErrorText(`Cannot be less than ${minLength} and more than ${maxLength} characters.`);
      }
    } else if (!isRegexValid) {
      setPasswordErrorText(`Password must contain uppercase/lowercase letter, digit and non alphanumeric character.`);
    } else {
      setIsRequired(false);
      setPasswordErrorText('');
    }
  }, [isLengthValid, isRegexValid, password, minLength, maxLength]);

  const setPassword = (value: string): void => {
    value = (value ?? '').trim();

    setIsLengthValid(value.length >= minLength && value.length <= maxLength);
    setIsRegexValid(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,64}$/.test(value));

    setStatePassword(value);
  };

  const reset = (): void => {
    setStatePassword('');
    setIsRequired(false);
    setIsLengthValid(true);
    setIsRegexValid(true);
    setPasswordErrorText('');
  };

  return { password, setPassword, isPasswordValid: isLengthValid && !isRequired && isRegexValid, passwordErrorText, reset };
};
