import { CheckIcon, Column, DialogActionBar, Typography } from '../../..';
import { ServerDialog } from '../../../../../models/signalR/serverDialog';

export const ServerDialogComponent: React.FC<{ onClose: () => void; data: ServerDialog }> = ({ onClose, data }) => {
  return (
    <Column p={1} alignItems="center" sx={{ overflowY: 'auto', maxHeight: '320px', maxWidth: '320px', width: '320px' }}>
      <Typography>{data.message}</Typography>
      <DialogActionBar
        btnData={[
          {
            capture: 'OK',
            icon: <CheckIcon />,
            width: '110px',
            onClick: onClose,
          },
        ]}
      />
    </Column>
  );
};
