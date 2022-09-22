import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Provider } from 'react-redux';


import PageContainer from './Page/Container/PageContainer';
import store from './Redux/store'
import './index.css';

const theme = createTheme({
  palette: {
    primary: {
      main: 'rgb(26 41 124)',
    },
    secondary: {
      main: '#ff471b',
    },
    background: {
      main: '#ededed'
    },
    logo: {
      main: 'rgb(255 71 27);',
    },
    neutral: {
      main: 'rgb(255, 255, 255);',
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <LocalizationProvider dateAdapter={AdapterDayjs}>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <BrowserRouter>

          <PageContainer />

        </BrowserRouter>
      </Provider>
    </ThemeProvider>
  </LocalizationProvider>
);
