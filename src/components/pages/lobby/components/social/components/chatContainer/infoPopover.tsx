import { HubConnectionState } from '@microsoft/signalr';
import { useContext, useState } from 'react';
import { SignalRContext } from '../../../../../../../support/contexts/signalRContext/signalRContextProvider';
import { Box, Popover, Tooltip, Typography } from '../../../../../../elements';

export const InfoPopover: React.FC = () => {
  const { connection, setRetryConnection } = useContext(SignalRContext);
  const connected = connection?.state === HubConnectionState.Connected;
  const [retryFlag, setRetryFlag] = useState(false);
  const [titleText, setTitleText] = useState('Disconnected, click to retry connection.');
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = (): void => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const onClick = (): void => {
    if (!connected && !retryFlag) {
      setRetryConnection();
      setRetryFlag(true);
      setTitleText('Trying to reconnect...');
      setTimeout(() => {
        setRetryFlag(false);
        setTitleText('Disconnected, click to retry connection.');
      }, 10000);
    }
  };

  return (
    <>
      <Tooltip arrow placement="top" title={connected ? '' : titleText}>
        <Box
          sx={{
            position: 'absolute',
            backgroundColor: connected ? '#81d985' : retryFlag ? '#ffdf00' : '#DDDDDD',
            border: (theme) => `1px solid ${theme.palette.grey[300]}`,
            height: '14px',
            width: '14px',
            borderRadius: '50%',
            left: '4px',
            top: '50%',
            transform: 'translateY(-50%)',
            lineHeight: '14px',
            fontSize: '12px',
            textAlign: 'center',
            fontFamily: '"sans-serif"',
            cursor: connected ? 'default' : 'pointer',
            userSelect: 'none',
          }}
          onMouseEnter={handlePopoverOpen}
          onMouseLeave={handlePopoverClose}
          onClick={onClick}
        >
          i
        </Box>
      </Tooltip>
      {connected && (
        <Popover
          id="mouse-over-popover"
          sx={{
            pointerEvents: 'none',
          }}
          open={open}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          onClose={handlePopoverClose}
        >
          <Box
            sx={{
              padding: 1.5,
              borderRadius: 1,
              textShadow: (theme) => `0 0 10px ${theme.palette.grey[900]}`,
              backgroundColor: (theme) => theme.palette.grey[600],
              border: (theme) => `1px solid ${theme.palette.grey[800]}`,
              color: (theme) => theme.palette.grey[50],
            }}
          >
            <Typography variant="subtitle2">Up Arrow ⬆ to cycle Up through used Nicknames.</Typography>
            <Typography variant="subtitle2">Down Arrow ⬇ to cycle Down through used Nicknames.</Typography>
          </Box>
        </Popover>
      )}
    </>
  );
};
