import { useTitle } from '../../../support/hooks';
import { Column, Row } from '../../elements';
import { AnnouncementsSection } from './components/announcementsSection/announcementsSection';
import { NavigationPanel } from './components/navigationPanel/navigationPanel';
import { TitleSection } from './components/titleSection/titleSection';

export const HomePage = (): JSX.Element => {
  useTitle('Home');

  return (
    <Column
      alignItems="center"
      sx={{
        paddingTop: 1,
        paddingBottom: 1,
        height: '100%',
      }}
    >
      <TitleSection />
      <Row
        flexWrap="wrap"
        justifyContent="center"
        sx={{ marginTop: (theme) => theme.spacing(2), gap: 1, minWidth: '320px', width: '80%', maxWidth: '1600px' }}
      >
        <AnnouncementsSection />
        <NavigationPanel />
      </Row>
    </Column>
  );
};
