import { useNavigate } from 'react-router-dom';
import { Column, HomeIcon, LoadingButton } from '../../../../../../elements';
import { SocialContainer } from '../socialContainer';

export const LobbyNavigationPanel: React.FC = (): JSX.Element => {
  const navigate = useNavigate();

  return (
    <SocialContainer sx={{ flex: 1, maxWidth: '320px' }}>
      <Column sx={{ '& Button': { margin: (theme) => theme.spacing(1) } }}>
        <LoadingButton
          icon={<HomeIcon />}
          caption={<u>Home page</u>}
          sx={{ width: 'unset' }}
          onClick={(): void => navigate('/home')}
        />
      </Column>
    </SocialContainer>
  );
};
