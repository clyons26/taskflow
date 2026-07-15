const taskInput = document.getElementById("taskInput");
const addButton = document.getElementById("addTask");
const taskList = document.getElementById("taskList");

addButton.addEventListener("click", addTask);

taskInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        addTask();
    }
});


function addTask() {

    const taskText = taskInput.value.trim();

    if (taskText === "") {
        return;
    }


    const li = document.createElement("li");


    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";


    const span = document.createElement("span");
    span.textContent = taskText;


    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";


    checkbox.addEventListener("change", function() {

        if (checkbox.checked) {
            span.classList.add("completed");
        } else {
            span.classList.remove("completed");
        }

    });


    deleteButton.addEventListener("click", function() {
        li.remove();
    });


    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteButton);


    taskList.appendChild(li);


    taskInput.value = "";

}
