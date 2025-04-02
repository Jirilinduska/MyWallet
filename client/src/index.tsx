import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Providers } from './context/Providers'
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material'
import { themeUtils } from './styles/theme/theme'

const ThemedApp = () => {

  const theme = createTheme(themeUtils())

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  );
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)
root.render(
  <React.StrictMode>
      <Providers>
        <ThemedApp />
      </Providers>
  </React.StrictMode>
)