const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

let userCount = 0;

io.on('connection', (socket) => {
    userCount++;
    io.emit('updateUserCount', userCount); // Обновляем количество пользователей

    socket.on('chatMessage', (msg) => {
        socket.broadcast.emit('chatMessage', msg); // Отправляем другим пользователям
    });

    socket.on('disconnect', () => {
        userCount--;
        io.emit('updateUserCount', userCount); // Обновляем количество пользователей
    });
});

app.use(express.static(__dirname + '/public'));
server.listen(3000, () => console.log('Сервер работает на http://localhost:3000'));
