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
var Rook_1 = require("./Rook");
var Bishop_1 = require("./Bishop");
var Queen = (function (_super) {
    __extends(Queen, _super);
    function Queen(isWhite) {
        _super.call(this, isWhite);
    }
    Queen.prototype.getPieceImage = function () {
        if (this.isWhite)
            return "w_queen.png";
        else
            return "b_queen.png";
    };
    Queen.prototype.checkRules = function (fromRow, fromCol, toRow, toCol, _field) {
        if (!this.commonBeforeRule(fromRow, fromCol, toRow, toCol, _field)) {
            return false;
        }
        if (fromRow == toRow || fromCol == toCol) {
            return new Rook_1.Rook(this.isWhite).validateRookMoves(fromRow, fromCol, toRow, toCol, _field);
        }
        else {
            if (Math.abs(fromRow - toRow) != Math.abs(fromCol - toCol))
                return false;
            // If queen move like bishop
            return new Bishop_1.Bishop(this.isWhite).validateBishopMove(fromRow, fromCol, toRow, toCol, _field);
        }
    };
    Queen = __decorate([
        core_1.Component({
            providers: [Piece_1.Piece]
        }), 
        __metadata('design:paramtypes', [Boolean])
    ], Queen);
    return Queen;
}(Piece_1.Piece));
exports.Queen = Queen;
//# sourceMappingURL=Queen.js.map