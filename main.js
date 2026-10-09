const loadTasksBtn = document.getElementById("loadTasksBtn");
const statusMessage = document.getElementById("statusMessage");
const taskList = document.getElementById("taskList");

const taskManager = new TaskManager();

async function loadTasks() {
  statusMessage.textContent = "Loading tasks...";

  const rawTasks = await fetchTasks();

  const jsonString = JSON.stringify(rawTasks);
  const parsedTasks = JSON.parse(jsonString);

  const tasks = parsedTasks.map(
    (item) => new Task(item.id, item.title, item.completed)
  );

  taskManager.setTasks(tasks);
  console.log(taskManager.tasks);
  statusMessage.textContent = "";
}

loadTasksBtn.addEventListener("click", loadTasks);