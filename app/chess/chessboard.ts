import {Component, Provider} from '@angular/core';
import {Piece} from './rules/Piece';
import {Pawn} from "./rules/Pawn";
import {Rook} from "./rules/Rook";
import {Knight} from "./rules/Knight";
import {Bishop} from "./rules/Bishop";
import {Queen} from "./rules/Queen";
import {King} from "./rules/King";
import from = require("core-js/fn/array/from");

export class Chessboard {
    private _fields:Piece[][] = [
        [new Rook(false, 0, 0), new Knight(false, 0, 1), new Bishop(false, 0, 2), new Queen(false, 0, 3),
            new King(false, 0, 4), new Bishop(false, 0, 5), new Knight(false, 0, 6), new Rook(false, 0, 7)],
        [new Pawn(false, 1, 0), new Pawn(false, 1, 1), new Pawn(false, 1, 2), new Pawn(false, 1, 3),
            new Pawn(false, 1, 4), new Pawn(false, 1, 5), new Pawn(false, 1, 6), new Pawn(false, 1, 7)],

        [new Piece(false, 2, 0), new Piece(false, 2, 1), new Piece(false, 2, 2), new Piece(false, 2, 3),
            new Piece(false, 2, 4), new Piece(false, 2, 5), new Piece(false, 2, 6), new Piece(false, 2, 7)],
        [new Piece(false, 3, 0), new Piece(false, 3, 1), new Piece(false, 3, 2), new Piece(false, 3, 3),
            new Piece(false, 3, 4), new Piece(false, 3, 5), new Piece(false, 3, 6), new Piece(false, 3, 7)],
        [new Piece(false, 4, 0), new Piece(false, 4, 1), new Piece(false, 4, 2), new Piece(false, 4, 3),
            new Piece(false, 4, 4), new Piece(false, 4, 5), new Piece(false, 4, 6), new Piece(false, 4, 7)],
        [new Piece(false, 5, 0), new Piece(false, 5, 1), new Piece(false, 5, 2), new Piece(false, 5, 3),
            new Piece(false, 5, 4), new Piece(false, 5, 5), new Piece(false, 5, 6), new Piece(false, 5, 7)],

        [new Pawn(true, 6, 0), new Pawn(true, 6, 1), new Pawn(true, 6, 2), new Pawn(true, 6, 3),
            new Pawn(true, 6, 4), new Pawn(true, 6, 5), new Pawn(true, 6, 6), new Pawn(true, 6, 7)],
        [new Rook(true, 7, 0), new Knight(true, 7, 1), new Bishop(true, 7, 2), new Queen(true, 7, 3),
            new King(true, 7, 4), new Bishop(true, 7, 5), new Knight(true, 7, 6), new Rook(true, 7, 7)]
    ];
    piece:Piece;

    public constructor() {

    }


    public getFieldValue(row:number, col:number):Piece {
        return this._fields[row][col];
    }

    private fromRow:number;
    private fromCol:number;
    private clicked:boolean = false;

    private isWhiteAllowed = true;
    whoseTurn:string = "White";

    public setIsWhite() {
    }

    public getBackgroundCSS(row:number, col:number):string {
        return this._fields[row][col].getBackgroundCSS();
    }

    private checkIfEmpty(row:number, col:number):boolean {
        if (this._fields[row][col].isEmpty) {
            return true
        }
        return false;
    }

    private checkIfAllowed(row, col):boolean {
        if ((this.isWhiteAllowed !== this._fields[row][col].isWhite)) {
            return false;
        }
        return true;
    }

    public checkIfValidClick(row:number, col:number, isWhite:boolean):boolean {
        if (!this.checkIfEmpty(row, col) && (this._fields[row][col].isWhite == isWhite)) {
            return true;
        }
        return false;
    }

    public displayPrediction(row:number, col:number) {
        this._fields[row][col].predictMoveForSelectedPiece(this._fields);
    }

    public unDisplayPrediction(row:number, col:number) {
        this._fields[row][col].clearPredictionList();
    }


    public onClick(row:number, col:number, isWhite:boolean):boolean {
        if (!this.checkIfValidClick(row, col, isWhite)) {
            return false;
        }
        if (isWhite) {
            this.isWhiteAllowed = true;
        }
        else {
            this.isWhiteAllowed = false;
        }

        this.clicked = true;
        this.fromRow = row;
        this.fromCol = col;
        return true;
    }


    public move(toRow:number, toCol:number, socket, isOpponentMove:boolean):boolean {
        if (this.clicked) {
            this.piece = this._fields[this.fromRow][this.fromCol];
            if (this.piece.checkRules(this.fromRow, this.fromCol, toRow, toCol, this._fields)) {
                this.clicked = false;

                this.piece.clearPredictionList();

                var temp = this._fields[toRow][toCol];
                this._fields[toRow][toCol] = this._fields[this.fromRow][this.fromCol];
                temp.isEmpty = true;
                this._fields[this.fromRow][this.fromCol] = temp;

                this.isWhiteAllowed = this.isWhiteAllowed ? false : true;

                this._fields[this.fromRow][this.fromCol].updateMyLocation(this.fromRow, this.fromCol);
                this._fields[toRow][toCol].updateMyLocation(toRow, toCol);

                if (!this._fields[toRow][toCol].isEmpty && this._fields[toRow][toCol].isKing) {
                    /*if (this._fields[this.fromRow][this.fromCol].isWhite)
                     alert("White Wins!!!!!");
                     else
                     alert("Black Wins!!!!!");*/
                }

                if (!isOpponentMove) {
                    this.callOpponent(socket, toRow, toCol);
                    return false;
                }
            }
        }
        return true;
    }


    private callOpponent(socket, toRow:number, toCol:number) {
        socket.emit("my move", {
            "fromRow": this.fromRow,
            "fromCol": this.fromCol,
            "toRow": toRow,
            "toCol": toCol
        });
    }
}