import { useAbortSignal, useEmail, usePassword, useTitle } from '../../../support/hooks';
import {
  Box,
  Button,
  Column,
  EnhancedEncryptionIcon,
  ForwardToInboxIcon,
  HubIcon,
  IconButton,
  InputAdornment,
  LoadingButton,
  LockOpenIcon,
  LoginIcon,
  Paper,
  SyncLockIcon,
  Typography,
  VisibilityIcon,
  VisibilityOffIcon,
} from '../../elements';
import { fadeIn } from '../../../styles';
import { RegisterInputField } from '../register/registerInputField';
import { useContext, useEffect, useState } from 'react';
import { addSeconds, Constants, getFormattedDateTme, isAnyEmpty } from '../../../support/utils';
import { ServerClient } from '../../../api/serverClient';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../../support/contexts/appContextProvider';
import { alpha } from '@mui/system';
import { AuthResponseErrors } from '../../../models/auth/authResponseErrors';

export const LoginPage = (): JSX.Element => {
  useTitle('Login');
  const signal = useAbortSignal();
  const navigate = useNavigate();

  const { application, setTrustThisDevice } = useContext(AppContext);

  const { email, setEmail, isEmailValid, emailErrorText } = useEmail(Constants.EmailMinLength, Constants.EmailMaxLength);

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
  const [showChangePasswordBtn, setShowChangePasswordBtn] = useState(false);

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
            <Button
              color={application.trustThisDevice ? 'secondary' : 'primary'}
              sx={{
                height: 28,
                opacity: 0.6,
                margin: 1,
                borderRadius: '14px',
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
              startIcon={<LoginIcon />}
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
                startIcon={<SyncLockIcon />}
                sx={{ minWidth: '110px' }}
                onClick={(): void => navigate('/send-email-change-password', { state: { email } })}
              >
                <u>Change password page</u>
              </Button>
            )}
          </Column>
        </Paper>
      </Box>
    </Column>
  );
};
