import { useContext, useEffect } from 'react';
import { AppContext } from '../../../support/contexts/appContextProvider';
import { Box, CookieIcon, DialogActionBar, Typography } from '../../elements';
import { overlay } from '../overlay/overlay';
import { DialogType } from '../overlay/store/overlayStore';

export const useCookiePolicyAgreement = (): void => {
  const { application, setCookiesAccepted } = useContext(AppContext);
  const id = 'cookies-accepts-modal';

  useEffect(() => {
    if (!application.cookiesAccepted) {
      setTimeout(() => {
        overlay.setComponent(
          <Box textAlign={'center'}>
            <Box p={2}>
              <Typography mb={1}>For improved security and user experience our web site uses cookies.</Typography>
              <Typography>
                By clicking{' '}
                <strong>
                  <i>'Accept'</i>
                </strong>{' '}
                button you are agreed that some data is used via cookies.
              </Typography>
            </Box>
            <DialogActionBar
              btnData={[
                {
                  capture: 'Accept',
                  icon: <CookieIcon />,
                  minWidth: '110px',
                  onClick: (): void => {
                    setCookiesAccepted(true);
                    overlay.removeComponent(id);
                  },
                },
              ]}
            />
          </Box>,
          {
            id,
            title: 'This site uses cookies',
            modal: true,
            dialogType: DialogType.Warning,
          },
        );
      }, 1000);
    }
  }, [application.cookiesAccepted, setCookiesAccepted]);
};
