import {Component, Query, QueryList, Provider} from '@angular/core';
import {Piece} from './Piece';

@Component({
    providers: [Piece]
})

export class Rook extends Piece {
    public constructor(isWhite:boolean) {
        super(isWhite);
    }


    public getPieceImage():string {
        if (this.isWhite)
            return "w_rook.png";
        else
            return "b_rook.png";
    }

    public checkRules(fromRow:number, fromCol:number, toRow:number, toCol:number, _field:Piece[][]):boolean {
        if (!this.commonBeforeRule(fromRow, fromCol, toRow, toCol, _field)) {
            return false;
        }

        if (fromRow != toRow && fromCol != toCol) { // if rook does not move vertical or horizontal
            return false;
        }

        return this.validateRookMoves(fromRow, fromCol, toRow, toCol, _field);
    }

    public validateRookMoves(fromRow:number, fromCol:number, toRow:number, toCol:number, _field:Piece[][]):boolean {
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
    }
}