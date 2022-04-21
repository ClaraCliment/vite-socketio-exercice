const express = require ('express');
const app = express();
const http = require('http');
const { Server } = require ('socket.io');
const cors = require('cors');
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['POST', 'GET'],
    },
})

io.on('connection', (socket) => {
    socket.emit('receive_message', "Hello dear Client, I am the Server!")

    socket.on('send_message', (data) => {
        console.log(data)
    })
} )

server.listen(3001, () => {
    console.log('🚀🚀 Server is running on port 3001! 🚀🚀')
})