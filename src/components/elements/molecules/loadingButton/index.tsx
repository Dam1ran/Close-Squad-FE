import { ButtonProps } from '@mui/material/Button';
import { CircularProgress } from '../../atoms';
import { Button } from '../button';
import _ from 'lodash';

export const LoadingButton: React.FC<ButtonProps & { loading?: boolean }> = (props) => {
  const sizeValue = props.size === 'large' ? 22 : props.size === 'small' ? 18 : 20;
  return (
    <Button
      {..._.omit(props, 'loading')}
      disabled={props.disabled}
      startIcon={
        props.loading ? (
          <CircularProgress size={sizeValue} sx={{ color: (theme) => theme.palette.text.secondary }} />
        ) : (
          props.startIcon
        )
      }
    >
      {props.children}
    </Button>
  );
};
