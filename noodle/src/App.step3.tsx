import React from 'react';
import { CssBaseline, MuiThemeProvider, StylesProvider } from '@material-ui/core';
import { Router } from 'react-router';
import { FlaggProvider } from 'flagg/dist/react';
import { lavender as theme } from './theme/theme';
import history from './history';
import { featureFlags } from './featureFlags';
import { Toaster } from './components/Toaster/Toaster';
import { SoundEffectProvider } from './components/SoundEffectProvider/SoundEffectProvider';
import AppStateProvider from './state';

export const App: React.FC = () => {
  console.log('🚀 PopSpace App - Étape 3: Test AppStateProvider');
  
  return (
    <FlaggProvider featureFlags={featureFlags}>
      <StylesProvider injectFirst>
        <MuiThemeProvider theme={theme}>
          <Toaster />
          <CssBaseline />
          <Router history={history}>
            <AppStateProvider>
              <SoundEffectProvider>
                <div style={{ 
                  padding: '20px', 
                  fontFamily: 'Arial, sans-serif',
                  backgroundColor: '#f0f0f0',
                  minHeight: '100vh'
                }}>
                  <h1 style={{ color: '#333' }}>🎯 PopSpace - Étape 3: AppStateProvider</h1>
                  <p>Si vous voyez ce message, AppStateProvider fonctionne !</p>
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
                      <li>✅ Material-UI + Theme</li>
                      <li>✅ Router + History</li>
                      <li>✅ FlaggProvider</li>
                      <li>✅ Toaster</li>
                      <li>✅ SoundEffectProvider</li>
                      <li>✅ AppStateProvider (Redux/State)</li>
                    </ul>
                  </div>
                  <p style={{ marginTop: '20px', color: '#666' }}>
                    Timestamp: {new Date().toLocaleString()}
                  </p>
                </div>
              </SoundEffectProvider>
            </AppStateProvider>
          </Router>
        </MuiThemeProvider>
      </StylesProvider>
    </FlaggProvider>
  );
};
