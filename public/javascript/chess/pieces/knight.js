var Knight = function (config) {
    this.type = "knight";
    this.constructor(config);
};

Knight.prototype = new Piece({});

Knight.prototype.isValidPosition = function (targetPosition) {
    let currentCol = this.position.charAt(0);
    let currentRow = parseInt(this.position.charAt(1));

    let targetCol = targetPosition.col;
    let targetRow = parseInt(targetPosition.row);

    let targetPiece = this.board.getPieceAt(targetPosition);
    if (targetPiece && targetPiece.type === "king") {
        alert("You cannot kill the king");
        return;
    }

    // Check if the move is valid
    if (
        Math.abs(targetCol.charCodeAt(0) - currentCol.charCodeAt(0)) === 2 &&
        Math.abs(targetRow - currentRow) === 1
    ) {
        if (targetPiece && targetPiece.color !== this.color) {
            targetPiece.kill(targetPiece);
        }
        return true;
    } else if (
        Math.abs(targetCol.charCodeAt(0) - currentCol.charCodeAt(0)) === 1 &&
        Math.abs(targetRow - currentRow) === 2
    ) {
        if (targetPiece && targetPiece.color !== this.color) {
            targetPiece.kill(targetPiece);
        }
        return true;
    }
    return false;
};

Knight.prototype.moveTo = function (targetPosition) {
    if (this.isValidPosition(targetPosition)) {
        this.position = targetPosition.col + targetPosition.row;
        this.render();
        this.board.switchPlayer();
    } else {
        this.board.invalidMove();
    }
};
