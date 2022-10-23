import { alpha } from '@mui/system';
import pickUpActionImage from '../../../../../../../assets/images/actions/hand.png';
import attackActionImage from '../../../../../../../assets/images/actions/sword.png';
import sitActionImage from '../../../../../../../assets/images/actions/sit.png';
import followActionImage from '../../../../../../../assets/images/actions/follow.png';
import { CharacterAction } from '../../../../../../../models/enums';
import { Img, Tooltip } from '../../../../../../elements';
export const PickUpActionIcon: React.FC = () => {
  return (
    <Tooltip title="Pick up" placement="top" arrow enterDelay={600}>
      <Img
        sx={{
          userSelect: 'none',
          height: '34px',
          width: '34px',
          backgroundColor: (theme) => alpha(theme.palette.secondary.light, 0.4),
          '&:active': {
            pointerEvents: 'none',
          },
        }}
        alt={'PickUpActionImage'}
        src={pickUpActionImage}
      />
    </Tooltip>
  );
};
export const AttackActionIcon: React.FC = () => {
  return (
    <Tooltip title="Attack target" placement="top" arrow enterDelay={600}>
      <Img
        sx={{
          userSelect: 'none',
          height: '34px',
          width: '34px',
          backgroundColor: (theme) => alpha(theme.palette.secondary.light, 0.3),
          '&:active': {
            pointerEvents: 'none',
          },
        }}
        alt={'AttackActionImage'}
        src={attackActionImage}
      />
    </Tooltip>
  );
};

export const SitActionIcon: React.FC = () => {
  return (
    <Tooltip title="Sit" placement="top" arrow enterDelay={600}>
      <Img
        sx={{
          userSelect: 'none',
          height: '34px',
          width: '34px',
          backgroundColor: (theme) => alpha(theme.palette.secondary.light, 0.3),
          '&:active': {
            pointerEvents: 'none',
          },
        }}
        alt={'SitActionImage'}
        src={sitActionImage}
      />
    </Tooltip>
  );
};

export const FollowActionIcon: React.FC = () => {
  return (
    <Tooltip title="Follow target" placement="top" arrow enterDelay={600}>
      <Img
        sx={{
          userSelect: 'none',
          height: '34px',
          width: '34px',
          backgroundColor: (theme) => alpha(theme.palette.secondary.light, 0.3),
          '&:active': {
            pointerEvents: 'none',
          },
        }}
        alt={'FollowActionImage'}
        src={followActionImage}
      />
    </Tooltip>
  );
};

export const CharacterActionIconMap: { [key in CharacterAction]: JSX.Element } = {
  [CharacterAction.PickUp]: <PickUpActionIcon />,
  [CharacterAction.Attack]: <AttackActionIcon />,
  [CharacterAction.Sit]: <SitActionIcon />,
  [CharacterAction.Follow]: <FollowActionIcon />,
};
