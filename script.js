const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");
const music = document.getElementById("bg-music");
const toggleSwitch = document.getElementById("toggle");
const toggleDiv = document.getElementById("toggle-div");
const themeToggleContainer = document.getElementById("theme-toggle-container");
const themeBtn = document.getElementById("theme-btn");

let isPlaying = false;
let cursorIndex = 0;
const cursors = ["", "cursor1", "cursor2", "cursor3"];

function toggleMenu() {
  sidebar.classList.toggle("active");
  overlay.classList.toggle("active");
}

function playMusic() {
  if (isPlaying) {
    music.pause();
  } else {
    music.play();
  }
  isPlaying = !isPlaying;
}

function toggleThemeToggle() {
  themeToggleContainer.classList.toggle("active");
  themeBtn.classList.toggle("active");
}

toggleSwitch.addEventListener("change", function (e) {
  if (e.target.checked) {
    document.body.classList.add("dark-mode");
    toggleDiv.classList.add("night");
  } else {
    document.body.classList.remove("dark-mode");
    toggleDiv.classList.remove("night");
  }
});

function changeCursor() {
  cursorIndex = (cursorIndex + 1) % cursors.length;
  document.body.className = cursors[cursorIndex];
}
