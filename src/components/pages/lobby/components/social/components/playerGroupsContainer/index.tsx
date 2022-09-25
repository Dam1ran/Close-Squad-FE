/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useState } from 'react';
import { ChatPlayer } from '../../../../../../../models/signalR';
import { fadeIn } from '../../../../../../../styles';
import { PlayerGroups } from '../../../../../../../support/contexts/signalRContext/signalRContext.state';
import { SignalRContext } from '../../../../../../../support/contexts/signalRContext/signalRContextProvider';
import { Box, Tab, TabPanel, Tabs, a11yProps, Column, Row } from '../../../../../../elements';
import { SocialContainer } from '../socialContainer';
import { NicknameTag } from './nicknameTag';

export interface PlayerGroupsProps {
  onSelectPlayer: (player: ChatPlayer) => void;
}

const tabLabels: { [key in keyof PlayerGroups]: string } = {
  ['nearbyPlayers']: 'Nearby',
  ['partyPlayers']: 'Party',
  ['clanPlayers']: 'Clan',
  ['friendPlayers']: 'Friends',
};

export const PlayerGroupsContainer: React.FC<PlayerGroupsProps> = (props): JSX.Element => {
  const [tabIndex, setTabIndex] = useState(0);
  const { playerGroups } = useContext(SignalRContext);

  return (
    <SocialContainer sx={{ width: '320px', padding: 0, height: '276px' }}>
      <Box
        sx={{
          borderBottom: 1,
          borderColor: 'divider',
          '& .MuiTabs-root': {
            minHeight: '32px',
            height: '32px',
            '& button': {
              minHeight: '32px',
              padding: 0,
            },
          },
        }}
      >
        <Tabs
          value={tabIndex}
          onChange={(_, val): void => setTabIndex(val)}
          aria-label="Player groups"
          scrollButtons
          variant="fullWidth"
        >
          {Object.values(tabLabels).map((l, i) => (
            <Tab key={i} sx={{ minWidth: '70px' }} label={l} {...a11yProps(i)} />
          ))}
        </Tabs>
      </Box>

      {Object.values(playerGroups).map((group, index) => (
        <TabPanel key={index} value={tabIndex} index={index}>
          <Row
            justifyContent="center"
            alignItems="center"
            sx={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, overflow: 'hidden' }}
          >
            <Box sx={{ fontSize: '120px', opacity: 0.2, filter: 'none', WebkitFilter: 'grayscale(60%)' }}>📜</Box>
          </Row>
          <Column sx={{ height: '242px', overflowY: 'auto', position: 'relative', ...fadeIn(0.3) }}>
            {group.map((p: ChatPlayer) => (
              <NicknameTag key={p.id} player={p} onSelectPlayer={props.onSelectPlayer} />
            ))}
          </Column>
        </TabPanel>
      ))}
    </SocialContainer>
  );
};
