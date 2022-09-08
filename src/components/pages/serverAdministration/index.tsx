import { useLocation, useNavigate } from 'react-router-dom';
import { ServerClient } from '../../../api/serverClient';
import { LocationProps } from '../../../models/types';
import { useAbortSignal, useTitle } from '../../../support/hooks';
import { Button, Typography } from '../../elements';

export const ServerAdministrationPage = (): JSX.Element => {
  useTitle('Server administration');
  const signal = useAbortSignal();
  const navigate = useNavigate();
  const { state } = useLocation() as unknown as LocationProps;
  const { test } = ServerClient();

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
    </>
  );
};
