// Define UI Vars
const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

// Add event listener
form.addEventListener("submit", addTask);

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
  link.className = "delete-task secondary-content";

  link.innerHTML = '<i class="fa fa-remove" ></i>';

  taskList.appendChild(li);
  e.preventDefault();
}
