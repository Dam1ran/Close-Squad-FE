import { useState } from 'react';
import { useSignalR } from '../../../api/signalR/useSignalR';
import { ChatPlayer } from '../../../models/signalR';
import { fadeIn } from '../../../styles';
import { useTitle } from '../../../support/hooks';
import { Box, Row } from '../../elements';
import { ChatContainer } from './components/social/components/chatContainer';
import { MenuBar } from './components/social/components/menuBar';
import { LobbyNavigationPanel } from './components/social/components/navigationPanel';
import { PlayerGroupsContainer } from './components/social/components/playerGroupsContainer';

export const LobbyPage = (): JSX.Element => {
  useTitle('Lobby');
  useSignalR();
  const [statePlayer, setStatePlayer] = useState<ChatPlayer | undefined>();

  return (
    <Box sx={{ height: '100%', ...fadeIn() }}>
      {/* <Box sx={{ height: '480px', width: '480px', backgroundColor: 'gray' }}></Box> */}
      <MenuBar />
      <Row flexWrap="wrap" justifyContent="center" gap={0.5} p={0.5}>
        <PlayerGroupsContainer onSelectPlayer={setStatePlayer} />
        <ChatContainer
          player={statePlayer}
          onSelectPlayer={setStatePlayer}
          onDeselectPlayer={(): void => setStatePlayer(undefined)}
        />
        <LobbyNavigationPanel />
      </Row>
    </Box>
  );
};
