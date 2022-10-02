import { Row } from '../../../../elements';
import { CharacterContainer } from '../characterContainer';
import { Quadrants } from '../quadrants';
import { Viewport } from '../viewport';

export const GameSection: React.FC = () => {
  return (
    <Row
      sx={{
        width: 'calc(100% - 8px)',
        margin: 'auto',
        height: 'fit-content',
        alignItems: 'center',
        overflowX: 'auto',
        gap: 1,
      }}
    >
      <Quadrants />
      <Viewport />
      <CharacterContainer />
    </Row>
  );
};
