"use strict";
var Pawn_1 = require("./rules/Pawn");
var Rook_1 = require("./rules/Rook");
var Knight_1 = require("./rules/Knight");
var Bishop_1 = require("./rules/Bishop");
var Queen_1 = require("./rules/Queen");
var King_1 = require("./rules/King");
var Chessboard = (function () {
    function Chessboard() {
        this._fields = [
            [new Rook_1.Rook(false), new Knight_1.Knight(false), new Bishop_1.Bishop(false), new Queen_1.Queen(false), new King_1.King(false), new Bishop_1.Bishop(false), new Knight_1.Knight(false), new Rook_1.Rook(false)],
            [new Pawn_1.Pawn(false), new Pawn_1.Pawn(false), new Pawn_1.Pawn(false), new Pawn_1.Pawn(false), new Pawn_1.Pawn(false), new Pawn_1.Pawn(false), new Pawn_1.Pawn(false), new Pawn_1.Pawn(false)],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [new Pawn_1.Pawn(true), new Pawn_1.Pawn(true), new Pawn_1.Pawn(true), new Pawn_1.Pawn(true), new Pawn_1.Pawn(true), new Pawn_1.Pawn(true), new Pawn_1.Pawn(true), new Pawn_1.Pawn(true)],
            [new Rook_1.Rook(true), new Knight_1.Knight(true), new Bishop_1.Bishop(true), new Queen_1.Queen(true), new King_1.King(true), new Bishop_1.Bishop(true), new Knight_1.Knight(true), new Rook_1.Rook(true)]
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
    Chessboard.prototype.onClick = function (row, col, isWhite) {
        if (this._fields[row][col] == null) {
            return false;
        }
        this.clicked = true;
        this.fromRow = row;
        this.fromCol = col;
        if (isWhite) {
            this.isWhiteAllowed = true;
            this.whoseTurn = "White";
        }
        else {
            this.isWhiteAllowed = false;
            this.whoseTurn = "Black";
        }
        return true;
    };
    Chessboard.prototype.move = function (toRow, toCol, socket, isOpponentMove) {
        //alert(this.clicked + " Old Move " + this.fromRow + " " + this.fromCol + " new Points " + toRow + " " + toCol);
        if (this.clicked) {
            this.clicked = false;
            this.piece = this._fields[this.fromRow][this.fromCol];
            if (!(this.isWhiteAllowed !== this.piece.isWhite)) {
                if (this.piece.checkRules(this.fromRow, this.fromCol, toRow, toCol, this._fields)) {
                    if (this._fields[toRow][toCol] != null && this._fields[toRow][toCol].isKing) {
                    }
                    this._fields[toRow][toCol] = this._fields[this.fromRow][this.fromCol];
                    this._fields[this.fromRow][this.fromCol] = null;
                    this.whoseTurn = this.piece.isWhite ? "Black" : "White";
                    //this.isWhiteAllowed = this.isWhiteAllowed ? false : true;
                    if (!isOpponentMove) {
                        socket.emit("my move", {
                            "fromRow": this.fromRow,
                            "fromCol": this.fromCol,
                            "toRow": toRow,
                            "toCol": toCol
                        });
                        return false;
                    }
                    return true;
                }
            }
        }
        return true;
    };
    return Chessboard;
}());
exports.Chessboard = Chessboard;
//# sourceMappingURL=chessboard.js.map