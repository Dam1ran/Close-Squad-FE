import { useNavigate } from 'react-router-dom';
import { useAuthServiceHelper } from '../../../../../support/services';
import { Column, LoadingButton, LoginIcon, Paper, RateReviewIcon, ShareLocationIcon } from '../../../../elements';
import { LogoutButton } from './components/logoutButton';

export const NavigationPanel = (): JSX.Element => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuthServiceHelper();

  return (
    <Paper elevation={2} sx={{ padding: (theme) => theme.spacing(2), width: '320px', height: '188px' }}>
      <Column sx={{ '& Button': { margin: (theme) => theme.spacing(1) } }}>
        <LoadingButton
          icon={<LoginIcon />}
          caption="Enter"
          sx={{ width: 'unset' }}
          onClick={(): void => navigate('/lobby')}
        />

        {isLoggedIn ? (
          <LogoutButton />
        ) : (
          <LoadingButton
            icon={<RateReviewIcon />}
            caption="Register"
            sx={{ width: 'unset' }}
            onClick={(): void => navigate('/register')}
          />
        )}
        <LoadingButton icon={<ShareLocationIcon />} caption="Guides" sx={{ width: 'unset' }} />
      </Column>
    </Paper>
  );
};
