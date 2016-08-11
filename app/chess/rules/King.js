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
var King = (function (_super) {
    __extends(King, _super);
    function King(isWhite) {
        _super.call(this, isWhite);
        this.isKing = true;
    }
    King.prototype.getPieceImage = function () {
        if (this.isWhite)
            return "w_king.png";
        else
            return "b_king.png";
    };
    King.prototype.checkRules = function (fromRow, fromCol, toRow, toCol, _field) {
        if (!this.commonBeforeRule(fromRow, fromCol, toRow, toCol, _field)) {
            return false;
        }
        if (Math.abs(toRow - fromRow) > 1 || Math.abs(toCol - fromCol) > 1)
            return false;
        return true;
    };
    King = __decorate([
        core_1.Component({
            providers: [Piece_1.Piece]
        }), 
        __metadata('design:paramtypes', [Boolean])
    ], King);
    return King;
}(Piece_1.Piece));
exports.King = King;
//# sourceMappingURL=King.js.map