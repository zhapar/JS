// Define UI Vars
const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

// Load all event listeners
loadEventListeners();

function loadEventListeners() {
  // Get tasks from LS
  document.addEventListener("DOMContentLoaded", getTasks);

  // Add tasks
  form.addEventListener("submit", addTask);

  // Delete task
  taskList.addEventListener("click", removeTask);

  // Clear Tasks
  clearBtn.addEventListener("click", clearTasks);

  // Filter Tasks
  filter.addEventListener("keyup", filterTasks);
}
// Get tasks from LS
function getTasks() {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStoragegetItem("tasks"));
  }

  tasks.forEach(function (task) {
    // Create li
    const li = document.createElement("li");
    // Add a class
    li.className = "collection-item";
    // Add a text
    li.appendChild(document.createTextNode(task));

    // Create a link
    const link = document.createElement("a");
    link.className = "delete-item secondary-content";

    link.innerHTML = '<i class="fa fa-times" ></i>';
    li.appendChild(link);

    taskList.appendChild(li);
  });
}

// Add task
function addTask(e) {
  if (taskInput.value === "") {
    alert("Add a task");
  } else {
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

    // Add task to LS
    addTaskToLocalStorage(taskInput.value);

    taskInput.value = "";
  }
  e.preventDefault();
}

// Add task to LS
function addTaskToLocalStorage(task) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStoragegetItem("tasks"));
  }

  tasks.push(task);

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Remove task
function removeTask(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    if (confirm("Are you sure?")) {
      e.target.parentElement.parentElement.remove();
    }
  }
}

// Clear Tasks
function clearTasks(e) {
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }
}

// Filter Tasks
function filterTasks(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll(".collection-item").forEach(function (task) {
    const item = task.firstChild.textContent.toLowerCase();
    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  });
}
