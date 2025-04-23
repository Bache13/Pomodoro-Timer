let activeMode = "pomodoro";
let isRunning = false;
let intervalId = null;
let remainingSeconds = 0;

const btnPomodoro = document.getElementById("btnPomodoro");
const btnShort = document.getElementById("btnShortBreak");
const btnLong = document.getElementById("btnLongBreak");
const startBtn = document.getElementById("startButton");
const timerDisplay = document.getElementById("Timer");

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
        // Pause
        clearInterval(intervalId);
        isRunning = false;
        startBtn.textContent = "START";
    } else {
        // Start
        isRunning = true;
        startBtn.textContent = "PAUSE";

        intervalId = setInterval(() => {
            remainingSeconds--;

            if (remainingSeconds < 0) {
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

setMode('pomodoro');

const cardBox = document.getElementById("cardBox");
const taskInput = document.getElementById("taskInput");

function openTaskCard() {
    cardBox.style.display = "block";
}

function closeTaskCard() {
    cardBox.style.display = "none";
    taskInput.value = "";
}

function saveTask() {
    const task = taskInput.value.trim();
    if (task) {
        console.log("Saved Task:", task); 
        closeTaskCard(); 
    } else {
        alert("Please enter a task before saving.");
    }
}