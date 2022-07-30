import { useEffect, useRef, useState } from 'react';
import { serverClient } from '../../../api/serverClient';
import { useEmails } from '../../../support/hooks/emailsValidationHook';
import { useName } from '../../../support/hooks/nameValidationHook';
import { usePasswords } from '../../../support/hooks/passwordsValidationHook';
import {
  Box,
  Button,
  CircularProgress,
  Column,
  FormHelperText,
  IconButton,
  InputAdornment,
  MarkEmailReadIcon,
  Paper,
  TextField,
  Typography,
  VisibilityIcon,
  VisibilityOffIcon,
} from '../../elements';

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
  } = useEmails();
  const {
    password,
    setPassword,
    isPasswordValid,
    passwordErrorText,
    repeatPassword,
    setRepeatPassword,
    isRepeatPasswordValid,
    passwordRepeatErrorText,
    showPasswords,
    setShowPasswords,
    reset: resetPasswords,
  } = usePasswords();
  const [invalid, setInvalid] = useState(true);

  interface ResponseErrors {
    Register: string[];
    Nickname: string[];
    Email: string[];
    RepeatEmail: string[];
    Password: string[];
    RepeatPassword: string[];
    Confirmation: string[];
  }
  const [responseErrors, setResponseErrors] = useState<ResponseErrors | null>({
    Register: [],
    Nickname: [],
    Email: [],
    RepeatEmail: [],
    Password: [],
    RepeatPassword: [],
    Confirmation: [],
  });

  const [successText, setSuccessText] = useState('');
  const anyEmpty = (a1: string, a2: string, a3: string, a4: string, a5: string): boolean =>
    a1.trim() === '' || a1.trim() === '' || a2.trim() === '' || a3.trim() === '' || a4.trim() === '' || a5.trim() === '';

  useEffect(() => {
    setInvalid(anyEmpty(nickname, email, repeatEmail, password, repeatPassword));
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

  const { register } = serverClient();

  const onSubmit = async (event: React.FormEvent<HTMLDivElement>): Promise<void> => {
    event.preventDefault();
    resetPasswords(); // setInvalid(true);
    setLoading(true);
    setSuccessText('');
    setResponseErrors(null);
    if (anyEmpty(nickname, email, repeatEmail, password, repeatPassword)) {
      return;
    }
    register({ nickname, email, repeatEmail, password, repeatPassword })
      .then((response) => {
        setSuccessText(response.data);
      })
      .catch((data) => {
        setResponseErrors(data?.response?.data?.errors);
      })
      .finally(() => {
        nickNameRef.current?.focus();
        setLoading(false);
      });
  };

  return (
    <Column
      alignItems="center"
      sx={{
        height: '100%',
        opacity: 0,
        animation: 'fadeIn 0.6s forwards',
        '@keyframes fadeIn': {
          '0%': {
            opacity: 0,
          },
          '100%': {
            opacity: 1,
          },
        },
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
            <TextField
              inputRef={nickNameRef}
              size="small"
              required
              label="Nickname"
              sx={{
                backgroundColor: (theme) => theme.palette.background.default,
                margin: 1,
              }}
              autoFocus
              value={nickname}
              onChange={(e): void => {
                setName(e.target.value);
                setSuccessText('');
              }}
              error={!isNameValid}
              FormHelperTextProps={{ component: 'div', style: { marginTop: '0px' } } as never}
              helperText={
                (nameErrorText.length > 0 || (responseErrors?.Nickname && responseErrors?.Nickname?.length > 0)) && (
                  <Box component="ul" sx={{ paddingInlineStart: 2, marginTop: '0px', marginBlockEnd: '0px' }}>
                    {nameErrorText.length > 0 && (
                      <Box component="li" sx={{ color: (theme) => theme.palette.warning.dark }}>
                        {nameErrorText}
                      </Box>
                    )}
                    {responseErrors?.Nickname &&
                      responseErrors.Nickname?.map((value, index) => (
                        <Box component="li" sx={{ color: (theme) => theme.palette.error.light }} key={index}>
                          {value}
                        </Box>
                      ))}
                  </Box>
                )
              }
            />
            <TextField
              size="small"
              required
              label="Email"
              sx={{
                backgroundColor: (theme) => theme.palette.background.default,
                margin: 1,
              }}
              value={email}
              onChange={(e): void => {
                setEmail(e.target.value);
                setSuccessText('');
              }}
              error={!isEmailValid}
              FormHelperTextProps={{ component: 'div', style: { marginTop: '0px' } } as never}
              helperText={
                (emailErrorText.length > 0 || (responseErrors?.Email && responseErrors?.Email?.length > 0)) && (
                  <Box component="ul" sx={{ paddingInlineStart: 2, marginTop: '0px', marginBlockEnd: '0px' }}>
                    {emailErrorText.length > 0 && (
                      <Box component="li" sx={{ color: (theme) => theme.palette.warning.dark }}>
                        {emailErrorText}
                      </Box>
                    )}
                    {responseErrors?.Email &&
                      responseErrors.Email?.map((value, index) => (
                        <Box component="li" sx={{ color: (theme) => theme.palette.error.light }} key={index}>
                          {value}
                        </Box>
                      ))}
                  </Box>
                )
              }
            />
            <TextField
              size="small"
              required
              label="Repeat email"
              sx={{
                backgroundColor: (theme) => theme.palette.background.default,
                margin: 1,
              }}
              value={repeatEmail}
              onChange={(e): void => {
                setRepeatEmail(e.target.value);
                setSuccessText('');
              }}
              error={!isRepeatEmailValid}
              FormHelperTextProps={{ component: 'div', style: { marginTop: '0px' } } as never}
              helperText={
                (emailRepeatErrorText.length > 0 ||
                  (responseErrors?.RepeatEmail && responseErrors?.RepeatEmail?.length > 0)) && (
                  <Box component="ul" sx={{ paddingInlineStart: 2, marginTop: '0px', marginBlockEnd: '0px' }}>
                    {emailRepeatErrorText.length > 0 && (
                      <Box component="li" sx={{ color: (theme) => theme.palette.warning.dark }}>
                        {emailRepeatErrorText}
                      </Box>
                    )}
                    {responseErrors?.RepeatEmail &&
                      responseErrors.RepeatEmail?.map((value, index) => (
                        <Box component="li" sx={{ color: (theme) => theme.palette.error.light }} key={index}>
                          {value}
                        </Box>
                      ))}
                  </Box>
                )
              }
            />
            <TextField
              size="small"
              label="Password"
              required
              type={showPasswords ? 'text' : 'password'}
              sx={{
                backgroundColor: (theme) => theme.palette.background.default,
                margin: 1,
              }}
              value={password}
              onChange={(e): void => {
                setPassword(e.target.value);
                setSuccessText('');
              }}
              error={!isPasswordValid}
              FormHelperTextProps={{ component: 'div', style: { marginTop: '0px' } } as never}
              helperText={
                (passwordErrorText.length > 0 || (responseErrors?.Password && responseErrors?.Password?.length > 0)) && (
                  <Box component="ul" sx={{ paddingInlineStart: 2, marginTop: '0px', marginBlockEnd: '0px' }}>
                    {passwordErrorText.length > 0 && (
                      <Box component="li" sx={{ color: (theme) => theme.palette.warning.dark }}>
                        {passwordErrorText}
                      </Box>
                    )}
                    {responseErrors?.Password &&
                      responseErrors.Password?.map((value, index) => (
                        <Box component="li" sx={{ color: (theme) => theme.palette.error.light }} key={index}>
                          {value}
                        </Box>
                      ))}
                  </Box>
                )
              }
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onMouseUp={(): void => setShowPasswords(false)}
                      onMouseDown={(): void => setShowPasswords(true)}
                      edge="end"
                    >
                      {showPasswords ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              size="small"
              required
              type="password"
              label="Repeat password"
              sx={{
                backgroundColor: (theme) => theme.palette.background.default,
                margin: 1,
              }}
              value={repeatPassword}
              onChange={(e): void => {
                setRepeatPassword(e.target.value);
                setSuccessText('');
              }}
              error={!isRepeatPasswordValid}
              FormHelperTextProps={{ component: 'div', style: { marginTop: '0px' } } as never}
              helperText={
                (passwordRepeatErrorText.length > 0 ||
                  (responseErrors?.RepeatPassword && responseErrors?.RepeatPassword?.length > 0)) && (
                  <Box component="ul" sx={{ paddingInlineStart: 2, marginTop: '0px', marginBlockEnd: '0px' }}>
                    {passwordRepeatErrorText.length > 0 && (
                      <Box component="li" sx={{ color: (theme) => theme.palette.warning.dark }}>
                        {passwordRepeatErrorText}
                      </Box>
                    )}
                    {responseErrors?.RepeatPassword &&
                      responseErrors.RepeatPassword?.map((value, index) => (
                        <Box component="li" sx={{ color: (theme) => theme.palette.error.light }} key={index}>
                          {value}
                        </Box>
                      ))}
                  </Box>
                )
              }
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
              ) : successText.length > 0 ? (
                <MarkEmailReadIcon sx={{ height: '24.5px', width: '24.5px' }} />
              ) : (
                'Register'
              )}
            </Button>
            {successText.length > 0 && (
              <FormHelperText
                sx={{
                  color: (theme) => theme.palette.secondary.main,
                  margin: 1,
                  textAlign: 'center',
                  border: (theme) => `1px solid ${theme.palette.background.default}`,
                  borderRadius: 1,
                }}
              >
                {successText}
              </FormHelperText>
            )}
          </Column>
        </Paper>
      </Box>
    </Column>
  );
};
