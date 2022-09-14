import { useState } from 'react';
import { useServerClient } from '../../../../../../../api/useServerClient';
import { useAuthServiceHelper } from '../../../../../../../support/services';
import { LoadingButton, LogoutIcon, Tooltip } from '../../../../../../elements';

export const LogoutButton = (): JSX.Element => {
  const { logout } = useServerClient();
  const { clear, nickname } = useAuthServiceHelper();
  const [isLoading, setIsLoading] = useState(false);

  const onLogout = async (): Promise<void> => {
    setIsLoading(true);
    await logout()
      .then(() => {
        clear();
      })
      .catch(() => console.warn('Cannot logout.'))
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <Tooltip title="Logout" placement="left" arrow>
      <LoadingButton
        sx={{ width: 'unset' }}
        onClick={onLogout}
        icon={<LogoutIcon />}
        loading={isLoading}
        caption={nickname}
      />
    </Tooltip>
  );
};
