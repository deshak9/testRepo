import {Component, Query, QueryList, Provider} from '@angular/core';
import {Piece} from './Piece';

@Component({
    providers: [Piece]
})

export class Knight extends Piece {
    public constructor(isWhite:boolean, row:number, col:number) {
        super(isWhite, row, col);
        this.isEmpty = false;
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

    public predictMoveForSelectedPiece(field:Piece[][]) {
        if ((this.row - 2) > -1 && (this.col - 1) > -1 &&
            this.checkRules(this.row, this.col, this.row - 2, this.col - 1, field)) {

            this.addToPredictionList(field[this.row - 2][this.col - 1]);
        }

        if ((this.row - 2) > -1 && (this.col + 1) < 8 &&
            this.checkRules(this.row, this.col, this.row - 2, this.col + 1, field)) {

            this.addToPredictionList(field[this.row - 2][this.col + 1]);
        }

        if ((this.row + 2) < 8 && (this.col - 1) > -1 &&
            this.checkRules(this.row, this.col, this.row + 2, this.col - 1, field)) {

            this.addToPredictionList(field[this.row + 2][this.col - 1]);
        }

        if ((this.row + 2) < 8 && (this.col + 1) < 8 &&
            this.checkRules(this.row, this.col, this.row + 2, this.col + 1, field)) {

            this.addToPredictionList(field[this.row + 2][this.col + 1]);
        }

        if ((this.row - 1) > -1 && (this.col - 2) > -1 &&
            this.checkRules(this.row, this.col, this.row - 1, this.col - 2, field)) {

            this.addToPredictionList(field[this.row - 1][this.col - 2]);
        }

        if ((this.row - 1) > -1 && (this.col + 2) < 8 &&
            this.checkRules(this.row, this.col, this.row - 1, this.col + 2, field)) {

            this.addToPredictionList(field[this.row - 1][this.col + 2]);
        }

        if ((this.row + 1) < 8 && (this.col - 2) > -1 &&
            this.checkRules(this.row, this.col, this.row + 1, this.col - 2, field)) {

            this.addToPredictionList(field[this.row + 1][this.col - 2]);
        }

        if ((this.row + 1) < 8 && (this.col + 2) < 8 &&
            this.checkRules(this.row, this.col, this.row + 1, this.col + 2, field)) {

            this.addToPredictionList(field[this.row + 1][this.col + 2]);
        }
    }
}