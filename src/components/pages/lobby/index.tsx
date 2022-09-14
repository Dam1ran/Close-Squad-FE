import { useLocation, useNavigate } from 'react-router-dom';
import { useServerClient } from '../../../api/useServerClient';
import { LocationProps } from '../../../models/types';
import { useTitle } from '../../../support/hooks';
import { Button, Typography } from '../../elements';

export const LobbyPage = (): JSX.Element => {
  useTitle('Lobby');
  const navigate = useNavigate();
  const { state } = useLocation() as unknown as LocationProps;
  const { test1, test2, test3, test4, test5 } = useServerClient();

  return (
    <>
      <Button
        onClick={async (): Promise<void> => {
          const response = await test1();
          console.log(response);
        }}
      >
        <Typography>Test1</Typography>
      </Button>
      <Button
        onClick={async (): Promise<void> => {
          const response = await test2();
          console.log(response);
        }}
      >
        <Typography>Test2</Typography>
      </Button>
      <Button
        onClick={async (): Promise<void> => {
          const response = await test3();
          console.log(response);
        }}
      >
        <Typography>Test3</Typography>
      </Button>
      <Button
        onClick={async (): Promise<void> => {
          const response = await test4();
          console.log(response);
        }}
      >
        <Typography>Test4</Typography>
      </Button>
      <Button
        onClick={async (): Promise<void> => {
          const response = await test5();
          console.log(response);
        }}
      >
        <Typography>Test5</Typography>
      </Button>
      <Button
        onClick={(): void => {
          navigate('/administration');
        }}
      >
        <Typography>Administration</Typography>
      </Button>
    </>
  );
};
