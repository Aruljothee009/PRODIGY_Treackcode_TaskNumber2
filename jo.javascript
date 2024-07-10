JavaScript (script.js):
javascript
let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let laps = [];

const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const millisecondsDisplay = document.getElementById('milliseconds');
const startBtn = document.getElementById('start-btn');
const pauseBtn = document.getElementById('pause-btn');
const resetBtn = document.getElementById('reset-btn');
const lapList = document.getElementById('lap-list');

startBtn.addEventListener('click', startStopwatch);
pauseBtn.addEventListener('click', pauseStopwatch);
resetBtn.addEventListener('click', resetStopwatch);

function startStopwatch() {
  startTime = new Date().getTime();
  timerInterval = setInterval(updateStopwatch, 10);
  startBtn.disabled = true;
  pauseBtn.disabled = false;
  resetBtn.disabled = false;
}

function pauseStopwatch() {
  clearInterval(timerInterval);
  elapsedTime += new Date().getTime() - startTime;
  startBtn.disabled = false;
  pauseBtn.disabled = true;
}

function resetStopwatch() {
  clearInterval(timerInterval);
  startTime = 0;
  elapsedTime = 0;
  laps = [];
  updateStopwatch();
  updateLapList();
  startBtn.disabled = false;
  pauseBtn.disabled = true;
  resetBtn.disabled = true;
}

function updateStopwatch() {
  const currentTime = new Date().getTime() - startTime + elapsedTime;
  const milliseconds = Math.floor((currentTime % 1000) / 10);
  const seconds = Math.floor((currentTime / 1000) % 60);
  const minutes = Math.floor((currentTime / (1000 * 60)) % 60);

  minutesDisplay.textContent = String(minutes).padStart(2, '0');
  secondsDisplay.textContent = String(seconds).padStart(2, '0');
  millisecondsDisplay.textContent = String(milliseconds).padStart(3, '0');
}

function addLap() {
  const currentTime = new Date().getTime() - startTime + elapsedTime;
  const milliseconds = Math.floor((currentTime % 1000) / 10);
  const seconds = Math.floor((currentTime / 1000) % 60);
  const minutes = Math.floor((currentTime / (1000 * 60)) % 60);
  laps.push(`\[${minutes}:\${seconds.toString().padStart(2, '0')}:\${milliseconds.toString().padStart(3, '0')}\]`);
  updateLapList();
}

function updateLapList() {
  lapList.innerHTML = '';
  for (const lap of laps) {
    const lapItem = document.createElement('li');
    lapItem.textContent = lap;
    lapList.appendChild(lapItem);
  }
}

