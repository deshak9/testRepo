"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var chessboard_1 = require('./chessboard');
var io = require('socket.io-client');
var ChessboardComponent = (function () {
    function ChessboardComponent(chessboard) {
        this.chessboard = chessboard;
        this.socket = null;
        this.opponentName = "";
        this.canIPlay = false;
        this.moveOpponent = "";
        this.todos = [0, 1, 2, 3, 4, 5, 6, 7];
        this.whoseTurn = "White";
        this.socket = io();
        this.socket.emit("new player added", { "name": "prabhat", "age": 27 });
        this.socket.on('opponent move', function (data) {
            this.moveOpponentMove(data["fromRow"], data["fromCol"], data["toRow"], data["toCol"]);
            this.moveOpponent = " " + data["fromRow"] + " " + data["fromCol"] + " " + data["toRow"] + " " + data["toCol"];
        }.bind(this));
        this.socket.on('game created', function (data) {
            this.isWhite = data["isWhite"];
            this.opponentName = data["opponentName"];
            this.canIPlay = this.isWhite; // If its white, then you can play
        }.bind(this));
    }
    ChessboardComponent.prototype.imageLocation = function (row, col) {
        return "app/img/" + this.imageFileName(row, col);
    };
    ChessboardComponent.prototype.backgroundCSS = function (row, col) {
        if ((row + col) % 2 == 0)
            return "bg-gray";
        else
            return "bg-white";
    };
    ChessboardComponent.prototype.imageFileName = function (row, col) {
        this.piece = this.chessboard.getFieldValue(row, col);
        if (this.piece == null)
            return "empty.png";
        return this.piece.getPieceImage();
    };
    ChessboardComponent.prototype.onclick = function (row, col) {
        //alert(row + " " + col);
        //this.chessboard.onClick(row, col);
    };
    ChessboardComponent.prototype.ondragstart = function (row, col) {
        this.chessboard.onClick(row, col, this.isWhite);
    };
    ChessboardComponent.prototype.moveOpponentMove = function (fromRow, fromCol, toRow, toCol) {
        this.chessboard.onClick(fromRow, fromCol, !this.isWhite);
        this.canIPlay = this.chessboard.move(toRow, toCol, this.socket, true);
    };
    ChessboardComponent.prototype.ondragdrop = function (row, col, isOpponentMove) {
        if (this.canIPlay) {
            this.canIPlay = this.chessboard.move(row, col, this.socket, isOpponentMove);
        }
    };
    ChessboardComponent.prototype.ondragover = function (row, col) {
        event.preventDefault();
    };
    ChessboardComponent = __decorate([
        core_1.Component({
            selector: 'chessboard',
            templateUrl: 'app/chess/ChessboardComponent.html',
            providers: [chessboard_1.Chessboard]
        }), 
        __metadata('design:paramtypes', [chessboard_1.Chessboard])
    ], ChessboardComponent);
    return ChessboardComponent;
}());
exports.ChessboardComponent = ChessboardComponent;
//# sourceMappingURL=ChessboardComponent.js.map