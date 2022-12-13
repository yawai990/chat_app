const express = require('express');
const http = require('http');
const socketio= require('socket.io');
const app = express();
const server = http.createServer(app);
const cors = require('cors');

app.use(cors())

const io = socketio(server,{
    cors:{
        origin:'http://localhost:3001'
    }
});

app.get('/', (req,res) => {
    res.send('server is running')
});

io.on('connection', (socket) => {

    socket.on('join', ({message}) => {
        console.log('useer connected')
        console.log(message) 
        socket.emit('admin_message', { user: 'admin', message : 'admin_message from server'})
    })
})

server.listen(5000, () => console.log('server is running in port 5000'));