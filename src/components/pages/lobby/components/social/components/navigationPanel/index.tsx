import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../../../../../../support/contexts/appContext/appContextProvider';
import { Column, HomeIcon, LoadingButton, SettingsIcon } from '../../../../../../elements';
import { SocialContainer } from '../socialContainer';

export const LobbyNavigationPanel: React.FC = (): JSX.Element => {
  const {
    setLobbySettings,
    lobbySettings: { soundEnabled },
  } = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <SocialContainer sx={{ maxWidth: '320px', flexGrow: 2 }}>
      <Column sx={{ '& Button': { margin: (theme) => theme.spacing(1) } }}>
        <LoadingButton
          icon={<HomeIcon />}
          caption={<u>Home page</u>}
          sx={{ width: 'unset' }}
          onClick={(): void => navigate('/home')}
        />
        <LoadingButton
          icon={<SettingsIcon />}
          caption="Settings"
          sx={{ width: 'unset' }}
          onClick={(): void => {
            console.log('not done');
            // need dialog with settings
            setLobbySettings({ soundEnabled: !soundEnabled });
          }}
        />
      </Column>
    </SocialContainer>
  );
};
