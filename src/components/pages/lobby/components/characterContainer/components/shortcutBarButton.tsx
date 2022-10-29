import { alpha } from '@mui/system';
import { useContext, useState } from 'react';
import { useConnection } from '../../../../../../api/signalR/useConnection';
import { AiAction, BarShortcutType, CharacterAction, CsEntityStatus } from '../../../../../../models/enums';
import { CharacterContext } from '../../../../../../support/contexts/characterContext/characterContextProvider';
import { useCharacterShortcuts } from '../../../../../../support/hooks';
import { useCharacterService } from '../../../../../../support/services/useCharacterService';
import { BlurOnIcon, Box, Menu } from '../../../../../elements';
import { BarMenuContent } from './barMenuContent';
import { CharacterActionIconMap } from './buttonMaps/actionButtonMap';

export const ShortcutBarButton: React.FC<{ order: number }> = ({ order }) => {
  const { getActiveCharacterBarShortcuts } = useCharacterShortcuts();
  const { updateCharacter } = useContext(CharacterContext);
  const respectiveShortcut = getActiveCharacterBarShortcuts().find((bs) => bs.orderNumber === order);
  const activeCharacter = useCharacterService().getActiveCharacter();
  const { actionCall } = useConnection();

  const onShortcutClick = (): void => {
    if (!respectiveShortcut || !activeCharacter) {
      return;
    }

    switch (respectiveShortcut.type) {
      case BarShortcutType.Action: {
        if (
          respectiveShortcut.usingId === CharacterAction.Sit ||
          respectiveShortcut.usingId === CharacterAction.Attack ||
          respectiveShortcut.usingId === CharacterAction.Follow
        ) {
          updateCharacter({ id: activeCharacter.id, xDestination: undefined, yDestination: undefined });
        }
        actionCall({ characterId: activeCharacter.id, action: respectiveShortcut.usingId });
      }
      case BarShortcutType.Skill: {
        break;
      }
      case BarShortcutType.Item: {
        break;
      }
      default:
        throw new Error(`BarShortcutType action: ${respectiveShortcut.type} not handled in switch.`);
    }
  };

  const getIconForShortcut = (): React.ReactNode => {
    if (!respectiveShortcut) {
      return null;
    }

    switch (respectiveShortcut.type) {
      case BarShortcutType.Action: {
        return CharacterActionIconMap[respectiveShortcut.usingId as CharacterAction];
      }
      case BarShortcutType.Skill: {
        break;
      }
      case BarShortcutType.Item: {
        break;
      }
      default:
        return null;
    }
  };

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  return (
    <Box
      sx={{
        overflow: 'hidden',
        height: '36px',
        width: '36px',
        borderRadius: 1,
        transition: 'border 0.1s',
        border: (theme) =>
          respectiveShortcut?.isActive
            ? `1px solid ${theme.palette.secondary.dark}`
            : `1px solid ${theme.palette.grey[400]}`,
        position: 'relative',
        boxShadow: (theme) =>
          (respectiveShortcut?.type === BarShortcutType.Action &&
            respectiveShortcut?.usingId === CharacterAction.Sit &&
            activeCharacter?.characterStatus === CsEntityStatus.Sitting) ||
          (respectiveShortcut?.usingId === CharacterAction.Follow && activeCharacter?.aiAction === AiAction.Following)
            ? `inset 0 0 3px 2px ${theme.palette.secondary.main}`
            : 'unset',
        cursor: respectiveShortcut ? 'pointer' : 'unset',
        '&:active': {
          border: (theme) =>
            respectiveShortcut ? `1px solid ${theme.palette.grey[900]}` : `1px solid ${theme.palette.grey[400]}`,
        },
        userSelect: 'none',
      }}
      onContextMenu={(e): void => {
        e.stopPropagation();
        e.preventDefault();
        if (respectiveShortcut) {
          setAnchorEl(e.currentTarget);
        }
      }}
    >
      <Box
        sx={{
          fontSize: '10px',
          position: 'absolute',
          fontWeight: 600,
          lineHeight: '12px',
          textAlign: 'center',
          borderRadius: 0.5,
          padding: '1px 2px',
          right: 0,
          bottom: 0,
          backgroundColor: (theme) => alpha(theme.palette.common.white, 0.4),
          zIndex: 2,
          userSelect: 'none',
          pointerEvents: 'none',
        }}
      >
        {order + 1}
      </Box>
      {respectiveShortcut ? (
        <Box onClick={onShortcutClick}>{getIconForShortcut()}</Box>
      ) : (
        <BlurOnIcon sx={{ zIndex: 1, opacity: 0.4, fontSize: '36px', marginTop: '-1px', marginLeft: '-1px' }} />
      )}
      <Menu open={!!anchorEl} onClose={(): void => setAnchorEl(null)} anchorEl={anchorEl}>
        <BarMenuContent shortcutIndex={order} onClose={(): void => setAnchorEl(null)} />
      </Menu>
    </Box>
  );
};
