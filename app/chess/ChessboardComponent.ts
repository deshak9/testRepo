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

    constructor(private chessboard:Chessboard) {
        this.socket = io();
        this.socket.emit("new player added", {"name": "prabhat", "age": 27});
        this.socket.on('opponent move', function (data) {
            this.moveOpponentMove(data["fromRow"], data["fromCol"], data["toRow"], data["toCol"]);
        }.bind(this));
    }

    public todos:Number[] = [0, 1, 2, 3, 4, 5, 6, 7];

    public imageLocation(row:number, col:number):string {
        return "app/img/" + this.imageFileName(row, col);
    }

    public backgroundCSS(row:number, col:number):string {
        if ((row + col) % 2 == 0)
            return "bg-gray";
        else
            return "bg-white";
    }

    private piece:Piece;

    private imageFileName(row:number, col:number):string {
        this.piece = this.chessboard.getFieldValue(row, col);

        if (this.piece == null)
            return "empty.png";

        return this.piece.getPieceImage();
    }

    public onclick(row:number, col:number) {
        //alert(row + " " + col);
        //this.chessboard.onClick(row, col);
    }

    public ondragstart(row:number, col:number) {
        this.chessboard.onClick(row, col);

    }

    whoseTurn:string = "White";

    public moveOpponentMove(fromRow:number, fromCol:number, toRow:number, toCol:number) {
        this.ondragstart(fromRow, fromCol);
        this.ondragdrop(toRow, toCol, true);
    }

    public ondragdrop(row:number, col:number, isOpponentMove:boolean) {
        //alert(row + " drop " + col);
        this.whoseTurn = this.chessboard.move(row, col, this.socket, isOpponentMove);

    }

    public ondragover(row:number, col:number) {
        event.preventDefault();
    }

}
