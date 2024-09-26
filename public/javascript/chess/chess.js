window.onload = function() {
    var board = new Board({root_id: 'chessboard-ct'});
    board.initiateGame();
    board.renderAllPieces();
};