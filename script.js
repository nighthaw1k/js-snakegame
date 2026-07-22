const board = document.querySelector(".board");
const blockheight = 30;
const blockwidth = 30;

const cols = Math.floor(board.clientWidth / blockwidth);
const rows = Math.floor(board.clientHeight / blockheight);

const blocks = [];
const snake = [{ x: 1, y: 3 }, { x: 1, y: 2 }, { x: 1, y: 1 }];

let direction = "right";


for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
        const block = document.createElement("div");
        block.classList.add("block");
        board.appendChild(block);
        block.innerText = `${i},${j}`;
        blocks[`${i},${j}`] = block;
    }
}

function render() {
    snake.forEach((block) => {
        blocks[`${block.x},${block.y}`].classList.add("fill");
    });
}


