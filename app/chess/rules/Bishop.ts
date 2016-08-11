import {Component, Query, QueryList, Provider} from '@angular/core';
import {Piece} from './Piece';
import from = require("core-js/fn/array/from");

@Component({
    providers: [Piece]
})

export class Bishop extends Piece {
    public constructor(isWhite:boolean) {
        super(isWhite);
    }

    public getPieceImage():string {
        if (this.isWhite)
            return "w_bishop.png";
        else
            return "b_bishop.png";
    }

    public checkRules(fromRow:number, fromCol:number, toRow:number, toCol:number, _field:Piece[][]):boolean {
        if (!this.commonBeforeRule(fromRow, fromCol, toRow, toCol, _field)) {
            return false;
        }

        if (Math.abs(fromRow - toRow) != Math.abs(fromCol - toCol))
            return false;

        return this.validateBishopMove(fromRow, fromCol, toRow, toCol, _field);
    }

    public validateBishopMove(fromRow:number, fromCol:number, toRow:number, toCol:number, _field:Piece[][]):boolean {
        if (fromRow < toRow && fromCol < toCol) {
            if (!this.checkIfDiagonallyForwardEmptyTillTargetField(fromRow + 1, fromCol + 1, toRow - 1, toCol - 1, _field)) {
                return false;
            }
        } else if (fromRow < toRow && fromCol > toCol) {
            if (!this.checkIfDiagonallyBackwardEmptyTillTargetField(fromRow + 1, fromCol - 1, toRow - 1, toCol + 1, _field)) {
                return false;
            }
        } else if (fromRow > toRow && fromCol > toCol) {
            if (!this.checkIfDiagonallyForwardEmptyTillTargetField(toRow + 1, toCol + 1, fromRow - 1, fromCol - 1, _field)) {
                return false;
            }
        } else if (fromRow > toRow && fromCol < toCol) {
            if (!this.checkIfDiagonallyBackwardEmptyTillTargetField(toRow + 1, toCol - 1, fromRow - 1, fromCol + 1, _field)) {
                return false;
            }
        }

        return true;
    }
}