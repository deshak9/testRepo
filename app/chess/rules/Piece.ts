import {NgFor} from "@angular/common";
import forEach = require("core-js/fn/array/for-each");
export class Piece {

    public isKing:boolean = false;
    private _isWhite:boolean = false;
    isEmpty:boolean = true;
    row:number;
    col:number;
    backgroundCSS:string;
    predictionLis = Array < Piece >();

    public constructor(isWhite:boolean, row:number, col:number) {
        this._isWhite = isWhite;
        this.row = row;
        this.col = col;

        if ((row + col) % 2 == 0)
            this.backgroundCSS = "bg-gray";
        else
            this.backgroundCSS = "bg-white";
    }

    public checkIfEmpty():boolean {
        return this.isEmpty;
    }


    public get isWhite():boolean {
        return this._isWhite;
    }

    public updateMyLocation(row:number, col:number) {
        this.row = row;
        this.col = col;
        this.updateCSS();
    }

    public updateCSS() {
        if ((this.row + this.col) % 2 == 0)
            this.backgroundCSS = "bg-gray";
        else
            this.backgroundCSS = "bg-white";
    }

    public setExtraBackgroundCSS(bgCSS:String) {
        this.backgroundCSS = this.backgroundCSS + " " + bgCSS;
    }

    public removeExtraBackgroundCSS() {
        this.updateCSS();
    }

    public getBackgroundCSS() {
        return this.backgroundCSS;

    }

    public commonBeforeRule(fromRow:number, fromCol:number, toRow:number, toCol:number, _field:Piece[][]):boolean {
        if (fromRow == toRow && fromCol == toCol) {
            return false;
        }
        if (!_field[toRow][toCol].isEmpty) {
            if (this.isWhite && _field[toRow][toCol].isWhite) { // if user killing his own piece
                return false;
            }
            if (!this.isWhite && !_field[toRow][toCol].isWhite) {
                return false;
            }
        }

        return true;
    }

    public commonAfterRule(fromRow:number, fromCol:number, toRow:number, toCol:number):boolean {
        if (fromRow == toRow && fromCol == toCol) {
            return false;
        }
    }

    public checkRules(fromRow:number, fromCol:number, toRow:number, toCol:number, _field:Piece[][]):boolean {
        return false;
    }

    public getPieceImage():string {
        return "";
    }

    public predictMoveForSelectedPiece(_field:Piece[][]) {
    }

    public checkIfVerticalEmptyTillTargetField(col:number, fromRow:number, toRow:number, _field:Piece[][]):boolean {
        while (fromRow <= toRow) {
            if (!_field[fromRow][col].isEmpty) {
                return false;
            }
            fromRow++;
        }
        return true;
    }

    public checkIfHorizontalEmptyTillTargetField(row:number, fromCol:number, toCol:number, _field:Piece[][]):boolean {
        while (fromCol <= toCol) {
            if (!_field[row][fromCol].isEmpty) {
                return false;
            }
            fromCol++;
        }
        return true;
    }

    public checkIfDiagonallyForwardEmptyTillTargetField(fromRow:number, fromCol:number, toRow:number, toCol:number, _field:Piece[][]):boolean {
        while (fromCol <= toCol) {
            if (!_field[fromRow][fromCol].isEmpty) {
                return false;
            }
            fromRow++;
            fromCol++;
        }
        return true;
    }

    public checkIfDiagonallyBackwardEmptyTillTargetField(fromRow:number, fromCol:number, toRow:number, toCol:number, _field:Piece[][]):boolean {
        while (fromRow <= toRow) {
            if (!_field[fromRow][fromCol].isEmpty) {
                return false;
            }
            fromRow++;
            fromCol--;
        }
        return true;
    }

    public addToPredictionList(piece:Piece) {
        this.predictionLis.push(piece);
        piece.setExtraBackgroundCSS("gb-piece-selected");
    }

    public findPieceInPredictionList(piece:Piece):boolean {
        if (this.predictionLis.indexOf(piece) >= 0) {
            return true;
        }
        return false;
    }

    public checkIfValidPiece(row:number, col:number):boolean {
        if (row < 8 && row > -1 && col < 8 && col > -1) {
            return true;
        }
        return false;
    }

    public clearPredictionList() {
        this.predictionLis.forEach(function (piece) {
            piece.removeExtraBackgroundCSS();
        })
        this.predictionLis.length = 0;
    }

    /*this.predictionLis.push("hheeee");
     this.predictionLis.push("afag");
     this.predictionLis.length = 0;
     alert("findMe " + this.pre dictionLis.indexOf("hheeeee") + this.findMe("hheeee"));
     alert(this.predictionLis.pop());
     alert(this.predictionLis.pop());*/
}