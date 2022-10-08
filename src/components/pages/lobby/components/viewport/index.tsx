import { useContext } from 'react';
import { useConnection } from '../../../../../api/signalR/useConnection';
import { CharacterStatus, TravelDirection } from '../../../../../models/enums';
import { CharacterContext } from '../../../../../support/contexts/characterContext/characterContextProvider';
import { Row } from '../../../../elements';
import { TravelArrow } from './components/travelArrow';
import { TravelingLayer } from './components/travelingLayer';

export const Viewport: React.FC = () => {
  const { activeCharacterId, characters } = useContext(CharacterContext);
  const { characterTravelTo } = useConnection();

  const onTravelClick = async (travelDirection: TravelDirection): Promise<void> => {
    if (!activeCharacterId) {
      return;
    }
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    characterTravelTo({ characterId: activeCharacterId, travelDirection });
  };

  const activeCharacter = characters.find((c) => c.id === activeCharacterId);
  const arrowsDisabled =
    !activeCharacterId || activeCharacter?.characterStatus !== CharacterStatus.Awake || activeCharacter?.hp === 0;

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
          <TravelArrow disabled={/*+e % 2 === 0 || */ arrowsDisabled} key={v} travelDirection={+e} onClick={onTravelClick} />
        ))}
      {activeCharacter?.characterStatus === CharacterStatus.Traveling && <TravelingLayer />}
    </Row>
  );
};
