"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
var Piece_1 = require('./Piece');
var Rook = (function (_super) {
    __extends(Rook, _super);
    function Rook(isWhite) {
        _super.call(this, isWhite);
    }
    Rook.prototype.getPieceImage = function () {
        if (this.isWhite)
            return "w_rook.png";
        else
            return "b_rook.png";
    };
    Rook.prototype.checkRules = function (fromRow, fromCol, toRow, toCol, _field) {
        if (!this.commonBeforeRule(fromRow, fromCol, toRow, toCol, _field)) {
            return false;
        }
        if (fromRow != toRow && fromCol != toCol) {
            return false;
        }
        return this.validateRookMoves(fromRow, fromCol, toRow, toCol, _field);
    };
    Rook.prototype.validateRookMoves = function (fromRow, fromCol, toRow, toCol, _field) {
        if (fromRow == toRow) {
            if (fromCol < toCol) {
                if (!this.checkIfHorizontalEmptyTillTargetField(fromRow, fromCol + 1, toCol - 1, _field)) {
                    return false;
                }
            }
            else if (!this.checkIfHorizontalEmptyTillTargetField(fromRow, toCol + 1, fromCol - 1, _field)) {
                return false;
            }
        }
        else {
            if (fromRow < toRow) {
                if (!this.checkIfVerticalEmptyTillTargetField(fromCol, fromRow + 1, toRow - 1, _field)) {
                    return false;
                }
            }
            else if (!this.checkIfVerticalEmptyTillTargetField(fromCol, toRow + 1, fromRow - 1, _field)) {
                return false;
            }
        }
        return true;
    };
    Rook = __decorate([
        core_1.Component({
            providers: [Piece_1.Piece]
        }), 
        __metadata('design:paramtypes', [Boolean])
    ], Rook);
    return Rook;
}(Piece_1.Piece));
exports.Rook = Rook;
//# sourceMappingURL=Rook.js.map