import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import {
  Experimental_CssVarsProvider as MaterialCssVarsProvider,
  experimental_extendTheme as extendMaterialTheme,
  THEME_ID,
} from '@mui/material/styles';
import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers';

const materialTheme = extendMaterialTheme();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MaterialCssVarsProvider theme={{ [THEME_ID]: materialTheme }}>
      <CssVarsProvider disableTransitionOnChange>
        <CssBaseline />
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <App />
        </LocalizationProvider>
      </CssVarsProvider>
    </MaterialCssVarsProvider>
  </React.StrictMode>,
);

// Remove Preload scripts loading
postMessage({ payload: 'removeLoading' }, '*');

// Use contextBridge
window.ipcRenderer.on('main-process-message', (_event, message) => {
  console.log(message);
});
