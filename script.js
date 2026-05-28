const audio = document.getElementById("ambientAudio");
const musicBtn = document.getElementById("musicBtn");
const musicBtn2 = document.getElementById("musicBtn2");
const musicTime = document.getElementById("musicTime");
const topMusicTime = document.getElementById("topMusicTime");

let isPlaying = false;

audio.volume = 0.6;

/* FORMAT TIME */
function formatTime(time) {
  if (isNaN(time)) return "0:00";

  const minutes = Math.floor(time / 60);
  let seconds = Math.floor(time % 60);

  if (seconds < 10) seconds = "0" + seconds;

  return `${minutes}:${seconds}`;
}

/* UPDATE TIMER */
function updateMusicTime() {
  const current = formatTime(audio.currentTime);
  const duration = formatTime(audio.duration);

  if (musicTime) {
    musicTime.innerHTML = `${current} / ${duration}`;
  }

  if (topMusicTime) {
    topMusicTime.innerHTML = `${current} / ${duration}`;
  }

  localStorage.setItem("savedAudioTime", audio.currentTime);
}

/* PLAY / PAUSE */
function toggleMusic() {
  if (!isPlaying) {
    audio.play();

    isPlaying = true;

    if (musicBtn) musicBtn.innerHTML = "❚❚";
    if (musicBtn2) musicBtn2.innerHTML = "❚❚";
  } else {
    audio.pause();

    isPlaying = false;

    if (musicBtn) musicBtn.innerHTML = "▶";
    if (musicBtn2) musicBtn2.innerHTML = "▶";
  }
}

/* CHANGE TRACK */
function changeTrack() {
  audio.currentTime = 0;
  audio.play();

  isPlaying = true;

  if (musicBtn) musicBtn.innerHTML = "❚❚";
  if (musicBtn2) musicBtn2.innerHTML = "❚❚";
}

/* AUDIO LOAD */
audio.addEventListener("loadedmetadata", () => {
  const savedTime = localStorage.getItem("savedAudioTime");

  if (savedTime) {
    audio.currentTime = savedTime;
  }

  updateMusicTime();
});

audio.addEventListener("timeupdate", updateMusicTime);

/* SCROLL */
function scrollToSection(id) {
  const section = document.getElementById(id);

  if (section) {
    section.scrollIntoView({
      behavior: "smooth"
    });
  }
}

/* DREAM MODAL */
function openDream() {
  const modal = document.getElementById("dreamModal");
  modal.style.display = "grid";
}

function closeDream() {
  const modal = document.getElementById("dreamModal");
  modal.style.display = "none";
}

/* HERO PARALLAX */
window.addEventListener("mousemove", (e) => {
  const hero = document.querySelector(".hero");

  if (!hero) return;

  const x = e.clientX / window.innerWidth;
  const y = e.clientY / window.innerHeight;

  hero.style.backgroundPosition =
    `${50 + x * 4}% ${50 + y * 4}%`;
});

/* WINDOW HOVER */
const windows = document.querySelectorAll(".window");

windows.forEach((windowBox) => {
  windowBox.addEventListener("mouseenter", () => {
    windowBox.style.transform = "translateY(-4px)";
    windowBox.style.transition = ".25s ease";
    windowBox.style.boxShadow = "0 20px 40px rgba(0,0,0,.35)";
  });

  windowBox.addEventListener("mouseleave", () => {
    windowBox.style.transform = "translateY(0px)";
    windowBox.style.boxShadow = "0 12px 25px rgba(0,0,0,.2)";
  });
});

/* IMAGE POP */
const feedImages = document.querySelectorAll(".feed-row img");

feedImages.forEach((img) => {
  img.addEventListener("click", () => {
    img.style.transform = "scale(1.05)";
    img.style.transition = ".2s ease";

    setTimeout(() => {
      img.style.transform = "scale(1)";
    }, 250);
  });
});

/* LIVE CLOCK */
setInterval(() => {
  const clock = document.querySelector(".clock");

  if (!clock) return;

  const now = new Date();

  let hours = now.getHours();
  let minutes = now.getMinutes();

  if (minutes < 10) {
    minutes = "0" + minutes;
  }

  const date =
    `${now.getMonth() + 1}/${now.getDate()}/${now.getFullYear()}`;

  clock.innerHTML = `${hours}:${minutes}<br>${date}`;
}, 1000);

/* STARTUP */
window.addEventListener("load", () => {
  audio.load();
  console.log("Asher.exe loaded successfully");
});