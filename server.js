const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const bodyParser = require('body-parser');

const port = process.env.PORT || 8000;
const index = require('./routes/index');

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(index);

const server = http.createServer(app);
const io = socketIo(server);

io.on('connection', socket => {
    console.log('New user connected');

    socket.on('disconnect', () => {
        console.log('User has disconnected');
    });
});

server.listen(port, () => console.log(`Listening on port ${port}`));
