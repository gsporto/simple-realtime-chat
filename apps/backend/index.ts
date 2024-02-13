import express from 'express';
import { createServer } from 'node:http';
import { Server } from 'socket.io';

type Query = {
  userId: string;
  userName: string;
  userImage: string;
};

type UserMap = {
  socketId: string;
  userId: string;
  userName: string;
  userImage: string;
};

const port = process.env.PORT || 3000;

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

server.listen(port, () => {
  console.log('Server listening at port %d', port);
});

const users = new Map<string, UserMap>();

function parseUsersList() {
  const list = [];
  for (const [key, value] of users) {
    list.push({ id: key, name: value.userName, image: value.userImage });
  }
  return list;
}

io.on('connection', socket => {
  const query = socket.handshake.query as Query;
  users.set(query.userId, {
    socketId: socket.id,
    userId: query.userId,
    userImage: query.userImage,
    userName: query.userName,
  });

  socket.emit('users', parseUsersList());
  socket.broadcast.emit('user-connect', {
    id: query.userId,
    name: query.userName,
    image: query.userImage,
  });

  socket.on('new-message', body => {
    const targetUser = users.get(body.idTarget);
    if (targetUser?.socketId && query.userId) {
      io.to(targetUser.socketId).emit('new-message', {
        id: Date.now().toString(),
        userId: query.userId,
        text: body.text,
      });
    }
  });

  socket.on('disconnect', () => {
    users.delete(socket.handshake.query.userId as string);
    socket.emit('user-disconnect', {
      id: query.userId,
      name: query.userName,
      image: query.userImage,
    });
  });
});
