// filepath: /Users/vivekchaurasia/Desktop/Projects/whatsapp-clone/server.js
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  }
});

io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg); // broadcast to all clients
  });
});

server.listen(4000, () => {
  console.log('Socket.IO server running on port 4000');
});