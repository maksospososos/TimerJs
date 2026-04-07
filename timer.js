let timerDisplay = document.getElementById('timerr');
let resetBtn = document.getElementById('delete');
let form = document.getElementById('timerForm');
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

        let h = hours < 10 ? '0' + hours : hours;
        let m = minutes < 10 ? '0' + minutes : minutes;
        let s = seconds < 10 ? '0' + seconds : seconds;

        timerDisplay.textContent = `${h}:${m}:${s}`;
    }, 1000);
}

form.addEventListener('submit', function(e) {
    e.preventDefault(); // ❗ отключаем перезагрузку страницы

    let minutes = parseInt(timeInput.value);

    if (!minutes || minutes <= 0) {
        alert("Введите число больше 0");
        return;
    }

    startTimer(minutes * 60000);
});


resetBtn.addEventListener('click', () => {
    clearInterval(interval);
    localStorage.removeItem('timerEndTime');
    timerDisplay.textContent = "00:00:00";
});


function initTimer() {
    let endTime = localStorage.getItem('timerEndTime');
    if (endTime) {
        runTimer(parseInt(endTime));
    }
}

initTimer();
