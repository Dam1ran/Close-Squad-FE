/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/naming-convention */
import { alpha } from '@mui/system';
import { useContext, useEffect, useState } from 'react';
import { TravelDirection } from '../../../../../models/enums';
import { CharacterContext } from '../../../../../support/contexts/characterContext/characterContextProvider';
import { SignalRContext } from '../../../../../support/contexts/signalRContext/signalRContextProvider';
import { useCharacterService } from '../../../../../support/services/useCharacterService';
import { Row } from '../../../../elements';
import { Quadrant } from './components/quadrant';

export const Quadrants: React.FC = (): JSX.Element => {
  const { currentPlayer, gameSettings } = useContext(SignalRContext);
  const isGameSettingsLoaded = !!gameSettings;
  const [currentPlayerIndexNumber, setCurrentPlayerIndexNumber] = useState(-1);
  const [quadrantsCount, setQuadrantsCount] = useState(-1);
  const { activeCharacterId } = useContext(CharacterContext);

  useEffect(() => {
    if (
      currentPlayer?.quadrantIndex !== undefined &&
      currentPlayer?.quadrantIndex !== null &&
      currentPlayer.quadrantIndex >= 0 &&
      isGameSettingsLoaded
    ) {
      setCurrentPlayerIndexNumber(currentPlayer.quadrantIndex);
      setQuadrantsCount(gameSettings.nrOfCols * gameSettings.nrOfRows);
    }
  }, [currentPlayer?.quadrantIndex, isGameSettingsLoaded]);

  const getQuadrantIndex = (iteratorIndex: number): number => {
    if (!isGameSettingsLoaded || currentPlayerIndexNumber === -1 || quadrantsCount === -1) {
      return -1;
    }

    const quadrantColIndex = (iteratorIndex % 5) - 2;
    const quadrantRowIndex = Math.trunc(iteratorIndex / 5) - 2;

    let playerColIndex = (currentPlayerIndexNumber % gameSettings.nrOfCols) + quadrantColIndex;
    let playerRowIndex = Math.trunc(currentPlayerIndexNumber / gameSettings.nrOfCols) + quadrantRowIndex;

    if (playerColIndex < 0) {
      playerColIndex += gameSettings.nrOfCols;
    } else if (playerColIndex >= gameSettings.nrOfCols) {
      playerColIndex -= gameSettings.nrOfCols;
    }
    if (playerRowIndex < 0) {
      playerRowIndex += gameSettings.nrOfRows;
    } else if (playerRowIndex >= gameSettings.nrOfRows) {
      playerRowIndex -= gameSettings.nrOfRows;
    }

    return gameSettings.nrOfCols * playerRowIndex + playerColIndex;
  };

  const isTravelDisabled = useCharacterService().isTravelDisabled();

  const getDirection = (iteratorIndex: number): TravelDirection | undefined => {
    if (!activeCharacterId || isTravelDisabled) {
      return undefined;
    }
    switch (iteratorIndex) {
      case 7:
        return 1;
      case 8:
        return 2;
      case 13:
        return 3;
      case 18:
        return 4;
      case 17:
        return 5;
      case 16:
        return 6;
      case 11:
        return 7;
      case 6:
        return 8;

      default:
        return undefined;
    }
  };

  const { canSeeQuadrantInfo } = useCharacterService();

  return (
    <Row
      flexWrap="wrap"
      sx={{
        minHeight: '500px',
        width: '500px',
        maxHeight: '500px',
        minWidth: '500px',
        marginLeft: 'auto',
        backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.05),
        borderRadius: 1,
        position: 'relative',
      }}
    >
      {Array.from(Array(25).keys()).map((k) => (
        <Quadrant
          key={k}
          quadrantIndex={getQuadrantIndex(k)}
          center={k === 12}
          canSeeQuadrantInfo={canSeeQuadrantInfo(currentPlayerIndexNumber)}
          travelDirection={getDirection(k)}
        />
      ))}
    </Row>
  );
};
