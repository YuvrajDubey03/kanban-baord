const todo =document.querySelector("#Todo");
const progress =document.querySelector("#Progress");
const done =document.querySelector("#Done");
let dragElement = null;
const columns = [todo, progress, done];


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

         columns.forEach(col => {
            const tasks = col.querySelectorAll(".task");
            const count = col.querySelector(".right");

            count.textContent = tasks.length;
         });
     });
}
addDragEventsonColumn(todo);
addDragEventsonColumn(progress);
addDragEventsonColumn(done);


// modal
const toggleModalButton = document.querySelector("#toggle-modal");
const modalBG = document.querySelector(".bg");
const modal = document.querySelector(".modal");
const addTaskButton = document.querySelector("#add-new-task");


toggleModalButton.addEventListener("click", (e) =>{
    modal.classList.toggle("active");
} );

modalBG.addEventListener("click", (e) =>{
    modal.classList.remove("active");
} );




addTaskButton.addEventListener("click", (e) =>{

const taskTitle = document.querySelector("#task-title-input").value;
const taskDesc = document.querySelector("#task-desc-input").value;

const div = document.createElement("div");
div.classList.add("task");
div.setAttribute("draggable", "true");

div.innerHTML = `<h2>${taskTitle}</h2>
                <p>${taskDesc}</p>
                <button>Delete</button>`;
todo.appendChild(div);
columns.forEach(col => {
            const tasks = col.querySelectorAll(".task");
            const count = col.querySelector(".right");

            count.textContent = tasks.length;
         });
modal.classList.remove("active");

div.addEventListener("drag", (e) =>{
    dragElement = div;

})

});