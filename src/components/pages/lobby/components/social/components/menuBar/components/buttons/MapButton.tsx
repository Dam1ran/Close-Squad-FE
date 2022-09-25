import { MapIcon } from '../../../../../../../../elements';
import { worldMapDialogOverlay } from '../../../../../../../../elements/organisms/overlay';
import { MenuBarButton } from './menuBarButton';

export const MapButton: React.FC = () => {
  return (
    <MenuBarButton
      icon={
        <MapIcon
          sx={{
            fontSize: '40px',
            color: '#b1815f',
            marginLeft: '-6px',
            marginTop: '-8px',
          }}
        />
      }
      onClick={(): void => {
        worldMapDialogOverlay();
      }}
      title="Map"
    />
  );
};
