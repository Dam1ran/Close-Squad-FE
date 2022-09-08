import { useAbortSignal, useEmail, usePassword, useTitle } from '../../../support/hooks';
import {
  Box,
  Button,
  Column,
  EnhancedEncryptionIcon,
  ForwardToInboxIcon,
  HomeIcon,
  HubIcon,
  IconButton,
  InputAdornment,
  LoadingButton,
  LockOpenIcon,
  LoginIcon,
  Paper,
  RateReviewIcon,
  SyncLockIcon,
  Typography,
  VisibilityIcon,
  VisibilityOffIcon,
} from '../../elements';
import { fadeIn } from '../../../styles';
import { RegisterInputField } from '../register/registerInputField';
import { useContext, useEffect, useState } from 'react';
import { addSeconds, Constants, getFormattedDateTime, isAnyEmpty } from '../../../support/utils';
import { ServerClient } from '../../../api/serverClient';
import toast from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';
import { AppContext } from '../../../support/contexts/appContextProvider';
import { alpha } from '@mui/system';
import { AuthResponseErrors } from '../../../models/auth';
import { LocationProps } from '../../../models/types';
import { useAuthServiceHelper } from '../../../support/services';

export const LoginPage = (): JSX.Element => {
  useTitle('Login');
  const signal = useAbortSignal();
  const navigate = useNavigate();
  const location = useLocation() as unknown as LocationProps;
  const from = location.state?.from?.pathname || '/';

  const { application, setTrustThisDevice } = useContext(AppContext);

  const { email, setEmail, isEmailValid, emailErrorText } = useEmail(Constants.EmailMinLength, Constants.EmailMaxLength);

  const {
    password,
    setPassword,
    isPasswordValid,
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
  const [showChangePasswordBtn, setShowChangePasswordBtn] = useState(false);
  const { checkAndSet } = useAuthServiceHelper();

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
    setShowChangePasswordBtn(false);

    login({ email, password }, signal)
      .then((data) => {
        setPassword('');
        setIsSuccess(true);
        const loginText = `Previous login: ${getFormattedDateTime(addSeconds(data?.data?.lastLoginInterval))}`;
        toast.success(loginText, {
          icon: <HubIcon color="primary" />,
          duration: 10000,
          style: { minWidth: 'fit-content' },
        });
        if (checkAndSet(data.data.token)) {
          navigate(from, { replace: true });
        } else {
          console.warn('Wrong token.');
          setTimeout(() => {
            navigate('/home');
          }, 2000);
        }
      })
      .catch((data) => {
        setResponseErrors(data?.response?.data?.errors);
        if (data?.response?.data?.code === 'WrongCredentials') {
          setResponseErrors({
            Login: ['Wrong credentials provided.'],
          });
          setShowChangePasswordBtn(true);
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

  const trustThisDevice = application.trustThisDevice;

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
              autofocus
              value={email}
              label="Email"
              onChange={(e): void => {
                setEmail(e.target.value);
                setIsSuccess(false);
                setShowResendBtn(false);
                setShowChangePasswordBtn(false);
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
                setShowChangePasswordBtn(false);
              }}
              error={false}
              errorText={''}
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
            <Button
              color={trustThisDevice ? 'secondary' : 'primary'}
              sx={{
                height: 28,
                opacity: 0.75,
                margin: 1,
                borderRadius: '14px',
                border: (theme) =>
                  trustThisDevice ? `1px solid ${theme.palette.grey[400]}` : `1px solid ${theme.palette.grey[300]}`,
                boxShadow: (theme) => (trustThisDevice ? `inset 0px 0px 6px ${theme.palette.grey[400]}` : ''),
                backgroundColor: (theme) =>
                  trustThisDevice ? theme.palette.grey[100] : alpha(theme.palette.warning.light, 0.05),
              }}
              startIcon={trustThisDevice ? <EnhancedEncryptionIcon /> : <LockOpenIcon />}
              endIcon={trustThisDevice ? <EnhancedEncryptionIcon /> : <LockOpenIcon />}
              onClick={(): void => {
                setTrustThisDevice(!trustThisDevice);
              }}
            >
              <Box sx={{ minWidth: '207px' }}>{trustThisDevice ? 'Remember: ON' : 'Remember: OFF'}</Box>
            </Button>
            {responseErrors?.Login && responseErrors?.Login.length > 0 && (
              <Box
                sx={{
                  margin: 1,
                  borderRadius: 1,
                }}
              >
                {responseErrors?.Login?.map((value, index) => (
                  <Typography
                    align="center"
                    key={index}
                    sx={{
                      color: (theme) => theme.palette.error.light,
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
              sx={{ margin: 1 }}
              position="start"
              icon={<LoginIcon />}
              loading={loading}
              disabled={invalid || isSuccess}
            >
              <Box sx={{ marginTop: '2px' }}>Login</Box>
            </LoadingButton>
            {showResendBtn && (
              <Button
                startIcon={<ForwardToInboxIcon />}
                sx={{ minWidth: '110px' }}
                onClick={(): void => navigate('/resend-confirmation', { state: { email } })}
              >
                <u>Resend confirmation page</u>
              </Button>
            )}
            {showChangePasswordBtn && (
              <Button
                startIcon={<RateReviewIcon />}
                sx={{ minWidth: '110px' }}
                onClick={(): void => navigate('/register', { state: { email } })}
              >
                <u>Register page</u>
              </Button>
            )}
            {showChangePasswordBtn && (
              <Button
                startIcon={<SyncLockIcon />}
                sx={{ minWidth: '110px' }}
                onClick={(): void => navigate('/send-email-change-password', { state: { email } })}
              >
                <u>Change password page</u>
              </Button>
            )}
            <Button startIcon={<HomeIcon />} sx={{ minWidth: '110px' }} onClick={(): void => navigate('/home')}>
              <u>Home page</u>
            </Button>
          </Column>
        </Paper>
      </Box>
    </Column>
  );
};
