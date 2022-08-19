import { HomeIcon } from '../../../atoms';
import { DialogActionBar } from '../../../molecules';
import { Box } from '../../../templates';

export const GoHome: React.FC<{ onClick: () => void }> = (props) => {
  return (
    <Box pt={1} textAlign={'center'}>
      <DialogActionBar
        btnData={[
          {
            capture: 'OK',
            icon: <HomeIcon />,
            minWidth: '110px',
            onClick: props.onClick,
          },
        ]}
      />
    </Box>
  );
};
