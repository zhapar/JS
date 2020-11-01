// Init Git
const github = new Github();
// Init UI
const ui = new UI();

// Input
const userInput = document.getElementById("searchUser");

// Search user
userInput.addEventListener("keyup", search);

function search(e) {
  const user = e.target.value;

  if (user !== "") {
    github.searchUser(user).then((data) => {
      if (data.userData.message === "Not Found") {
        // If it doesn't found user === Show alert
      } else {
        // If it found a user
        ui.showUser(user.userData);
      }
    });
  } else {
    // If it's cleared
  }
}
