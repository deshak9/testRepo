import {Component, Query, QueryList, Provider} from '@angular/core';
import {Piece} from './Piece';
import {Rook} from "./Rook";
import {Knight} from "./Knight";
import {Bishop} from "./Bishop";


@Component({
    providers: [Piece]
})

export class Queen extends Piece {
    public constructor(isWhite:boolean, row:number, col:number) {
        super(isWhite, row, col);
        this.isEmpty = false;
    }

    /// These just to call some of methods, don't use these pretending real
    fakeBishop:Bishop = new Bishop(this.isWhite, 0, 0);
    fakeRook:Rook = new Rook(this.isWhite, 0, 0);

    public getPieceImage():string {
        if (this.isWhite)
            return "w_queen.png";
        else
            return "b_queen.png";
    }

    public checkRules(fromRow:number, fromCol:number, toRow:number, toCol:number, _field:Piece[][]):boolean {
        if (!this.commonBeforeRule(fromRow, fromCol, toRow, toCol, _field)) {
            return false;
        }

        if (fromRow == toRow || fromCol == toCol) { // if queen move like ROOK
            return this.fakeRook.validateRookMoves(fromRow, fromCol, toRow, toCol, _field)
        } else {
            if (Math.abs(fromRow - toRow) != Math.abs(fromCol - toCol))
                return false;

            // If queen move like fakeBishop
            return this.fakeBishop.validateBishopMove(fromRow, fromCol, toRow, toCol, _field);
        }
    }

    public predictMoveForSelectedPiece(_field:Piece[][]) {
        this.selectAllBishopMoves(this.row, this.col, _field);
        this.selectAllRookMoves(this.row, this.col, _field);
    }
}