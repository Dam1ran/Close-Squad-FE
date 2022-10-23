import { useState } from 'react';
import { Row } from '../../../../elements';
import { ButtonColumn } from './components/buttonColumn';
import { CharacterTabs } from './components/characterTabs';

export const CharacterContainer: React.FC = () => {
  const [buttonColumns, setButtonColumns] = useState(1);
  const addButtonColumn = (): void => {
    setButtonColumns((prev) => {
      if (prev === 4) {
        return 1;
      }
      return ++prev;
    });
  };
  return (
    <Row
      sx={{
        border: (theme) => `1px solid ${theme.palette.grey[500]}`,
        height: '500px',
        minWidth: '500px',
        maxWidth: '500px',
        borderRadius: 1,
        marginRight: 'auto',
      }}
    >
      {Array.from(Array(buttonColumns).keys()).map((k) => (
        <ButtonColumn key={k} addButtonColumn={addButtonColumn} index={k} />
      ))}
      <CharacterTabs buttonColumns={buttonColumns} />
    </Row>
  );
};
