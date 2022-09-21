import { useState } from 'react';
import { useSignalR } from '../../../api/signalR/useSignalR';
import { Player } from '../../../models/signalR';
import { fadeIn } from '../../../styles';
import { useTitle } from '../../../support/hooks';
import { Column, Row } from '../../elements';
import { ChatContainer } from './components/social/components/chatContainer';
import { LobbyNavigationPanel } from './components/social/components/navigationPanel';
import { PlayerGroupsContainer } from './components/social/components/playerGroupsContainer';

export const LobbyPage = (): JSX.Element => {
  useTitle('Lobby');
  useSignalR();
  const [statePlayer, setStatePlayer] = useState<Player | undefined>();

  const onSelectPlayer = (player: Player): void => {
    setStatePlayer(player);
  };

  const onDeselectPlayer = (): void => {
    setStatePlayer(undefined);
  };

  return (
    <Column sx={{ height: '100%', ...fadeIn() }}>
      ads adasd asda dasda sdasd asd
      <Row flexWrap="wrap" justifyContent="center" gap={0.5} p={0.5}>
        <PlayerGroupsContainer onSelectPlayer={onSelectPlayer} />
        <ChatContainer player={statePlayer} onSelectPlayer={onSelectPlayer} onDeselectPlayer={onDeselectPlayer} />
        <LobbyNavigationPanel />
      </Row>
    </Column>
  );
};
