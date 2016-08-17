import {Component, Query, QueryList, Provider} from '@angular/core';
import {Piece} from './Piece';

@Component({
    providers: [Piece]
})

export class King extends Piece {

    public constructor(isWhite:boolean, row:number, col:number) {
        super(isWhite, row, col);
        this.isEmpty = false;
        this.isKing = true;
    }


    public getPieceImage():string {
        if (this.isWhite)
            return "w_king.png";
        else
            return "b_king.png";
    }

    public checkRules(fromRow:number, fromCol:number, toRow:number, toCol:number, _field:Piece[][]):boolean {
        if (!this.commonBeforeRule(fromRow, fromCol, toRow, toCol, _field)) {
            return false;
        }
        if (Math.abs(toRow - fromRow) > 1 || Math.abs(toCol - fromCol) > 1)
            return false;

        return true;
    }

    public predictMoveForSelectedPiece(_field:Piece[][]) {
        this.canFieldBeAdded(this.row - 1, this.col, _field);
        this.canFieldBeAdded(this.row + 1, this.col, _field);
        this.canFieldBeAdded(this.row, this.col - 1, _field);
        this.canFieldBeAdded(this.row, this.col + 1, _field);

        this.canFieldBeAdded(this.row - 1, this.col - 1, _field);
        this.canFieldBeAdded(this.row + 1, this.col - 1, _field);
        this.canFieldBeAdded(this.row - 1, this.col + 1, _field);
        this.canFieldBeAdded(this.row + 1, this.col + 1, _field);
    }
}