import { alpha } from '@mui/system';
import { CsEntityClass } from '../../../../../../../../../models/api.models';
import { useCharacterService } from '../../../../../../../../../support/services/useCharacterService';
import { Column, Row, Typography } from '../../../../../../../../elements';
import { ProgressBar } from './components/progressBar';
import { StatRow } from './components/statRow';

export const StatusTabContent: React.FC = () => {
  const activeCharacter = useCharacterService().getActiveCharacter();

  return (
    <Column
      sx={{
        border: (theme) => `1px solid ${theme.palette.grey[600]}`,
        alignItems: 'center',
        height: '465px',
        userSelect: 'none',
        borderBottomLeftRadius: '4px',
        borderBottomRightRadius: '4px',
        boxShadow: (theme) => `inset 0 0 100px 50px ${alpha(theme.palette.grey[400], 0.5)}`,
      }}
    >
      <Column
        sx={{
          alignItems: 'center',
          width: '320px',
          paddingTop: 1,
        }}
      >
        <Row sx={{ alignItems: 'center', justifyContent: 'space-between', width: '300px' }}>
          <Typography
            sx={{
              fontSize: '16px',
              lineHeight: '16px',
              color: (theme) => theme.palette.grey[900],
            }}
          >
            {activeCharacter?.nickname}
          </Typography>
          {activeCharacter && (
            <Typography
              sx={{
                fontSize: '16px',
                lineHeight: '16px',
                backgroundColor: (theme) => theme.palette.grey[300],
                color: (theme) => theme.palette.grey[900],
                paddingTop: 0.25,
                paddingBottom: 0.25,
                paddingLeft: 1,
                paddingRight: 1,
                borderRadius: 1,
              }}
            >
              {activeCharacter.level}
            </Typography>
          )}
        </Row>
        {activeCharacter && (
          <Row
            sx={{
              marginTop: 0.25,
              marginBottom: 0.25,
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '300px',
            }}
          >
            <Typography
              sx={{
                fontSize: '14px',
                lineHeight: '14px',
                fontStyle: 'italic',
                color: (theme) => theme.palette.grey[900],
              }}
            >
              [{CsEntityClass[activeCharacter.characterClass]}]
            </Typography>
            <Typography
              sx={{
                fontSize: '14px',
                lineHeight: '14px',
                fontStyle: 'italic',
                color: (theme) => theme.palette.grey[900],
              }}
            >
              [-rank-]
              {/* {activeCharacter?.rank} */}
            </Typography>
          </Row>
        )}
        {activeCharacter && (
          <ProgressBar tag="HP" currentValue={activeCharacter.hp} maxValue={activeCharacter.maxHp} color="#BB3333" />
        )}
        {activeCharacter && (
          <ProgressBar tag="MP" currentValue={activeCharacter.mp} maxValue={activeCharacter.maxMp} color="#3333BB" />
        )}
        {activeCharacter && <ProgressBar tag="XP" currentValue={activeCharacter.xpPercent} percent color="#555555" />}

        {activeCharacter && (
          <Row
            sx={{
              gap: 1,
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '300px',
              marginTop: 0.5,
              marginBottom: 0.5,
              flexWrap: 'wrap',
            }}
          >
            {activeCharacter.stats.map((s, i) => (
              <StatRow key={i} name={s.name} value={s.value} />
            ))}
          </Row>
        )}
      </Column>
    </Column>
  );
};
