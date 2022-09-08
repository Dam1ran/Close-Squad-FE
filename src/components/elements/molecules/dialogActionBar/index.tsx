import { alpha } from '@mui/system';
import { Box, Row } from '../../templates';
import { LoadingButton } from '../loadingButton';

export interface DialogActionBtnData {
  capture?: string;
  icon?: JSX.Element | string;
  onClick: () => void;
  loading?: boolean;
  disabled?: boolean;
  minWidth?: string;
}

export interface DialogActionBarProps {
  btnData?: DialogActionBtnData[];
}

export const DialogActionBar: React.FC<DialogActionBarProps> = ({ btnData = [] }) => {
  return (
    <Row
      flexWrap="wrap"
      justifyContent="center"
      alignContent="center"
      alignItems="center"
      mx={2}
      pb={2}
      pt={1}
      sx={{ width: 'calc(100% - 32px)', gap: 1 }}
    >
      {btnData.map((d, index) => (
        <LoadingButton
          key={index}
          size="small"
          position="start"
          variant="outlined"
          color="secondary"
          sx={{
            borderWidth: '1px',
            padding: '4px 10px',
            color: (theme) => theme.palette.text.secondary,
            borderColor: (theme) => theme.palette.grey[300],
            boxShadow: (theme) => `inset 0px 0px 10px ${alpha(theme.palette.grey[400], 0.2)}`,
            '&:hover': { borderColor: (theme) => theme.palette.grey[400], borderWidth: '1px' },
            minWidth: d.minWidth,
          }}
          icon={d.icon}
          onClick={d.onClick}
          loading={d.loading}
          disabled={d.disabled}
        >
          <Box sx={{ marginTop: '2px' }}>{d.capture}</Box>
        </LoadingButton>
      ))}
    </Row>
  );
};
