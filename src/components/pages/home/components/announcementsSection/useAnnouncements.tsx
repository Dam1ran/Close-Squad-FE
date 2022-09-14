import { useEffect, useState } from 'react';
import { useServerClient } from '../../../../../api/useServerClient';
import { ServerAnnouncementDto } from '../../../../../models/api.models';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const useAnnouncements = () => {
  const { getAnnouncements } = useServerClient();
  const [announcements, setAnnouncements] = useState<ServerAnnouncementDto[] | null>();
  const [reloadFlag, setReloadFlag] = useState(false);

  useEffect(() => {
    const fetchAnnouncements = async (): Promise<void> => {
      await getAnnouncements().then((r) => setAnnouncements(r.data));
    };

    fetchAnnouncements();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reloadFlag]);

  const reload = (): void => {
    setReloadFlag((prev) => !prev);
  };

  return {
    announcements,
    reload,
  };
};
