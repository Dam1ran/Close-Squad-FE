/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useContext } from 'react';
import { useConnection } from '../../../../../api/signalR/useConnection';
import { CharacterClassIconMap } from '../../../../../models/character';
import { CharacterStatus, TravelDirection, TravelDirectionMap } from '../../../../../models/enums';
import { CharacterDto } from '../../../../../models/signalR';
import { CharacterContext } from '../../../../../support/contexts/characterContext/characterContextProvider';
import { useCharacterService } from '../../../../../support/services/useCharacterService';
import { getNormalized } from '../../../../../support/utils';
import { Box, questionDialogOverlay, Row } from '../../../../elements';
import { TravelArrow } from './components/travelArrow';

export const Viewport: React.FC = () => {
  const { activeCharacterId, updateCharacter } = useContext(CharacterContext);
  const { characterTravelTo, characterMove } = useConnection();
  const { isTravelDisabled, getCharactersInViewPort, getActiveCharacter, setActiveCharacter, updateCharacterPosition } =
    useCharacterService();
  const activeCharacter = getActiveCharacter();
  const charactersInViewPort = getCharactersInViewPort();

  const onTravelClick = async (travelDirection: TravelDirection): Promise<void> => {
    if (isTravelDisabled()) {
      return;
    }
    questionDialogOverlay(
      () => characterTravelTo({ characterId: activeCharacterId!, travelDirection }),
      'What is your course?',
      `Travel to ${TravelDirectionMap[travelDirection]}?`,
    );
  };

  const onCharacterClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, character: CharacterDto): void => {
    e.stopPropagation();
    setActiveCharacter(character);
  };

  const onViewportClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
    if (
      activeCharacter &&
      (activeCharacter.characterStatus === CharacterStatus.Awake ||
        activeCharacter.characterStatus === CharacterStatus.Engaged)
    ) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = getNormalized(500, e.clientX - rect.left);
      const y = getNormalized(500, e.clientY - rect.top);
      updateCharacter({ id: activeCharacter.id, xDestination: x, yDestination: y });
      characterMove({ characterId: activeCharacter.id, x, y });
    }
  };

  return (
    <Row
      sx={{
        border: (theme) => `1px solid ${theme.palette.grey[500]}`,
        height: '500px',
        minWidth: '500px',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 1,
        position: 'relative',
        overflow: 'hidden',
      }}
      onClick={onViewportClick}
    >
      {Object.values(TravelDirection)
        .filter((v) => !isNaN(Number(v)))
        .map((e, v) => (
          <TravelArrow disabled={isTravelDisabled()} key={v} travelDirection={+e} onClick={onTravelClick} />
        ))}
      {charactersInViewPort.map((c) => (
        <Box
          key={c.id}
          sx={{
            userSelect: 'none',
            position: 'absolute',
            width: '20px',
            height: '20px',
            backgroundColor: (theme) => (activeCharacter?.id === c.id ? theme.palette.grey[300] : theme.palette.grey[500]),
            borderRadius: activeCharacter && activeCharacter?.id === c.id ? 0.5 : '50%',
            left: `${c.x}%`,
            top: `${c.y}%`,
            transform: 'translate(-10px, -10px)',
            transition: 'box-shadow 0.3s, border-radius 0.3s',
            border: (theme) => `1px solid ${theme.palette.grey[800]}`,
            boxShadow: (theme) =>
              activeCharacter?.id === c.id
                ? `0 0 5px ${theme.palette.secondary.main}, inset 0 0 3px 1px ${theme.palette.grey[300]}`
                : `0 0 0px ${theme.palette.secondary.main}`,
            cursor: activeCharacter?.id !== c.id ? 'pointer' : 'unset',
            zIndex: activeCharacter?.id === c.id ? 10 : 'unset',
            fontSize: '12px',
            textAlign: 'center',
            lineHeight: '20px',
            textShadow: (theme) => `0 0 3px ${theme.palette.grey[700]}`,
            opacity: c.characterStatus === CharacterStatus.Traveling ? 0.5 : 1,
          }}
          onClick={(e): void => onCharacterClick(e, c)}
        >
          {CharacterClassIconMap[c.characterClass]}
        </Box>
      ))}
      {charactersInViewPort.map((c) => (
        <Box
          key={c.id}
          sx={{
            userSelect: 'none',
            position: 'absolute',
            width: '10px',
            height: '10px',
            color: (theme) => (activeCharacter?.id === c.id ? theme.palette.warning.dark : theme.palette.grey[500]),
            borderRadius: '50%',
            left: `${c.xDestination ?? 0}%`,
            top: `${c.yDestination ?? 0}%`,
            transform: 'translate(-5px, -5px)',
            fontSize: '12px',
            textAlign: 'center',
            lineHeight: '10px',
            zIndex: -5,
            pointerEvents: 'none',
            opacity: c.characterStatus === CharacterStatus.Traveling ? 0.5 : 1,
          }}
        >
          ✴
        </Box>
      ))}
    </Row>
  );
};
