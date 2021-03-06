class UI {
  constructor() {
    this.post = document.querySelector("#posts");
    this.titleInput = document.querySelector("#title");
    this.bodyInput = document.querySelector("#body");
    this.idInput = document.querySelector("#id");
    this.postSubmit = document.querySelector(".post-submit");
    this.formSubmit = "add";
  }

  // To show posts
  showPosts(posts) {
    let output = "";

    posts.forEach(function (post) {
      output += `
        <div class="card mb-3">
          <div class="card-body">
            <h4 class="card-title">${post.title}</h4>
            <p class="card-text">${post.body}</p>
            <a href="#" class="edit card-link" data-id="${post.id}">
              <i class="fa fa-pencil-alt"></i>
            </a>
            <a href="#" class="delete card-link" data-id="${post.id}">
              <i class="fa fa-times"></i>
            </a>
          </div>
        </div>
      `;
    });

    this.post.innerHTML = output;
  }

  // To show alert
  showAlert(message, className) {
    this.clearAlert();

    // Create alert div
    const div = document.createElement("div");

    // Add className
    div.className = className;

    div.appendChild(document.createTextNode(message));

    const container = document.querySelector(".postsContainer");

    const posts = document.querySelector("#posts");

    container.insertBefore(div, posts);

    setTimeout(() => {
      this.clearAlert();
    }, 2000);
  }

  // To remove alert
  clearAlert() {
    const currentAlert = document.querySelector(".alert");

    if (currentAlert) {
      currentAlert.remove();
    }
  }

  // To clear fields
  clearFields() {
    this.titleInput.value = "";
    this.bodyInput.value = "";
  }

  // To fill form to edit post
  fillForm(post) {
    this.titleInput.value = post.title;
    this.bodyInput.value = post.body;
    this.idInput.value = post.id;
  }
}

export const ui = new UI();
