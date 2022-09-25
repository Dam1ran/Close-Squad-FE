import { alpha } from '@mui/system';
import { ChatPlayer } from '../../../../../../../models/signalR';
import { Box, Row, Tooltip, Typography } from '../../../../../../elements';

export const NicknameTag: React.FC<{
  small?: boolean;
  player: ChatPlayer;
  onSelectPlayer?: (player: ChatPlayer) => void;
}> = ({ small = false, ...props }) => {
  const isSystem = props.player?.nickname === '*System*';
  return (
    <Row
      sx={{
        cursor: isSystem ? 'default' : 'pointer',
        userSelect: isSystem ? 'none' : 'unset',
        padding: small ? '0px 4px' : '2px 4px',
        justifyContent: 'center',
        alignItems: 'center',
        border: (theme) => (small ? 'none ' : `1px solid ${theme.palette.grey[200]}`),
        borderRadius: small ? '8px' : 1,
        boxShadow: (theme) => (isSystem ? 'none' : small ? `inset 0 0 10px ${theme.palette.grey[200]}` : 'unset'),
        transition: 'text-shadow 0.3s, background-color 0.3s',
        textShadow: (theme) => (isSystem ? 'none' : small ? `0 0 5px ${theme.palette.grey[400]}` : 'unset'),
        '&:hover': {
          backgroundColor: (theme) =>
            small ? (isSystem ? 'unset' : theme.palette.grey[500]) : alpha(theme.palette.grey[400], 0.5),
          textShadow: (theme) => (isSystem ? 'none' : `0 0 5px ${theme.palette.common.white}`),
        },
      }}
      onClick={(): void => {
        if (/^[A-Za-z0-9]+([_](?!$))?[A-Za-z0-9]*$/.test(props.player?.nickname)) {
          props.onSelectPlayer?.(props.player);
        }
      }}
    >
      <Tooltip arrow title={props.player?.clanName || ''}>
        <Box
          sx={{
            marginRight: 0.5,
            fontSize: small ? '12px' : '16px',
            textShadow: (theme) => `0 0 5px ${theme.palette.grey[600]}`,
          }}
        >
          {props.player.clanIcon}
        </Box>
      </Tooltip>
      <Typography
        fontWeight="500"
        sx={{
          maxWidth: '266px',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          fontFamily: isSystem ? '"Roboto Mono", "monospace"' : 'sans-serif',
          fontSize: small ? '12px' : '16px',
          color: (theme) => (isSystem ? theme.palette.action.active : theme.palette.common.black),
        }}
      >
        {props.player.nickname}
        {small ? ':' : ''}
      </Typography>
    </Row>
  );
};
