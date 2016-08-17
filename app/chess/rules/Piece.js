"use strict";
var Piece = (function () {
    function Piece(isWhite, row, col) {
        this.isKing = false;
        this._isWhite = false;
        this.isEmpty = true;
        this.predictionList = Array();
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
    Piece.prototype.amIKillingOwnBot = function (piece) {
        if (this.isWhite && piece.isWhite) {
            return true;
        }
        if (!this.isWhite && !piece.isWhite) {
            return true;
        }
        return false;
    };
    Piece.prototype.commonBeforeRule = function (fromRow, fromCol, toRow, toCol, _field) {
        if (fromRow == toRow && fromCol == toCol) {
            return false;
        }
        if (!_field[toRow][toCol].isEmpty) {
            if (this.amIKillingOwnBot(_field[toRow][toCol])) {
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
        this.predictionList.push(piece);
        piece.setExtraBackgroundCSS("gb-piece-selected");
    };
    Piece.prototype.findPieceInPredictionList = function (piece) {
        if (this.predictionList.indexOf(piece) >= 0) {
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
    Piece.prototype.canFieldBeAdded = function (row, col, field) {
        if (!this.checkIfNotOutOfBoard(row, col)) {
            return false;
        }
        var piece = field[row][col];
        if (!piece.isEmpty) {
            if (!this.amIKillingOwnBot(piece)) {
                this.addToPredictionList(piece);
            }
            return false;
        }
        this.addToPredictionList(piece);
        return true;
    };
    Piece.prototype.checkIfNotOutOfBoard = function (row, col) {
        if (row < 8 && row > -1 && col < 8 && col > -1) {
            return true;
        }
        return false;
    };
    Piece.prototype.clearPredictionList = function () {
        this.predictionList.forEach(function (piece) {
            piece.removeExtraBackgroundCSS();
        });
        this.predictionList.length = 0;
    };
    /*this.predictionList.push("hheeee");
     this.predictionList.push("afag");
     this.predictionList.length = 0;
     alert("findMe " + this.pre dictionLis.indexOf("hheeeee") + this.findMe("hheeee"));
     alert(this.predictionList.pop());
     alert(this.predictionList.pop());*/
    Piece.prototype.selectAllRookMoves = function (row, col, field) {
        this.selectTop(row - 1, col, field);
        this.selectBottom(row + 1, col, field);
        this.selectLeft(row, col - 1, field);
        this.selectRight(row, col + 1, field);
    };
    Piece.prototype.selectTop = function (row, col, field) {
        while (1) {
            if (!this.canFieldBeAdded(row, col, field)) {
                break;
            }
            row = row - 1;
        }
    };
    Piece.prototype.selectBottom = function (row, col, field) {
        while (1) {
            if (!this.canFieldBeAdded(row, col, field)) {
                break;
            }
            row = row + 1;
        }
    };
    Piece.prototype.selectLeft = function (row, col, field) {
        while (1) {
            if (!this.canFieldBeAdded(row, col, field)) {
                break;
            }
            col = col - 1;
        }
    };
    Piece.prototype.selectRight = function (row, col, field) {
        while (1) {
            if (!this.canFieldBeAdded(row, col, field)) {
                break;
            }
            col = col + 1;
        }
    };
    Piece.prototype.selectAllBishopMoves = function (row, col, field) {
        this.selectTopLeft(row - 1, col - 1, field);
        this.selectTopRight(row - 1, col + 1, field);
        this.selectBottomLeft(row + 1, col - 1, field);
        this.selectBottomRight(row + 1, col + 1, field);
    };
    Piece.prototype.selectTopLeft = function (row, col, field) {
        while (1) {
            if (!this.canFieldBeAdded(row, col, field)) {
                break;
            }
            row = row - 1;
            col = col - 1;
        }
    };
    Piece.prototype.selectTopRight = function (row, col, field) {
        while (1) {
            if (!this.canFieldBeAdded(row, col, field)) {
                break;
            }
            row = row - 1;
            col = col + 1;
        }
    };
    Piece.prototype.selectBottomLeft = function (row, col, field) {
        while (1) {
            if (!this.canFieldBeAdded(row, col, field)) {
                break;
            }
            row = row + 1;
            col = col - 1;
        }
    };
    Piece.prototype.selectBottomRight = function (row, col, field) {
        while (1) {
            if (!this.canFieldBeAdded(row, col, field)) {
                break;
            }
            row = row + 1;
            col = col + 1;
        }
    };
    Piece.prototype.checkIfKingInPredictionList = function () {
        var result = null;
        this.predictionList.forEach(function (piece) {
            if (piece.isKing) {
                result = piece;
            }
        });
        return result;
    };
    Piece.prototype.getPredictionList = function () {
        return this.predictionList;
    };
    return Piece;
}());
exports.Piece = Piece;
//# sourceMappingURL=Piece.js.map