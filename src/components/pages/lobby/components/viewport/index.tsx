/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useContext } from 'react';
import { useConnection } from '../../../../../api/signalR/useConnection';
import { CharacterStatus, TravelDirection } from '../../../../../models/enums';
import { CharacterContext } from '../../../../../support/contexts/characterContext/characterContextProvider';
import { useCharacterService } from '../../../../../support/services/useCharacterService';
import { Row } from '../../../../elements';
import { TravelArrow } from './components/travelArrow';
import { TravelingLayer } from './components/travelingLayer';

export const Viewport: React.FC = () => {
  const { activeCharacterId } = useContext(CharacterContext);
  const { characterTravelTo } = useConnection();
  const isTravelDisabled = useCharacterService().isTravelDisabled();
  const activeCharacter = useCharacterService().getActiveCharacter();

  const onTravelClick = async (travelDirection: TravelDirection): Promise<void> => {
    if (isTravelDisabled) {
      return;
    }
    characterTravelTo({ characterId: activeCharacterId!, travelDirection });
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
      }}
    >
      {Object.values(TravelDirection)
        .filter((v) => !isNaN(Number(v)))
        .map((e, v) => (
          <TravelArrow
            disabled={/*+e % 2 === 0 || */ isTravelDisabled}
            key={v}
            travelDirection={+e}
            onClick={onTravelClick}
          />
        ))}
      {activeCharacter?.characterStatus === CharacterStatus.Traveling && <TravelingLayer />}
    </Row>
  );
};
