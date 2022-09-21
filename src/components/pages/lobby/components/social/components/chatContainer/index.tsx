/* eslint-disable @typescript-eslint/no-explicit-any */

import { alpha } from '@mui/system';
import { useState, useContext, useRef, useEffect } from 'react';
import { ChatMessage, ChatMessageType, ChatMessageTypeColorMap, Player } from '../../../../../../../models/signalR';
import { fadeIn } from '../../../../../../../styles';
import { SignalRContext } from '../../../../../../../support/contexts/signalRContext/signalRContextProvider';
import { Box, Tab, Tabs, a11yProps, TabPanel, Row, Column, Typography } from '../../../../../../elements';
import { NicknameTag } from '../playerGroupsContainer/nicknameTag';
import { SocialContainer } from '../socialContainer';
import { ChatInputWrapper } from './chatInputWrapper';

export interface ChatContainerProps {
  player?: Player;
  onSelectPlayer: (player: Player) => void;
  onDeselectPlayer: () => void;
}

const tabData: { [key in ChatMessageType]: { label: string; icon: string; backgroundColor: string } } = {
  [ChatMessageType.General]: { label: 'General', icon: '💬', backgroundColor: '#EEEEEE' },
  [ChatMessageType.Nearby]: { label: 'Nearby', icon: '⚪', backgroundColor: '#BBBBBB' },
  [ChatMessageType.Whisper]: { label: 'Whisper', icon: '👥', backgroundColor: '#9c27b0' },
  [ChatMessageType.Party]: { label: 'Party', icon: '💠', backgroundColor: '#2e7d32' },
  [ChatMessageType.Clan]: { label: 'Clan', icon: '🔘', backgroundColor: '#1565c0' },
  [ChatMessageType.Shout]: { label: 'Shout', icon: '📣', backgroundColor: '#e65100' },
};

export const ChatContainer: React.FC<ChatContainerProps> = (props): JSX.Element => {
  const [tabIndex, setTabIndex] = useState(0);
  const { chatMessages, currentPlayer } = useContext(SignalRContext);

  const chatColumnRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (chatColumnRef?.current) {
      const { scrollHeight, clientHeight } = chatColumnRef.current;
      chatColumnRef.current.scrollTo({
        left: 0,
        top: scrollHeight - clientHeight,
        behavior: 'smooth',
      });
    }
  }, [chatMessages, tabIndex]);

  return (
    <SocialContainer sx={{ flex: 2, padding: 0 }}>
      <Box
        sx={{
          '& .MuiTabs-root': {
            minHeight: '32px',
            height: '32px',
            '& .MuiTabScrollButton-root': { borderBottom: (theme) => `1px solid ${theme.palette.grey[600]}` },
            '& .MuiTabScrollButton-horizontal': {
              borderBottom: (theme) => `1px solid ${theme.palette.grey[600]}`,
              opacity: 1,
            },
            '& .Mui-disabled': {
              '& svg': {
                opacity: 0.2,
              },
            },
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
          aria-label="Chat types"
          scrollButtons="auto"
          allowScrollButtonsMobile
          variant="scrollable"
          TabIndicatorProps={{
            sx: {
              display: 'none',
            },
          }}
          sx={{
            '.MuiTab-root': {
              border: '1px solid transparent',
              borderBottom: (theme) => `1px solid ${theme.palette.grey[600]}`,
            },
            '.Mui-selected': {
              borderTopLeftRadius: '8px',
              borderTopRightRadius: '8px',
              border: (theme) => `1px solid ${theme.palette.grey[600]}`,
              borderBottom: '1px solid transparent',
            },
          }}
        >
          {Object.values(tabData).map((t, i) => (
            <Tab
              key={i}
              sx={{
                flex: 1,
                backgroundColor: alpha(t.backgroundColor, 0.15),
                borderTopLeftRadius: 4,
                borderTopRightRadius: 4,
              }}
              label={t.label}
              iconPosition="start"
              icon={<Box>{t.icon}</Box>}
              {...a11yProps(i)}
            />
          ))}
        </Tabs>
      </Box>
      {Object.values(chatMessages).map((group, index) => (
        <TabPanel key={index} value={tabIndex} index={index}>
          <Row
            justifyContent="center"
            alignItems="center"
            sx={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, overflow: 'hidden', userSelect: 'none' }}
          >
            {tabIndex === 4 && currentPlayer?.clanIcon ? (
              <Box sx={{ fontSize: '120px', opacity: 1, filter: 'none', WebkitFilter: 'grayscale(0%)' }}>
                {currentPlayer?.clanIcon}
              </Box>
            ) : (
              <Box sx={{ fontSize: '120px', opacity: 0.4, filter: 'none', WebkitFilter: 'grayscale(60%)' }}>💬</Box>
            )}
          </Row>
          <Column sx={{ height: '182px', overflowY: 'auto', position: 'relative', ...fadeIn(0.3) }} ref={chatColumnRef}>
            {group.messages.map((gm: ChatMessage, i: number) => (
              <Row
                flexWrap="wrap"
                key={i}
                sx={{
                  minWidth: '310px',
                  border: (theme) => `1px solid ${theme.palette.background.paper}`,
                  paddingLeft: 0.25,
                  backgroundColor: (theme) => alpha(theme.palette.grey[300], 0.8),
                }}
                alignItems="center"
              >
                <NicknameTag player={gm.player} onSelectPlayer={props.onSelectPlayer} small />
                <Box sx={{ marginLeft: 1 }}>
                  <Typography
                    variant="subtitle2"
                    sx={{
                      fontWeight: 500,
                      fontSize: '14px',
                      letterSpacing: '0px',
                      color: ChatMessageTypeColorMap[gm.type],
                      fontFamily: gm.player?.nickname !== '*System*' ? '"Roboto Mono", "monospace"' : 'Roboto',
                    }}
                  >
                    {gm.text}
                  </Typography>
                </Box>
              </Row>
            ))}
          </Column>
        </TabPanel>
      ))}
      <ChatInputWrapper
        tabIndex={tabIndex}
        player={props.player}
        onDeselectPlayer={props.onDeselectPlayer}
        backgroundColor={Object.values(tabData)[tabIndex].backgroundColor}
      />
    </SocialContainer>
  );
};
