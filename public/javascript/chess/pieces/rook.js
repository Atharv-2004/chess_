var Rook = function (config) {
    this.type = "rook";
    this.constructor(config);
};

Rook.prototype = new Piece({});
const board = document.querySelector("#chessboard-ct");

Rook.prototype.moveTo = function (newPosition) {
    if (!this.isValid(newPosition)) {
        console.warn("Invalid move");
        return;
    }

    let targetPiece = this.board.getPieceAt(newPosition);

    // Check if there's an opponent's piece and perform the 'kill' action
    if (targetPiece && targetPiece.color !== this.color) {
        targetPiece.kill(targetPiece);
    }

    // Update the position and render the rook
    this.position = newPosition.col + newPosition.row;
    this.render();

    // Switch the player after a valid move
    this.board.switchPlayer();
};

Rook.prototype.isValid = function (target) {
    let currCol = this.position.charAt(0);
    let currRow = parseInt(this.position.charAt(1));

    let targetCol = target.col;
    let targetRow = parseInt(target.row);

    // Rook moves either in the same column or the same row
    if (currCol !== targetCol && currRow !== targetRow) {
        console.warn("Invalid rook move");
        return false;
    }

    // Check for obstructions if moving along the same row
    if (currRow === targetRow) {
        let startCol = Math.min(currCol.charCodeAt(0), targetCol.charCodeAt(0));
        let endCol = Math.max(currCol.charCodeAt(0), targetCol.charCodeAt(0));

        for (let colCode = startCol + 1; colCode < endCol; colCode++) {
            let col = String.fromCharCode(colCode);
            let cell = board.querySelector(
                `li[data-col="${col}"] li[data-row="${currRow}"]`
            );
            if (cell && cell.querySelector(".piece")) {
                console.warn("Obstruction detected");
                return false;
            }
        }
    }
    // Check for obstructions if moving along the same column
    else {
        let startRow = Math.min(currRow, targetRow);
        let endRow = Math.max(currRow, targetRow);

        for (let row = startRow + 1; row < endRow; row++) {
            let cell = board.querySelector(
                `li[data-col="${currCol}"] li[data-row="${row}"]`
            );
            if (cell && cell.querySelector(".piece")) {
                console.warn("Obstruction detected");
                return false;
            }
        }
    }

    return true;
};
