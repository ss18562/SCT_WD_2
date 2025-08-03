let startTime = 0;
let elapsedTime = 0;
let timerInterval = null;

const display = document.getElementById("display");
const laps = document.getElementById("laps");

function formatTime(ms) {
  const hrs = String(Math.floor(ms / 3600000)).padStart(2, "0");
  const mins = String(Math.floor((ms % 3600000) / 60000)).padStart(2, "0");
  const secs = String(Math.floor((ms % 60000) / 1000)).padStart(2, "0");
  const millis = String(ms % 1000).padStart(3, "0");
  return `${hrs}:${mins}:${secs}.${millis}`;
}

function startStopwatch() {
  if (timerInterval) return;
  startTime = Date.now() - elapsedTime;
  timerInterval = setInterval(() => {
    elapsedTime = Date.now() - startTime;
    display.textContent = formatTime(elapsedTime);
  }, 10);
}

function pauseStopwatch() {
  if (!timerInterval) return;
  clearInterval(timerInterval);
  timerInterval = null;
}

function resetStopwatch() {
  clearInterval(timerInterval);
  timerInterval = null;
  elapsedTime = 0;
  display.textContent = "00:00:00.000";
  laps.innerHTML = "";
}

function recordLap() {
  if (elapsedTime === 0) return;
  const li = document.createElement("li");
  li.textContent = `Lap ${laps.children.length + 1}: ${formatTime(elapsedTime)}`;
  laps.appendChild(li);
}
