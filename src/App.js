import React from 'react';
import { Chat } from './components/Chat';
import { SocketProvider } from './components/SocketContext';
import './App.css';

function App() {
  return (
    <SocketProvider>
      <Chat />
    </SocketProvider>
  );
}

export default App;
