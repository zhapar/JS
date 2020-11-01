/*
  GAME FUNCTION: 
  - Player should guess a number between min and max
  - Player gets a certain amount of guesses
  - Notify player of guesses remaining
  - Notify player of the correct answer if loose
  - Let player to choose play again
*/

let min = 1,
  max = 10,
  winningNum = getRandomNum(min, max),
  guessesLeft = 3;

const game = document.querySelector("#game"),
  minNum = document.querySelector(".min-num"),
  maxNum = document.querySelector(".max-num"),
  guessBtn = document.querySelector("#guess-btn"),
  guessInput = document.querySelector("#guess-input"),
  message = document.querySelector(".message");

// Set a min and max number
minNum.textContent = min;
maxNum.textContent = max;

// Play again event listener
game.addEventListener("mousedown", function (e) {
  if (e.target.classList.contains("play-again")) {
    document.location.reload();
  }
});

// Check event listener
guessBtn.addEventListener("click", function () {
  let number = parseInt(guessInput.value);

  if (isNaN(number) || number < min || number > max) {
    setMessage(`Please enter a number between ${min} and ${max}`, "red");
  } else {
    if (number === winningNum) {
      // Game over - WIN!
      gameOver(true, `${number} is correct! YOU WIN!`);
    } else {
      guessesLeft -= 1;

      if (guessesLeft === 0 || guessesLeft < 0) {
        // Game over - LOST
        gameOver(
          false,
          `Game Over, you lost. The correct number was ${winningNum}`
        );
      } else {
        guessInput.style.borderColor = "red";
        setMessage(
          `${number} is not correct, ${guessesLeft} guesses left`,
          "red"
        );
        guessInput.value = "";
      }
    }
  }
});

// Get a random number
function getRandomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1));
}

// Game over function
function gameOver(win, msg) {
  let color;
  win === true ? (color = "green") : (color = "red");

  guessInput.disabled = true;

  guessInput.style.borderColor = color;

  setMessage(msg, color);

  guessBtn.value = "Play Again";
  guessBtn.className += "play-again";
}

// Show message
function setMessage(msg, color) {
  message.style.color = color;
  message.textContent = msg;
}
