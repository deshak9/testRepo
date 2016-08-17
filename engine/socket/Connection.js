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

        player1.getSocket().emit("game created", {"isWhite": false, "opponentName": "Jonu"});
        player2.getSocket().emit("game created", {"isWhite": true, "opponentName": "Monu"});

    }
}

method.processDisconnectedClient = function (socket) {
    socketConnection.removeClientFromPool(socket)
}


method.removeClient = function (socket, data) {
    socketConnection.removeClientFromPool(socket);
}

method.endGameWithWinner = function (socket, data) {
    var opponentPlayer = this.getOpponentPlayer(socket);

    socket.emit("I lost the game", {"iLost": true});
    opponentPlayer.getSocket().emit("I lost the game", {"iLost": false});
}

method.moveOpponent = function (socket, data) {
    var opponentPlayer = this.getOpponentPlayer(socket);
    opponentPlayer.getSocket().emit('opponent move', data);
}

method.getOpponentPlayer = function (socket) {
    var game = gameBuilder.findGame(socket);
    return game.findOpponentPlayer(socket);
}

module.exports = Connection;