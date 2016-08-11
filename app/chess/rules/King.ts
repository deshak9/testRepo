import {Component, Query, QueryList, Provider} from '@angular/core';
import {Piece} from './Piece';

@Component({
    providers: [Piece]
})

export class King extends Piece {

    public constructor(isWhite:boolean) {
        super(isWhite);
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
}