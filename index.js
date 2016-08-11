var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use('/node_modules', express.static(__dirname + '/node_modules/'));
app.use('/app', express.static(__dirname + '/app/'));
app.use('/systemjs.config.js', express.static(__dirname + '/systemjs.config.js'));

app.get('/', function (req, res) {
    //res.send('<h1>Hello world</h1>');
    res.sendFile(__dirname + '/index.html');
});

var Connection = require("./engine/socket/Connection.js");

var connection = new Connection();
io.on('connection', function (socket) {

    socket.on('disconnect', function () {
        connection.processDisconnectedClient(socket)
        console.log('user disconnected');
    });

    socket.on('new player added', function (data) {
        connection.processClient(socket);
    });

    socket.on('game end', function (data) {
        connection.removeClient(socket, data);
    });

    socket.on('my move', function (data) {
        connection.moveOpponent(socket, data);
    });

});


http.listen(3002, function () {
    console.log('listening on *:3002');
});