import { CheckIcon, CloseIcon, Column, DialogActionBar, Typography } from '../../..';

export const QuestionDialogComponent: React.FC<{ onClose: () => void; onAccept: () => void; question: string }> = ({
  onAccept,
  onClose,
  question,
}) => {
  return (
    <Column p={1} alignItems="center" sx={{ overflowY: 'auto', maxHeight: '320px', maxWidth: '320px', width: '320px' }}>
      <Typography p={1} sx={{ textShadow: (theme) => `0 0 3px ${theme.palette.grey[500]}`, textAlign: 'center' }}>
        {question}
      </Typography>
      <DialogActionBar
        btnData={[
          {
            capture: 'Accept',
            icon: <CheckIcon />,
            width: '110px',
            onClick: onAccept,
          },
          {
            capture: 'Close',
            icon: <CloseIcon />,
            width: '110px',
            onClick: onClose,
          },
        ]}
      />
    </Column>
  );
};
