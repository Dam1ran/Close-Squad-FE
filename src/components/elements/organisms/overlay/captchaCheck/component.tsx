/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from 'react';
import { CheckCircleOutlineIcon, CircularProgress, DirectionsIcon } from '../../../atoms';
import { DialogActionBar, TextField } from '../../../molecules';
import { Box, Column } from '../../../templates';
import { isNotEmpty, isNullOrEmpty } from '../../../../../support/utils';
import { alpha } from '@mui/system';
import { CaptchaService } from '../../../../../support/services';
import { fadeIn } from '../../../../../styles';
import { useServerClient } from '../../../../../api/useServerClient';

export const CaptchaCheck: React.FC<{ onSuccess: () => void }> = (props) => {
  const [loading, setLoading] = useState(true);
  const [errorText, setErrorText] = useState('');
  const [success, setSuccess] = useState(false);
  const [code, setCode] = useState('');
  const [image, setImage] = useState<string | undefined>();

  const { getCaptcha, validateCaptcha } = useServerClient();

  const requestCaptcha = (): void => {
    setLoading(true);
    getCaptcha()
      .then((d) => {
        const reader = new FileReader();
        reader.readAsDataURL(d.data);
        reader.onload = (): void => setImage(reader.result?.toString());
      })
      .catch(() => console.warn('Captcha error.'))
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    requestCaptcha();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onCheck = (): void => {
    setLoading(true);
    validateCaptcha(code)
      .then(() => {
        setSuccess(true);
        setLoading(false);
        setErrorText('');
        setCode('');
        CaptchaService.setCode(code);
        props.onSuccess();
      })
      .catch((d) => {
        if (d?.response?.data?.code === 'WrongCaptcha') {
          setErrorText('Wrong captcha.');
          setLoading(false);
        }
        if (d?.response?.data?.code === 'CaptchaExpired') {
          setErrorText('');
          requestCaptcha();
        }
        if (d?.response?.data?.code === 'TooManyAttempts') {
          setCode('');
          setErrorText('Too many attempts. Please wait.');
          setLoading(true);
          setTimeout(() => {
            setErrorText('');
            requestCaptcha();
          }, 60000);
        }
      });
  };
  return (
    <Box sx={{ width: '100%', paddingTop: 2 }}>
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
        {image && !success ? (
          <img src={image} alt="captcha" style={{ borderRadius: '4px', width: '288px', height: '81px', margin: 'auto' }} />
        ) : (
          <Box
            display="flex"
            alignContent="center"
            alignItems="center"
            justifyContent="center"
            m="auto"
            sx={{
              width: '288px',
              height: '81px',
              borderRadius: 1,
              border: (theme) => `1px solid ${theme.palette.grey[400]}`,
              boxShadow: (theme) => `inset 0px 0px 40px ${alpha(theme.palette.grey[300], 0.8)}`,
              ...fadeIn(1),
            }}
          >
            {success ? (
              <CheckCircleOutlineIcon
                color="secondary"
                sx={{ width: '48px', height: '48px', opacity: 0.25, marginBottom: '5px' }}
              />
            ) : (
              <CircularProgress thickness={8} color="secondary" sx={{ opacity: 0.2 }} />
            )}
          </Box>
        )}
        <TextField
          color="secondary"
          size="small"
          required
          label={'Captcha code'}
          sx={{
            backgroundColor: (theme) => theme.palette.grey[50],
            borderRadius: 1,
            margin: 1,
            marginTop: 2,
            '& input': {
              letterSpacing: '2px',
              fontWeight: (theme) => theme.typography.fontWeightBold,
              color: (theme) => theme.palette.text.secondary,
              textAlign: 'center',
            },
          }}
          spellCheck="false"
          autoFocus
          value={code}
          onChange={(e): void => {
            setCode(e.target.value.toUpperCase());
            setErrorText('');
            setSuccess(false);
          }}
          onKeyUp={(e: React.KeyboardEvent<HTMLDivElement>): void => {
            if (e.key.getNormalized() === 'enter'.getNormalized() && isNotEmpty(code)) {
              onCheck();
            }
          }}
          error={isNotEmpty(errorText)}
          helperText={errorText}
          autoComplete="off"
        />
      </Column>
      <DialogActionBar
        btnData={[
          {
            capture: 'Check',
            onClick: onCheck,
            icon: <DirectionsIcon />,
            disabled: isNullOrEmpty(code) || loading,
            loading,
            width: '100%',
          },
        ]}
      />
    </Box>
  );
};
