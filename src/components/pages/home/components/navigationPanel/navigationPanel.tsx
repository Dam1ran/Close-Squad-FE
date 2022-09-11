import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthServiceHelper } from '../../../../../support/services';
import {
  Button,
  Column,
  LoadingButton,
  LoginIcon,
  LogoutIcon,
  Paper,
  RateReviewIcon,
  ShareLocationIcon,
  Tooltip,
  Typography,
} from '../../../../elements';

export const NavigationPanel = (): JSX.Element => {
  const navigate = useNavigate();
  const { isLoggedIn, clearAndLogout, nickname } = useAuthServiceHelper();
  const [loggingOut, setLoggingOut] = useState(false);
  const logout = async (): Promise<void> => {
    setLoggingOut(true);
    await clearAndLogout().finally(() => setLoggingOut(false));
  };

  return (
    <Paper elevation={2} sx={{ padding: (theme) => theme.spacing(2), width: '320px', height: '188px' }}>
      <Column sx={{ '& Button': { margin: (theme) => theme.spacing(1) } }}>
        <Button
          sx={{ border: (theme) => `1px solid ${theme.palette.grey[200]}` }}
          endIcon={<LoginIcon />}
          onClick={(): void => navigate('/lobby')}
        >
          <Typography marginRight="auto">Enter</Typography>
        </Button>
        {isLoggedIn && (
          <Tooltip title="Logout" placement="right" arrow>
            <LoadingButton
              sx={{ border: (theme) => `1px solid ${theme.palette.grey[200]}` }}
              position="end"
              loading={loggingOut}
              icon={<LogoutIcon />}
              onClick={logout}
            >
              <Typography marginRight="auto">{nickname}</Typography>
            </LoadingButton>
          </Tooltip>
        )}
        {!isLoggedIn && (
          <Button
            sx={{ border: (theme) => `1px solid ${theme.palette.grey[200]}` }}
            endIcon={<RateReviewIcon />}
            onClick={(): void => navigate('/register')}
          >
            <Typography marginRight="auto">Register</Typography>
          </Button>
        )}
        <Button endIcon={<ShareLocationIcon />} sx={{ border: (theme) => `1px solid ${theme.palette.grey[200]}` }}>
          <Typography marginRight="auto">Guides</Typography>
        </Button>
      </Column>
    </Paper>
  );
};
