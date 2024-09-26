var Knight = function(config){
    this.type = 'knight';
    this.constructor(config);
};



Knight.prototype = new Piece({});

Knight.prototype.isValidPosition= function(targetPosition){
    let currentCol = this.position.charAt(0);
    let currentRow = parseInt(this.position.charAt(1));

    let targetCol = targetPosition.col;
    let targetRow = parseInt(targetPosition.row);

    // Check if the move is valid
    if (Math.abs(targetCol.charCodeAt(0) - currentCol.charCodeAt(0)) === 2 &&
        Math.abs(targetRow - currentRow) === 1) {
        return true;
    } else if (Math.abs(targetCol.charCodeAt(0) - currentCol.charCodeAt(0)) === 1 &&
               Math.abs(targetRow - currentRow) === 2) {
        return true;
    }
    return false; 
};



Knight.prototype.moveTo = function(targetPosition){
    if(this.isValidPosition(targetPosition)){
        this.position = targetPosition.col + targetPosition.row;
        this.render();
    }else{
        //NOOP
        console.log("Invalid Move!!!");
    }

}