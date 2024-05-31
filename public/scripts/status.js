let lastFetched;
let nextFetch;
let countdownTimer;

const fetchData = async () => {
  try {
    let fetchStatus = await fetch("/data/status.json").then((res) =>
      res.json()
    );

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

const setLastFetched = () => {
  const lastFetchedElement = document.getElementById("lastFetch");
  lastFetchedElement.innerHTML = lastFetched.toLocaleString();
};

const startTimer = () => {
  setCountdown(); // Initial call to set the countdown immediately
  countdownTimer = setInterval(setCountdown, 1000);
};

const startRoutine = async () => {
  await fetchData();
  setLastFetched();
  startTimer();
};

const stopTimer = () => {
  clearInterval(countdownTimer);
  startRoutine();
};

document.addEventListener("DOMContentLoaded", () => {
  startRoutine();
});
