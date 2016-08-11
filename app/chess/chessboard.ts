import {Component, Provider} from '@angular/core';
import {Piece} from './rules/Piece';
import {Pawn} from "./rules/Pawn";
import {Rook} from "./rules/Rook";
import {Knight} from "./rules/Knight";
import {Bishop} from "./rules/Bishop";
import {Queen} from "./rules/Queen";
import {King} from "./rules/King";

export class Chessboard {
    private _fields:Piece[][] = [
        [new Rook(false), new Knight(false), new Bishop(false), new Queen(false), new King(false), new Bishop(false), new Knight(false), new Rook(false)],
        [new Pawn(false), new Pawn(false), new Pawn(false), new Pawn(false), new Pawn(false), new Pawn(false), new Pawn(false), new Pawn(false)],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [new Pawn(true), new Pawn(true), new Pawn(true), new Pawn(true), new Pawn(true), new Pawn(true), new Pawn(true), new Pawn(true)],
        [new Rook(true), new Knight(true), new Bishop(true), new Queen(true), new King(true), new Bishop(true), new Knight(true), new Rook(true)]
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

    public onClick(row:number, col:number, isWhite:boolean):boolean {
        if (this._fields[row][col] == null) {
            return false;
        }

        this.clicked = true;
        this.fromRow = row;
        this.fromCol = col;

        if (isWhite) {
            this.isWhiteAllowed = true;
            this.whoseTurn = "White";
        }
        else {
            this.isWhiteAllowed = false;
            this.whoseTurn = "Black";
        }

        return true;
    }


    public move(toRow:number, toCol:number, socket, isOpponentMove:boolean):boolean {
        //alert(this.clicked + " Old Move " + this.fromRow + " " + this.fromCol + " new Points " + toRow + " " + toCol);
        if (this.clicked) {
            this.clicked = false;

            this.piece = this._fields[this.fromRow][this.fromCol];

            if (!(this.isWhiteAllowed !== this.piece.isWhite)) { // Alternative move between black and white

                if (this.piece.checkRules(this.fromRow, this.fromCol, toRow, toCol, this._fields)) {
                    if (this._fields[toRow][toCol] != null && this._fields[toRow][toCol].isKing) {
                        /*if (this._fields[this.fromRow][this.fromCol].isWhite)
                         alert("White Wins!!!!!");
                         else
                         alert("Black Wins!!!!!");*/
                    }
                    this._fields[toRow][toCol] = this._fields[this.fromRow][this.fromCol];
                    this._fields[this.fromRow][this.fromCol] = null;
                    this.whoseTurn = this.piece.isWhite ? "Black" : "White";
                    //this.isWhiteAllowed = this.isWhiteAllowed ? false : true;
                    if (!isOpponentMove) {
                        socket.emit("my move", {
                            "fromRow": this.fromRow,
                            "fromCol": this.fromCol,
                            "toRow": toRow,
                            "toCol": toCol
                        });
                        return false;
                    }
                    return true;
                }

            }
        }
        return true;
    }


}