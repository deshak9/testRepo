"use strict";
var Piece = (function () {
    function Piece(isWhite) {
        this.isKing = false;
        this._isWhite = false;
        this._isWhite = isWhite;
    }
    Object.defineProperty(Piece.prototype, "isWhite", {
        get: function () {
            return this._isWhite;
        },
        enumerable: true,
        configurable: true
    });
    Piece.prototype.commonBeforeRule = function (fromRow, fromCol, toRow, toCol, _field) {
        if (fromRow == toRow && fromCol == toCol) {
            return false;
        }
        if (_field[toRow][toCol] != null) {
            if (this.isWhite && _field[toRow][toCol].isWhite) {
                return false;
            }
            if (!this.isWhite && !_field[toRow][toCol].isWhite) {
                return false;
            }
        }
        return true;
    };
    Piece.prototype.commonAfterRule = function (fromRow, fromCol, toRow, toCol) {
        if (fromRow == toRow && fromCol == toCol) {
            return false;
        }
    };
    Piece.prototype.checkRules = function (fromRow, fromCol, toRow, toCol, _field) {
        return false;
    };
    Piece.prototype.getPieceImage = function () {
        return "";
    };
    Piece.prototype.checkIfVerticalEmptyTillTargetField = function (col, fromRow, toRow, _field) {
        while (fromRow <= toRow) {
            if (_field[fromRow][col] != null) {
                return false;
            }
            fromRow++;
        }
        return true;
    };
    Piece.prototype.checkIfHorizontalEmptyTillTargetField = function (row, fromCol, toCol, _field) {
        while (fromCol <= toCol) {
            if (_field[row][fromCol] != null) {
                return false;
            }
            fromCol++;
        }
        return true;
    };
    Piece.prototype.checkIfDiagonallyForwardEmptyTillTargetField = function (fromRow, fromCol, toRow, toCol, _field) {
        while (fromCol <= toCol) {
            if (_field[fromRow][fromCol] != null) {
                return false;
            }
            fromRow++;
            fromCol++;
        }
        return true;
    };
    Piece.prototype.checkIfDiagonallyBackwardEmptyTillTargetField = function (fromRow, fromCol, toRow, toCol, _field) {
        while (fromRow <= toRow) {
            if (_field[fromRow][fromCol] != null) {
                return false;
            }
            fromRow++;
            fromCol--;
        }
        return true;
    };
    return Piece;
}());
exports.Piece = Piece;
//# sourceMappingURL=Piece.js.map