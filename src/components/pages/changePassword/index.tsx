import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ServerClient } from '../../../api/serverClient';
import { AuthResponseErrors } from '../../../models/auth';
import { fadeIn } from '../../../styles';
import { useAbortSignal, usePasswords, useTitle } from '../../../support/hooks';
import { Constants, isAnyEmpty, isNotEmpty } from '../../../support/utils';
import {
  Box,
  Button,
  captchaCheckModalOverlay,
  CircularProgress,
  Column,
  ForwardToInboxIcon,
  IconButton,
  InputAdornment,
  Paper,
  SyncLockIcon,
  Typography,
  VisibilityIcon,
  VisibilityOffIcon,
} from '../../elements';
import { RegisterInputField } from '../register/registerInputField';

export const ChangePasswordPage = (): JSX.Element => {
  useTitle('Change password');
  const signal = useAbortSignal();

  const [searchParams, setSearchParams] = useSearchParams();
  const paramGuid = searchParams.get('guid');
  const [guid, setGuid] = useState('');

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
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showResendBtn, setShowResendBtn] = useState(false);

  const [responseErrors, setResponseErrors] = useState<Partial<AuthResponseErrors> | null>({
    Password: [],
    RepeatPassword: [],
    ChangePassword: [],
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (isNotEmpty(paramGuid)) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      setGuid(paramGuid!);
      searchParams.delete('guid');
      setSearchParams(searchParams);
    } else {
      navigate('/home', { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setInvalid(isAnyEmpty(guid, password, repeatPassword));
    if (password.length > 0 && repeatPassword.length > 0) {
      setInvalid(!isPasswordValid || !isRepeatPasswordValid);
    }
  }, [guid, password, isPasswordValid, repeatPassword, isRepeatPasswordValid]);

  const submit = (): void => {
    if (isAnyEmpty(guid, password, repeatPassword)) {
      return;
    }
    const { changePassword } = ServerClient();

    setLoading(true);
    setResponseErrors(null);
    setIsSuccess(false);

    changePassword({ guid, password, repeatPassword }, signal)
      .then(() => {
        toast.success('Password successfully changed.', {
          icon: <SyncLockIcon />,
          duration: 5000,
          style: { minWidth: 'fit-content' },
        });
        setGuid('');
        setIsSuccess(true);
        setTimeout(() => {
          navigate('/login', { replace: true });
        }, 3000);
      })
      .catch((data) => {
        setResponseErrors(data?.response?.data?.errors);
        if (data?.response?.data?.code === 'TokenExpired') {
          setResponseErrors({
            ChangePassword: ['Change password link expired. Please resend new confirmation link.'],
          });
          setShowResendBtn(true);
          setGuid('');
          setTimeout(() => {
            navigate('/resend-confirmation', { replace: true });
          }, 8000);
        }
        if (data?.response?.data?.code === 'WrongData') {
          setResponseErrors({
            ChangePassword: ['An error occurred while sending the email.'],
          });
          setGuid('');
          setTimeout(() => {
            navigate('/home', { replace: true });
          }, 2000);
        }
        if (data?.response?.data?.code === 'SamePassword') {
          setResponseErrors({
            ChangePassword: ['Password must be different than previous one.'],
          });
        }
      })
      .finally(() => {
        resetPasswords();
        setLoading(false);
      });
  };

  const onSubmit = (event: React.FormEvent<HTMLDivElement>): void => {
    event.preventDefault();
    setInvalid(true);
    captchaCheckModalOverlay(() => {
      submit();
    }, 'change-password-captcha-check');
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
            Change password:
          </Typography>
          <Column sx={{ paddingTop: 2, '& .MuiOutlinedInput-root': { '& fieldset': { transition: 'border 0.3s' } } }}>
            <RegisterInputField
              value={password}
              label="Password"
              autofocus
              type={showPassword ? 'text' : 'password'}
              onChange={(e): void => {
                setPassword(e.target.value);
                setIsSuccess(false);
                setShowResendBtn(false);
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
                setShowResendBtn(false);
              }}
              error={!isRepeatPasswordValid}
              errorText={passwordRepeatErrorText}
              responseErrors={responseErrors?.RepeatPassword}
            />
            {responseErrors?.ChangePassword && responseErrors?.ChangePassword.length > 0 && (
              <Box
                sx={{
                  margin: 1,
                  borderRadius: 1,
                }}
              >
                {responseErrors?.ChangePassword?.map((value, index) => (
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
            <Button type="submit" sx={{ margin: 1 }} disabled={invalid}>
              {loading ? (
                <CircularProgress size={24.5} />
              ) : isSuccess ? (
                <SyncLockIcon sx={{ height: '24.5px', width: '24.5px' }} />
              ) : (
                'Change password'
              )}
            </Button>
            {showResendBtn && (
              <Button
                startIcon={<ForwardToInboxIcon />}
                sx={{ minWidth: '110px' }}
                onClick={(): void => navigate('/resend-confirmation')}
              >
                <u>Resend confirmation page</u>
              </Button>
            )}
          </Column>
        </Paper>
      </Box>
    </Column>
  );
};
