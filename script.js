const todo =document.querySelector("#Todo");
const progress =document.querySelector("#Progress");
const done =document.querySelector("#Done");
let dragElement = null;



const tasks = document.querySelectorAll(".task");

tasks.forEach(task => {
    task.addEventListener("drag", (e) =>{
        dragElement = task;
    });
  
});

function addDragEventsonColumn(column){
    column.addEventListener("dragenter", (e) =>{
        column.classList.add("hover-over");
    });
    column.addEventListener("dragleave", (e) =>{ 
        column.classList.remove("hover-over");
    });

    column.addEventListener("dragover", (e) =>{
        e.preventDefault();
    });

    column.addEventListener("drop", (e) =>{
        e.preventDefault();
        column.appendChild(dragElement);
        column.classList.remove("hover-over");
     });
}
addDragEventsonColumn(todo);
addDragEventsonColumn(progress);
addDragEventsonColumn(done);