import { useEmails, useTitle } from '../../../support/hooks';
import { Box, captchaCheckModalOverlay, Column, ForwardToInboxIcon, LoadingButton, Paper, Typography } from '../../elements';
import { fadeIn } from '../../../styles';
import { RegisterInputField } from '../register/registerInputField';
import { useEffect, useRef, useState } from 'react';
import { Constants, isAnyEmpty } from '../../../support/utils';
import toast from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthResponseErrors } from '../../../models/auth';
import { LocationProps } from '../../../models/types';
import { useServerClient } from '../../../api/useServerClient';

export const SendEmailChangePasswordPage = (): JSX.Element => {
  useTitle('Send email - change password');
  const navigate = useNavigate();
  const { state } = useLocation() as unknown as LocationProps;
  const {
    email,
    setEmail,
    isEmailValid,
    emailErrorText,
    repeatEmail,
    setRepeatEmail,
    isRepeatEmailValid,
    emailRepeatErrorText,
    reset: emailsReset,
  } = useEmails(Constants.EmailMinLength, Constants.EmailMaxLength);

  const [responseErrors, setResponseErrors] = useState<Partial<AuthResponseErrors> | null>({
    Email: [],
    RepeatEmail: [],
    ChangePasswordEmail: [],
  });
  const [invalid, setInvalid] = useState(true);
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const repeatPasswordRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (state?.email) {
      setEmail(state.email);
      repeatPasswordRef.current?.focus();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setInvalid(isAnyEmpty(email, repeatEmail));
    if (email.length > 0 && repeatEmail.length > 0) {
      setInvalid(!isEmailValid || !isRepeatEmailValid);
    }
  }, [email, isEmailValid, repeatEmail, isRepeatEmailValid]);

  const { sendChangePasswordEmail } = useServerClient();

  const submit = (): void => {
    if (isAnyEmpty(email, repeatEmail)) {
      return;
    }
    setLoading(true);
    setResponseErrors(null);
    setIsSuccess(false);

    sendChangePasswordEmail({ email, repeatEmail })
      .then(() => {
        toast.success('Confirmation email sent to specified address.', {
          icon: '📨',
          duration: 10000,
          style: { minWidth: 'fit-content' },
        });
        emailsReset();
        setIsSuccess(true);
        setTimeout(() => {
          navigate('/home', { replace: true });
        }, 3000);
      })
      .catch((data) => {
        setResponseErrors(data?.response?.data?.errors);
        if (data?.response?.data?.code === 'WrongCredentials') {
          setResponseErrors({
            ChangePasswordEmail: ['An error occurred while sending the email.'],
          });
          setTimeout(() => {
            navigate('/home', { replace: true });
          }, 2000);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const onSubmit = (event: React.FormEvent<HTMLDivElement>): void => {
    event.preventDefault();

    setInvalid(true);
    if (isAnyEmpty(email, repeatEmail)) {
      return;
    }

    captchaCheckModalOverlay(() => {
      submit();
    }, 'send-email-change-password-captcha-check');
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
            Send email - change password:
          </Typography>
          <Column sx={{ paddingTop: 2, '& .MuiOutlinedInput-root': { '& fieldset': { transition: 'border 0.3s' } } }}>
            <RegisterInputField
              autofocus
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
              ref={repeatPasswordRef}
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
            {responseErrors?.ChangePasswordEmail && responseErrors?.ChangePasswordEmail.length > 0 && (
              <Box
                sx={{
                  margin: 1,
                  borderRadius: 1,
                }}
              >
                {responseErrors?.ChangePasswordEmail?.map((value, index) => (
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
              position="start"
              icon={<ForwardToInboxIcon />}
              loading={loading}
              disabled={invalid || isSuccess}
              sx={{ margin: 1, width: 'unset' }}
              caption="Send"
              centered
            />
          </Column>
        </Paper>
      </Box>
    </Column>
  );
};
