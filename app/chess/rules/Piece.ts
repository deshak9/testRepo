import {NgFor} from "@angular/common";
import forEach = require("core-js/fn/array/for-each");
export class Piece {

    public isKing:boolean = false;
    private _isWhite:boolean = false;
    isEmpty:boolean = true;
    row:number;
    col:number;
    backgroundCSS:string;
    predictionList = Array < Piece >();

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

    public amIKillingOwnBot(piece:Piece):boolean {
        if (this.isWhite && piece.isWhite) { // if user killing his own piece
            return true;
        }
        if (!this.isWhite && !piece.isWhite) {
            return true;
        }
        return false;
    }

    public commonBeforeRule(fromRow:number, fromCol:number, toRow:number, toCol:number, _field:Piece[][]):boolean {
        if (fromRow == toRow && fromCol == toCol) {
            return false;
        }
        if (!_field[toRow][toCol].isEmpty) {
            if (this.amIKillingOwnBot(_field[toRow][toCol])) { // If i am killing own bot
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
        this.predictionList.push(piece);
        piece.setExtraBackgroundCSS("gb-piece-selected");
    }

    public findPieceInPredictionList(piece:Piece):boolean {
        if (this.predictionList.indexOf(piece) >= 0) {
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

    public canFieldBeAdded(row:number, col:number, field:Piece[][]) {
        if (!this.checkIfNotOutOfBoard(row, col)) {
            return false;
        }

        let piece = field[row][col];

        if (!piece.isEmpty) {
            if (!this.amIKillingOwnBot(piece)) {
                this.addToPredictionList(piece);
            }
            return false;
        }

        this.addToPredictionList(piece);
        return true;
    }


    public checkIfNotOutOfBoard(row:number, col:number) {
        if (row < 8 && row > -1 && col < 8 && col > -1) {
            return true;
        }
        return false;
    }

    public clearPredictionList() {
        this.predictionList.forEach(function (piece) {
            piece.removeExtraBackgroundCSS();
        })
        this.predictionList.length = 0;
    }

    /*this.predictionList.push("hheeee");
     this.predictionList.push("afag");
     this.predictionList.length = 0;
     alert("findMe " + this.pre dictionLis.indexOf("hheeeee") + this.findMe("hheeee"));
     alert(this.predictionList.pop());
     alert(this.predictionList.pop());*/


    public selectAllRookMoves(row:number, col:number, field:Piece[][]) {
        this.selectTop(row - 1, col, field);
        this.selectBottom(row + 1, col, field);
        this.selectLeft(row, col - 1, field);
        this.selectRight(row, col + 1, field);
    }

    private selectTop(row:number, col:number, field:Piece[][]) {
        while (1) {
            if (!this.canFieldBeAdded(row, col, field)) {
                break;
            }
            row = row - 1;
        }

    }

    private selectBottom(row:number, col:number, field:Piece[][]) {
        while (1) {
            if (!this.canFieldBeAdded(row, col, field)) {
                break;
            }
            row = row + 1;
        }
    }

    private selectLeft(row:number, col:number, field:Piece[][]) {
        while (1) {
            if (!this.canFieldBeAdded(row, col, field)) {
                break;
            }
            col = col - 1;
        }
    }

    private selectRight(row:number, col:number, field:Piece[][]) {
        while (1) {
            if (!this.canFieldBeAdded(row, col, field)) {
                break;
            }

            col = col + 1;
        }
    }

    public selectAllBishopMoves(row:number, col:number, field:Piece[][]) {
        this.selectTopLeft(row - 1, col - 1, field);
        this.selectTopRight(row - 1, col + 1, field);
        this.selectBottomLeft(row + 1, col - 1, field);
        this.selectBottomRight(row + 1, col + 1, field);
    }

    public selectTopLeft(row:number, col:number, field:Piece[][]) {
        while (1) {
            if (!this.canFieldBeAdded(row, col, field)) {
                break;
            }
            row = row - 1;
            col = col - 1;
        }
    }

    public selectTopRight(row:number, col:number, field:Piece[][]) {
        while (1) {
            if (!this.canFieldBeAdded(row, col, field)) {
                break;
            }
            row = row - 1;
            col = col + 1;
        }
    }

    public selectBottomLeft(row:number, col:number, field:Piece[][]) {
        while (1) {
            if (!this.canFieldBeAdded(row, col, field)) {
                break;
            }
            row = row + 1;
            col = col - 1;
        }
    }

    public selectBottomRight(row:number, col:number, field:Piece[][]) {
        while (1) {
            if (!this.canFieldBeAdded(row, col, field)) {
                break;
            }
            row = row + 1;
            col = col + 1;
        }
    }

    public checkIfKingInPredictionList():Piece {
        let result = null;
        this.predictionList.forEach(function (piece) {
            if (piece.isKing) {
                result = piece;
            }
        })
        return result;
    }

    public getPredictionList():Array < Piece > {
        return this.predictionList;
    }

}