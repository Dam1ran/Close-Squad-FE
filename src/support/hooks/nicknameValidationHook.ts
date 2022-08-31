import { useEffect, useState } from 'react';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const useNickname = (minLength: number, maxLength: number) => {
  const [nickname, setStateNickname] = useState('');
  const [isRequired, setIsRequired] = useState(false);
  const [isLengthValid, setIsLengthValid] = useState(true);
  const [isRegexValid, setIsRegexValid] = useState(true);
  const [nicknameErrorText, setNicknameErrorText] = useState('');

  useEffect(() => {
    if (!isLengthValid) {
      if (nickname.length === 0) {
        setNicknameErrorText(`This field is required.`);
        setIsRequired(true);
      } else {
        setIsRequired(false);
        setNicknameErrorText(`Cannot be less than ${minLength} and more than ${maxLength} characters.`);
      }
    } else if (!isRegexValid) {
      setNicknameErrorText('The Nickname field accepts only letters, numbers and one underscore in between.');
    } else {
      setIsLengthValid(true);
      setIsRegexValid(true);
      setIsRequired(false);
      setNicknameErrorText('');
    }
  }, [isLengthValid, isRegexValid, nickname, minLength, maxLength]);

  const setNickname = (value: string): void => {
    value = (value ?? '').trim();

    setIsLengthValid(value.length >= minLength && value.length <= maxLength);
    setIsRegexValid(/^[A-Za-z0-9]+([_](?!$))?[A-Za-z0-9]*$/.test(value));

    setStateNickname(value);
  };

  return { nickname, setNickname, isNicknameValid: isLengthValid && isRegexValid && !isRequired, nicknameErrorText };
};
