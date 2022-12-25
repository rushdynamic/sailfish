import express from 'express';
import http from 'http';

const app = express();
const server = http.createServer(app);

app.get('/', (_, res) => {
    res.send('Hello, World!');
});

server.listen(3000, () => {
    console.log('Server started listening on port 3000');
});
