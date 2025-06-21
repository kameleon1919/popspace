import React from 'react';
import { CssBaseline, MuiThemeProvider, StylesProvider } from '@material-ui/core';
import { Router } from 'react-router';
import history from './history';
import { lavender as theme } from './theme/theme';

export const App: React.FC = () => {
  console.log('🚀 PopSpace App - Version minimale');
  
  return (
    <StylesProvider injectFirst>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Router history={history}>
          <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h1>🎯 PopSpace - Version minimale</h1>
            <p>Si vous voyez ce message, les imports de base fonctionnent :</p>
            <ul>
              <li>✅ React</li>
              <li>✅ Material-UI</li>
              <li>✅ Router</li>
              <li>✅ Theme</li>
            </ul>
          </div>
        </Router>
      </MuiThemeProvider>
    </StylesProvider>
  );
}; 