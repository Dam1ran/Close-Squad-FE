import { useEffect, useState } from 'react';
import { ServerClient } from '../../../../../api/serverClient';
import { ServerAnnouncementDto } from '../../../../../models/api.models';
import { useAbortSignal } from '../../../../../support/hooks';

export const useAnnouncements = (): ServerAnnouncementDto[] | null | undefined => {
  const signal = useAbortSignal();
  const { getAnnouncements } = ServerClient();
  const [announcements, setAnnouncements] = useState<ServerAnnouncementDto[] | null>();

  useEffect(() => {
    const fetchAnnouncements = async (): Promise<void> => {
      await getAnnouncements(signal).then((r) => setAnnouncements(r.data));
    };

    fetchAnnouncements();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return announcements;
};
