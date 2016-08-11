var Player = require('../game/Player.js');

require('javascript.util');
var ArrayList = javascript.util.ArrayList;

var HashMap = require('hashmap');
var Array = require('array');


var method = SocketConnection.prototype
function SocketConnection() {

}

/*var players = new ArrayList;*/
var players = new HashMap();

method.getClientFromPool = function () {
    var arr = players.keys();
    if (arr.length > 0) {
        var player = players.get(arr[0]);
        players.remove(player.getSocketId());
        return player;
    }
    return null;
}

method.addClientToPool = function (socket) {
    var player = new Player(socket);
    players.set(socket.id, player);
    console.log("Connected Client ");
}

method.checkIfRecentlyDisconnected = function (socket) {
    /*players[socket.id] = socket;
     console.log(socket.id);*/
}

method.removeClientFromPool = function (socket) {
    players.remove(socket.id);
}


method.getPlayer = function (socket) {
    return new Player(socket);
}

module.exports = SocketConnection;