import ReactDOM from 'react-dom/client';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { csTheme } from './styles';
import { Main } from './components/features/main/main';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { disableReactDevTools } from '@fvilers/disable-react-devtools';
import { AppContextProvider } from './support/contexts/appContextProvider';
import React from 'react';
import { Toaster } from 'react-hot-toast';
import { Overlay } from './components/features/overlay';
import './support/extensions';
// import reportWebVitals from './reportWebVitals';

if (process.env.NODE_ENV === 'production') {
  disableReactDevTools();
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <ThemeProvider theme={csTheme}>
      <AppContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/*" element={<Main />} />
          </Routes>
          <Overlay />
          <Toaster
            position="bottom-center"
            containerStyle={{
              bottom: 40,
            }}
            reverseOrder={true}
          />
          <CssBaseline />
        </BrowserRouter>
      </AppContextProvider>
    </ThemeProvider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
