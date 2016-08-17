import {Component, Query, QueryList, Provider} from '@angular/core';
import {Piece} from './Piece';
import from = require("core-js/fn/array/from");
import {root} from "rxjs/util/root";

@Component({
    providers: [Piece]
})

export class Pawn extends Piece {
    public constructor(isWhite:boolean, row:number, col:number) {
        super(isWhite, row, col);
        this.isEmpty = false;
    }

    isFirstMove:boolean = true;


    public getPieceImage():string {
        if (this.isWhite)
            return "w_pawn.png";
        else
            return "b_pawn.png";
    }

    public checkRules(fromRow:number, fromCol:number, toRow:number, toCol:number, _field:Piece[][]):boolean {
        return this._checkRules(fromRow, fromCol, toRow, toCol, _field, true)
    }

    private _checkRules(fromRow:number, fromCol:number, toRow:number, toCol:number, _field:Piece[][], changeFirstMove:boolean):boolean {

        if (!this.commonBeforeRule(fromRow, fromCol, toRow, toCol, _field)) {
            return false;
        }
        if (this.isFirstMove) {
            if ((Math.abs(fromRow - toRow)) > 2)
                return false;
        }
        else {
            if (Math.abs(fromRow - toRow) > 1)
                return false;
        }
        if (this.isWhite) {
            if (toRow >= fromRow) // if pawn moved backward
                return false;
            if (fromCol == toCol) { // if pawn moved vertical line
                if (!_field[toRow][toCol].isEmpty) {  // if pawn is trying to move an occupied field
                    return false;
                }
                if (this.checkIfVerticalEmptyTillTargetField(fromCol, toRow + 1, fromRow - 1, _field)) {
                    if (changeFirstMove) {
                        this.isFirstMove = false;
                    }
                    return true;
                }
            }
            else {
                if (!_field[toRow][toCol].isEmpty) {
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
                if (!_field[toRow][toCol].isEmpty) {  // if pawn is trying to move an occupied field
                    return false;
                }

                if (this.checkIfVerticalEmptyTillTargetField(fromCol, fromRow + 1, toRow - 1, _field)) {
                    if (changeFirstMove) {
                        this.isFirstMove = false;
                    }
                    return true;
                }
            }
            else {
                if (!_field[toRow][toCol].isEmpty) {
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

    public predictMoveForSelectedPiece(_field:Piece[][]) {
        if (this.isWhite) {
            if (this.checkIfValidPiece(this.row - 2, this.col) &&
                this._checkRules(this.row, this.col, this.row - 2, this.col, _field, false)) { // pawn first move should be on top
                this.addToPredictionList(_field[this.row - 2][this.col]);
            }
            if (this.checkIfValidPiece(this.row - 1, this.col - 1) &&
                this._checkRules(this.row, this.col, this.row - 1, this.col - 1, _field, false)) {
                this.addToPredictionList(_field[this.row - 1][this.col - 1]);
            }
            if (this.checkIfValidPiece(this.row - 1, this.col + 1) &&
                this._checkRules(this.row, this.col, this.row - 1, this.col + 1, _field, false)) {
                this.addToPredictionList(_field[this.row - 1][this.col + 1]);
            }
            if (this.checkIfValidPiece(this.row - 1, this.col) &&
                this._checkRules(this.row, this.col, this.row - 1, this.col, _field, false)) {
                this.addToPredictionList(_field[this.row - 1][this.col]);
            }

        } else {
            if (this.checkIfValidPiece(this.row + 2, this.col) &&
                this._checkRules(this.row, this.col, this.row + 2, this.col, _field, false)) {
                this.addToPredictionList(_field[this.row + 2][this.col]);
            }
            if (this.checkIfValidPiece(this.row + 1, this.col - 1) &&
                this._checkRules(this.row, this.col, this.row + 1, this.col - 1, _field, false)) {
                this.addToPredictionList(_field[this.row + 1][this.col - 1]);
            }
            if (this.checkIfValidPiece(this.row + 1, this.col + 1) &&
                this._checkRules(this.row, this.col, this.row + 1, this.col + 1, _field, false)) {
                this.addToPredictionList(_field[this.row + 1][this.col + 1]);
            }
            if (this.checkIfValidPiece(this.row + 1, this.col) &&
                this._checkRules(this.row, this.col, this.row + 1, this.col, _field, false)) {
                this.addToPredictionList(_field[this.row + 1][this.col]);
            }
        }
    }
}