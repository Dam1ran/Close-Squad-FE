import { useEffect, useState } from 'react';

export const useEmail = () => {
  const minLength = 5;
  const maxLength = 255;
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
  }, [isLengthValid, isRegexValid, email]);

  const setEmail = (value: string) => {
    value = (value ?? '').trim();

    setIsLengthValid(value.length >= minLength && value.length <= maxLength);
    setIsRegexValid(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value));

    setStateEmail(value);
  };

  return {
    email,
    setEmail,
    isEmailValid: isLengthValid && isRegexValid && !isRequired,
    emailErrorText,
  };
};
