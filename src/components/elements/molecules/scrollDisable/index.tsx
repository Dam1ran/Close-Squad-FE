import { useEffect } from 'react';

export const ScrollDisable: React.FC = () => {
  useEffect(() => {
    const layout = document.getElementById('layout');
    if (layout) {
      layout.style.overflow = 'hidden';
    }
    return () => {
      if (layout) {
        layout.style.overflow = 'unset';
      }
    };
  }, []);
  return null;
};
