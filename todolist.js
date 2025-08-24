const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTask");
const taskList = document.getElementById("taskList");
const taskCounter = document.getElementById("taskCounter");
const clearAllBtn = document.getElementById("clearAll");
const filterBtns = document.querySelectorAll(".filter-btn");
const modeToggle = document.getElementById("modeToggle");
const body = document.body;

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Add Task
addTaskBtn.addEventListener("click", () => {
  const taskText = taskInput.value.trim();
  if (taskText === "") return alert("Please enter a task!");

  tasks.push({ id: Date.now(), text: taskText, completed: false });
  taskInput.value = "";
  saveTasks();
  renderTasks();
});

// Render tasks
function renderTasks(filter = "all") {
  taskList.innerHTML = "";
  let filteredTasks = tasks;

  if (filter === "completed") filteredTasks = tasks.filter(t => t.completed);
  else if (filter === "pending") filteredTasks = tasks.filter(t => !t.completed);

  filteredTasks.forEach(task => {
    const li = document.createElement("li");
    li.className = `list-group-item d-flex justify-content-between align-items-center ${task.completed ? "list-group-item-success" : ""}`;

    li.innerHTML = `
      <span class="task-text ${task.completed ? 'text-decoration-line-through' : ''}">${task.text}</span>
      <div>
        <button class="btn btn-success btn-sm me-1" onclick="toggleComplete(${task.id})">✔</button>
        <button class="btn btn-warning btn-sm me-1" onclick="editTask(${task.id})">✏</button>
        <button class="btn btn-danger btn-sm" onclick="deleteTask(${task.id})">❌</button>
      </div>
    `;
    taskList.appendChild(li);
  });

  updateCounter();
}

// Toggle Complete
function toggleComplete(id) {
  tasks = tasks.map(task =>
    task.id === id ? { ...task, completed: !task.completed } : task
  );
  saveTasks();
  renderTasks();
}

// Edit Task
function editTask(id) {
  const newText = prompt("Edit your task:");
  if (newText && newText.trim() !== "") {
    tasks = tasks.map(task => task.id === id ? { ...task, text: newText } : task);
    saveTasks();
    renderTasks();
  }
}

// Delete Task
function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  saveTasks();
  renderTasks();
}

// Clear All
clearAllBtn.addEventListener("click", () => {
  if (confirm("Are you sure you want to delete all tasks?")) {
    tasks = [];
    saveTasks();
    renderTasks();
  }
});

// Update Counter
function updateCounter() {
  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  taskCounter.textContent = `Total: ${total} | Completed: ${completed} | Pending: ${total - completed}`;
}

// Save to LocalStorage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Filters
filterBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    filterBtns.forEach(b => b.classList.remove("btn-primary"));
    btn.classList.add("btn-primary");
    renderTasks(btn.getAttribute("data-filter"));
  });
});

// Dark Mode
modeToggle.addEventListener("click", () => {
  body.classList.toggle("dark-mode");
  const icon = modeToggle.querySelector(".icon");
  const label = modeToggle.querySelector(".label");
  if (body.classList.contains("dark-mode")) {
    icon.textContent = "☀️";
    label.textContent = "Light Mode";
  } else {
    icon.textContent = "🌙";
    label.textContent = "Dark Mode";
  }
});

renderTasks();













