import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { useServerClient } from '../../../api/useServerClient';
import { fadeIn } from '../../../styles';
import { useEmails } from '../../../support/hooks/emailsValidationHook';
import { useName } from '../../../support/hooks/nameValidationHook';
import { usePasswords } from '../../../support/hooks/passwordsValidationHook';
import { isAnyEmpty } from '../../../support/utils';
import {
  Box,
  Button,
  CaptchaCheck,
  CircularProgress,
  Column,
  IconButton,
  InputAdornment,
  MarkEmailReadIcon,
  Paper,
  Typography,
  VisibilityIcon,
  VisibilityOffIcon,
} from '../../elements';
import { overlay } from '../../features/overlay/overlay';
import { DialogType } from '../../features/overlay/store/overlayStore';
import { RegisterInputField, ResponseErrors } from './registerInputField';

export const RegisterPage = (): JSX.Element => {
  const nickNameRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const { name: nickname, setName, isNameValid, nameErrorText } = useName(4, 20);
  const {
    email,
    setEmail,
    isEmailValid,
    emailErrorText,
    repeatEmail,
    setRepeatEmail,
    isRepeatEmailValid,
    emailRepeatErrorText,
  } = useEmails(3, 255); // officially can be 3 - 319
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
  } = usePasswords(8, 64);
  const [invalid, setInvalid] = useState(true);

  const [responseErrors, setResponseErrors] = useState<ResponseErrors | null>({
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
      setInvalid(!isNameValid || !isEmailValid || !isRepeatEmailValid || !isPasswordValid || !isRepeatPasswordValid);
    }
  }, [
    nickname,
    isNameValid,
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
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { register } = useServerClient();
    setLoading(true);
    setResponseErrors(null);
    setIsSuccess(false);
    register({ nickname, email, repeatEmail, password, repeatPassword })
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
        nickNameRef.current?.focus();
      });
  };

  const onSubmit = async (event: React.FormEvent<HTMLDivElement>): Promise<void> => {
    event.preventDefault();
    setInvalid(true);
    overlay.setComponent(
      <CaptchaCheck
        onSuccess={(): void => {
          overlay.removeComponent('register-captcha-check');
          submit();
        }}
      />,
      {
        id: 'register-captcha-check',
        modal: true,
        canBeClosed: false,
        title: 'Eyesight check',
        icon: <VisibilityIcon />,
        dialogType: DialogType.Other,
      },
    );
  };

  return (
    <Column
      alignItems="center"
      sx={{
        height: '100%',
        ...fadeIn(),
      }}
    >
      <Box component="form" m="auto" pt={2} onSubmit={(e): Promise<void> => onSubmit(e)}>
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
              ref={nickNameRef}
              value={nickname}
              label="Nickname"
              autofocus
              onChange={(e): void => {
                setName(e.target.value);
                setIsSuccess(false);
              }}
              error={!isNameValid}
              errorText={nameErrorText}
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
};;