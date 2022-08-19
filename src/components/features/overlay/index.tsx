import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ScrollDisable } from '../../elements';
import { overlay } from './overlay';
import { OverlayContainer } from './components/overlayContainer';
import { useOverlayStore } from './store/overlayStore';

export const Overlay: React.FC = () => {
  const location = useLocation();
  const components = useOverlayStore();
  const [activeDialogId, setActiveDialogId] = useState('');

  useEffect(() => {
    overlay.clearComponents();
  }, [location]);

  const anyModal = components.some((c) => c.modal);

  return (
    <>
      {components.map((c) => (
        <OverlayContainer
          key={c.id}
          overlayComponent={c}
          isActive={(activeDialogId === c.id || components.length === 1) && !anyModal}
          // don't need to useCallback for setActiveDialogId now
          // as memoized container has special comparison to exclude functions
          setActiveDialog={(id): void => setActiveDialogId(id)}
          onClose={c.onClose}
        />
      ))}
      {anyModal && <ScrollDisable />}
    </>
  );
};
