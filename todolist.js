// Get DOM elements
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTask");
const taskList = document.getElementById("taskList");
const taskCounter = document.getElementById("taskCounter");
const clearAllBtn = document.getElementById("clearAll");
const filterBtns = document.querySelectorAll(".filter-btn");
const modeToggle = document.getElementById("modeToggle");
const body = document.body;

// Track tasks
let tasks = [];

// Add Task
addTaskBtn.addEventListener("click", () => {
  const taskText = taskInput.value.trim();
  if (taskText === "") return alert("Please enter a task!");

  const task = {
    id: Date.now(),
    text: taskText,
    completed: false
  };

  tasks.push(task);
  taskInput.value = "";
  renderTasks();
});

// Render tasks
function renderTasks(filter = "all") {
  taskList.innerHTML = "";

  let filteredTasks = tasks;
  if (filter === "completed") {
    filteredTasks = tasks.filter(t => t.completed);
  } else if (filter === "pending") {
    filteredTasks = tasks.filter(t => !t.completed);
  }

  filteredTasks.forEach(task => {
    const li = document.createElement("li");
    li.className = task.completed ? "completed" : "";

    li.innerHTML = `
      <span>${task.text}</span>
      <div class="actions">
        <button onclick="toggleComplete(${task.id})">✔</button>
        <button onclick="editTask(${task.id})">✏</button>
        <button onclick="deleteTask(${task.id})">❌</button>
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
  renderTasks();
}

// Edit Task
function editTask(id) {
  const newText = prompt("Edit your task:");
  if (newText !== null && newText.trim() !== "") {
    tasks = tasks.map(task =>
      task.id === id ? { ...task, text: newText } : task
    );
    renderTasks();
  }
}

// Delete Task
function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  renderTasks();
}

// Clear All
clearAllBtn.addEventListener("click", () => {
  if (confirm("Are you sure you want to delete all tasks?")) {
    tasks = [];
    renderTasks();
  }
});

// Update Counter
function updateCounter() {
  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  const pending = total - completed;

  taskCounter.textContent = `Total: ${total} | Completed: ${completed} | Pending: ${pending}`;
}

// Filters
filterBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    const filter = btn.getAttribute("data-filter");
    renderTasks(filter);
  });
});

// Dark Mode Toggle
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

