import { useEffect } from 'react';

export const useTitle = (title: string): void => {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = `${prevTitle} - ${title}`;
    return (): void => {
      document.title = prevTitle;
    };
  }, [title]);
};
