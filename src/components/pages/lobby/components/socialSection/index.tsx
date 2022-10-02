import { useState } from 'react';
import { ChatPlayerDto } from '../../../../../models/signalR';
import { Row } from '../../../../elements';
import { ChatContainer } from '../social/components/chatContainer';
import { LobbyNavigationPanel } from '../social/components/navigationPanel';
import { PlayerGroupsContainer } from '../social/components/playerGroupsContainer';

export const SocialSection: React.FC = () => {
  const [clickedPlayerDto, setClickedPlayerDto] = useState<ChatPlayerDto | undefined>();

  return (
    <Row flexWrap="wrap" justifyContent="center" gap={0.5} p={0.5} sx={{ width: '100%' }}>
      <ChatContainer
        player={clickedPlayerDto}
        onSelectPlayer={setClickedPlayerDto}
        onDeselectPlayer={(): void => setClickedPlayerDto(undefined)}
      />
      <PlayerGroupsContainer onSelectPlayer={setClickedPlayerDto} />
      <LobbyNavigationPanel />
    </Row>
  );
};
