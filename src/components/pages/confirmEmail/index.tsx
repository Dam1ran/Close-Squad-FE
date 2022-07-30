import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { serverClient } from '../../../api/serverClient';
import { Column, Paper } from '../../elements';

export const ConfirmEmailPage = () => {
  const [searchParams] = useSearchParams();
  const [guid, setGuid] = useState(searchParams.get('guid'));
  const [token, setToken] = useState(searchParams.get('token'));
  const [isConfirming, setIsConfirming] = useState(true);
  const [isError, setIsError] = useState(false);

  const { confirmEmail } = serverClient();

  useEffect(() => {
    let isMounted = true;
    const sendData = async (): Promise<void> => {
      if (guid && guid?.length > 0 && token && token?.length > 0 && isMounted) {
        // confirmEmail({ guid, token })
        //   .then((data) => {
        //     console.log(data);
        //     setIsConfirming(false);
        //   })
        //   .catch((data) => {
        //     console.log(data);
        //     setIsError(true);
        //   })
        //   .finally(() => {
        //     setGuid('');
        //     setToken('');
        //   });
      }
    };
    sendData();
    return (): void => {
      isMounted = false;
    };
  }, [guid, token]);

  return (
    <Column
      alignItems="center"
      justifyContent="center"
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
      <Paper
        elevation={4}
        sx={{
          minWidth: '320px',
          maxWidth: '320px',
          padding: 1,
        }}
      >
        <div style={{ backgroundColor: 'aqua' }}>{guid}</div>
        <div style={{ backgroundColor: 'green' }}>{token}</div>
      </Paper>
    </Column>
  );
};
