class Task {
    constructor(name, date, status = "pending") {
        this.name = name;
        this.date = date;
        this.status = status;
    }
}

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function displayTasks(filter = "all") {
    let taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        if (filter !== "all" && task.status !== filter) return;

        let li = document.createElement("li");
        li.className = `task ${task.status}`;

        let formattedDate = task.date ? new Date(task.date).toLocaleDateString() : "No Date";

        li.innerHTML = `
            <span class="task-text">${task.name} - <b>${formattedDate}</b></span>
            <button class="edit" onclick="editTask(${index})">Edit</button>
            <button class="toggle" onclick="toggleStatus(${index})">
                ${task.status === "pending" ? "Pending" : "Completed"}
            </button>
            <button class="delete" onclick="deleteTask(${index})">Delete</button>
        `;

        taskList.appendChild(li);
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
    let name = document.getElementById("taskName").value.trim();
    let date = document.getElementById("taskDate").value.trim();

    if (!name || !date) {
        alert("Task name and date are required!");
        return;
    }

    tasks.push(new Task(name, date));
    displayTasks();

    document.getElementById("taskName").value = "";
    document.getElementById("taskDate").value = "";
}

function editTask(index) {
    let newName = prompt("Edit Task Name:", tasks[index].name);
    let newDate = prompt("Edit Date (YYYY-MM-DD):", tasks[index].date);

    if (newName && newDate) {
        tasks[index].name = newName;
        tasks[index].date = newDate;
        displayTasks();
    }
}

function toggleStatus(index) {
    tasks[index].status = tasks[index].status === "pending" ? "completed" : "pending";
    displayTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    displayTasks();
}

document.addEventListener("DOMContentLoaded", () => displayTasks());
