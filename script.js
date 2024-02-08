const bird = document.getElementById("bird");
const pipesContainer = document.getElementById("pipes");
const scoreDisplay = document.getElementById("score");
const gameOverDisplay = document.getElementById("game-over");
const scoreValue = document.getElementById("score-value");

let isGameOver = false;
let score = 0;

// Function to create a new pipe
function createPipe() {
  const pipe = document.createElement("div");
  pipe.classList.add("pipe");
  pipe.style.left = "400px"; // Start off screen
  const height = Math.random() * 300 + 100;
  pipe.style.height = `${height}px`;
  pipesContainer.appendChild(pipe);

  // Move the pipe
  let pipePosition = 400;
  const pipeInterval = setInterval(() => {
    if (isGameOver) {
      clearInterval(pipeInterval);
      return;
    }
    pipePosition -= 5;
    pipe.style.left = `${pipePosition}px`;

    // Check for collision
    if (
      pipePosition > 0 &&
      pipePosition < 80 &&
      (bird.offsetTop < height || bird.offsetTop > height + 200)
    ) {
      gameOver();
    }

    // Update score
    if (pipePosition === 40) {
      score++;
      scoreValue.textContent = score;
    }

    // Remove pipe when off screen
    if (pipePosition <= -60) {
      pipesContainer.removeChild(pipe);
      clearInterval(pipeInterval);
    }
  }, 20);
}

// Function to move the bird up
function moveUp() {
  if (!isGameOver) {
    bird.style.top = `${bird.offsetTop - 50}px`;
  }
}

// Function to reset the game
function restartGame() {
  isGameOver = false;
  while (pipesContainer.firstChild) {
    pipesContainer.removeChild(pipesContainer.firstChild);
  }
  bird.style.top = "50%";
  score = 0;
  scoreValue.textContent = score;
  gameOverDisplay.style.display = "none";
  startGame();
}

// Function to end the game
function gameOver() {
  isGameOver = true;
  gameOverDisplay.style.display = "block";
}

// Function to start the game
function startGame() {
  scoreValue.textContent = score;
  createPipe();
  const gameInterval = setInterval(() => {
    if (!isGameOver) {
      createPipe();
    } else {
      clearInterval(gameInterval);
    }
  }, 2000);
}

// Event listeners
document.addEventListener("keydown", (e) => {
  if (e.code === "Space") {
    if (isGameOver) {
      restartGame();
    } else {
      moveUp();
    }
  }
});

// Start the game
startGame();
