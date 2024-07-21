const gameBoard = (function () {
    const board = ["X","X","X","X","X","X","X","X","X"];
    const display = () => {
        console.log(board);
    }
    const set = (player,index) => {
        if(board[index] == undefined) {
            board[index] = player.type;
            return true
        }
        return false
    }

    const check = (player) => {
        if( (board[0] == player.type && board[1] == player.type && board[2] == player.type) ||
            (board[3] == player.type && board[4] == player.type && board[5] == player.type) ||
            (board[6] == player.type && board[7] == player.type && board[8] == player.type) ||
            (board[0] == player.type && board[3] == player.type && board[6] == player.type) ||
            (board[1] == player.type && board[4] == player.type && board[7] == player.type) ||
            (board[2] == player.type && board[5] == player.type && board[8] == player.type) ||
            (board[0] == player.type && board[4] == player.type && board[8] == player.type) ||
            (board[2] == player.type && board[4] == player.type && board[6] == player.type) ) {
                return true;
            }
            return false;
    } 

    const isFull = () => {
        for(let i = 0; i < 9 ; i++){
            if(board[i] == undefined){
                return false;
            }
        }
        return true
    }

    return {board,display,set,check,isFull}
})();

const player = function(type) {
    this.type = type;
    return {type}
}


const game = (function() {
    const player1 = player("O");
    const player2 = player("X");

    const playing = (player) => {
        const index = prompt(`Enter index for ${player.type}`);
        return gameBoard.set(player,index);
    }

    const StartGame = function() {
        console.log("Starting game")
        gameBoard.display()
        let turn = true;
        while(true) {
            
            if(turn){
               if (playing(player1)) {
                if(gameBoard.check(player1)) {break;}
                turn = !turn
               }
            }

            else {
                if(playing(player2)) {
                    if (gameBoard.check(player2)) {break;}
                    turn = !turn;
                }
            }

            gameBoard.display()
            if(gameBoard.isFull()) {break;}
        }
    }
    gameBoard.display()
    return {StartGame}
})();



const dom = (function() {
    const cells = [];
    const render = () => {
        const container = document.createElement('div');
        container.classList.add("container");
        for(let i=0;i<9;i++){
            const cell = document.createElement('div');
            cell.classList.add(`cell-${i}`);
            container.append(cell);
            cells.push(cell);
        }
        const body = document.body;
        body.append(container)
    }

    const display = () => {
        for(let i=0;i<9;i++){
            cells[i].textContent = gameBoard.board[i];
        }
    }

    return {render,display}

})();