var Game = require('./Game.js');

require('javascript.util');
var ArrayList = javascript.util.ArrayList;

var method = GameBuilder.prototype

function GameBuilder() {

}
var games = new ArrayList;

method.buildGame = function (player1, player2) {
    games.add(new Game(player1, player2));
}

method.findGame = function (socket) {
    var gameList = games.toArray();
    var len = gameList.length;
    for (var i = 0; i < len; i++) {
        var game = gameList[i];
        //console.log(game)
        if (game.findSocket(socket)) {
            return game;
        }
    }
}

module.exports = GameBuilder;