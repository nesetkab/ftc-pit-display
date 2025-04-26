import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', (ws: import('ws').WebSocket) => {
  console.log('Client connected');

  ws.on('message', (message: string) => {
    console.log(`Received: ${message}`);
  });

  ws.send('Welcome to the FTC Pit Display WebSocket server!');
});

console.log('WebSocket server is running on ws://localhost:8080');