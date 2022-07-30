import { useEffect, useState } from 'react';
import { useEmail } from './emailValidationHook';

export const useEmails = () => {
  const { email: email, setEmail: setEmail, isEmailValid: isEmailValid, emailErrorText: emailErrorText } = useEmail();
  const {
    email: repeatEmail,
    setEmail: setRepeatEmail,
    isEmailValid: isRepeatEmailValid,
    emailErrorText: emailRepeatErrorText,
  } = useEmail();
  const [isMatch, setIsMatch] = useState(true);
  const [matchErrorText, setMatchErrorText] = useState('');

  useEffect(() => {
    if (emailRepeatErrorText === '') {
      if (repeatEmail.length >= 5) {
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
  }, [email, repeatEmail, emailRepeatErrorText]);

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
