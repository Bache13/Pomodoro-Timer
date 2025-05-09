// Timer-related variables
let activeMode = "pomodoro";
let isRunning = false;
let intervalId = null;
let remainingSeconds = 0;

// DOM elements
const btnPomodoro = document.getElementById("btnPomodoro");
const btnShort = document.getElementById("btnShortBreak");
const btnLong = document.getElementById("btnLongBreak");
const startBtn = document.getElementById("startButton");
const timerDisplay = document.getElementById("Timer");
const cardBox = document.getElementById("cardBox");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

// ===================== Pomodoro Timer =====================

function setMode(mode) {
    activeMode = mode;
    isRunning = false;
    clearInterval(intervalId);
    startBtn.textContent = "START";

    [btnPomodoro, btnShort, btnLong].forEach(btn => btn.classList.remove("active"));

    if (mode === "pomodoro") {
        remainingSeconds = 25 * 60;
        btnPomodoro.classList.add("active");
    } else if (mode === "short") {
        remainingSeconds = 5 * 60;
        btnShort.classList.add("active");
    } else if (mode === "long") {
        remainingSeconds = 15 * 60;
        btnLong.classList.add("active");
    }

    updateTimerDisplay(remainingSeconds);
}

function toggleTimer() {
    if (isRunning) {
        clearInterval(intervalId);
        isRunning = false;
        startBtn.textContent = "START";
    } else {
        isRunning = true;
        startBtn.textContent = "PAUSE";

        intervalId = setInterval(() => {
            remainingSeconds--;
        
        
        const alarm =   new Audio("/Sound/alarmSound.mp3");
            if (remainingSeconds <= 0) {
                alarm.volume = 0.03;
                alarm.play();

                clearInterval(intervalId);
                timerDisplay.textContent = "00:00";
                startBtn.textContent = "START";
                isRunning = false;
            } else {
                updateTimerDisplay(remainingSeconds);
            }
        }, 1000);
    }
}

function updateTimerDisplay(seconds) {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    timerDisplay.textContent = `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}

// ===================== Task Management =====================

function openTaskCard() {
    cardBox.style.display = "block";
}

function closeTaskCard() {
    cardBox.style.display = "none";
    taskInput.value = "";
}

function getTasksFromStorage() {
    const stored = localStorage.getItem("tasks");
    return stored ? JSON.parse(stored) : [];
}

function saveTask() {
    const task = taskInput.value.trim();
    if (task) {
        const tasks = getTasksFromStorage();
        tasks.push(task);
        localStorage.setItem("tasks", JSON.stringify(tasks));

        renderTasks();
        closeTaskCard();
    } else {
        alert("Please enter a task.");
    }
}

function renderTasks() {
    taskList.innerHTML = "";

    const tasks = getTasksFromStorage();

    if (tasks.length === 0) {
        taskList.style.display = "none";
        return;
    }

    taskList.style.display = "block";

    tasks.forEach(task => {
        const taskEl = document.createElement("div");
        taskEl.classList.add("task-item");
        taskEl.style.height = "80px"; // optional if not set in CSS
        taskEl.innerHTML = `
            <span class="task-text">${task}</span>
            <div class="button-div">
                <button class="delete-button" onclick="removeTask(this)">Delete</button>
                <button onclick="markAsDone(this)">
                    <img src="/images/icons8-checkmark-30.png" alt="">
                </button>
            </div>
        `;
        taskList.appendChild(taskEl);
    });
}

function removeTask(button) {
    const taskItem = button.closest(".task-item");
    const taskText = taskItem.querySelector(".task-text").textContent;

    let tasks = getTasksFromStorage();
    tasks = tasks.filter(task => task !== taskText);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    renderTasks();
}

function markAsDone(button) {
    const taskText = button.closest(".task-item").querySelector(".task-text");
    taskText.classList.toggle("done");
}

function toggleModal() {
    const modal = document.getElementById("qaModal");
    modal.style.display = (modal.style.display === "block") ? "none" : "block";
}

window.onclick = function(event) {
    const modal = document.getElementById("qaModal");
    if (event.target === modal) {
        modal.style.display = "none";
    }
}

// ===================== Init =====================
window.onload = () => {
    setMode('pomodoro');
    renderTasks();
};