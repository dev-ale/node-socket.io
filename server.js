'use strict';

const express = require('express');
const socketIO = require('socket.io');

const PORT = process.env.PORT || 3000;
const INDEX = '/index.html';

const server = express()
  .use((req, res) => res.sendFile(INDEX, { root: __dirname }))
  .listen(PORT, () => console.log(`Listening on ${PORT}`));

const io = socketIO(server);

var position = {
  x: 200,
  y: 200
};


io.on('connection', (socket) => {
  socket.emit("position", position);
  socket.on("move", data => {
    switch(data) {
      case "left":
        position.x -= 5;
        Socketio.emit("position", position);
        break;
      case "right":
        position.x += 5;
        Socketio.emit("position", position);
        break;
      case "up":
        position.y -= 5;
        Socketio.emit("position", position);
        break;
      case "down":
        position.y += 5;
        Socketio.emit("position", position);
        break;
    }
  });
});

setInterval(() => io.emit('time', new Date().toTimeString()), 1000);
