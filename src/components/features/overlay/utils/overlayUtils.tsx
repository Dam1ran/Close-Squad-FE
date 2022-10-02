import { SxProps, alpha } from '@mui/system';
import theme from '../../../../styles/theme/theme';
import {
  BubbleChartIcon,
  CachedIcon,
  CheckCircleOutlineIcon,
  CrisisAlertIcon,
  HelpOutlineIcon,
  LightIcon,
  SettingsEthernetIcon,
  WarningAmberIcon,
} from '../../../elements';
import { DialogType } from './../store/overlayStore';

export interface OverlayIconProps {
  dialogType?: DialogType;
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const overlayUtils = () => {
  const getIconDescriptionAndColor = (
    iconDescription?: string,
    dialogType?: DialogType,
  ): { description: string; backgroundColor: string } => {
    const result = {
      description: iconDescription || `${DialogType[dialogType ?? DialogType.Other]} dialogs`,
      backgroundColor: '#FFFFFF',
    };
    // eslint-disable-next-line react-hooks/rules-of-hooks
    switch (dialogType) {
      case DialogType.Loading: {
        result.backgroundColor = theme.palette.grey[400];
        break;
      }
      case DialogType.Info: {
        result.backgroundColor = theme.palette.info.light;
        break;
      }
      case DialogType.Question: {
        result.backgroundColor = theme.palette.info.main;
        break;
      }
      case DialogType.Success: {
        result.backgroundColor = theme.palette.success.main;
        break;
      }
      case DialogType.Fail: {
        result.backgroundColor = theme.palette.warning.light;
        break;
      }
      case DialogType.Warning: {
        result.backgroundColor = theme.palette.warning.main;
        break;
      }
      case DialogType.Error: {
        result.backgroundColor = theme.palette.error.light;
        break;
      }
      case DialogType.Other:
      default: {
        result.backgroundColor = theme.palette.grey[200];
        break;
      }
    }
    return result;
  };
  const circularProgressSxProps = (hideBtn: boolean): SxProps => {
    let sxProps = {} as SxProps;
    if (hideBtn) {
      sxProps = {
        cursor: 'pointer',
        transition: 'box-shadow 0.25s ease-in-out',
        backgroundColor: alpha(theme.palette.grey[400], 0.4),
        '&: hover': {
          boxShadow: `inset 0px 0px 10px ${alpha(theme.palette.error.main, 0.2)}`,
        },
        '&: active': {
          boxShadow: `inset 0px 0px 10px ${alpha(theme.palette.grey[600], 0.8)}`,
        },
      } as SxProps;
    }
    return {
      borderRadius: '50%',
      overflow: 'hidden',
      ...sxProps,
    } as SxProps;
  };
  const OverlayIcon: React.FC<OverlayIconProps> = (props): JSX.Element => {
    switch (props.dialogType) {
      case DialogType.Loading: {
        return <CachedIcon />;
      }
      case DialogType.Info: {
        return <LightIcon />;
      }
      case DialogType.Question: {
        return <HelpOutlineIcon />;
      }
      case DialogType.Success: {
        return <CheckCircleOutlineIcon />;
      }
      case DialogType.Fail: {
        return <SettingsEthernetIcon />;
      }
      case DialogType.Warning: {
        return <CrisisAlertIcon />;
      }
      case DialogType.Error: {
        return <WarningAmberIcon />;
      }
      case DialogType.Other:
      default: {
        return <BubbleChartIcon />;
      }
    }
  };

  return {
    getIconDescriptionAndColor,
    circularProgressSxProps,
    OverlayIcon,
  };
};
