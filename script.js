const taskInput = document.getElementById("taskInput");
const addButton = document.getElementById("addTask");
const taskList = document.getElementById("taskList");

let tasks = [];

// Load saved tasks when page opens
loadTasks();

addButton.addEventListener("click", addTask);

taskInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        addTask();
    }
});

function addTask() {

    const text = taskInput.value.trim();

    if (text === "") return;

    const task = {
        text: text,
        completed: false
    };

    tasks.push(task);

    createTask(task);

    saveTasks();

    taskInput.value = "";
}

function createTask(task) {

    const li = document.createElement("li");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;

    const span = document.createElement("span");
    span.textContent = task.text;

    if (task.completed) {
        span.classList.add("completed");
    }

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";

    checkbox.addEventListener("change", function () {

        task.completed = checkbox.checked;

        span.classList.toggle("completed");

        saveTasks();

    });

    deleteButton.addEventListener("click", function () {

        tasks = tasks.filter(t => t !== task);

        li.remove();

        saveTasks();

    });

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteButton);

    taskList.appendChild(li);

}

function saveTasks() {

    localStorage.setItem("tasks", JSON.stringify(tasks));

}

function loadTasks() {

    const saved = localStorage.getItem("tasks");

    if (!saved) return;

    tasks = JSON.parse(saved);

    tasks.forEach(createTask);

}
