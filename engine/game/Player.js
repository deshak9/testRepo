var method = Player.prototype

function Player(socket) {
    this.socket = socket;
}

var socket;

method.getPlayerId = function () {
    return this.socket.id;
}

method.getSocket = function () {
    return this.socket;
}

module.exports = Player;