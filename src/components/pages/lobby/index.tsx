import { fadeIn } from '../../../styles';
import { useTitle } from '../../../support/hooks';
import { Box, Column } from '../../elements';
import { ControlBar } from './components/controlBar';
import { SocialSection } from './components/socialSection';
import { GameSection } from './components/gameSection';
import { useSignalR } from '../../../api/signalR/useSignalR';
import { useLoadGameSettings } from './components/useLoadGameSettings';
// import { useTicker } from './components/useTicker';

export const LobbyPage = (): JSX.Element => {
  useTitle('Lobby');
  useSignalR();
  useLoadGameSettings();
  // useTicker();

  return (
    <Column
      sx={{ minHeight: '100%', height: 'fit-content', ...fadeIn(), backgroundColor: (theme) => theme.palette.grey[300] }}
    >
      <ControlBar />
      <Box sx={{ flex: 1 }}></Box>
      <GameSection />
      <Box sx={{ flex: 1 }}></Box>
      <SocialSection />
    </Column>
  );
};
