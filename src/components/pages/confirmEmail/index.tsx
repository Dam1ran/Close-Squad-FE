import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ServerClient } from '../../../api/serverClient';
import { fadeIn } from '../../../styles';
import { useAbortSignal, useTitle } from '../../../support/hooks';
import { isNotEmpty } from '../../../support/utils';
import {
  Box,
  Button,
  CircularProgress,
  Column,
  ForwardToInboxIcon,
  LoginIcon,
  Paper,
  Row,
  Typography,
} from '../../elements';

export const ConfirmEmailPage = (): JSX.Element => {
  useTitle('Confirm email');
  const signal = useAbortSignal();

  const [searchParams, setSearchParams] = useSearchParams();
  const guid = searchParams.get('guid');

  const [isConfirming, setIsConfirming] = useState(true);
  const [responseText, setResponseText] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isExpired, setIsExpired] = useState(false);

  const { confirmEmail } = ServerClient();
  const navigate = useNavigate();

  useEffect(() => {
    const sendData = async (): Promise<void> => {
      if (isNotEmpty(guid)) {
        searchParams.delete('guid');
        setSearchParams(searchParams);
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        confirmEmail({ guid: guid! }, signal)
          .then(() => {
            setResponseText('Email confirmed you can log in now.');
            setIsSuccess(true);
            setTimeout(() => {
              navigate('/login', { replace: true });
            }, 4000);
          })
          .catch((data) => {
            if (data?.response?.data?.code === 'TokenExpired') {
              setResponseText('Confirmation link expired.');
              setIsExpired(true);
            }
            if (data?.response?.data?.code === 'WrongData') {
              setResponseText('Provided data did not yeld any result.');
              setTimeout(() => {
                navigate('/home', { replace: true });
              }, 2000);
            }
            if (data?.response?.data?.code === 'AlreadyConfirmed') {
              setResponseText('Email already confirmed.');
              setTimeout(() => {
                navigate('/login', { replace: true });
              }, 3000);
            }
          })
          .finally(() => {
            setIsConfirming(false);
          });
      } else {
        setIsConfirming(false);
        setResponseText('Wrong confirmation link.');
        setTimeout(() => {
          navigate('/home', { replace: true });
        }, 2000);
      }
    };
    sendData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Column
      alignItems="center"
      sx={{
        height: '100%',
        ...fadeIn(),
      }}
    >
      <Paper
        elevation={4}
        sx={{
          minWidth: '320px',
          maxWidth: '320px',
          padding: 1,
          margin: 'auto',
        }}
      >
        {isConfirming && (
          <Typography p={1} textAlign="center" variant="body1">
            Checking, please wait.
          </Typography>
        )}
        {isConfirming && (
          <Box display="flex" alignContent="center" alignItems="center" justifyContent="center" m="auto" p={2}>
            <CircularProgress color="secondary" size={50} thickness={5} sx={{ margin: 'auto', opacity: 0.2 }} />
          </Box>
        )}
        <Typography p={1} textAlign="center" variant="body1">
          {responseText}
        </Typography>
        {isSuccess && (
          <Row justifyContent="center">
            <Button
              startIcon={<LoginIcon />}
              sx={{ minWidth: '110px' }}
              onClick={(): void => {
                navigate('/login', { replace: true });
              }}
            >
              Login
            </Button>
          </Row>
        )}
        {isExpired && (
          <Row justifyContent="center">
            <Button
              startIcon={<ForwardToInboxIcon />}
              sx={{ minWidth: '110px' }}
              onClick={(): void => {
                navigate('/resend-confirmation', { replace: true });
              }}
            >
              <u>Resend confirmation page</u>
            </Button>
          </Row>
        )}
      </Paper>
    </Column>
  );
};
