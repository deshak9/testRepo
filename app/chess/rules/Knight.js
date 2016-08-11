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
var Knight = (function (_super) {
    __extends(Knight, _super);
    function Knight(isWhite) {
        _super.call(this, isWhite);
    }
    Knight.prototype.getPieceImage = function () {
        if (this.isWhite)
            return "w_knight.png";
        else
            return "b_knight.png";
    };
    Knight.prototype.checkRules = function (fromRow, fromCol, toRow, toCol, _field) {
        if (!this.commonBeforeRule(fromRow, fromCol, toRow, toCol, _field)) {
            return false;
        }
        if (((fromRow - 2) == toRow) && ((fromCol - 1) == toCol) ||
            ((fromRow - 2) == toRow) && ((fromCol + 1) == toCol) ||
            ((fromRow + 2) == toRow) && ((fromCol - 1) == toCol) ||
            ((fromRow + 2) == toRow) && ((fromCol + 1) == toCol) ||
            ((fromCol - 2) == toCol) && ((fromRow - 1) == toRow) ||
            ((fromCol - 2) == toCol) && ((fromRow + 1) == toRow) ||
            ((fromCol + 2) == toCol) && ((fromRow - 1) == toRow) ||
            ((fromCol + 2) == toCol) && ((fromRow + 1) == toRow)) {
            return true;
        }
        return false;
    };
    Knight = __decorate([
        core_1.Component({
            providers: [Piece_1.Piece]
        }), 
        __metadata('design:paramtypes', [Boolean])
    ], Knight);
    return Knight;
}(Piece_1.Piece));
exports.Knight = Knight;
//# sourceMappingURL=Knight.js.map