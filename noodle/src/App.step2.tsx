import React from 'react';
import { CssBaseline, MuiThemeProvider, StylesProvider } from '@material-ui/core';
import { Router } from 'react-router';
import { lavender as theme } from './theme/theme';
import history from './history';

export const App: React.FC = () => {
  console.log('🚀 PopSpace App - Étape 2: Material-UI + Router + History');
  
  return (
    <StylesProvider injectFirst>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Router history={history}>
          <div style={{ 
            padding: '20px', 
            fontFamily: 'Arial, sans-serif',
            backgroundColor: '#f0f0f0',
            minHeight: '100vh'
          }}>
            <h1 style={{ color: '#333' }}>🎯 PopSpace - Étape 2: Router ajouté</h1>
            <p>Si vous voyez ce message, le Router et History fonctionnent !</p>
            <div style={{ 
              marginTop: '20px', 
              padding: '15px', 
              backgroundColor: '#fff', 
              borderRadius: '8px',
              border: '1px solid #ddd'
            }}>
              <h2>✅ Tests réussis :</h2>
              <ul>
                <li>✅ React</li>
                <li>✅ Material-UI</li>
                <li>✅ Theme (lavender)</li>
                <li>✅ Router</li>
                <li>✅ History</li>
              </ul>
            </div>
            <p style={{ marginTop: '20px', color: '#666' }}>
              Timestamp: {new Date().toLocaleString()}
            </p>
            <p style={{ marginTop: '10px', color: '#666' }}>
              Current URL: {window.location.pathname}
            </p>
          </div>
        </Router>
      </MuiThemeProvider>
    </StylesProvider>
  );
}; 