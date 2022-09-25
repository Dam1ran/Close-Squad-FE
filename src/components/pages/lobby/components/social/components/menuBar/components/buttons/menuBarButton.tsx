import { ButtonProps } from '@mui/material';
import { LoadingButton, LoadingButtonPropsAddons, Tooltip } from '../../../../../../../../elements';
import { alpha } from '@mui/system';

export const MenuBarButton: React.FC<ButtonProps & LoadingButtonPropsAddons & { title: string }> = (props) => {
  return (
    <Tooltip title={props.title}>
      <LoadingButton
        icon={props.icon}
        sx={{
          minWidth: '40px',
          width: '40px',
          height: '40px',
          padding: 0,
          backgroundColor: (theme) => alpha(theme.palette.grey[400], 0.5),
          border: (theme) => `1px solid ${theme.palette.grey[500]}`,
        }}
        loading={props.loading}
        onClick={props.onClick}
      />
    </Tooltip>
  );
};
