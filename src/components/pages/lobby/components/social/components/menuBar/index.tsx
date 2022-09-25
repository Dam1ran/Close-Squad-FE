import { Row } from '../../../../../../elements';
import { MapButton } from './components/buttons/MapButton';

export const MenuBar: React.FC = (props) => {
  return (
    <Row
      flexWrap="wrap"
      justifyContent="center"
      gap={0.5}
      p={0.5}
      sx={{ marginTop: '300px', backgroundColor: (theme) => theme.palette.grey[300] }}
    >
      <MapButton />
    </Row>
  );
};
