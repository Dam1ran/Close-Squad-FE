import { Box } from '../../templates';
import { DragHandleIcon } from '../icons';

export const DragArea: React.FC = () => {
  return (
    <Box display="flex" justifyContent="center">
      <DragHandleIcon />
    </Box>
  );
};
