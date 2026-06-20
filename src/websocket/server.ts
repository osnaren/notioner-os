import WebSocket, { RawData, WebSocketServer } from 'ws';

const wss = new WebSocketServer({ noServer: true });

wss.on('connection', (ws: WebSocket) => {
  console.log('Client connected');
  ws.send(JSON.stringify({ message: 'Welcome to the WebSocket server!' }));

  ws.on('message', (message: RawData) => {
    console.log('Received:', message);
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

const broadcast = (data: unknown) => {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data));
    }
  });
};

export { broadcast, wss };
