import { useLocation, useNavigate } from 'react-router-dom';
import { ServerClient } from '../../../api/serverClient';
import { LocationProps } from '../../../models/types';
import { useAbortSignal, useTitle } from '../../../support/hooks';
import { Button, Typography } from '../../elements';

export const LobbyPage = (): JSX.Element => {
  useTitle('Lobby');
  const signal = useAbortSignal();
  const navigate = useNavigate();
  const { state } = useLocation() as unknown as LocationProps;
  const { test, refreshToken, test2 } = ServerClient();

  return (
    <>
      <Button
        onClick={async (): Promise<void> => {
          const test1 = await test(signal);
          console.log(test1);
        }}
      >
        <Typography>Test</Typography>
      </Button>
      <Button
        onClick={async (): Promise<void> => {
          const token = await refreshToken(signal);
          console.log(token);
        }}
      >
        <Typography>Refresh token</Typography>
      </Button>

      <Button onClick={(): void => navigate('/login')}>
        <Typography>Login</Typography>
      </Button>
      <Button
        onClick={async (): Promise<void> => {
          const test1 = await test(signal);
          console.log(test1);
        }}
      >
        <Typography>Test</Typography>
      </Button>
      <Button
        onClick={async (): Promise<void> => {
          const test4 = await test2(signal);
          console.log(test4);
        }}
      >
        <Typography>Test</Typography>
      </Button>
      <Button
        onClick={(): void => {
          navigate('/administration');
        }}
      >
        <Typography>Test</Typography>
      </Button>
    </>
  );
};
