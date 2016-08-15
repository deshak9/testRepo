import {Component, Query, QueryList, Provider} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Chessboard} from './chessboard';
import {Piece} from './rules/Piece';
import {Queen} from "./rules/Queen";
import {King} from "./rules/King";
import {Pawn} from "./rules/Pawn";
import {Rook} from "./rules/Rook";
import {Knight} from "./rules/Knight";
import {Bishop} from "./rules/Bishop";
import * as io from 'socket.io-client';
@Component({
    selector: 'chessboard',
    templateUrl: 'app/chess/ChessboardComponent.html',
    providers: [Chessboard]
})

export class ChessboardComponent {
    socket = null;

    opponentName:String = "";
    canIPlay:boolean = false;
    isWhite:boolean;
    blackThenWhite:String = "black-then-white";
    whiteThenBlack:String = "white-then-black";
    chessboardLoading:String = "chess-loading-show ";

    constructor(private chessboard:Chessboard) {
        this.socket = io();
        this.socket.emit("new player added", {"name": "prabhat", "age": 27});
        this.socket.on('opponent move', function (data) {
            this.moveOpponentMove(data["fromRow"], data["fromCol"], data["toRow"], data["toCol"]);
        }.bind(this));

        this.socket.on('game created', function (data) {
            this.isWhite = data["isWhite"];
            this.opponentName = data["opponentName"];
            this.canIPlay = this.isWhite;    // If its white, then you can play
            if (this.isWhite) {                      // show chessboard according to the user color
                this.blackThenWhite = "black-then-white-show";
            } else {
                this.whiteThenBlack = "white-then-black-show";
            }
            this.chessboardLoading = "chess-loading-hide";
        }.bind(this));
    }

    public todos:Number[] = [0, 1, 2, 3, 4, 5, 6, 7];
    public todosreverse:Number[] = [7, 6, 5, 4, 3, 2, 1, 0];

    public imageLocation(row:number, col:number):string {
        return "app/img/" + this.imageFileName(row, col);
    }

    public backgroundCSS(row:number, col:number):string {
        if ((row + col) % 2 == 0)
            return "bg-gray";
        else
            return "bg-white";
    }

    private getPiece(row:number, col:number):Piece {
        return this.chessboard.getFieldValue(row, col);
    }


    private imageFileName(row:number, col:number):string {

        var piece = this.getPiece(row, col);
        if (piece == null)
            return "empty.png";

        return this.getPiece(row, col).getPieceImage();
    }

    clickCount:number = 0;
    firstRowClick:number;
    firstColClick:number;

    public onclick(row:number, col:number) {

        if (this.clickCount == 0) {
            this.clickCount = 1;
            this.firstRowClick = row;
            this.firstColClick = col;
            //this.chessboard.displayPrediction(); // TODO
            if (!this.chessboard.onClick(row, col, this.isWhite)) {
                this.clickCount = 0;
            }
        } else if (this.clickCount == 1) {
            if (this.firstRowClick == row && this.firstColClick == col) {
                //this.chessboard.unDisplayPrediction() // TODO
            } else {
                this.ondragdrop(row, col, false);

            }
            this.clickCount = 0;
        }

    }

    public ondragstart(row:number, col:number) {
        this.chessboard.onClick(row, col, this.isWhite);
    }

    whoseTurn:string = "White";

    public moveOpponentMove(fromRow:number, fromCol:number, toRow:number, toCol:number) {

        this.chessboard.onClick(fromRow, fromCol, !this.isWhite);
        this.canIPlay = this.chessboard.move(toRow, toCol, this.socket, true);
    }

    public ondragdrop(row:number, col:number, isOpponentMove:boolean) {
        if (this.canIPlay) {
            this.canIPlay = this.chessboard.move(row, col, this.socket, isOpponentMove);
        }

    }

    public ondragover(row:number, col:number) {
        event.preventDefault();
    }

}
