import { alpha } from '@mui/system';
import { useEffect, useState } from 'react';
import { RegisterInputField, AuthResponseErrors } from '../../../../pages/register/registerInputField';
import { MarkEmailReadIcon } from '../../../atoms';
import { DialogActionBar, Typography } from '../../../molecules';
import { Box, Column } from '../../../templates';
import { Constants, isAnyEmpty } from '../../../../../support/utils';
import { captchaCheckModalOverlay } from '../captchaCheck';
import { ServerClient } from '../../../../../api/serverClient';
import toast from 'react-hot-toast';
import { useAbortSignal, useEmails } from '../../../../../support/hooks';

export const ResendConfirmationEmail: React.FC<{ onSuccess: () => void }> = (props) => {
  const signal = useAbortSignal();

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

  const [responseErrors, setResponseErrors] = useState<Partial<AuthResponseErrors> | null>({
    Email: [],
    RepeatEmail: [],
    Confirmation: [],
  });
  const [invalid, setInvalid] = useState(true);
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    setInvalid(isAnyEmpty(email, repeatEmail));
    if (email.length > 0 && repeatEmail.length > 0) {
      setInvalid(!isEmailValid || !isRepeatEmailValid);
    }
  }, [email, isEmailValid, repeatEmail, isRepeatEmailValid]);

  const submit = (): void => {
    if (isAnyEmpty(email, repeatEmail)) {
      return;
    }
    const { resendConfirmation } = ServerClient();
    setLoading(true);
    setResponseErrors(null);
    setIsSuccess(false);

    resendConfirmation({ email, repeatEmail }, signal)
      .then(() => {
        toast.success('Confirmation email sent to specified address.', {
          icon: '📨',
          duration: 10000,
          style: { minWidth: 'fit-content' },
        });
        setRepeatEmail('');
        setIsSuccess(true);
        props.onSuccess();
      })
      .catch((data) => {
        setResponseErrors(data?.response?.data?.errors);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const onSubmit = (): void => {
    setInvalid(true);
    captchaCheckModalOverlay(() => {
      submit();
    }, 'resend-confirmation-email-captcha-check');
  };

  return (
    <Box pt={2} sx={{ width: '100%', backgroundColor: 'white' }}>
      <Column
        sx={{
          margin: 'auto',
          width: '100%',
          paddingLeft: 1,
          paddingRight: 1,
          display: 'flex',
          justifyContent: 'center',
          '& .MuiOutlinedInput-root': {
            '& fieldset': { transition: 'border 0.3s' },
          },
          '.Mui-focused fieldset': { borderColor: (theme) => `${alpha(theme.palette.secondary.main, 0.4)} !important` },
        }}
      >
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
          value={repeatEmail}
          label="Repeat email"
          onChange={(e): void => {
            setRepeatEmail(e.target.value);
            setIsSuccess(false);
          }}
          error={!isRepeatEmailValid && !isSuccess}
          errorText={isSuccess ? '' : emailRepeatErrorText}
          responseErrors={responseErrors?.RepeatEmail}
        />
        {responseErrors?.Confirmation && responseErrors?.Confirmation.length > 0 && (
          <Box
            sx={{
              margin: 1,
              border: (theme) => `1px solid ${theme.palette.background.default}`,
              borderRadius: 1,
            }}
          >
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
      </Column>
      <DialogActionBar
        btnData={[
          {
            capture: isSuccess ? 'Email sent' : 'Resend',
            onClick: onSubmit,
            icon: <MarkEmailReadIcon />,
            disabled: invalid || loading,
            loading,
            minWidth: '110px',
          },
        ]}
      />
    </Box>
  );
};
