import { CsEntityClassIconMap, CharacterStatusIconMap } from '../../../../../models/character';
import { ScoutQuadrantReport } from '../../../../../models/signalR';
import { CheckIcon, Divider } from '../../../atoms';
import { DialogActionBar, Typography } from '../../../molecules';
import { Box, Row } from '../../../templates';
import { CharacterSimpleInfoTooltip } from './components/characterSimpleInfoTooltip';

export const ScoutReport: React.FC<{ onClose: () => void; report: ScoutQuadrantReport }> = ({ onClose, report }) => {
  return (
    <Box textAlign={'center'} sx={{ userSelect: 'none', borderBottomLeftRadius: '4px', borderBottomRightRadius: '4px' }}>
      <Box p={1} sx={{ overflowY: 'auto', maxHeight: '320px', maxWidth: '320px', width: '320px' }}>
        <Row sx={{ justifyContent: 'space-around', width: '100%' }}>
          {report.area.length > 0 && <Typography>Area:&nbsp;{report.area}</Typography>}
          {report.name.length > 0 && <Typography>Name:&nbsp;{report.name}</Typography>}
        </Row>
        {(report.area.length > 0 || report.name.length > 0) && <Divider sx={{ marginTop: 1, marginBottom: 1 }} />}
        {report.characters.length > 0 && (
          <Row sx={{ flexWrap: 'wrap', gap: 1, justifyContent: 'center' }}>
            {report.characters.map((c) => (
              <CharacterSimpleInfoTooltip key={c.id} character={c}>
                <Row
                  pl={0.5}
                  pr={0.5}
                  sx={{
                    gap: 1,
                    border: (theme) => `1px solid ${theme.palette.grey[400]}`,
                    borderRadius: 1,
                    transition: 'background-color 0.3s',
                    '&:hover': {
                      backgroundColor: (theme) => theme.palette.grey[400],
                    },
                  }}
                >
                  <Typography sx={{ textShadow: (theme) => `0 0 3px ${theme.palette.grey[100]}` }}>
                    {CsEntityClassIconMap[c.characterClass]}
                  </Typography>
                  <Typography> {c.nickname}</Typography>
                  <Typography sx={{ textShadow: (theme) => `0 0 3px ${theme.palette.grey[100]}` }}>
                    {CharacterStatusIconMap[c.characterStatus]}
                  </Typography>
                </Row>
              </CharacterSimpleInfoTooltip>
            ))}
          </Row>
        )}

        {report.creatures && report.creatures.length > 0 && <Divider sx={{ marginTop: 1, marginBottom: 1 }} />}
      </Box>
      <DialogActionBar
        btnData={[
          {
            capture: 'OK',
            icon: <CheckIcon />,
            width: '110px',
            onClick: onClose,
          },
        ]}
      />
    </Box>
  );
};
