let activeMode = "pomodoro";

const btnPomodoro = document.getElementById("btnPomodoro");
const btnShortBreak = document.getElementById("btnShortBreak");
const btnLongBreak = document.getElementById("btnLongBreak");
const timerDisplay = document.getElementById("timerDisplay");
const startButton = document.getElementById("startButton");

function updateActiveButton() {

    btnPomodoro.classList.remove("active");
    btnShortBreak.classList.remove("active");
    btnLongBreak.classList.remove("active");

    if (activeMode === "pomodoro") {
        btnPomodoro.classList.add("active");
    } else if (activeMode === "short") {
        btnShortBreak.classList.add("active");
    } else if (activeMode === "long") {
        btnLongBreak.classList.add("active");
    }
}



