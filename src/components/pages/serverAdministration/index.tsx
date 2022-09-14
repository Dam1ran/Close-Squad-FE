import { useLocation, useNavigate } from 'react-router-dom';
import { useServerClient } from '../../../api/useServerClient';
import { LocationProps } from '../../../models/types';
import { useTitle } from '../../../support/hooks';
import { Button, Typography } from '../../elements';

export const ServerAdministrationPage = (): JSX.Element => {
  useTitle('Server administration');
  const navigate = useNavigate();
  const { state } = useLocation() as unknown as LocationProps;
  const { createAnnouncement } = useServerClient();

  return (
    <>
      <Button
        onClick={async (): Promise<void> => {
          const response = await createAnnouncement({ message: 'ei pizdec' });
          console.log(response);
        }}
      >
        <Typography>Test</Typography>
      </Button>
    </>
  );
};
