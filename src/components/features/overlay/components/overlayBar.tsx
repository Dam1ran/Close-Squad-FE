import { Box, CircularProgressWithChildren, CloseIcon, Row, Tooltip, Typography } from '../../../elements';
import { alpha, useTheme } from '@mui/system';
import { overlay } from '../overlay';
import { useEffect, useRef, useState } from 'react';
import { overlayUtils } from '../utils/overlayUtils';

export interface OverlayBarProps {
  id: string;
  title: string;
  draggable?: boolean;
  durationMilliseconds: number;
  icon: JSX.Element | string;
  iconDescription: string;
  backgroundColor: string;
  canBeClosed: boolean;
  canBePaused: boolean;
  onClick: () => void;
}

export const OverlayBar: React.FC<OverlayBarProps> = (props) => {
  const [paused, setPaused] = useState(false);
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timer;
    if (props.durationMilliseconds > 0) {
      const interval = 100.0 / (props.durationMilliseconds / 100.0);
      timer = setInterval(() => {
        setPercentage((val) => (val < 100.0 ? val + (paused ? 0 : interval) : 100.0));
      }, 100.0);
    }
    return () => {
      clearInterval(timer);
    };
  }, [paused, props.durationMilliseconds]);

  useEffect(() => {
    percentage >= 100.0 &&
      setTimeout(() => {
        overlay.removeComponent(props.id);
      }, 400);
  }, [percentage, props.id]);

  const ref = useRef<HTMLDivElement>(null);
  const themeObj = useTheme();

  const drag = (ev: MouseEvent, element: HTMLElement | null, relativeXPos: number, relativeYPos: number): void => {
    if (element) {
      const clampedX = Math.max(0, Math.min(ev.clientX - relativeXPos, window.innerWidth - relativeXPos - 20));
      const clampedY = Math.max(0, Math.min(ev.clientY - relativeYPos, window.innerHeight - relativeYPos - 20));

      element.style.border = `1px solid ${themeObj.palette.grey[500]}`;
      element.style.transform = 'unset';
      element.style.left = `${clampedX}px`;
      element.style.top = `${clampedY}px`;
    }
  };

  const onMouseUp = (element: HTMLElement | null): void => {
    if (element) {
      element.style.border = `1px solid ${themeObj.palette.grey[300]}`;
    }
    document.onmousemove = null;
  };

  const onMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
    if (props.draggable) {
      const rect = ref?.current?.getBoundingClientRect();
      props.onClick();
      document.onmousemove = null;
      document.onmouseup = null;
      const element = document.getElementById(props.id);
      document.onmousemove = (ev: MouseEvent): void =>
        drag(ev, element, e.clientX - (rect?.left ?? 0) + 35, e.clientY - (rect?.top ?? 0) + 8);
      document.onmouseup = (): void => onMouseUp(element);
    }
  };

  return (
    <Row
      justifyContent="space-between"
      alignItems="center"
      minWidth={318}
      sx={{
        width: '100%',
        backgroundColor: (theme) => alpha(theme.palette.secondary.main, 0.1),
        padding: 0.25,
        zIndex: 10,
        borderTopLeftRadius: '3px',
        borderTopRightRadius: '3px',
      }}
    >
      <Tooltip title={props.iconDescription} placement="top" arrow>
        <Box
          display="flex"
          justifyContent="center"
          sx={{
            userSelect: 'none',
            cursor: 'help',
            padding: 0.25,
            backgroundColor: alpha(props.backgroundColor, 0.2),
            borderRadius: 1,
            color: (theme) => alpha(theme.palette.primary.main, 0.9),
            border: (theme) => `2px solid ${alpha(theme.palette.common.white, 0.2)}`,
          }}
        >
          {props.icon}
        </Box>
      </Tooltip>

      <Box ref={ref} flex={1} sx={{ cursor: props.draggable ? 'move' : 'default' }} onMouseDown={onMouseDown}>
        <Typography align="center" sx={{ userSelect: 'none' }}>
          {props.title}
        </Typography>
      </Box>
      <CircularProgressWithChildren
        onMouseEnter={(): void => setPaused(props.canBePaused)}
        onMouseLeave={(): void => setPaused(false)}
        sx={{ ...overlayUtils().circularProgressSxProps(props.canBeClosed) }}
        size={32}
        color={props.backgroundColor}
        variant={props.durationMilliseconds >= 0 ? 'determinate' : 'indeterminate'}
        value={props.durationMilliseconds === 0 ? 0 : 100 - percentage}
        thickness={props.canBeClosed || props.durationMilliseconds < 0 ? 4 : 22}
      >
        {props.canBeClosed && (
          <CloseIcon
            sx={{
              borderRadius: '50%',
              transition: 'transform 0.3s cubic-bezier(0.68,-0.55,0.27,1.55), background-color 0.1s ease-in-out',
              transform: percentage >= 99.0 ? 'rotate(-90deg)' : '',
              '&: hover': {
                transform: 'rotate(-90deg)',
              },
            }}
            onClick={(): void => overlay.removeComponent(props.id)}
          />
        )}
      </CircularProgressWithChildren>
    </Row>
  );
};
