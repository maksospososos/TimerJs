let timerDisplay = document.getElementById('timer');
let resetBtn = document.getElementById('sbros');
let startBtn = document.getElementById('startBtn');
let timeInput = document.getElementById('timeInput');

let interval;

function startTimer(durationMs) {
    let endTime = Date.now() + durationMs;
    localStorage.setItem('timerEndTime', endTime);

    runTimer(endTime);
}

function runTimer(endTime) {
    clearInterval(interval);

    interval = setInterval(() => {
        let now = Date.now();
        let distance = endTime - now;

        if (distance <= 0) {
            clearInterval(interval);
            timerDisplay.textContent = "00:00:00";
            localStorage.removeItem('timerEndTime');
            return;
        }

        let hours = Math.floor(distance / 3600000);
        let minutes = Math.floor((distance % 3600000) / 60000);
        let seconds = Math.floor((distance % 60000) / 1000);

        let hDisplay = hours < 10 ? '0' + hours : hours;
        let mDisplay = minutes < 10 ? '0' + minutes : minutes;
        let sDisplay = seconds < 10 ? '0' + seconds : seconds;

        timerDisplay.textContent = hDisplay + ":" + mDisplay + ":" + sDisplay;

    }, 1000);
}

function initTimer() {
    let endTime = localStorage.getItem('timerEndTime');

    if (endTime) {
        runTimer(parseInt(endTime));
    }
}

startBtn.onclick = () => {
    let minutes = parseInt(timeInput.value);

    if (!minutes || minutes <= 0) {
        alert("Введите корректное количество минут");
        return;
    }

    let durationMs = minutes * 60000; 
    startTimer(durationMs);
};


resetBtn.onclick = () => {
    clearInterval(interval);
    localStorage.removeItem('timerEndTime');
    timerDisplay.textContent = "00:00:00";
};

initTimer();
