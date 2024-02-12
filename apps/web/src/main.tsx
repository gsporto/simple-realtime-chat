import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import '@repo/ui/globals.css';
import { ThemeProvider } from '@repo/ui/theme-provider';
import { SocketProvider } from './context/socket.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <SocketProvider>
        <App />
      </SocketProvider>
    </ThemeProvider>
  </React.StrictMode>,
);
