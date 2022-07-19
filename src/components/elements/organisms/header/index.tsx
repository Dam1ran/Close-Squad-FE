import { AppBar } from '@mui/material';
import { Container } from '@mui/system';
import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { useEffect, useRef, useState } from 'react';

export const Header = () => {
  const connectedRef = useRef(false);
  const [connection, setConnection] = useState<HubConnection>();
  const [email, setEmail] = useState('');
  useEffect(() => {
    if (connectedRef.current) {
      const connection = new HubConnectionBuilder()
        .withUrl('https://localhost:7271/MainHub')
        .configureLogging(LogLevel.Warning)
        .build();
      setConnection(connection);
      connection.on('ReceiveMessage', (payload) => {
        console.log('ReceiveMessage: ', payload);
      });

      const start = async () => await connection.start();
      start();
    }
    return () => {
      connectedRef.current = true;
    };
  }, []);

  const closeConnection = () => {
    // connection?.state
    connection?.stop();
    const zoi = '*';
  };

  const sendMessage = async () => {
    try {
      await connection?.invoke('SendMessage', { user: '', message: email });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <AppBar position="static" sx={{ height: '50px' }}>
      <Container maxWidth="xl">
        <button onClick={sendMessage}>Send</button>
        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
        <button onClick={closeConnection}>Disconnect</button>
      </Container>
    </AppBar>
  );
};
