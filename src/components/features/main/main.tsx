import { Route, Routes } from 'react-router-dom';
import { Layout } from '../../elements/templates';
import { LoginPage, WelcomePage } from '../../pages';
// import { mainStyles } from './styles';

export const Main = () => {
  // const styles = mainStyles(1);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="" element={<WelcomePage />} />
        <Route path="login" element={<LoginPage />} />
      </Route>
    </Routes>

    // <Box sx={styles.Wrapper}>
    //   {Array.from(Array(9).keys()).map(v => {
    //     return (
    //       <Box key={v} sx={styles.Box}>
    //         <div>EI PIZDETS</div>
    //         <div>EI PIZDETS</div>
    //         <div>EI PIZDETS</div>
    //       </Box>
    //     )
    //   })}
    // </Box>
  );
};
