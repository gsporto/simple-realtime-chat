import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './globals.css';
import { UserMessageProvider, ThemeProvider } from './context';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <UserMessageProvider>
        <App />
      </UserMessageProvider>
    </ThemeProvider>
  </React.StrictMode>,
);
