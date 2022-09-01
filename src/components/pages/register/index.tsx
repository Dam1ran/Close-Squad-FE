import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { ServerClient } from '../../../api/serverClient';
import { fadeIn } from '../../../styles';
import { useAbortSignal, useEmails, useNickname, usePasswords, useTitle } from '../../../support/hooks';
import { Constants, isAnyEmpty } from '../../../support/utils';
import {
  Box,
  Button,
  CircularProgress,
  Column,
  IconButton,
  InputAdornment,
  MarkEmailReadIcon,
  Paper,
  Typography,
  captchaCheckModalOverlay,
  VisibilityIcon,
  VisibilityOffIcon,
} from '../../elements';
import { RegisterInputField, AuthResponseErrors } from './registerInputField';

export const RegisterPage = (): JSX.Element => {
  useTitle('Register new user');
  const signal = useAbortSignal();

  const nicknameRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const { nickname, setNickname, isNicknameValid, nicknameErrorText } = useNickname(4, 20);
  const {
    email,
    setEmail,
    isEmailValid,
    emailErrorText,
    repeatEmail,
    setRepeatEmail,
    isRepeatEmailValid,
    emailRepeatErrorText,
  } = useEmails(Constants.EmailMinLength, Constants.EmailMaxLength);
  const {
    password,
    setPassword,
    isPasswordValid,
    passwordErrorText,
    repeatPassword,
    setRepeatPassword,
    isRepeatPasswordValid,
    passwordRepeatErrorText,
    showPassword,
    setShowPassword,
    reset: resetPasswords,
  } = usePasswords(Constants.PasswordMinLength, Constants.PasswordMaxLength);
  const [invalid, setInvalid] = useState(true);

  const [responseErrors, setResponseErrors] = useState<Partial<AuthResponseErrors> | null>({
    Register: [],
    Nickname: [],
    Email: [],
    RepeatEmail: [],
    Password: [],
    RepeatPassword: [],
    Confirmation: [],
  });

  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    setInvalid(isAnyEmpty(nickname, email, repeatEmail, password, repeatPassword));
    if (
      nickname.length > 0 &&
      email.length > 0 &&
      repeatEmail.length > 0 &&
      password.length > 0 &&
      repeatPassword.length > 0
    ) {
      setInvalid(!nickname || !isEmailValid || !isRepeatEmailValid || !isPasswordValid || !isRepeatPasswordValid);
    }
  }, [
    nickname,
    isNicknameValid,
    email,
    isEmailValid,
    repeatEmail,
    isRepeatEmailValid,
    password,
    isPasswordValid,
    repeatPassword,
    isRepeatPasswordValid,
  ]);

  const submit = (): void => {
    if (isAnyEmpty(nickname, email, repeatEmail, password, repeatPassword)) {
      return;
    }
    const { register } = ServerClient();
    setLoading(true);
    setResponseErrors(null);
    setIsSuccess(false);
    register({ nickname, email, repeatEmail, password, repeatPassword }, signal)
      .then(() => {
        toast.success('Confirmation email sent to specified address.', {
          icon: '📨',
          duration: 10000,
          style: { minWidth: 'fit-content' },
        });
        setIsSuccess(true);
      })
      .catch((data) => {
        setResponseErrors(data?.response?.data?.errors);
      })
      .finally(() => {
        resetPasswords();
        setLoading(false);
        nicknameRef.current?.focus();
      });
  };

  const onSubmit = (event: React.FormEvent<HTMLDivElement>): void => {
    event.preventDefault();
    setInvalid(true);
    captchaCheckModalOverlay(() => {
      submit();
    }, 'register-captcha-check');
  };

  return (
    <Column
      alignItems="center"
      sx={{
        height: '100%',
        ...fadeIn(),
      }}
    >
      <Box component="form" m="auto" pt={2} onSubmit={(e): void => onSubmit(e)}>
        <Paper
          elevation={4}
          sx={{
            minWidth: '320px',
            maxWidth: '320px',
            padding: 1,
          }}
        >
          <Typography
            sx={{
              marginTop: '-24px',
              marginLeft: '-8px',
              width: 'fit-content',
              paddingTop: 0.5,
              paddingBottom: 0.5,
              paddingLeft: 1,
              paddingRight: 1,
              borderRadius: 1,
              backgroundColor: (theme) => theme.palette.background.paper,
              userSelect: 'none',
            }}
          >
            Register new user:
          </Typography>
          <Column sx={{ paddingTop: 2, '& .MuiOutlinedInput-root': { '& fieldset': { transition: 'border 0.3s' } } }}>
            <RegisterInputField
              ref={nicknameRef}
              value={nickname}
              label="Nickname"
              autofocus
              onChange={(e): void => {
                setNickname(e.target.value);
                setIsSuccess(false);
              }}
              error={!isNicknameValid}
              errorText={nicknameErrorText}
              responseErrors={responseErrors?.Nickname}
            />
            <RegisterInputField
              value={email}
              label="Email"
              onChange={(e): void => {
                setEmail(e.target.value);
                setIsSuccess(false);
              }}
              error={!isEmailValid}
              errorText={emailErrorText}
              responseErrors={responseErrors?.Email}
            />
            <RegisterInputField
              value={repeatEmail}
              label="Repeat email"
              onChange={(e): void => {
                setRepeatEmail(e.target.value);
                setIsSuccess(false);
              }}
              error={!isRepeatEmailValid}
              errorText={emailRepeatErrorText}
              responseErrors={responseErrors?.RepeatEmail}
            />
            <RegisterInputField
              value={password}
              label="Password"
              type={showPassword ? 'text' : 'password'}
              onChange={(e): void => {
                setPassword(e.target.value);
                setIsSuccess(false);
              }}
              error={!isPasswordValid}
              errorText={passwordErrorText}
              responseErrors={responseErrors?.Password}
              inputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onMouseDown={(): void => setShowPassword(true)}
                      onTouchStart={(): void => setShowPassword(true)}
                      onMouseUp={(): void => setShowPassword(false)}
                      onTouchEnd={(): void => setShowPassword(false)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <RegisterInputField
              value={repeatPassword}
              label="Repeat password"
              type="password"
              onChange={(e): void => {
                setRepeatPassword(e.target.value);
                setIsSuccess(false);
              }}
              error={!isRepeatPasswordValid}
              errorText={passwordRepeatErrorText}
              responseErrors={responseErrors?.RepeatPassword}
            />
            {((responseErrors?.Register && responseErrors?.Register.length > 0) ||
              (responseErrors?.Confirmation && responseErrors?.Confirmation.length > 0)) && (
              <Box
                sx={{
                  margin: 1,
                  border: (theme) => `1px solid ${theme.palette.background.default}`,
                  borderRadius: 1,
                }}
              >
                {responseErrors?.Register?.map((value, index) => (
                  <Typography
                    align="center"
                    key={index}
                    sx={{
                      color: (theme) => theme.palette.secondary.main,
                      fontSize: (theme) => theme.typography.caption.fontSize,
                      borderBottom: (theme) => `1px solid ${theme.palette.background.default}`,
                    }}
                  >
                    {value}
                  </Typography>
                ))}
                {responseErrors?.Confirmation?.map((value, index) => (
                  <Typography
                    align="center"
                    key={index}
                    sx={{
                      color: (theme) => theme.palette.error.main,
                      fontSize: (theme) => theme.typography.caption.fontSize,
                      borderBottom: (theme) => `1px solid ${theme.palette.background.default}`,
                    }}
                  >
                    {value}
                  </Typography>
                ))}
              </Box>
            )}
            <Button type="submit" sx={{ margin: 1 }} disabled={invalid}>
              {loading ? (
                <CircularProgress size={24.5} />
              ) : isSuccess ? (
                <MarkEmailReadIcon sx={{ height: '24.5px', width: '24.5px' }} />
              ) : (
                'Register'
              )}
            </Button>
          </Column>
        </Paper>
      </Box>
    </Column>
  );
};
