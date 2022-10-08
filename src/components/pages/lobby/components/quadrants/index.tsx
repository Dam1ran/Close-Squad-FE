/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/naming-convention */
import { alpha } from '@mui/system';
import { useContext, useEffect, useState } from 'react';
import { SignalRContext } from '../../../../../support/contexts/signalRContext/signalRContextProvider';
import { Row } from '../../../../elements';
import { Quadrant } from './components/quadrant';

export const Quadrants: React.FC = (): JSX.Element => {
  const { currentPlayer, gameSettings } = useContext(SignalRContext);

  const _drawQuadrants = !!gameSettings;
  const [currentPlayerIndexNumber, setCurrentPlayerIndexNumber] = useState(-1);
  const [quadrantsCount, setQuadrantsCount] = useState(-1);
  useEffect(() => {
    if (
      currentPlayer?.quadrantIndex !== undefined &&
      currentPlayer?.quadrantIndex !== null &&
      currentPlayer.quadrantIndex >= 0 &&
      _drawQuadrants
    ) {
      setCurrentPlayerIndexNumber(currentPlayer.quadrantIndex);
      setQuadrantsCount(gameSettings.nrOfCols * gameSettings.nrOfRows);
    }
  }, [currentPlayer?.quadrantIndex, _drawQuadrants]);

  const getQuadrantIndex = (iteratorIndex: number): number => {
    if (!_drawQuadrants || currentPlayerIndexNumber === -1 || quadrantsCount === -1) {
      return -1;
    }

    let qColIndex = (iteratorIndex % 5) - 2;
    let qRowIndex = Math.trunc(iteratorIndex / 5) - 2;

    let pColIndex = (currentPlayerIndexNumber % gameSettings.nrOfCols) + qColIndex;
    let pRowIndex = Math.trunc(currentPlayerIndexNumber / gameSettings.nrOfCols) + qRowIndex;

    if (pColIndex < 0) {
      pColIndex += gameSettings.nrOfCols;
    } else if (pColIndex >= gameSettings.nrOfCols) {
      pColIndex -= gameSettings.nrOfCols;
    }
    if (pRowIndex < 0) {
      pRowIndex += gameSettings.nrOfRows;
    } else if (pRowIndex >= gameSettings.nrOfRows) {
      pRowIndex -= gameSettings.nrOfRows;
    }

    return gameSettings.nrOfCols * pRowIndex + pColIndex;
  };

  return (
    <Row
      flexWrap="wrap"
      sx={{
        minHeight: '500px',
        width: '500px',
        minWidth: '500px',
        marginLeft: 'auto',
        backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.05),
        borderRadius: 1,
      }}
    >
      {Array.from(Array(25).keys()).map((k) => (
        <Quadrant key={k} quadrantIndex={getQuadrantIndex(k)} center={k === 12} />
      ))}
    </Row>
  );
};
