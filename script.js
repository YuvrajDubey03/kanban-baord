let tasksdata = {};

const todo = document.querySelector("#Todo");
const progress = document.querySelector("#Progress");
const done = document.querySelector("#Done");

let dragElement = null;
const columns = [todo, progress, done];

/* =========================
   CREATE TASK ELEMENT
========================= */
function createTaskElement(title, description) {
    const div = document.createElement("div");
    div.classList.add("task");
    div.setAttribute("draggable", "true");

    div.innerHTML = `
        <h2>${title}</h2>
        <p>${description}</p>
        <button>Delete</button>
    `;

    div.addEventListener("dragstart", () => {
        dragElement = div;
    });

    const deleteButton=div.querySelector("button")
    deleteButton.addEventListener("click",()=>{
        div.remove();
      saveToLocalStorage();
    })

    return div;
}

/* =========================
   UPDATE COUNTS
========================= */
function updateCounts() {
    columns.forEach(col => {
        const count = col.querySelector(".right");
        count.textContent = col.querySelectorAll(".task").length;
    });
}

/* =========================
   SAVE TO LOCAL STORAGE
========================= */
function saveToLocalStorage() {
    tasksdata = {};

    columns.forEach(col => {
        const tasks = col.querySelectorAll(".task");

        tasksdata[col.id] = Array.from(tasks).map(t => ({
            title: t.querySelector("h2").textContent,
            description: t.querySelector("p").textContent
        }));
    });

    localStorage.setItem("tasks", JSON.stringify(tasksdata));
    updateCounts();
}

/* =========================
   LOAD FROM LOCAL STORAGE
========================= */
function loadFromLocalStorage() {
    const savedData = JSON.parse(localStorage.getItem("tasks"));
    if (!savedData) return;

    columns.forEach(col => {
        col.querySelectorAll(".task").forEach(t => t.remove());
    });

    Object.keys(savedData).forEach(columnId => {
        const column = document.querySelector(`#${columnId}`);

        savedData[columnId].forEach(task => {
            const taskEl = createTaskElement(task.title, task.description);
            column.appendChild(taskEl);
        });
    });

    updateCounts();
}

/* =========================
   DRAG & DROP
========================= */
function addDragEventsonColumn(column) {
    column.addEventListener("dragenter", () => {
        column.classList.add("hover-over");
    });

    column.addEventListener("dragleave", () => {
        column.classList.remove("hover-over");
    });

    column.addEventListener("dragover", (e) => {
        e.preventDefault();
    });

    column.addEventListener("drop", (e) => {
        e.preventDefault();
        column.appendChild(dragElement);
        column.classList.remove("hover-over");

        saveToLocalStorage();
    });
}

addDragEventsonColumn(todo);
addDragEventsonColumn(progress);
addDragEventsonColumn(done);

/* =========================
   LOAD DATA ON REFRESH
========================= */
loadFromLocalStorage();

/* =========================
   MODAL + ADD TASK
========================= */
const toggleModalButton = document.querySelector("#toggle-modal");
const modalBG = document.querySelector(".bg");
const modal = document.querySelector(".modal");
const addTaskButton = document.querySelector("#add-new-task");

toggleModalButton.addEventListener("click", () => {
    modal.classList.toggle("active");
});

modalBG.addEventListener("click", () => {
    modal.classList.remove("active");
});

addTaskButton.addEventListener("click", () => {
    const titleInput = document.querySelector("#task-title-input");
    const descInput = document.querySelector("#task-desc-input");

    const taskTitle = titleInput.value;
    const taskDesc = descInput.value;

    if (!taskTitle.trim()) return; // optional safety

    const taskEl = createTaskElement(taskTitle, taskDesc);
    todo.appendChild(taskEl);

    saveToLocalStorage();

    /* ✅ CLEAR INPUTS */
    titleInput.value = "";
    descInput.value = "";

    modal.classList.remove("active");
});
let selectedTask = null;
let longPressTimer = null;

document.addEventListener("touchstart", (e) => {
    const task = e.target.closest(".task");
    if (!task) return;

    longPressTimer = setTimeout(() => {
        selectedTask = task;
        task.style.opacity = "0.6";
    }, 500);
});

document.addEventListener("touchend", () => {
    clearTimeout(longPressTimer);
});

columns.forEach(column => {
    column.addEventListener("touchstart", () => {
        if (!selectedTask) return;

        column.appendChild(selectedTask);
        selectedTask.style.opacity = "1";
        selectedTask = null;

        saveToLocalStorage();
    });
});
