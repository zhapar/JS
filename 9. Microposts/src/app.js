import { http } from "./http";
import { ui } from "./ui";

// Get posts on DOM Load
document.addEventListener("DOMContentLoaded", getPosts);

// Add a post
document.querySelector(".post-submit").addEventListener("click", submitPost);

// Delete post
document.querySelector("#posts").addEventListener("click", deletePost);

// Edit post
document.querySelector("#posts").addEventListener("click", enableEdit);

// Cancel edit
document.querySelector(".card-form").addEventListener("click", cancelEdit);

// Get Posts
function getPosts() {
  http
    .get("http://localhost:3000/posts")
    .then((data) => ui.showPosts(data))
    .catch((err) => console.log(err));
}

// Submit Post
function submitPost() {
  const title = document.querySelector("#title").value;
  const body = document.querySelector("#body").value;

  const id = document.querySelector("#id").value;

  const data = {
    title,
    body,
  };

  if (title.trim() === "" || body.trim() === "") {
    ui.showAlert("Please fill in all fields", "alert alert-danger");
  } else {
    if (id === "") {
      http
        .post("http://localhost:3000/posts", data)
        .then((data) => {
          ui.showAlert("Post added", "alert alert-success");
          ui.clearFields();
          getPosts();
        })
        .catch((err) => console.log(err));
    } else {
      http
        .put(`http://localhost:3000/posts/${id}`, data)
        .then((data) => {
          ui.showAlert("Post Updated", "alert alert-success");
          ui.changeFormState("add");
          getPosts();
        })
        .catch((err) => console.log(err));
    }
  }
}

// Delete Post
function deletePost(e) {
  e.preventDefault();

  if (e.target.parentNode.classList.contains("delete")) {
    // ID
    const id = e.target.parentNode.dataset.id;

    if (confirm("Are you sure")) {
      http
        .delete(`http://localhost:3000/posts/${id}`)
        .then((data) => {
          ui.showAlert("Post removed", "alert alert-success");
          getPosts();
        })
        .catch((err) => console.log(err));
    }
  }
}

// Enable edit
function enableEdit(e) {
  e.preventDefault();

  if (e.target.parentNode.classList.contains("edit")) {
    const id = e.target.parentNode.dataset.id;
    const title =
      e.target.parentNode.previousElementSibling.previousElementSibling
        .textContent;
    const body = e.target.parentNode.previousElementSibling.textContent;

    // Set a data
    const data = {
      id,
      title,
      body,
    };

    ui.fillForm(data);
  }
}

// Cancel edit
function cancelEdit(e) {
  e.preventDefault();

  if (e.target.classList.contains("post-cancel")) {
    ui.changeFormState("add");
  }
}
