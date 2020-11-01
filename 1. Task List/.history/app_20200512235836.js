// Define UI Vars
const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

// Load all event listeners
loadEventListeners();

function loadEventListeners() {
  // Add event listener
  form.addEventListener("submit", addTask);

  // Delete task
  taskList.addEventListener("click", removeTask);
}

// Add task
function addTask(e) {
  if (taskInput.value === "") {
    alert("Add a task");
  }

  // Create li
  const li = document.createElement("li");
  // Add a class
  li.className = "collection-item";
  // Add a text
  li.appendChild(document.createTextNode(taskInput.value));

  // Create a link
  const link = document.createElement("a");
  link.className = "delete-item secondary-content";

  link.innerHTML = '<i class="fa fa-times" ></i>';
  li.appendChild(link);

  taskList.appendChild(li);

  taskInput.value = "";
  e.preventDefault();
}

// Remove task
function removeTask(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    console.log(e.target);
  }
}
