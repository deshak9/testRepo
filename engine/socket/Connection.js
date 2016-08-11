var SocketConnection = require("./SocketConnection.js");
var GameBuilder = require("../game/GameBuilder.js");

var method = Connection.prototype

var socketConnection = new SocketConnection();
var gameBuilder = new GameBuilder();

function Connection() {

}

method.processClient = function (socket) {
    //socketConnection.checkIfRecentlyDisconnected(socket)    // check if player was disconnected and connected back
    var player2 = socketConnection.getClientFromPool();
    if (player2 == null) {
        socketConnection.addClientToPool(socket)
    } else {
        var player1 = socketConnection.getPlayer(socket);
        gameBuilder.buildGame(player1, player2);

        player1.getSocket().emit("game created", "name:Prabhat");
        player2.getSocket().emit("game created", "name:Prabhat");
    }
}

method.processDisconnectedClient = function (socket) {
    socketConnection.removeClientToPool(socket)
}


method.removeClient = function (socket, data) {
    socketConnection.removeClientToPool(socket)
}

module.exports = Connection;