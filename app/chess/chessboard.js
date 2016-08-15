"use strict";
var Piece_1 = require('./rules/Piece');
var Pawn_1 = require("./rules/Pawn");
var Rook_1 = require("./rules/Rook");
var Knight_1 = require("./rules/Knight");
var Bishop_1 = require("./rules/Bishop");
var Queen_1 = require("./rules/Queen");
var King_1 = require("./rules/King");
var Chessboard = (function () {
    function Chessboard() {
        this._fields = [
            [new Rook_1.Rook(false, 0, 0), new Knight_1.Knight(false, 0, 1), new Bishop_1.Bishop(false, 0, 2), new Queen_1.Queen(false, 0, 3),
                new King_1.King(false, 0, 4), new Bishop_1.Bishop(false, 0, 5), new Knight_1.Knight(false, 0, 6), new Rook_1.Rook(false, 0, 7)],
            [new Pawn_1.Pawn(false, 1, 0), new Pawn_1.Pawn(false, 1, 1), new Pawn_1.Pawn(false, 1, 2), new Pawn_1.Pawn(false, 1, 3),
                new Pawn_1.Pawn(false, 1, 4), new Pawn_1.Pawn(false, 1, 5), new Pawn_1.Pawn(false, 1, 6), new Pawn_1.Pawn(false, 1, 7)],
            [new Piece_1.Piece(false, 2, 0), new Piece_1.Piece(false, 2, 1), new Piece_1.Piece(false, 2, 2), new Piece_1.Piece(false, 2, 3),
                new Piece_1.Piece(false, 2, 4), new Piece_1.Piece(false, 2, 5), new Piece_1.Piece(false, 2, 6), new Piece_1.Piece(false, 2, 7)],
            [new Piece_1.Piece(false, 3, 0), new Piece_1.Piece(false, 3, 1), new Piece_1.Piece(false, 3, 2), new Piece_1.Piece(false, 3, 3),
                new Piece_1.Piece(false, 3, 4), new Piece_1.Piece(false, 3, 5), new Piece_1.Piece(false, 3, 6), new Piece_1.Piece(false, 3, 7)],
            [new Piece_1.Piece(false, 4, 0), new Piece_1.Piece(false, 4, 1), new Piece_1.Piece(false, 4, 2), new Piece_1.Piece(false, 4, 3),
                new Piece_1.Piece(false, 4, 4), new Piece_1.Piece(false, 4, 5), new Piece_1.Piece(false, 4, 6), new Piece_1.Piece(false, 4, 7)],
            [new Piece_1.Piece(false, 5, 0), new Piece_1.Piece(false, 5, 1), new Piece_1.Piece(false, 5, 2), new Piece_1.Piece(false, 5, 3),
                new Piece_1.Piece(false, 5, 4), new Piece_1.Piece(false, 5, 5), new Piece_1.Piece(false, 5, 6), new Piece_1.Piece(false, 5, 7)],
            [new Pawn_1.Pawn(true, 6, 0), new Pawn_1.Pawn(true, 6, 1), new Pawn_1.Pawn(true, 6, 2), new Pawn_1.Pawn(true, 6, 3),
                new Pawn_1.Pawn(true, 6, 4), new Pawn_1.Pawn(true, 6, 5), new Pawn_1.Pawn(true, 6, 6), new Pawn_1.Pawn(true, 6, 7)],
            [new Rook_1.Rook(true, 7, 0), new Knight_1.Knight(true, 7, 1), new Bishop_1.Bishop(true, 7, 2), new Queen_1.Queen(true, 7, 3),
                new King_1.King(true, 7, 4), new Bishop_1.Bishop(true, 7, 5), new Knight_1.Knight(true, 7, 6), new Rook_1.Rook(true, 7, 7)]
        ];
        this.clicked = false;
        this.isWhiteAllowed = true;
        this.whoseTurn = "White";
    }
    Chessboard.prototype.getFieldValue = function (row, col) {
        return this._fields[row][col];
    };
    Chessboard.prototype.setIsWhite = function () {
    };
    Chessboard.prototype.getBackgroundCSS = function (row, col) {
        return this._fields[row][col].getBackgroundCSS();
    };
    Chessboard.prototype.checkIfEmpty = function (row, col) {
        if (this._fields[row][col].isEmpty) {
            return true;
        }
        return false;
    };
    Chessboard.prototype.checkIfAllowed = function (row, col) {
        if ((this.isWhiteAllowed !== this._fields[row][col].isWhite)) {
            return false;
        }
        return true;
    };
    Chessboard.prototype.checkIfValidClick = function (row, col, isWhite) {
        if (!this.checkIfEmpty(row, col) && (this._fields[row][col].isWhite == isWhite)) {
            return true;
        }
        return false;
    };
    Chessboard.prototype.displayPrediction = function (row, col) {
        this._fields[row][col].predictMoveForSelectedPiece(this._fields);
    };
    Chessboard.prototype.unDisplayPrediction = function (row, col) {
        this._fields[row][col].clearPredictionList();
    };
    Chessboard.prototype.onClick = function (row, col, isWhite) {
        if (!this.checkIfValidClick(row, col, isWhite)) {
            return false;
        }
        if (isWhite) {
            this.isWhiteAllowed = true;
        }
        else {
            this.isWhiteAllowed = false;
        }
        this.clicked = true;
        this.fromRow = row;
        this.fromCol = col;
        return true;
    };
    Chessboard.prototype.move = function (toRow, toCol, socket, isOpponentMove) {
        if (this.clicked) {
            this.piece = this._fields[this.fromRow][this.fromCol];
            if (this.piece.checkRules(this.fromRow, this.fromCol, toRow, toCol, this._fields)) {
                this.clicked = false;
                this.piece.clearPredictionList();
                var temp = this._fields[toRow][toCol];
                this._fields[toRow][toCol] = this._fields[this.fromRow][this.fromCol];
                temp.isEmpty = true;
                this._fields[this.fromRow][this.fromCol] = temp;
                this.isWhiteAllowed = this.isWhiteAllowed ? false : true;
                this._fields[this.fromRow][this.fromCol].updateMyLocation(this.fromRow, this.fromCol);
                this._fields[toRow][toCol].updateMyLocation(toRow, toCol);
                if (!this._fields[toRow][toCol].isEmpty && this._fields[toRow][toCol].isKing) {
                }
                if (!isOpponentMove) {
                    this.callOpponent(socket, toRow, toCol);
                    return false;
                }
            }
        }
        return true;
    };
    Chessboard.prototype.callOpponent = function (socket, toRow, toCol) {
        socket.emit("my move", {
            "fromRow": this.fromRow,
            "fromCol": this.fromCol,
            "toRow": toRow,
            "toCol": toCol
        });
    };
    return Chessboard;
}());
exports.Chessboard = Chessboard;
//# sourceMappingURL=chessboard.js.map