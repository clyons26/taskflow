const taskInput = document.getElementById("taskInput");
const addButton = document.getElementById("addTask");
const taskList = document.getElementById("taskList");

const totalTasks = document.getElementById("totalTasks");
const completedTasks = document.getElementById("completedTasks");
const remainingTasks = document.getElementById("remainingTasks");
const progressBar = document.getElementById("progressBar");


let tasks = JSON.parse(localStorage.getItem("tasks")) || [];


// Load saved tasks
tasks.forEach(createTask);

updateStats();


// Add button
addButton.addEventListener("click", addTask);


// Press Enter to add
taskInput.addEventListener("keypress", function(event){

    if(event.key === "Enter"){

        addTask();

    }

});


// Add a task
function addTask(){

    const text = taskInput.value.trim();


    if(text === ""){

        return;

    }


    const task = {

        text: text,

        completed: false

    };


    tasks.push(task);


    saveTasks();


    createTask(task);


    updateStats();


    taskInput.value = "";

}



// Create task on screen
function createTask(task){


    const li = document.createElement("li");


    const checkbox = document.createElement("input");

    checkbox.type = "checkbox";

    checkbox.checked = task.completed;



    const span = document.createElement("span");

    span.textContent = task.text;



    const deleteButton = document.createElement("button");

    deleteButton.textContent = "Delete";

    deleteButton.className = "delete";



    if(task.completed){

        span.classList.add("completed");

    }



    // Complete task
    checkbox.addEventListener("change", function(){


        task.completed = checkbox.checked;


        span.classList.toggle(
            "completed",
            task.completed
        );


        saveTasks();

        updateStats();


    });



    // Delete task
    deleteButton.addEventListener("click", function(){


        tasks = tasks.filter(function(item){

            return item !== task;

        });


        li.remove();


        saveTasks();

        updateStats();


    });



    li.appendChild(checkbox);

    li.appendChild(span);

    li.appendChild(deleteButton);


    taskList.appendChild(li);


}



// Save tasks
function saveTasks(){

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );

}



// Update dashboard numbers
function updateStats(){


    const total = tasks.length;


    const completed = tasks.filter(function(task){

        return task.completed;

    }).length;


    const remaining = total - completed;



    totalTasks.textContent = total;

    completedTasks.textContent = completed;

    remainingTasks.textContent = remaining;



    let percentage = 0;


    if(total > 0){

        percentage = (completed / total) * 100;

    }


    progressBar.style.width = percentage + "%";


}
