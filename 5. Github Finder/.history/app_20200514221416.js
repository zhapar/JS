// Input
const userInput = document.getElementById("searchUser");

// Search user
userInput.addEventListener("keyup", search);

function search(e) {
  const user = e.target.value;

  console.log(user);
}
