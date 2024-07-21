const gameBoard = (function () {
    let board = [];
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

    const resetBoard = () => {
        board.length = 0;
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

    return {board,display,set,check,isFull,resetBoard}
})();

const player = function(type) {
    this.type = type;
    this.win = 0;
    const updateWin = () => {
        this.win += 1;
    }
    return {win,updateWin,type}
}


const game = (function() {
    const player1 = player("O");
    const player2 = player("X");
    let turn = true;

    const playing = (player,index) => {
        return gameBoard.set(player,index);
    }

    const Play = function(index) {
              
        if(turn){
            if (playing(player1,index)) {
                turn = !turn
            }
        }
        else {
            if(playing(player2,index)) {
                turn = !turn;
            }
        }
        
    }

    const gameWinner = () => {
        if(gameBoard.check(player1)){
            return player1;
        }
        else if(gameBoard.check(player2)){
            return player2;
        }
    }

    const isOver = () => {
        if(gameBoard.isFull() || gameBoard.check(player1) || gameBoard.check(player2)) {
            turn = !turn;
            return true;
        }
        return false;
    }

 
    const nowPlaying = () => {
        if(turn) {return player1}
        else return player2;
    }

    return {nowPlaying,Play,gameWinner,isOver}
})();



const dom = (function() {
    let cells = [];
    const body = document.body;
    const container = document.createElement('div');
    container.classList.add("container");
    const button = document.createElement("button");
    body.append(button);
    button.textContent = "Restart";
    const current = document.createElement('h1');
    const render = () => {
        current.textContent  = game.nowPlaying().type;
        body.append(current);
        for(let i=0;i<9;i++){
            const cell = document.createElement('div');
            cell.classList.add("cell");
            cell.dataset.index = i;
            container.append(cell);
            cells.push(cell);
            cell.addEventListener('click', (e) => {
                if(!game.isOver()) { 
                    let index = parseInt(e.target.dataset.index);
                    game.Play(index);
                    display();
                    const winner = game.gameWinner();
                    if(winner !== undefined) {
                        current.textContent = winner.type + " won !!!!";
          
                        restart();
                    }
                    else if(gameBoard.isFull()){
                        current.textContent = "no cells";
                        
                        restart();
                    }
                }   
            })
        }
        body.append(container)
    }

    const restart = () => {
        button.setAttribute("style", "background-color:green")
        button.addEventListener("click",(e) => {
            gameBoard.resetBoard();
            display()
            button.setAttribute("style", "background-color:grey")  
        })
    }

    const display = () => {
        for(let i=0;i<9;i++){
            cells[i].textContent = gameBoard.board[i];
        }
        current.textContent = game.nowPlaying().type;
    }

    return {render,display,restart,cells}

})();
