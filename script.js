const taskInput = document.getElementById("taskInput");
const addButton = document.getElementById("addTask");
const taskList = document.getElementById("taskList");


let tasks = JSON.parse(localStorage.getItem("tasks")) || [];


tasks.forEach(createTask);


addButton.addEventListener("click", addTask);


taskInput.addEventListener("keypress", function(event){

    if(event.key === "Enter"){

        addTask();

    }

});


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


    taskInput.value = "";

}



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



    checkbox.addEventListener("change", function(){


        task.completed = checkbox.checked;


        span.classList.toggle(
            "completed",
            task.completed
        );


        saveTasks();


    });



    deleteButton.addEventListener("click", function(){


        tasks = tasks.filter(function(item){

            return item !== task;

        });


        li.remove();


        saveTasks();


    });



    li.appendChild(checkbox);

    li.appendChild(span);

    li.appendChild(deleteButton);



    taskList.appendChild(li);


}



function saveTasks(){

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );

}
