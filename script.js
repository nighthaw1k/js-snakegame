const board = document.querySelector(".board");
const startBtn = document.querySelector(".start-btn");
const modal = document.querySelector(".modal");
const startGameModal = document.querySelector(".start-game");
const gameOverModal = document.querySelector(".game-over");
const restartBtn = document.querySelector(".restart-btn");

const highScoreEl = document.getElementById("high-score");
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");


const blockheight = 30;
const blockwidth = 30;

let highScore = localStorage.getItem("highScore") || 0;
let score = 0;
let time = "00:00";

const cols = Math.floor(board.clientWidth / blockwidth);
const rows = Math.floor(board.clientHeight / blockheight);

let intervalId = null;
let timeIntervalId = null;

let food = {x: Math.floor(Math.random() * rows), y: Math.floor(Math.random() * cols)};

const blocks = [];
let snake = [{ x: 1, y: 3 }];

let direction = "right";


for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
        const block = document.createElement("div");
        block.classList.add("block");
        board.appendChild(block);
        blocks[`${i},${j}`] = block;
    }
}

function render() {
    let head = null

    blocks[`${food.x},${food.y}`].classList.add("food");

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
        modal.style.display = "flex";
        startGameModal.style.display = "none";
        gameOverModal.style.display = "flex";
        clearInterval(intervalId);
        timeIntervalId = null;
        intervalId = null;
        return;
    }
    //Food Consume Logic
    if(head.x === food.x && head.y === food.y){
        blocks[`${food.x},${food.y}`].classList.remove("food");
        food = {x: Math.floor(Math.random() * rows), y: Math.floor(Math.random() * cols)};
        const tail = snake[snake.length - 1];
        snake.push({ x: tail.x, y: tail.y });
        score += 10;
        scoreEl.innerText = score;

        if(score > highScore){
            highScore = score;
            highScoreEl.innerText = highScore;
            localStorage.setItem("highScore", highScore.toString());
        }
    }

    snake.forEach((block) => {
        blocks[`${block.x},${block.y}`].classList.remove("fill");
    })

    snake.unshift(head);
    snake.pop();

    snake.forEach((block) => {
        blocks[`${block.x},${block.y}`].classList.add("fill");
    });
}

startBtn.addEventListener("click", () => {
    if (intervalId) return;

    modal.style.display = "none";
    intervalId = setInterval(render, 200)
    timeIntervalId = setInterval(() => {
        let [minutes, seconds] = time.split(":").map(Number);
        if (seconds === 59) {
            minutes++;
            seconds = 0;
        } else {
            seconds++;
        }
        time = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
        timeEl.innerText = time;
    }, 1000);
});

restartBtn.addEventListener("click", resetGame);

function resetGame() {

    blocks[`${food.x},${food.y}`].classList.remove("food");
    snake.forEach((block) => {
        blocks[`${block.x},${block.y}`].classList.remove("fill");
    })

    score = 0;
    time = `00:00`;

    scoreEl.innerText = score;
    timeEl.innerText = time;    
    highScoreEl.innerText = highScore;

    modal.style.display = "none";
    direction = "down";
    snake = [{ x: 1, y: 3 }];
    food = {x: Math.floor(Math.random() * rows), y: Math.floor(Math.random() * cols)};
    intervalId = setInterval(() => { render() }, 200);
}
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

    


