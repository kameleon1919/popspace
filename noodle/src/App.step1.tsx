import React from 'react';
import { CssBaseline, MuiThemeProvider, StylesProvider } from '@material-ui/core';
import { lavender as theme } from './theme/theme';

export const App: React.FC = () => {
  console.log('🚀 PopSpace App - Étape 1: Material-UI + Theme');
  
  return (
    <StylesProvider injectFirst>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <div style={{ 
          padding: '20px', 
          fontFamily: 'Arial, sans-serif',
          backgroundColor: '#f0f0f0',
          minHeight: '100vh'
        }}>
          <h1 style={{ color: '#333' }}>🎯 PopSpace - Étape 1: Material-UI</h1>
          <p>Si vous voyez ce message, Material-UI et le thème fonctionnent !</p>
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
              <li>✅ Material-UI StylesProvider</li>
              <li>✅ MuiThemeProvider</li>
              <li>✅ Theme (lavender)</li>
              <li>✅ CssBaseline</li>
            </ul>
          </div>
          <p style={{ marginTop: '20px', color: '#666' }}>
            Timestamp: {new Date().toLocaleString()}
          </p>
        </div>
      </MuiThemeProvider>
    </StylesProvider>
  );
}; 