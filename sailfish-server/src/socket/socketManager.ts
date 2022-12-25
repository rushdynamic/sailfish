import { Server } from 'http';
import { Server as SocketServer } from 'socket.io';

const initSocket = (server: Server) => {
    const socketServer = new SocketServer(server);
    socketServer.on('connection', (socket) => {
        console.log('A socket has connected:' + socket);
    });
};

export { initSocket };
