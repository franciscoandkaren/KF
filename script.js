const targetDate = new Date("2026-06-06T16:30:00-04:00").getTime();

const ids = {
  days: document.getElementById("hero-days"),
  hours: document.getElementById("hero-hours"),
  minutes: document.getElementById("hero-minutes"),
  seconds: document.getElementById("hero-seconds"),
};

function pad(value) {
  return String(value).padStart(2, "0");
}

function updateCountdown() {
  const now = Date.now();
  const diff = Math.max(targetDate - now, 0);

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  ids.days.textContent = pad(days);
  ids.hours.textContent = pad(hours);
  ids.minutes.textContent = pad(minutes);
  ids.seconds.textContent = pad(seconds);
}

updateCountdown();
setInterval(updateCountdown, 1000);

const introScreen = document.getElementById("introScreen");
const openInvitation = document.getElementById("openInvitation");
const musicBtn = document.getElementById("musicBtn");
const music = document.getElementById("weddingMusic");

let musicEnabled = false;

async function toggleMusic() {
  try {
    if (!musicEnabled) {
      await music.play();
      musicEnabled = true;
      musicBtn.textContent = "Pausar música";
    } else {
      music.pause();
      musicEnabled = false;
      musicBtn.textContent = "Activar música";
    }
  } catch (error) {
    musicBtn.textContent = "Agregar música";
  }
}

openInvitation.addEventListener("click", async () => {
  introScreen.classList.add("hide");
  await toggleMusic();
});

musicBtn.addEventListener("click", toggleMusic);

const revealElements = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.16 }
);

revealElements.forEach(element => observer.observe(element));
