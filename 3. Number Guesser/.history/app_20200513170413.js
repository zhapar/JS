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
  winningNum = 2,
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

guessBtn.addEventListener("click", function () {
  let number = parseInt(guessInput.value);

  if (isNaN(number) || number < min || number > max) {
    setMessage(`Please enter a number between ${min} and ${max}`, "red");
  }

  if (number === winningNum) {
    guessInput.disabled = true;
    guessInput.style.borderColor = "green";
    setMessage(`${number} is true! YOU WIN!`, "green");
  }
});

function setMessage(msg, color) {
  message.style.color = color;
  message.textContent = msg;
}
