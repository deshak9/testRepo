var Game = require('./Game.js');
var method = GameBuilder.prototype

function GameBuilder() {

}
var games = {};

method.buildGame = function (player1, player2) {
    new Game()
}

module.exports = GameBuilder;