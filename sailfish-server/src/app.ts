import express from 'express';
import http from 'http';
import { initSocket } from './socket/socketManager';

const app = express();
const server = http.createServer(app);

app.get('/', (_, res) => {
    res.send('Hello, World!');
});

initSocket(server);

server.listen(3000, () => {
    console.log('Server started listening on port 3000');
});
