import { Column } from '../../../../elements';

export const CharacterContainer: React.FC = () => {
  return (
    <Column
      sx={{
        border: '1px solid black',
        height: '500px',
        minWidth: '500px',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 1,
        marginRight: 'auto',
      }}
    >
      info container
    </Column>
  );
};