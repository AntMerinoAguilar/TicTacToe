const board = document.querySelector(".board");
const message = document.querySelector(".message");
const restartButton = document.querySelector(".restart");

for (let i = 1; i <= 9; i++) {
    const newDiv = document.createElement("div");
    newDiv.classList.add("cell");
    const image = document.createElement("img");
    image.src = "";
    image.alt = "";
    image.width = 100;
    image.height = 100;
    newDiv.appendChild(image);
    board.appendChild(newDiv);
}

const winCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

message.innerText = "The blue pill start";

let currentPlayer = "blue pill";

let gameActive = true;

const cells = document.querySelectorAll(".cell");

function enableCells() {
    cells.forEach(cell => {
        cell.addEventListener("click", () => {
            const image = cell.querySelector('img');
            if (image.alt === "" && gameActive) {
                image.alt = currentPlayer;
                image.src = currentPlayer === "blue pill" ? "images/X_Blue_Pill.png" : "images/O_Red_Pill.png";
                if (checkForWin()) {
                    if (currentPlayer === "blue pill") {
                        message.innerText = `${currentPlayer} wins ! The story ends. You wake up in your bed and believe whatever you want to believe.`;
                        gameActive = false;
                        disableCells();
                    } else {
                        message.innerText = `${currentPlayer} wins ! You stay in Wonderland and see how deep the rabbit hole goes.`;
                        gameActive = false;
                        disableCells();
                    }
                } else if (checkForDraw()) {
                    message.innerText = "Draw... Hurry up agent Smith is coming";
                    gameActive = false;
                    disableCells();
                } else {
                    currentPlayer = currentPlayer === "blue pill" ? "red pill" : "blue pill";
                    message.innerText = `${currentPlayer}'s turn`;
                }
            }
        });
    });
}

function disableCells() {
    cells.forEach(cell => {
        cell.removeEventListener("click", () => {});
    });
}

function checkForWin() {

    //---Façcon de faire plus directe mais plus compliqué à intégrer des animations aux cases gagnates
    /* return winCombinations.some(array => {
        return array.every(index => cells[index].querySelector("img").alt === currentPlayer);
    }); */

    for (let i = 0; i < winCombinations.length; i++) {
        let winCondition = true;
        for (let j = 0; j < winCombinations[i].length; j++) {
            if (cells[winCombinations[i][j]].querySelector("img").alt !== currentPlayer) {
                winCondition = false;
                break;
            }
        }
        if (winCondition) {
            for (let j = 0; j < winCombinations[i].length; j++) {
                cells[winCombinations[i][j]].classList.add('winning-cell');
            }
            board.classList.add("game-over");
            return true;
        }
    }
    return false;
}


function checkForDraw() {

    //---Utilisation d'un opérateur de propagation "...", permet de transformer la NodeList en un tableau
    if ([...cells].every(cell => cell.querySelector("img").alt !== "")) {
        board.classList.add("game-over");
        return true;
    }
}

function restartGame() {
    currentPlayer = "blue pill";
    gameActive = true;
    message.innerText = "The blue pill start";
    cells.forEach(cell => cell.querySelector("img").alt = "");
    cells.forEach(cell => cell.querySelector("img").src = "");
    cells.forEach(cell => {
        cell.classList.remove('winning-cell');
    });
    board.classList.remove("game-over");
    enableCells();
}

restartButton.addEventListener("click", restartGame);

enableCells();