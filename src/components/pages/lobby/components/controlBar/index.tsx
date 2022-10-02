import { Box, Grid, Row, Typography } from '../../../../elements';
import { WorldMapButton } from './components/buttons/worldMapButton';
import { useContext, useEffect } from 'react';
import { fadeIn } from '../../../../../styles';
import { SignalRContext } from '../../../../../support/contexts/signalRContext/signalRContextProvider';
import { CreateCharButton } from './components/buttons/createCharButton';
import { CharacterContext } from '../../../../../support/contexts/characterContext/characterContextProvider';
import { CharacterThumbnail } from './components/CharacterThumbnail';
import { useConnection } from '../../../../../api/signalR/useConnection';

export const ControlBar: React.FC = () => {
  const { currentPlayer } = useContext(SignalRContext);
  const { characters, setActiveCharacterId, activeCharacterId } = useContext(CharacterContext);
  const { playerJumpTo, playerLeaveQuadrant } = useConnection();
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const _setActiveCharacterId = async (characterId?: number): Promise<void> => {
    if (characterId && characterId > 0) {
      if (characterId !== activeCharacterId) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        playerJumpTo(characters.find((c) => c.id === characterId)!.nickname);
        setActiveCharacterId(characterId);
      }
    } else {
      playerLeaveQuadrant();
      setActiveCharacterId(undefined);
    }
  };

  useEffect(() => {
    if (characters.length === 1 && characters[0].isAwake) {
      _setActiveCharacterId(characters[0].id);
    } else if (characters.length > 1) {
      const aliveAndAwakeCharacter = characters.find((c) => c.hp !== 0 && c.isAwake);
      if (aliveAndAwakeCharacter) {
        _setActiveCharacterId(aliveAndAwakeCharacter.id);
      } else {
        const awakeCharacter = characters.find((c) => c.isAwake);
        if (awakeCharacter) {
          _setActiveCharacterId(awakeCharacter?.id);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [characters.length]);

  return (
    <Grid container sx={{ padding: 0.5, minHeight: '90px' }}>
      <Grid xs={12} md={2} sx={{ display: 'flex', justifyContent: 'center', minHeight: '18px' }}>
        {currentPlayer && (
          <Typography
            color="primary"
            sx={{
              fontSize: 18,
              fontStyle: 'italic',
              lineHeight: '18px',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
              ...fadeIn(),
            }}
          >
            {currentPlayer?.nickname}
          </Typography>
        )}
      </Grid>
      <Grid xs={12} md={8} sx={{ minHeight: '90px' }}>
        {characters.length > 0 && (
          <Row
            sx={{
              display: 'flex',
              gap: 0.5,
              paddingLeft: 0.5,
              paddingRight: 0.5,
              overflowX: 'auto',
              ...fadeIn(),
            }}
          >
            <Box sx={{ flex: 1 }}></Box>
            {characters.map((c) => (
              <CharacterThumbnail key={c.id} id={c.id} setActiveCharacterId={_setActiveCharacterId} />
            ))}
            <Box sx={{ flex: 1 }}></Box>
          </Row>
        )}
      </Grid>
      <Grid
        xs={12}
        md={2}
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 0.25,
          justifyContent: { xs: 'center', md: 'space-between' },
          alignContent: { xs: 'center', md: 'flex-end' },
          flexDirection: { xs: 'row', md: 'column' },
          maxHeight: { xs: '41px', md: '82px' },
          minHeight: { xs: '41px', md: '82px' },
        }}
      >
        {currentPlayer && <WorldMapButton />}
        {characters.length < 9 && <CreateCharButton />}
      </Grid>
    </Grid>
  );
};
