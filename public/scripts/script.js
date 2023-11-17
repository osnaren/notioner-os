document.addEventListener("DOMContentLoaded", () => {
  fetch("../data/sounds.json")
    .then((response) => response.json())
    // .then((data) => populateMediaItems(data))
    .catch((err) => console.log(err));
});

let mediaData = [];
let isPlaying = false;

function populateMediaItems(data) {
  console.log(data);
  mediaData = data;
  const container = document.getElementById("mediaContainer");
  data.forEach((item) => {
    const title = item.title;
    const description = item.description;
    container.innerHTML += `
            <div class="media-item">
                <video class="media-video" loop muted id="${item.id}">
                    <source src="${item.videoSrc}" type="video/mp4">
                    Your browser does not support the video tag.
                </video>
                <div class="media-info">
                    <img class="media-img" src="${item.imageSrc}" alt="${title}" onClick="playVideo(${item.id})">
                    <button class="info-btn" onclick="toggleDescription(this.nextElementSibling)">i</button>
                    <p class="media-description">${description}</p>
                </div>
            </div>
        `;
  });
}

function toggleDescription(descriptionElement) {
  const isVisible = descriptionElement.style.display === "block";
  descriptionElement.style.display = isVisible ? "none" : "block";
}

function playVideo(videoElementId) {
  const videoElement = document.getElementById(videoElementId);
  videoElement.style.display = "block";
  videoElement.play();
  isPlaying = true;
}

// Keyboard shortcuts
document.addEventListener("keydown", (e) => {
  if (e.key === " ") {
    // Space bar - Play/Pause
    togglePlayPause();
  } else if (e.key === "s") {
    // 'S' key - Stop
    stopAllMedia();
  } else if (e.key === "m") {
    // 'M' key - Mute/Unmute
    toggleMute();
  }
});

function togglePlayPause() {
  // Add logic to play/pause media
}

function stopAllMedia() {
  // Add logic to stop all media
}

function toggleMute() {
  // Add logic to mute/unmute all media
}
