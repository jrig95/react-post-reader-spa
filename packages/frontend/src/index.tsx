import React from 'react';
import { render } from 'react-dom';
import { App } from './App';
import { bootstrap } from './bootstrap';
import { AuthProvider } from './contexts/AuthContext';
import './global.css'

bootstrap().render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
