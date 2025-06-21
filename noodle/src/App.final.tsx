import React from 'react';
import { CssBaseline, MuiThemeProvider, StylesProvider } from '@material-ui/core';
import { FlaggProvider } from 'flagg/dist/react';
import { Router } from 'react-router';
import { SoundEffectProvider } from './components/SoundEffectProvider/SoundEffectProvider';
import { Toaster } from './components/Toaster/Toaster';
import { featureFlags } from './featureFlags';
import history from './history';
import { Routes } from './Routes';
import AppStateProvider from './state';
import { lavender as theme } from './theme/theme';

export const App: React.FC = () => {
  console.log('🚀 PopSpace App - VERSION FINALE: Avec Routes (va probablement planter)');
  
  return (
    <FlaggProvider featureFlags={featureFlags}>
      <StylesProvider injectFirst>
        <MuiThemeProvider theme={theme}>
          <Toaster />
          <CssBaseline />
          <Router history={history}>
            <AppStateProvider>
              <SoundEffectProvider>
                <Routes />
              </SoundEffectProvider>
            </AppStateProvider>
          </Router>
        </MuiThemeProvider>
      </StylesProvider>
    </FlaggProvider>
  );
}; 