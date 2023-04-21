let playerRed = "R";
let playerBlue = "B"
let currPlayer = playerRed;

const board = []; 
let currColumns = [5, 5, 5, 5, 5, 5, 5]; // This variable keeps track of whether there is a chip at the bottom of the board
const rows = 6;
const columns = 7;
let gameOver = false;

makeBoard();

function makeBoard() {
    // This sets up the board for Connect 4 by creating the tiles, putting them in an array, and sets a unique id to every tile
    for (let r = 0; r < rows; r++) { // Creates a new array for every row that "rows" is initialized to
        let row = [];
        for (let c = 0; c < columns; c++) { // Allows rows to be created based on the initiallized value of columns
            let tile = document.createElement("div") 
            tile.id = r.toString() + "-" + c.toString(); // Sets unique id to every tile on board
            tile.classList.add("tile"); // For styling with css
            tile.addEventListener("click", placeChip);

            row.push(' '); 
            document.getElementById("board").append(tile);
        };
        board.push(row) // This adds all of the rows that were just created to the board array
    };
};

function placeChip() {
    if (gameOver) { // If the game is over, this will not allow a player to place another chip on the board
        return;
    }

    let coords = this.id.split("-"); // Converts unique id for every tile into an array: "0-0" => ["0", "0"]
    let r = parseInt(coords[0]); // Converts item in array from string to integer
    let c = parseInt(coords[1]);

    r = currColumns[c];
    if (r < 0) {
        return;
    }

    board[r][c] = currPlayer; // Establishes the tile that has been clicked to currPlayer
    let tile = document.getElementById(r.toString() + "-" + c.toString()); 
    if (currPlayer === playerRed) { // Assigns to red or blue player and links to css
        tile.classList.add("red-chip");
        currPlayer = playerBlue; // Switches players 
    }
    else {
        tile.classList.add("blue-chip");
        currPlayer = playerRed;
    }

    r -= 1; // Updating the row height for the column 
    currColumns[c] = r; // Updates the array

    checkForWin(); // Function that checks for winner
};


// /** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([r, c]) =>
        r >= 0 &&
        r < rows &&
        c >= 0 &&
        c < columns &&
        board[r][c] === currPlayer
    );
  }

  // TODO: read and understand this code. Add comments to help you.

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      const horiz = [[r, c], [r, c + 1], [r, c + 2], [r, c + 3]];
      const vert = [[r, c], [r + 1, c], [r + 2, c], [r + 3, c]];
      const diagDR = [[r, c], [r + 1, c + 1], [r + 2, c + 2], [r + 3, c + 3]];
      const diagDL = [[r, c], [r + 1, c - 1], [r + 2, c - 2], [r + 3, c - 3]];
      
      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        gameOver = true;
        setWinner(r, c);
        return;
      } 
    }
  }
}

const setWinner = (r, c) => {
    const winner = document.getElementById("winner");
    if (board[r][c] === playerRed) {
        winner.innerText = "Red Wins!";
    }
    else {
        winner.innerText = "Blue Wins!";
    }
}