import { useAbortSignal, useEmail, usePassword, useTitle } from '../../../support/hooks';
import {
  Box,
  Button,
  captchaCheckModalOverlay,
  CircularProgress,
  Column,
  EnhancedEncryptionIcon,
  ForwardToInboxIcon,
  HubIcon,
  IconButton,
  InputAdornment,
  LockOpenIcon,
  LoginIcon,
  Paper,
  SyncLockIcon,
  Typography,
  VisibilityIcon,
  VisibilityOffIcon,
} from '../../elements';
import { fadeIn } from '../../../styles';
import { RegisterInputField, AuthResponseErrors } from '../register/registerInputField';
import { useContext, useEffect, useState } from 'react';
import { addSeconds, Constants, getFormattedDateTme, isAnyEmpty } from '../../../support/utils';
import { ServerClient } from '../../../api/serverClient';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../../support/contexts/appContextProvider';
import { alpha } from '@mui/system';

export const LoginPage = (): JSX.Element => {
  useTitle('Login');
  const signal = useAbortSignal();
  const navigate = useNavigate();
  const { application, setTrustThisDevice } = useContext(AppContext);

  const {
    email: email,
    setEmail: setEmail,
    isEmailValid: isEmailValid,
    emailErrorText: emailErrorText,
  } = useEmail(Constants.EmailMinLength, Constants.EmailMaxLength);
  const {
    password,
    setPassword,
    isPasswordValid,
    passwordErrorText,
    reset: passwordReset,
    showPassword,
    setShowPassword,
  } = usePassword(Constants.PasswordMinLength, Constants.PasswordMaxLength);

  const [responseErrors, setResponseErrors] = useState<Partial<AuthResponseErrors> | null>({
    Email: [],
    Password: [],
    Login: [],
  });
  const [invalid, setInvalid] = useState(true);
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [showResendBtn, setShowResendBtn] = useState(false);
  const [showForgotPasswordBtn, setShowForgotPasswordBtn] = useState(false);

  useEffect(() => {
    setInvalid(isAnyEmpty(email, password));
    if (email.length > 0 && password.length > 0) {
      setInvalid(!isEmailValid || !isPasswordValid);
    }
  }, [email, isEmailValid, password, isPasswordValid]);

  const onSubmit = (event: React.FormEvent<HTMLDivElement>): void => {
    event.preventDefault();
    setInvalid(true);
    if (isAnyEmpty(email, password)) {
      return;
    }

    const { login } = ServerClient();
    setLoading(true);
    setResponseErrors(null);
    setIsSuccess(false);

    setShowResendBtn(false);
    setShowForgotPasswordBtn(false);

    login({ email, password }, signal)
      .then((data) => {
        const loginText = `Last login on: ${getFormattedDateTme(addSeconds(data?.data?.lastLoginInterval))}`;
        toast.success(loginText, {
          icon: <HubIcon color="primary" />,
          duration: 10000,
          style: { minWidth: 'fit-content' },
        });
        setPassword('');
        setIsSuccess(true);
        // TODO: decide further where & how to go
      })
      .catch((data) => {
        setResponseErrors(data?.response?.data?.errors);
        if (data?.response?.data?.code === 'WrongCredentials') {
          setResponseErrors({
            Login: ['Wrong credentials provided.'],
          });
          setShowForgotPasswordBtn(true);
        }
        if (data?.response?.data?.code === 'LockedOut') {
          setResponseErrors({
            Login: [
              `Too many attempts to login. Locked out for ${data?.response?.data?.data} minute${
                data?.response?.data?.data !== 1 ? 's' : ''
              }.`,
            ],
          });
        }
        if (data?.response?.data?.code === 'UserBanned') {
          setResponseErrors({
            Login: [data?.response?.data?.description],
          });
        }
        if (data?.response?.data?.code === 'EmailNotConfirmed') {
          setResponseErrors({
            Login: [
              'Email not confirmed. Please check your email inbox and spam folder. If not present choose to resend confirmation email.',
            ],
          });
          setShowResendBtn(true);
        }
      })
      .finally(() => {
        passwordReset();
        setLoading(false);
      });
  };

  const onResendConfirmation = (): void => {
    if (isAnyEmpty(email)) {
      return;
    }
    setShowResendBtn(false);
    captchaCheckModalOverlay(
      () => {
        const { resendConfirmation } = ServerClient();
        resendConfirmation({ email, repeatEmail: email }, signal)
          .then(() => {
            toast.success('Confirmation email sent to specified address.', {
              icon: '📨',
              duration: 10000,
              style: { minWidth: 'fit-content' },
            });
            setTimeout(() => {
              navigate('/home', { replace: true });
            }, 3000);
            setPassword('');
            setIsSuccess(true);
          })
          .catch((data) => {
            if (data?.response?.data?.errors) {
              setResponseErrors(data?.response?.data?.errors);
            } else {
              setResponseErrors({
                Login: ['An error occurred while sending the email.'],
              });
            }
          })
          .finally(() => {
            setLoading(false);
          });
      },
      undefined,
      true,
    );
  };

  const onForgotPassword = (): void => {
    if (isAnyEmpty(email)) {
      return;
    }
    setShowForgotPasswordBtn(false);
    captchaCheckModalOverlay(
      () => {
        const { sendChangePasswordEmail } = ServerClient();
        sendChangePasswordEmail({ email }, signal)
          .then(() => {
            toast.success('Change password email sent to specified address.', {
              icon: '📨',
              duration: 10000,
              style: { minWidth: 'fit-content' },
            });
            setTimeout(() => {
              navigate('/home');
            }, 3000);
            setPassword('');
            setIsSuccess(true);
          })
          .catch((data) => {
            if (data?.response?.data?.errors) {
              setResponseErrors(data?.response?.data?.errors);
            } else {
              setResponseErrors({
                Login: ['An error occurred while sending the email.'],
              });
            }
          })
          .finally(() => {
            setLoading(false);
          });
      },
      'resend-confirmation-email-captcha-check',
      true,
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
            Login:
          </Typography>
          <Column sx={{ paddingTop: 2, '& .MuiOutlinedInput-root': { '& fieldset': { transition: 'border 0.3s' } } }}>
            <RegisterInputField
              value={email}
              label="Email"
              onChange={(e): void => {
                setEmail(e.target.value);
                setIsSuccess(false);
                setShowResendBtn(false);
                setShowForgotPasswordBtn(false);
              }}
              error={!isEmailValid}
              errorText={emailErrorText}
              responseErrors={responseErrors?.Email}
            />
            <RegisterInputField
              value={password}
              label="Password"
              type={showPassword ? 'text' : 'password'}
              onChange={(e): void => {
                setPassword(e.target.value);
                setIsSuccess(false);
                setShowResendBtn(false);
                setShowForgotPasswordBtn(false);
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
            {responseErrors?.Login && responseErrors?.Login.length > 0 && (
              <Box
                sx={{
                  margin: 1,
                  border: (theme) => `1px solid ${theme.palette.background.default}`,
                  borderRadius: 1,
                }}
              >
                {responseErrors?.Login?.map((value, index) => (
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
            <Button
              color={application.trustThisDevice ? 'secondary' : 'primary'}
              sx={{
                height: 24,
                opacity: 0.8,
                marginLeft: 1,
                marginRight: 1,
                border: (theme) =>
                  application.trustThisDevice
                    ? `1px solid ${theme.palette.grey[400]}`
                    : `1px solid ${theme.palette.grey[300]}`,
                boxShadow: (theme) => (application.trustThisDevice ? `inset 0px 0px 6px ${theme.palette.grey[400]}` : ''),
                backgroundColor: (theme) =>
                  application.trustThisDevice ? theme.palette.grey[100] : alpha(theme.palette.warning.light, 0.05),
              }}
              startIcon={application.trustThisDevice ? <EnhancedEncryptionIcon /> : <LockOpenIcon />}
              endIcon={application.trustThisDevice ? <EnhancedEncryptionIcon /> : <LockOpenIcon />}
              onClick={(): void => {
                setTrustThisDevice(!application.trustThisDevice);
              }}
            >
              <Box sx={{ minWidth: '207px' }}>{application.trustThisDevice ? 'Remember: ON' : 'Remember: OFF'}</Box>
            </Button>
            <Button type="submit" sx={{ margin: 1 }} disabled={invalid}>
              {loading ? (
                <CircularProgress size={24.5} />
              ) : isSuccess ? (
                <LoginIcon sx={{ height: '24.5px', width: '24.5px' }} />
              ) : (
                'Login'
              )}
            </Button>
            {showResendBtn && (
              <Button startIcon={<ForwardToInboxIcon />} sx={{ minWidth: '110px' }} onClick={onResendConfirmation}>
                Resend confirmation email
              </Button>
            )}
            {showForgotPasswordBtn && (
              <Button startIcon={<SyncLockIcon />} sx={{ minWidth: '110px' }} onClick={onForgotPassword}>
                Forgot password
              </Button>
            )}
          </Column>
        </Paper>
      </Box>
    </Column>
  );
};
