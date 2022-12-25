import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);
const socketServer = new Server(server);

app.get('/', (_, res) => {
    res.send('Hello, World!');
});

socketServer.on('connection', (socket) => {
    console.log('A socket has connected:' + socket);
});

server.listen(3000, () => {
    console.log('Server started listening on port 3000');
});
