// Intro fade
window.addEventListener("load", () => {
  const intro = document.getElementById("intro");
  setTimeout(() => intro.classList.add("hidden"), 2600);
});

// Stars background
const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");
let stars = [];
function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  stars = Array.from({ length: 80 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 1.2 + 0.2,
  }));
}
resize();
window.addEventListener("resize", resize);
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#fff";
  stars.forEach(s => {
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fill();
    s.y += 0.1;
    if (s.y > canvas.height) s.y = 0;
  });
  requestAnimationFrame(animate);
}
animate();

// Sound control
let soundOn = false;
const toggle = document.getElementById("sound-toggle");
let audio;
toggle.addEventListener("click", () => {
  if (!soundOn) {
    audio = new Audio("https://cdn.pixabay.com/download/audio/2023/01/12/audio_56cbf47a23.mp3?filename=ambient-cyber-14805.mp3");
    audio.loop = true;
    audio.volume = 0.3;
    audio.play();
    toggle.textContent = "ðŸ”ˆ";
  } else {
    audio.pause();
    toggle.textContent = "ðŸ”Š";
  }
  soundOn = !soundOn;
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", e => {
    e.preventDefault();
    document.querySelector(anchor.getAttribute("href")).scrollIntoView({ behavior: "smooth" });
  });
});


