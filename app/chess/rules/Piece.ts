export class Piece {
    public get isWhite():boolean {
        return this._isWhite;
    }

    public isKing:boolean = false;

    public constructor(isWhite:boolean) {
        this._isWhite = isWhite;
    }

    private _isWhite:boolean = false;

    public commonBeforeRule(fromRow:number, fromCol:number, toRow:number, toCol:number, _field:Piece[][]):boolean {
        if (fromRow == toRow && fromCol == toCol) {
            return false;
        }
        if (_field[toRow][toCol] != null) {
            if (this.isWhite && _field[toRow][toCol].isWhite) {
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

    public checkIfVerticalEmptyTillTargetField(col:number, fromRow:number, toRow:number, _field:Piece[][]):boolean {
        while (fromRow <= toRow) {
            if (_field[fromRow][col] != null) {
                return false;
            }
            fromRow++;
        }
        return true;
    }

    public checkIfHorizontalEmptyTillTargetField(row:number, fromCol:number, toCol:number, _field:Piece[][]):boolean {
        while (fromCol <= toCol) {
            if (_field[row][fromCol] != null) {
                return false;
            }
            fromCol++;
        }
        return true;
    }

    public checkIfDiagonallyForwardEmptyTillTargetField(fromRow:number, fromCol:number, toRow:number, toCol:number, _field:Piece[][]):boolean {
        while (fromCol <= toCol) {
            if (_field[fromRow][fromCol] != null) {
                return false;
            }
            fromRow++;
            fromCol++;
        }
        return true;
    }

    public checkIfDiagonallyBackwardEmptyTillTargetField(fromRow:number, fromCol:number, toRow:number, toCol:number, _field:Piece[][]):boolean {
        while (fromRow <= toRow) {
            if (_field[fromRow][fromCol] != null) {
                return false;
            }
            fromRow++;
            fromCol--;
        }
        return true;
    }
}