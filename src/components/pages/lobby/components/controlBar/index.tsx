/* eslint-disable @typescript-eslint/naming-convention */
import { Box, Grid, Row, Typography } from '../../../../elements';
import { WorldMapButton } from './components/buttons/worldMapButton';
import { useContext, useEffect, useState } from 'react';
import { fadeIn } from '../../../../../styles';
import { SignalRContext } from '../../../../../support/contexts/signalRContext/signalRContextProvider';
import { CreateCharButton } from './components/buttons/createCharButton';
import { CharacterContext } from '../../../../../support/contexts/characterContext/characterContextProvider';
import { CharacterThumbnail } from './components/CharacterThumbnail';
import { useConnection } from '../../../../../api/signalR/useConnection';
import { CharacterStatus } from '../../../../../models/enums';
import { CharacterDto } from '../../../../../models/signalR';

export const ControlBar: React.FC = () => {
  const { currentPlayer } = useContext(SignalRContext);
  const { characters, setActiveCharacterId, activeCharacterId } = useContext(CharacterContext);
  const { playerJumpTo, toggleCharacter } = useConnection();

  const _setActiveCharacter = async (character: CharacterDto): Promise<void> => {
    if (character.id !== activeCharacterId && character.characterStatus !== CharacterStatus.Astray) {
      playerJumpTo(character.nickname);
      setActiveCharacterId(character.id);
    }
  };

  const [loadingId, setLoadingId] = useState(0);

  const onAwakeClick = async (character: CharacterDto): Promise<void> => {
    setLoadingId(character.id);

    const isOff = character.characterStatus === CharacterStatus.Astray;
    let characterToActivate: CharacterDto | undefined = undefined;
    if (isOff) {
      characterToActivate = character;
    } else if (activeCharacterId === character.id) {
      const otherAliveAndAwakeCharacter = characters.find(
        (c) => c.hp > 0 && c.characterStatus !== CharacterStatus.Astray && character.id !== c.id,
      );
      if (otherAliveAndAwakeCharacter) {
        characterToActivate = otherAliveAndAwakeCharacter;
      } else {
        const otherAwakeCharacter = characters.find(
          (c) => c.characterStatus !== CharacterStatus.Astray && character.id !== c.id,
        );
        if (otherAwakeCharacter) {
          characterToActivate = otherAwakeCharacter;
        }
      }
    }
    await toggleCharacter(character.nickname)
      ?.then(() => {
        if (characterToActivate) {
          setTimeout(() => {
            characterToActivate && _setActiveCharacter(characterToActivate);
          }, 200);
        } else {
          activeCharacterId === character.id && setActiveCharacterId(undefined);
        }
      })
      .finally(() => setLoadingId(0));
  };

  useEffect(() => {
    const characterCount = characters.length;
    if (characterCount === 1) {
      if (characters[0].characterStatus === CharacterStatus.Astray) {
        onAwakeClick(characters[0]);
      } else {
        _setActiveCharacter(characters[0]);
      }
    } else if (characterCount > 1) {
      const selectedAliveAndAwakeCharacter = characters.find(
        (c) => c.hp !== 0 && c.characterStatus === CharacterStatus.Awake && c.id === activeCharacterId,
      );
      if (selectedAliveAndAwakeCharacter) {
        _setActiveCharacter(selectedAliveAndAwakeCharacter);
      } else {
        const aliveAndAwakeCharacter = characters.find((c) => c.hp !== 0 && c.characterStatus === CharacterStatus.Awake);
        if (aliveAndAwakeCharacter) {
          _setActiveCharacter(aliveAndAwakeCharacter);
        } else {
          const onlineCharacter = characters.find((c) => c.characterStatus !== CharacterStatus.Astray);
          if (onlineCharacter) {
            _setActiveCharacter(onlineCharacter);
          }
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
              gap: 1,
              paddingLeft: 0.5,
              paddingRight: 0.5,
              overflowX: 'auto',
              ...fadeIn(),
            }}
          >
            <Box sx={{ flex: 1 }}></Box>
            {characters.map((c) => (
              <CharacterThumbnail
                key={c.id}
                character={c}
                setActiveCharacter={_setActiveCharacter}
                onAwakeClick={onAwakeClick}
                isToggleLoading={c.id === loadingId}
              />
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
