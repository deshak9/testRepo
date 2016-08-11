import {Component, Query, QueryList, Provider} from '@angular/core';
import {Piece} from './Piece';

@Component({
    providers: [Piece]
})

export class Knight extends Piece {
    public constructor(isWhite:boolean) {
        super(isWhite);
    }


    public getPieceImage():string {
        if (this.isWhite)
            return "w_knight.png";
        else
            return "b_knight.png";
    }

    public checkRules(fromRow:number, fromCol:number, toRow:number, toCol:number, _field:Piece[][]):boolean {
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

            return true
        }

        return false;
    }
}