// Book constructor
class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

// UI constructor
class UI {
  addBookToList(book) {
    const list = document.getElementById("book-list");

    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.isbn}</td>
      <td><a href="#" class="delete" >X</a></td>
    `;

    list.appendChild(row);
  }

  // Show Alert
  showAlert(msg, type) {
    const div = document.createElement("div");
    div.className = `alert ${type}`;
    div.appendChild(document.createTextNode(msg));

    const container = document.querySelector(".container");
    const form = document.querySelector("#book-form");

    container.insertBefore(div, form);

    setTimeout(function () {
      document.querySelector(".alert").remove();
    }, 2000);
  }

  // Clear inputs
  clearFields() {
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("isbn").value = "";
  }

  // Remove Book
  removeBook(target) {
    if (target.className === "delete") {
      target.parentElement.parentElement.remove();
    }
  }
}

// Event listener to add book
document.getElementById("book-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const title = document.getElementById("title").value,
    author = document.getElementById("author").value,
    isbn = document.getElementById("isbn").value;
  // New book
  const book = new Book(title, author, isbn);

  const ui = new UI();

  if (title === "" || author === "" || isbn === "") {
    ui.showAlert("Please fill in all fields", "error");
  } else {
    ui.addBookToList(book);

    ui.showAlert("Book added!", "success");

    ui.clearFields();
  }
});

// Event listener to remove book
document.getElementById("book-list").addEventListener("click", function (e) {
  // Instantiate UI
  const ui = new UI();

  // Remove book
  ui.removeBook(e.target);

  ui.showAlert("Book Removed!", "success");
});
