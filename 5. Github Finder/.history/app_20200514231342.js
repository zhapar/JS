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
        ui.showAlert("User not found!", "alert alert-danger");
      } else {
        // If it found a user
        ui.showUser(data.userData);
      }
    });
  } else {
    // Remove user from UI if input cleared
    ui.clearUser();
  }
}
