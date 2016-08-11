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
var Pawn = (function (_super) {
    __extends(Pawn, _super);
    function Pawn(isWhite) {
        _super.call(this, isWhite);
        this.isFirstMove = true;
    }
    Pawn.prototype.getPieceImage = function () {
        if (this.isWhite)
            return "w_pawn.png";
        else
            return "b_pawn.png";
    };
    Pawn.prototype.checkRules = function (fromRow, fromCol, toRow, toCol, _field) {
        if (!this.commonBeforeRule(fromRow, fromCol, toRow, toCol, _field)) {
            return false;
        }
        if (this.isWhite) {
            if (toRow >= fromRow)
                return false;
            if (fromCol == toCol) {
                if (_field[toRow][toCol] != null) {
                    return false;
                }
                if (this.isFirstMove) {
                    if ((fromRow - toRow) > 2)
                        return false;
                }
                else {
                    if ((fromRow - toRow) > 1)
                        return false;
                }
                if (this.checkIfVerticalEmptyTillTargetField(fromCol, toRow + 1, fromRow - 1, _field)) {
                    this.isFirstMove = false;
                    return true;
                }
            }
            else {
                if (_field[toRow][toCol] != null) {
                    if (((fromRow - 1) == toRow) && ((fromCol - 1) == toCol)) {
                        return true;
                    }
                    if (((fromRow - 1) == toRow) && ((fromCol + 1) == toCol)) {
                        return true;
                    }
                }
            }
        }
        else {
            if (toRow <= fromRow) {
                return false;
            }
            if (fromCol == toCol) {
                if (_field[toRow][toCol] != null) {
                    return false;
                }
                if (this.isFirstMove) {
                    if ((toRow - fromRow) > 2)
                        return false;
                }
                else {
                    if ((toRow - fromRow) > 1)
                        return false;
                }
                if (this.checkIfVerticalEmptyTillTargetField(fromCol, fromRow + 1, toRow - 1, _field)) {
                    this.isFirstMove = false;
                    return true;
                }
            }
            else {
                if (_field[toRow][toCol] != null) {
                    if (((fromRow + 1) == toRow) && ((fromCol - 1) == toCol)) {
                        return true;
                    }
                    if (((fromRow + 1) == toRow) && ((fromCol + 1) == toCol)) {
                        return true;
                    }
                }
            }
        }
        return false;
    };
    Pawn = __decorate([
        core_1.Component({
            providers: [Piece_1.Piece]
        }), 
        __metadata('design:paramtypes', [Boolean])
    ], Pawn);
    return Pawn;
}(Piece_1.Piece));
exports.Pawn = Pawn;
//# sourceMappingURL=Pawn.js.map