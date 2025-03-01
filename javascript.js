// Initializes a 2D board, 
// where each spot on the board is an empty string ''
const gameBoard = (() => {
    let board = [
        ['', '', ''],
        ['', '', ''],
        ['', '', ''] 
    ];

    const getBoard = () => board;

    const resetBoard = () => {
        let board = [
            ['', '', ''],
            ['', '', ''],
            ['', '', ''] 
        ];
    }

    // The characteristic of a Factory function is that instead of relying on the new Object()
    // way of creating an object, it instead returns an { } object with various methods within it
    return {
        getBoard,
        resetBoard
    }
})();

/* show the current board in the console
function showBoard(board) {
    for (row of board) {
        console.log(row.join(' | '));
        console.log("---------");
    }
}
*/

const player = (name, symbol) => {
    return {
        name,
        symbol
    };
}

const gameController = (() => {
    let player1, player2, currentPlayer;

    const startGame = (player1Name, player2Name) => {
        player1 = player(player1Name, 'X');
        player2 = player(player2Name, 'O');

        // Coin-toss to see who goes first
        if (Math.random() < 0.5) {
            currentPlayer = player1;
        } else {
            currentPlayer = player2;
        }


    }
})();


function checkWinner(board) {
    // Row-checker
    for (row of board) { 
        if (row[0] !== '' && row[0] === row[1] && row[0] === row[2]) {
            console.log(`${row[0]} wins!`);
            return;
        }
    }

    // Column-checker
    for (let col = 0; col < 3; col++) {       
        if (board[0][col] !== '' && board[0][col] === board[1][col] && board[0][col] === board[2][col]) {
            console.log(`${board[0][col]} wins!`);
            return;
        }
    }

    // Diagonal-checker
    if (board[0][0] !== '' && board[0][0] === board[1][1] && board[0][0] === board[2][2]) {
        console.log(`${board[0][0]} wins!`);
        return;

    } else if (board[0][2] !== '' && board[0][2] === board[1][1] && board[0][2] === board[0][2]) {
        console.log(`${board[0][2]} wins!`);
        return;
        
    }

    // Tie-checker
    // Set initial condition to be tied
    let isTie = true;

    // Changes condition to false while game is ongoing
    for (row of board) {
        if (row.includes('')) {
           isTie = false;
           break;
        }
    }

    // Final check to see if tie condition was changed
    if (isTie) {
        console.log('Tie game!')
    }
}

const boardArea = document.querySelector(".boardArea");

function displayBoard() {
    boardArea.textContent = gameBoard.getBoard();
}