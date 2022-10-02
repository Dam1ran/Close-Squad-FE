import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';
import { useServerClient } from '../../../api/useServerClient';
import { AuthResponseErrors } from '../../../models/auth';
import { LocationProps } from '../../../models/types';
import { fadeIn } from '../../../styles';
import { useEmails, useNickname, usePasswords, useTitle } from '../../../support/hooks';
import { Constants, isAnyEmpty } from '../../../support/utils';
import {
  Box,
  Column,
  IconButton,
  InputAdornment,
  MarkEmailReadIcon,
  Paper,
  Typography,
  captchaCheckModalOverlay,
  VisibilityIcon,
  VisibilityOffIcon,
  HomeIcon,
  LoadingButton,
} from '../../elements';
import { RegisterInputField } from './registerInputField';

export const RegisterPage = (): JSX.Element => {
  useTitle('Register new user');

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

  useEffect(() => {
    setInvalid(isAnyEmpty(nickname, email, repeatEmail, password, repeatPassword));
    if (
      nickname.length > 0 &&
      email.length > 0 &&
      repeatEmail.length > 0 &&
      password.length > 0 &&
      repeatPassword.length > 0
    ) {
      setInvalid(!isNicknameValid || !isEmailValid || !isRepeatEmailValid || !isPasswordValid || !isRepeatPasswordValid);
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

  const { register } = useServerClient();

  const submit = (): void => {
    if (isAnyEmpty(nickname, email, repeatEmail, password, repeatPassword)) {
      return;
    }
    setLoading(true);
    setResponseErrors(null);
    register({ nickname, email, repeatEmail, password, repeatPassword })
      .then(() => {
        toast.success('Confirmation email sent to specified address.', {
          icon: '📨',
          duration: 10000,
          style: { minWidth: 'fit-content' },
        });
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

  const { state } = useLocation() as unknown as LocationProps;
  useEffect(() => {
    if (state?.email) {
      setEmail(state.email);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const navigate = useNavigate();

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
              onChange={(e): void => setNickname(e.target.value)}
              error={!isNicknameValid}
              errorText={nicknameErrorText}
              responseErrors={responseErrors?.Nickname}
            />
            <RegisterInputField
              value={email}
              label="Email"
              onChange={(e): void => setEmail(e.target.value)}
              error={!isEmailValid}
              errorText={emailErrorText}
              responseErrors={responseErrors?.Email}
            />
            <RegisterInputField
              value={repeatEmail}
              label="Repeat email"
              onChange={(e): void => setRepeatEmail(e.target.value)}
              error={!isRepeatEmailValid}
              errorText={emailRepeatErrorText}
              responseErrors={responseErrors?.RepeatEmail}
            />
            <RegisterInputField
              value={password}
              label="Password"
              type={showPassword ? 'text' : 'password'}
              onChange={(e): void => setPassword(e.target.value)}
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
              onChange={(e): void => setRepeatPassword(e.target.value)}
              error={!isRepeatPasswordValid}
              errorText={passwordRepeatErrorText}
              responseErrors={responseErrors?.RepeatPassword}
            />
            {((responseErrors?.Register && responseErrors?.Register.length > 0) ||
              (responseErrors?.Confirmation && responseErrors?.Confirmation.length > 0)) && (
              <Box
                sx={{
                  margin: 1,
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
                    }}
                  >
                    {value}
                  </Typography>
                ))}
              </Box>
            )}
            <LoadingButton
              type="submit"
              sx={{ width: 'unset', margin: 1 }}
              icon={<MarkEmailReadIcon />}
              loading={loading}
              disabled={invalid}
              caption="Register"
              centered
            />
            <LoadingButton
              sx={{ width: 'unset', margin: 1 }}
              icon={<HomeIcon />}
              caption={<u>Home page</u>}
              onClick={(): void => navigate('/home')}
              centered
            />
          </Column>
        </Paper>
      </Box>
    </Column>
  );
};
