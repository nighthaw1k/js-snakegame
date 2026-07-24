const board = document.querySelector(".board");
const blockheight = 30;
const blockwidth = 30;

const cols = Math.floor(board.clientWidth / blockwidth);
const rows = Math.floor(board.clientHeight / blockheight);
let intervalId = null;

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

intervalId = setInterval(() => {

    let head = null

    if (direction === "left") {
        head = { x: snake[0].x, y: snake[0].y - 1 };
    } else if (direction === "right") {
        head = { x: snake[0].x, y: snake[0].y + 1 };
    } else if (direction === "up") {
        head = { x: snake[0].x - 1, y: snake[0].y };
    } else if (direction === "down") {
        head = { x: snake[0].x + 1, y: snake[0].y };
    }

    if (head.x < 0 || head.x >= rows || head.y < 0 || head.y >= cols) {
        alert("Game Over");
        snake.length = 0;
        clearInterval(intervalId);
    }

    snake.forEach((block) => {
        blocks[`${block.x},${block.y}`].classList.remove("fill");
    })

    snake.unshift(head);
    snake.pop();

    render();
}, 400);

    addEventListener("keydown", (e) => {
        if (e.key === "ArrowLeft") {
            direction = "left";
        } else if (e.key === "ArrowRight") {
            direction = "right";
        } else if (e.key === "ArrowUp") {
            direction = "up";
        } else if (e.key === "ArrowDown") {
            direction = "down";
        }
    })

    


