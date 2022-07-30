import { useEffect, useState } from 'react';

export const useName = (minLength: number, maxLength: number) => {
  const [name, setStateName] = useState('');
  const [isRequired, setIsRequired] = useState(false);
  const [isLengthValid, setIsLengthValid] = useState(true);
  const [isRegexValid, setIsRegexValid] = useState(true);
  const [nameErrorText, setNameErrorText] = useState('');

  useEffect(() => {
    if (!isLengthValid) {
      if (name.length === 0) {
        setNameErrorText(`This field is required.`);
        setIsRequired(true);
      } else {
        setIsRequired(false);
        setNameErrorText(`Cannot be less than ${minLength} and more than ${maxLength} characters.`);
      }
    } else if (!isRegexValid) {
      setNameErrorText(`Only letters and numbers are allowed.`);
    } else {
      setIsLengthValid(true);
      setIsRegexValid(true);
      setIsRequired(false);
      setNameErrorText('');
    }
  }, [isLengthValid, isRegexValid, name]);

  const setName = (value: string) => {
    value = (value ?? '').trim();

    setIsLengthValid(value.length >= minLength && value.length <= maxLength);
    setIsRegexValid(/^[A-Za-z0-9]*$/.test(value));

    setStateName(value);
  };

  return { name, setName, isNameValid: isLengthValid && isRegexValid && !isRequired, nameErrorText };
};
