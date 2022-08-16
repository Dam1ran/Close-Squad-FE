import { useEffect, useState } from 'react';
import { useEmail } from './emailValidationHook';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const useEmails = (minLength: number, maxLength: number) => {
  const { email: email, setEmail: setEmail, isEmailValid: isEmailValid, emailErrorText: emailErrorText } = useEmail(minLength, maxLength);
  const {
    email: repeatEmail,
    setEmail: setRepeatEmail,
    isEmailValid: isRepeatEmailValid,
    emailErrorText: emailRepeatErrorText,
  } = useEmail(minLength, maxLength);
  const [isMatch, setIsMatch] = useState(true);
  const [matchErrorText, setMatchErrorText] = useState('');

  useEffect(() => {
    if (emailRepeatErrorText === '') {
      if (repeatEmail.length >= minLength) {
        const match = email === repeatEmail;
        setIsMatch(match);
        if (match) {
          setMatchErrorText('');
        } else {
          setMatchErrorText('Emails does not match.');
        }
      } else {
        setMatchErrorText('');
      }
    } else {
      setMatchErrorText(emailRepeatErrorText);
    }
  }, [email, repeatEmail, emailRepeatErrorText, minLength, maxLength]);

  return {
    email,
    setEmail,
    isEmailValid,
    emailErrorText,
    repeatEmail,
    setRepeatEmail,
    isRepeatEmailValid: isRepeatEmailValid && isMatch,
    emailRepeatErrorText: matchErrorText,
  };
};
