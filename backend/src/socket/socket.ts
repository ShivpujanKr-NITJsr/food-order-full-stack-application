import { Server } from 'socket.io';

let io: Server;

export const initSocket = (server: any) => {
  io = new Server(server, {
    cors: {
      origin: ['http://localhost:5173', 'http://localhost:5174'],

      methods: ['GET', 'POST'],

      credentials: true,
    },
  });

  io.on('connection', (socket) => {
    console.log('Socket connected:', socket.id);
  });
};

export const getIO = () => {
  if (!io) {
    throw new Error('Socket not initialized');
  }

  return io;
};
