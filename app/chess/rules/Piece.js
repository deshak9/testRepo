"use strict";
var Piece = (function () {
    function Piece(isWhite, row, col) {
        this.isKing = false;
        this._isWhite = false;
        this.isEmpty = true;
        this.predictionLis = Array();
        this._isWhite = isWhite;
        this.row = row;
        this.col = col;
        if ((row + col) % 2 == 0)
            this.backgroundCSS = "bg-gray";
        else
            this.backgroundCSS = "bg-white";
    }
    Piece.prototype.checkIfEmpty = function () {
        return this.isEmpty;
    };
    Object.defineProperty(Piece.prototype, "isWhite", {
        get: function () {
            return this._isWhite;
        },
        enumerable: true,
        configurable: true
    });
    Piece.prototype.updateMyLocation = function (row, col) {
        this.row = row;
        this.col = col;
        this.updateCSS();
    };
    Piece.prototype.updateCSS = function () {
        if ((this.row + this.col) % 2 == 0)
            this.backgroundCSS = "bg-gray";
        else
            this.backgroundCSS = "bg-white";
    };
    Piece.prototype.setExtraBackgroundCSS = function (bgCSS) {
        this.backgroundCSS = this.backgroundCSS + " " + bgCSS;
    };
    Piece.prototype.removeExtraBackgroundCSS = function () {
        this.updateCSS();
    };
    Piece.prototype.getBackgroundCSS = function () {
        return this.backgroundCSS;
    };
    Piece.prototype.commonBeforeRule = function (fromRow, fromCol, toRow, toCol, _field) {
        if (fromRow == toRow && fromCol == toCol) {
            return false;
        }
        if (!_field[toRow][toCol].isEmpty) {
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
    Piece.prototype.predictMoveForSelectedPiece = function (_field) {
    };
    Piece.prototype.checkIfVerticalEmptyTillTargetField = function (col, fromRow, toRow, _field) {
        while (fromRow <= toRow) {
            if (!_field[fromRow][col].isEmpty) {
                return false;
            }
            fromRow++;
        }
        return true;
    };
    Piece.prototype.checkIfHorizontalEmptyTillTargetField = function (row, fromCol, toCol, _field) {
        while (fromCol <= toCol) {
            if (!_field[row][fromCol].isEmpty) {
                return false;
            }
            fromCol++;
        }
        return true;
    };
    Piece.prototype.checkIfDiagonallyForwardEmptyTillTargetField = function (fromRow, fromCol, toRow, toCol, _field) {
        while (fromCol <= toCol) {
            if (!_field[fromRow][fromCol].isEmpty) {
                return false;
            }
            fromRow++;
            fromCol++;
        }
        return true;
    };
    Piece.prototype.checkIfDiagonallyBackwardEmptyTillTargetField = function (fromRow, fromCol, toRow, toCol, _field) {
        while (fromRow <= toRow) {
            if (!_field[fromRow][fromCol].isEmpty) {
                return false;
            }
            fromRow++;
            fromCol--;
        }
        return true;
    };
    Piece.prototype.addToPredictionList = function (piece) {
        this.predictionLis.push(piece);
        piece.setExtraBackgroundCSS("gb-piece-selected");
    };
    Piece.prototype.findPieceInPredictionList = function (piece) {
        if (this.predictionLis.indexOf(piece) >= 0) {
            return true;
        }
        return false;
    };
    Piece.prototype.checkIfValidPiece = function (row, col) {
        if (row < 8 && row > -1 && col < 8 && col > -1) {
            return true;
        }
        return false;
    };
    Piece.prototype.clearPredictionList = function () {
        this.predictionLis.forEach(function (piece) {
            piece.removeExtraBackgroundCSS();
        });
        this.predictionLis.length = 0;
    };
    return Piece;
}());
exports.Piece = Piece;
//# sourceMappingURL=Piece.js.map