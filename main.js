const loadTasksBtn = document.getElementById("loadTasksBtn");
const statusMessage = document.getElementById("statusMessage");
const taskList = document.getElementById("taskList");

const taskManager = new TaskManager();

function createTaskElement(task) {
  const taskDiv = document.createElement("div");
  taskDiv.classList.add("task");
  if (task.completed) {
    taskDiv.classList.add("completed");
  }

  const titleSpan = document.createElement("span");
  titleSpan.textContent = task.title;

  const toggleBtn = document.createElement("button");
  toggleBtn.textContent = "Toggle";
  toggleBtn.addEventListener("click", () => {
    taskManager.toggleTask(task.id);
    renderTasks();
  });

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.addEventListener("click", () => {
    taskManager.removeTask(task.id);
    renderTasks();
  });

  taskDiv.appendChild(titleSpan);
  taskDiv.appendChild(toggleBtn);
  taskDiv.appendChild(deleteBtn);

  return taskDiv;
}

function renderTasks() {
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }

  if (taskManager.tasks.length === 0) {
    const emptyMsg = document.createElement("p");
    emptyMsg.textContent = "No tasks to show.";
    taskList.appendChild(emptyMsg);
    return;
  }

  taskManager.tasks.forEach((task) => {
    taskList.appendChild(createTaskElement(task));
  });
}

async function loadTasks() {
  statusMessage.textContent = "Loading tasks...";

  const rawTasks = await fetchTasks();

  const jsonString = JSON.stringify(rawTasks);
  const parsedTasks = JSON.parse(jsonString);

  const tasks = parsedTasks.map(
    (item) => new Task(item.id, item.title, item.completed)
  );

  taskManager.setTasks(tasks);
  renderTasks();
  statusMessage.textContent = "";
}

loadTasksBtn.addEventListener("click", loadTasks);