import { Box } from '../../../templates';

export const MapComponent: React.FC = (props) => {
  // handle overflow
  return (
    <Box
      sx={{
        width: '640px',
        height: '640px',
        backgroundColor: 'gray',
        borderBottomLeftRadius: '4px',
        borderBottomRightRadius: '4px',
      }}
    >
      world map
    </Box>
  );
};
