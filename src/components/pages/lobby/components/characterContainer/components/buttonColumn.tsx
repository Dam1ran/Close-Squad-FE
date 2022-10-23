import { useState } from 'react';
import { ArrowForwardIosIcon, Box, Column, DoubleArrowIcon, Row } from '../../../../../elements';
import { ShortcutBarButton } from './shortcutBarButton';

export const ButtonColumn: React.FC<{ index: number; addButtonColumn: () => void }> = ({ index, addButtonColumn }) => {
  const [shortcutBar, setShortcutBar] = useState(0);

  return (
    <Column
      sx={{
        border: (theme) => `1px solid ${theme.palette.grey[500]}`,
        height: '100%',
        padding: 0.25,
        gap: 0.25,
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        borderRadius: 1,
      }}
    >
      <Column
        sx={{
          overflow: 'hidden',
          height: '36px',
          width: '36px',
          borderRadius: 1,
          border: (theme) => `1px solid ${theme.palette.grey[400]}`,
          position: 'relative',
        }}
      >
        {index === 0 && (
          <Row sx={{ justifyContent: 'space-between', height: '17px', width: '100%' }}>
            <Box
              sx={{
                overflow: 'hidden',
                borderRadius: 1,
                height: '17px',
                transition: 'opacity 0.3s',
                cursor: 'pointer',
                opacity: 0.4,
                '&:hover': {
                  opacity: 0.8,
                },
              }}
            ></Box>
            <Box
              sx={{
                overflow: 'hidden',
                borderRadius: 1,
                height: '17px',
                backgroundColor: 'transparent',
                transition: 'opacity 0.3s',
                cursor: 'pointer',
                opacity: 0.4,
                '&:hover': {
                  opacity: 0.8,
                },
              }}
              onClick={(): void => addButtonColumn()}
            >
              <DoubleArrowIcon sx={{ fontSize: '16px', transform: 'translateY(-0.5px)' }} />
            </Box>
          </Row>
        )}
        <Row sx={{ marginTop: 'auto', justifyContent: 'space-between', height: '17px', width: '100%' }}>
          <Box
            sx={{
              overflow: 'hidden',
              borderRadius: 1,
              height: '17px',
              transition: 'opacity 0.3s',
              cursor: 'pointer',
              opacity: 0.4,
              '&:hover': {
                opacity: 0.8,
              },
            }}
            onClick={(): void =>
              setShortcutBar((prev) => {
                if (prev === 0) {
                  return 11;
                }
                return --prev;
              })
            }
          >
            <ArrowForwardIosIcon sx={{ fontSize: '16px', transform: 'rotateZ(180deg) translateX(1px) translateY(0.5px)' }} />
          </Box>
          <Box
            sx={{
              overflow: 'hidden',
              borderRadius: 1,
              height: '17px',
              backgroundColor: 'transparent',
              transition: 'opacity 0.3s',
              cursor: 'pointer',
              opacity: 0.4,
              '&:hover': {
                opacity: 0.8,
              },
            }}
            onClick={(): void =>
              setShortcutBar((prev) => {
                if (prev === 11) {
                  return 0;
                }
                return ++prev;
              })
            }
          >
            <ArrowForwardIosIcon sx={{ fontSize: '16px', transform: 'translateY(-0.5px) translateX(1px)' }} />
          </Box>
        </Row>
        <Box
          sx={{
            fontSize: '10px',
            lineHeight: '12px',
            textAlign: 'center',
            borderRadius: 1,
            padding: '1px 2px',
            position: 'absolute',
            bottom: '1px',
            width: '100%',
            userSelect: 'none',
            pointerEvents: 'none',
          }}
        >
          {shortcutBar + 1}
        </Box>
      </Column>
      {Array.from(Array(12).keys()).map((k) => (
        <ShortcutBarButton key={k} order={shortcutBar * 12 + k} />
      ))}
    </Column>
  );
};
