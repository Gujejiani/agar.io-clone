// agar.io

const express = require('express');
const app = express();
app.use(express.static(__dirname+'/public'));
const expressServer = app.listen(3=9000);

const socketio = require('socket.io');
const io = socketio(expressServer);

io.on('connection', (socket) => {
    socket.emit('messageFromServer', {data: 'Welcome to the socketio server'});
    socket.on('messageToServer', (dataFromClient) => {
        console.log(dataFromClient);
    });
    socket.on('newMessageToServer', (msg) => {
        // console.log(msg);
        io.emit('messageToClients', {text: msg.text});
    });
})


