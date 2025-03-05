// Initializes a 2D board, 
// where each spot on the board is an empty string ''
const gameBoard = (() => {
    
    // *This won't be exposed outside of this module, hence it not being returned*
    let board = [
        ['', '', ''],
        ['', '', ''],
        ['', '', ''] 
    ];
    
    // Get current board state for displaying on the dom
    const getBoard = () => board;

    // Resets the board on new game
    const resetBoard = () => {
        board = [
            ['', '', ''],
            ['', '', ''],
            ['', '', ''] 
        ];
    }

    const makeMove = (row, col, symbol) => {
        if (board[row][col] === '') {
            board[row][col] = symbol;
            return true; // Valid Move
        }
        return false; // Invalid Move
    }

    // *The characteristic of a Factory function is that instead of relying on the new Object()
    // way of creating an object, it instead returns an { } object with various methods within it*
    return {
        getBoard,
        resetBoard,
        makeMove
    }
})();

// Factory Function for the Player
const player = (name, symbol) => {
    return {
        name,
        symbol
    };
}

// Facilitates the game
const gameController = (() => {
    let player1, player2, currentPlayer;

    // On call, game creates and sets player1 and player2 
    const startGame = (player1Name, player2Name) => {
        // Ensures hidden restart button on game start
        restartBtn.style.display = "none";
        player1 = player(player1Name, 'X');
        player2 = player(player2Name, 'O');

        // Coin-toss to see who goes first
        if (Math.random() < 0.5) {
            currentPlayer = player1;
        } else {
            currentPlayer = player2;
        }

        // Resets board LOGIC SIDE upon start of a new game
        gameBoard.resetBoard();
        // Clean board
        initializeBoard();
        highlightPlayer();
    }

    // Initializes VISUAL gameBoard by emptying tile textContent
    const initializeBoard = () => {
        for (let i = 0; i < boardArea.children.length; i++) {
            const tile = boardArea.children[i];
            tile.textContent = '';
        }
    }

    const getCurrentPlayer = () => currentPlayer;

    const playerTurn = (row, col) => {
        const symbol = currentPlayer.symbol;

        // Condition checks if move is VALID and was MADE
        if (gameBoard.makeMove(row, col, symbol)) {
            updateTile(row, col, symbol);
            
            if (checkWinner(gameBoard.getBoard())) {
                console.log(`${currentPlayer.name} wins!`);
                isGameOver();
                if (currentPlayer === player1) {
                    leftPlayer.textContent = player1.name+" wins!"
                    leftPlayer.style.fontSize = "clamp(2.5rem, 4rem, 5rem)";
                } else if (currentPlayer === player2) {
                    rightPlayer.textContent = player2.name+" wins!"
                    rightPlayer.style.fontSize = "clamp(2.5rem, 4rem, 5rem)";
                }
                return;
            }

            if (isTie()) {
                console.log("It's a tie!");
                isGameOver();
                leftPlayer.textContent = "tie game!";
                leftPlayer.style.fontSize = "3rem";
                rightPlayer.textContent = "tie game!"
                rightPlayer.style.fontSize = "3rem";
                return;
            }

            // Switches player after every move with no win conditions met
            currentPlayer = currentPlayer === player1? player2 : player1;
            highlightPlayer();
        } else {
            console.log("Invalid Move! Try again.");
        }
    }

    const highlightPlayer = () => {
        if (currentPlayer === player1) {
            leftPlayer.textContent = `${player1.name}'s turn.`;
            leftPlayer.style.backgroundColor = "red";
            rightPlayer.textContent = player2.name;
            rightPlayer.style.backgroundColor = "rgb(123, 174, 250)";

        } else if (currentPlayer === player2) {
            rightPlayer.textContent = `${player2.name}'s turn.`
            rightPlayer.style.backgroundColor = "blue";            leftPlayer.textContent = player1.name;
            leftPlayer.style.backgroundColor = "rgb(228, 79, 79)";
        }
    }

    // Using data attributes (data-row, data-col), we can select specific dom elements by passing our row & col arguments
    // and update their visuals with the player symbol
    const updateTile = (row, col, symbol) => {
        const tile = document.querySelector(`.tile[data-row="${row}"][data-col="${col}"]`);
        tile.textContent = symbol;
    }

    // Checks LOGIC SIDE for win conditions
    const checkWinner = (board) => {
        // Row-checker
        for (row of board) { 
            if (row[0] !== '' && row[0] === row[1] && row[0] === row[2]) {
                return true;
            }
        }
    
        // Column-checker
        for (let col = 0; col < 3; col++) {       
            if (board[0][col] !== '' && board[0][col] === board[1][col] && board[0][col] === board[2][col]) {
                return true;
            }
        }
    
        // Diagonal-checker
        if (board[0][0] !== '' && board[0][0] === board[1][1] && board[0][0] === board[2][2]) {
            return true;
    
        } else if (board[0][2] !== '' && board[0][2] === board[1][1] && board[0][2] === board[2][0]) {
            return true;
            
        }

        return false;
    }
        // Tie-checker
        // Set initial condition to be tied

    const isTie = () => {
        const board = gameBoard.getBoard();

        // Return false if empty tile exist
        for (let row of board) {
            if (row.includes('')) {
                return false;
            }
        }

        // Return true if no empty tiles exist
        return true;
    }

    const isGameOver = () => {
        restartBtn.style.display = "block";
    }

    return {
        startGame,
        initializeBoard,
        playerTurn,
        highlightPlayer,
        isTie,
        getCurrentPlayer,
        checkWinner,
        isGameOver
    }
})();

const boardArea = document.querySelector(".boardArea");

// *Returns a NODELIST, thus must use loop to attach event listeners to each
const gameTiles = document.querySelectorAll(".tile");

gameTiles.forEach(tile => {
    tile.addEventListener(("click"), () => {
        // Set col and row values to equate the data attributes set in the html
        const row = tile.dataset.row;
        const col = tile.dataset.col;
        // data-attribute values are automatically converted to string so we have to parse them to Int with parseInt
        gameController.playerTurn(parseInt(row), parseInt(col));
    })

    tile.addEventListener("mouseover", () => {
        if (tile.textContent === '') {
            tile.style.cursor = "pointer";
        } else {
            tile.style.cursor = "default";
        }
    })
});

const startBtn = document.querySelector("#startBtn");
const p1 = document.querySelector("#p1");
const p2 = document.querySelector("#p2");
const restartBtn = document.querySelector("#restartBtn");
const leftPlayer = document.querySelector("#leftSide")
const rightPlayer = document.querySelector("#rightSide");
const playerSides = document.querySelectorAll(".playerSide");

startBtn.addEventListener("click", () => {
    if (p1.value !== "" && p2.value !== "") {
        leftPlayer.style.display = "flex";
        rightPlayer.style.display = "flex";
        leftPlayer.style.animation = "0.5s fadeIn forwards";
        rightPlayer.style.animation = "0.5s fadeIn forwards";
        leftPlayer.textContent = p1.value;
        rightPlayer.textContent = p2.value;
        gameController.startGame(p1.value, p2.value);
        playerInputs.style.display = "none";
        boardArea.style.display = "grid";
        boardArea.style.animation = "0.5s fadeIn forwards";
        playerSides.forEach(player => {
            player.style.display = "block";
        });
    }
});

restartBtn.addEventListener("click", () => {
    leftPlayer.textContent = p1.value;
    leftPlayer.style.fontSize = "clamp(1.5rem, 2rem, 2.5rem)";
    rightPlayer.style.fontSize = "clamp(1.5rem, 2rem, 2.5rem)";
    rightPlayer.textContent = p2.value;
    gameController.startGame(p1.value, p2.value);
});

const playerInputs = document.querySelector(".playerInputs");
const titleCard = document.querySelector(".titleCard");

titleCard.addEventListener("animationend", () => {
    titleCard.style.display = "none";
});

function titleGone(mutationsList) {
    for (const mutation of mutationsList) {
        if (mutation.type === "attributes" && mutation.attributeName === "style") {
            if (titleCard.style.display === "none") {
                playerInputs.style.display = "grid";
            }
        }
    }
}

const observeTitle = new MutationObserver(titleGone);

observeTitle.observe(titleCard, {
    attributes: true,
    attributeFilter: ["style"],
});


