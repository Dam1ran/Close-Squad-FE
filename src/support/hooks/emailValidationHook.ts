import { useEffect, useState } from 'react';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const useEmail = (minLength: number, maxLength:number) => {
  const [email, setStateEmail] = useState('');
  const [isRequired, setIsRequired] = useState(false);
  const [isLengthValid, setIsLengthValid] = useState(true);
  const [isRegexValid, setIsRegexValid] = useState(true);
  const [emailErrorText, setEmailErrorText] = useState('');

  useEffect(() => {
    if (!isLengthValid) {
      if (email.length === 0) {
        setEmailErrorText(`This field is required.`);
        setIsRequired(true);
      } else {
        setIsRequired(false);
        setEmailErrorText(`Cannot be less than ${minLength} and more than ${maxLength} characters.`);
      }
    } else if (!isRegexValid) {
      setEmailErrorText(`Wrong email format.`);
    } else {
      setIsRequired(false);
      setEmailErrorText('');
    }
  }, [isLengthValid, isRegexValid, email, minLength, maxLength]);

  const setEmail = (value: string): void => {
    value = (value ?? '').trim();

    setIsLengthValid(value.length >= minLength && value.length <= maxLength);
    setIsRegexValid(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value));

    setStateEmail(value);
  };

  const reset = (): void => {
    setStateEmail('');
    setIsRequired(false);
    setIsLengthValid(true);
    setIsRegexValid(true);
    setEmailErrorText('');
  };

  return {
    email,
    setEmail,
    isEmailValid: isLengthValid && isRegexValid && !isRequired,
    emailErrorText,
    reset,
  };
};
