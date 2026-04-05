let timerDisplay = document.getElementById('timerr');
let resetBtn = document.getElementById('delete');

function initTimer() {
    // 1. Берем время окончания из памяти
    let endTime = localStorage.getItem('timerEndTime');

    if (!endTime) {
        // Если его нет, создаем: сейчас + 1 час (3600000 мс)
        endTime = Date.now() + 3600000;
        localStorage.setItem('timerEndTime', endTime);
    }

    let interval = setInterval(() => {
        let now = Date.now();
        let distance = endTime - now;

        // 2. Если время вышло, останавливаем всё
        if (distance <= 0) {
            clearInterval(interval);
            timerDisplay.textContent = "00:00:00";
            return;
        }

        // 3. Считаем часы, минуты и секунды
        let hours = Math.floor(distance / 3600000);
        let minutes = Math.floor((distance % 3600000) / 60000);
        let seconds = Math.floor((distance % 60000) / 1000);

        // 4. Форматируем время БЕЗ padStart
        // Если число меньше 10, добавляем '0' спереди, иначе оставляем как есть
        let hDisplay = hours < 10 ? '0' + hours : hours;
        let mDisplay = minutes < 10 ? '0' + minutes : minutes;
        let sDisplay = seconds < 10 ? '0' + seconds : seconds;

        // 5. Выводим результат
        timerDisplay.textContent = hDisplay + ":" + mDisplay + ":" + sDisplay;

    }, 1000);

    // 6. Кнопка сброса
    resetBtn.onclick = () => {
        clearInterval(interval);
        localStorage.removeItem('timerEndTime');
        initTimer(); // Перезапуск
    };
}

// Запускаем таймер
initTimer();
