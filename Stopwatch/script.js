let startTime = 0;
let elapsedTime = 0;
let interval = null;
let isRunning = false;

const display = document.querySelector('#display');
const startBtn = document.querySelector('#startBtn');
const restartBtn = document.querySelector('#restartBtn');
const resetBtn = document.querySelector('#resetBtn');

function updateTime() {
  elapsedTime = Date.now() - startTime;
  let minutes = Math.floor(elapsedTime / 60000);
  let seconds = Math.floor((elapsedTime % 60000) / 1000);
  let milliseconds = Math.floor((elapsedTime % 1000) / 10);

  display.textContent =
    (minutes < 10 ? '0' : '') + minutes + ':' +
    (seconds < 10 ? '0' : '') + seconds + '.' +
    (milliseconds < 10 ? '0' : '') + milliseconds;
}

startBtn.addEventListener('click', () => {
  if (!isRunning) {
    startTime = Date.now() - elapsedTime;
    interval = setInterval(updateTime, 10);
    isRunning = true;
    startBtn.disabled = true;
    restartBtn.disabled = false;
  }
});

restartBtn.addEventListener('click', () => {
  if (isRunning) {
    clearInterval(interval);
    isRunning = false;
    startBtn.disabled = false;
    restartBtn.disabled = true;
  } else {
    startTime = Date.now() - elapsedTime;
    interval = setInterval(updateTime, 10);
    isRunning = true;
    startBtn.disabled = true;
    restartBtn.disabled = false;
  }
});

resetBtn.addEventListener('click', () => {
  clearInterval(interval);
  startTime = 0;
  elapsedTime = 0;
  isRunning = false;
  display.textContent = '00:00.00';
  startBtn.disabled = false;
  restartBtn.disabled = true;
});
