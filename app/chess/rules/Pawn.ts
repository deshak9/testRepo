import {Component, Query, QueryList, Provider} from '@angular/core';
import {Piece} from './Piece';
import from = require("core-js/fn/array/from");

@Component({
    providers: [Piece]
})

export class Pawn extends Piece {
    public constructor(isWhite:boolean) {
        super(isWhite);
    }

    isFirstMove:boolean = true;


    public getPieceImage():string {
        if (this.isWhite)
            return "w_pawn.png";
        else
            return "b_pawn.png";
    }

    public checkRules(fromRow:number, fromCol:number, toRow:number, toCol:number, _field:Piece[][]):boolean {
        if (!this.commonBeforeRule(fromRow, fromCol, toRow, toCol, _field)) {
            return false;
        }
        if (this.isWhite) {
            if (toRow >= fromRow) // if pawn moved backward
                return false;
            if (fromCol == toCol) { // if pawn moved vertical line
                if (_field[toRow][toCol] != null) {  // if pawn is trying to move an occupied field
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
        } else {
            if (toRow <= fromRow) {
                return false;
            }

            if (fromCol == toCol) { // if pawn moved vertical line
                if (_field[toRow][toCol] != null) {  // if pawn is trying to move an occupied field
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
    }

}