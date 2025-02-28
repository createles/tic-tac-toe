// Initializes a 2D gameboard, 
// where each spot on the board is an empty string ''
let gameBoard = [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''] 
];

function showBoard(gameBoard) {
    for (row of gameBoard) {
        console.log(row.join(' | '));
        console.log("---------");
    }
}

function checkWinner(gameBoard) {
    // Row-checker
    for (row of gameBoard) { 
        if (row[0] !== '' && row[0] === row[1] && row[0] === row[2]) {
            console.log(`${row[0]} wins!`);
            return;
        }
    }

    // Column-checker
    for (let col = 0; col < 3; col++) {       
        if (gameBoard[0][col] !== '' && gameBoard[0][col] === gameBoard[1][col] && gameBoard[0][col] === gameBoard[2][col]) {
            console.log(`${gameBoard[0][col]} wins!`);
            return;
        }
    }

    // Diagonal-checker
    if (gameBoard[0][0] !== '' && gameBoard[0][0] === gameBoard[1][1] && gameBoard[0][0] === gameBoard[2][2]) {
        console.log(`${gameBoard[0][0]} wins!`);
        return;

    } else if (gameBoard[0][2] !== '' && gameBoard[0][2] === gameBoard[1][1] && gameBoard[0][2] === gameBoard[0][2]) {
        console.log(`${gameBoard[0][2]} wins!`);
        return;
        
    }

    // Tie-checker
    // Set initial condition to be tied
    let isTie = true;

    // Changes condition to false while game is ongoing
    for (row of gameBoard) {
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