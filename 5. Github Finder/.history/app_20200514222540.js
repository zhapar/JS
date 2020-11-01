const github = new Github();

// Input
const userInput = document.getElementById("searchUser");

// Search user
userInput.addEventListener("keyup", search);

function search(e) {
  const user = e.target.value;

  github.searchUser(user);
}
