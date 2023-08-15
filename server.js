const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server);

const PORT = 8000;

const messages = [];

io.on('connection', (socket) => {
  console.log('A user connected');

  // Send all the previous messages to the newly connected client
  socket.emit('previousMessages', messages);

  socket.on('message', (message) => {
    messages.push(message);
    // Broadcast the new message to all connected clients
    io.emit('message', message);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

server.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
