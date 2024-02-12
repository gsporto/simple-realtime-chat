import express from 'express';
import { createServer } from 'node:http';
import { Server } from 'socket.io';

const port = process.env.PORT || 3000;

const app = express();
const server = createServer(app);
const io = new Server(server);

server.listen(port, () => {
  console.log('Server listening at port %d', port);
});

io.on('connection', socket => {

  console.log(socket)
  socket.on('disconnect', () => {

  });
});
