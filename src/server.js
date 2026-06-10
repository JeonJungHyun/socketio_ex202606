const path = require('node:path');
const http = require('node:http');
const express = require('express');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '..', 'public')));

io.on('connection', (socket) => {
  socket.emit('system:message', 'Connected to Socket.IO server.');
  socket.broadcast.emit('system:message', 'A user joined the chat.');

  socket.on('chat:message', (message) => {
    const text = String(message || '').trim();

    if (!text) {
      return;
    }

    io.emit('chat:message', {
      id: socket.id,
      text,
      sentAt: new Date().toISOString()
    });
  });

  socket.on('disconnect', () => {
    socket.broadcast.emit('system:message', 'A user left the chat.');
  });
});

server.listen(PORT, () => {
  console.log(`Socket.IO server listening on http://localhost:${PORT}`);
});
