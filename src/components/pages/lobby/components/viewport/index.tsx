/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useContext } from 'react';
import { useConnection } from '../../../../../api/signalR/useConnection';
import { CsEntityClassIconMap } from '../../../../../models/character';
import { CsEntityStatus, TravelDirection, TravelDirectionMap } from '../../../../../models/enums';
import { CharacterDto, CharacterSimpleDto } from '../../../../../models/signalR';
import { CharacterContext } from '../../../../../support/contexts/characterContext/characterContextProvider';
import { useCharacterService } from '../../../../../support/services/useCharacterService';
import { getNormalized } from '../../../../../support/utils';
import { Box, Img, questionDialogOverlay, Row } from '../../../../elements';
import { TravelArrow } from './components/travelArrow';
import defaultQuadrantImage from '../../../../../assets/images/quadrant_default.png';
import { alpha } from '@mui/system';

export const Viewport: React.FC = () => {
  const { activeCharacterId, updateCharacter, quadrantCharacters } = useContext(CharacterContext);
  const { characterTravelTo, characterMove, targetSelf, targetCharacter } = useConnection();
  const { isTravelDisabled, getCharactersInViewPort, getActiveCharacter } = useCharacterService();
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

  const onMyCharacterClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, character: CharacterDto): void => {
    e.stopPropagation();
    if (activeCharacterId === character.id) {
      targetSelf({ characterId: activeCharacterId });
    } else if (activeCharacterId !== undefined) {
      targetCharacter({ characterId: activeCharacterId, instanceId: character.instanceId });
    }
  };

  const onCharacterClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, character: CharacterSimpleDto): void => {
    e.stopPropagation();
    if (activeCharacter) {
      targetCharacter({ characterId: activeCharacter.id, instanceId: character.instanceId });
    }
  };

  const onViewportClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
    if (
      activeCharacter &&
      (activeCharacter.characterStatus === CsEntityStatus.Awake ||
        activeCharacter.characterStatus === CsEntityStatus.Engaged)
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
        userSelect: 'none',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 1,
        position: 'relative',
        overflow: 'hidden',
        backgroundImage: `url(${defaultQuadrantImage})`,
        fontSize: '14px',
      }}
      onClick={onViewportClick}
    >
      {Object.values(TravelDirection)
        .filter((v) => !isNaN(Number(v)))
        .map((e, v) => (
          <TravelArrow disabled={isTravelDisabled()} key={v} travelDirection={+e} onClick={onTravelClick} />
        ))}
      {activeCharacter && (
        <Img
          sx={{
            userSelect: 'none',
            pointerEvents: 'none',
            height: '500px',
            width: '500px',
            backgroundImage: `url(${defaultQuadrantImage})`,
            fontSize: '14px',
            borderRadius: 1,
          }}
          alt={`Q: ${activeCharacter.quadrantIndex}`}
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          src={`${process.env.REACT_APP_BASE_URL!}/images/quadrant_${activeCharacter.quadrantIndex}.png`}
        />
      )}
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
            border: (theme) =>
              activeCharacter?.target?.instanceId === c.instanceId
                ? `1px dashed ${theme.palette.grey[200]}`
                : `1px solid ${theme.palette.grey[800]}`,
            boxShadow: (theme) =>
              activeCharacter?.id === c.id
                ? `0 0 5px ${theme.palette.secondary.main}, inset 0 0 3px 1px ${theme.palette.grey[300]}`
                : `0 0 4px ${theme.palette.grey[800]}`,
            cursor: 'pointer',
            zIndex: activeCharacter?.id === c.id ? 10 : 5,
            fontSize: '12px',
            textAlign: 'center',
            lineHeight: '20px',
            textShadow: (theme) => `0 0 3px ${theme.palette.grey[900]}`,
            opacity: c.characterStatus === CsEntityStatus.Traveling ? 0.5 : 1,
          }}
          onClick={(e): void => onMyCharacterClick(e, c)}
        >
          {c.characterStatus === CsEntityStatus.Dead ? '🖤' : CsEntityClassIconMap[c.characterClass]}
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
            color: (theme) => (activeCharacter?.id === c.id ? theme.palette.secondary.main : theme.palette.grey[700]),
            borderRadius: '50%',
            left: `${c.xDestination ?? 0}%`,
            top: `${c.yDestination ?? 0}%`,
            transform: 'translate(-5px, -5px)',
            fontSize: '12px',
            textAlign: 'center',
            lineHeight: '10px',
            zIndex: 1,
            pointerEvents: 'none',
            opacity: c.characterStatus === CsEntityStatus.Traveling ? 0.5 : 1,
          }}
        >
          ✴
        </Box>
      ))}
      {quadrantCharacters.map((c) => (
        <Box
          key={c.id}
          sx={{
            userSelect: 'none',
            position: 'absolute',
            width: '20px',
            height: '20px',
            borderRadius: '50%',
            left: `${c.x}%`,
            top: `${c.y}%`,
            transform: 'translate(-10px, -10px)',
            transition: 'box-shadow 0.3s, border-radius 0.3s',
            border: (theme) =>
              activeCharacter?.target?.instanceId === c.instanceId
                ? `1px dashed ${theme.palette.common.white}`
                : `1px solid ${theme.palette.grey[800]}`,
            zIndex: 4,
            fontSize: '12px',
            textAlign: 'center',
            lineHeight: '20px',
            textShadow: (theme) => `0 0 3px ${theme.palette.grey[900]}`,
            opacity: c.characterStatus === CsEntityStatus.Traveling ? 0.5 : 1,
            cursor: 'pointer',
            backgroundColor: (theme) => alpha(theme.palette.warning.main, 0.3),
          }}
          onClick={(e): void => onCharacterClick(e, c)}
        >
          {c.characterStatus === CsEntityStatus.Dead ? '🖤' : CsEntityClassIconMap[c.characterClass]}
        </Box>
      ))}
    </Row>
  );
};
