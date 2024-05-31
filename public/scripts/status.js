let lastFetched;
let nextFetch;
let countdownTimer;

/**
 * Fetches the last fetch status from the backend or falls back to default values.
 * @async
 */
const fetchData = async () => {
  try {
    const data = await fetch("/data/status.json");
    const fetchStatus = await data.json();

    lastFetched = fetchStatus.lastFetched
      ? new Date(fetchStatus.lastFetched)
      : new Date();
    nextFetch = fetchStatus.nextFetch
      ? new Date(fetchStatus.nextFetch)
      : new Date(lastFetched.getTime() + 5 * 60000);
  } catch (error) {
    console.error("Error fetching status:", error);
    // Fallback to default values if there's an error
    lastFetched = new Date();
    nextFetch = new Date(lastFetched.getTime() + 5 * 60000);
  }
};

/**
 * Sets and updates the countdown timer for the next fetch.
 */
const setCountdown = () => {
  const timerElement = document.getElementById("countdownTimer");
  const now = new Date();
  const diff = nextFetch.getTime() - now.getTime();

  if (diff > 0) {
    const minutes = Math.floor(diff / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);

    const paddedMinutes = minutes.toString().padStart(2, "0");
    const paddedSeconds = seconds.toString().padStart(2, "0");

    timerElement.innerHTML = `${paddedMinutes}:${paddedSeconds}`;
  } else {
    timerElement.innerHTML = "00:00";
    stopTimer();
  }
};

/**
 * Sets the last fetched time on the webpage.
 */
const setLastFetched = () => {
  const lastFetchedElement = document.getElementById("lastFetch");
  lastFetchedElement.innerHTML = lastFetched.toLocaleString();
};

/**
 * Starts the countdown timer, updating it every second.
 */
const startTimer = () => {
  setCountdown(); // Initial call to set the countdown immediately
  countdownTimer = setInterval(setCountdown, 1000);
};

/**
 * Initiates the routine of fetching data, setting last fetched time, and starting the timer.
 * @async
 */
const startRoutine = async () => {
  await fetchData();
  setLastFetched();
  startTimer();
};

/**
 * Stops the current timer and restarts the routine.
 */
const stopTimer = () => {
  clearInterval(countdownTimer);
  startRoutine();
};

// Start the routine when the DOM content is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  startRoutine();
});
