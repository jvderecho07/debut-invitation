// ── MUSIC ──
var music    = document.getElementById('bg-music');
var musicBtn = document.getElementById('music-btn');
var iconOn   = document.getElementById('music-icon-on');
var iconOff  = document.getElementById('music-icon-off');

function setPlaying(playing) {
  if (playing) {
    iconOn.style.display  = '';
    iconOff.style.display = 'none';
    musicBtn.classList.add('playing');
  } else {
    iconOn.style.display  = 'none';
    iconOff.style.display = '';
    musicBtn.classList.remove('playing');
  }
}

// Attempt autoplay on load
music.volume = 0.5;
var autoplayPromise = music.play();
if (autoplayPromise !== undefined) {
  autoplayPromise
    .then(function() { setPlaying(true); })
    .catch(function() {
      // Autoplay blocked — wait for first user interaction
      setPlaying(false);
      document.addEventListener('click', function tryPlay() {
        music.play().then(function() { setPlaying(true); });
        document.removeEventListener('click', tryPlay);
      }, { once: true });
    });
}

// Toggle on button click
musicBtn.addEventListener('click', function(e) {
  e.stopPropagation();
  if (music.paused) {
    music.play().then(function() { setPlaying(true); });
  } else {
    music.pause();
    setPlaying(false);
  }
});

//PARTICLESSS
const container = document.getElementById('particles');
for (let i = 0; i < 40; i++) {
  const p = document.createElement('div');
  p.className = 'particle';
  p.style.cssText = `
    left: ${Math.random() * 100}%;
    --dur: ${6 + Math.random() * 10}s;
    --delay: ${Math.random() * 10}s;
    width: ${6 + Math.random() * 8}px;
    height: ${6 + Math.random() * 8}px;
    opacity: 0;
  `;
  container.appendChild(p);
}

// COUNTDOWNESS
var countdownTimer;
function updateCountdown() {
  var target = new Date('2026-05-24T18:00:00');
  var now    = new Date();
  var diff   = target - now;

  if (diff <= 0) {
    document.getElementById('cd-days').textContent  = '00';
    document.getElementById('cd-hours').textContent = '00';
    document.getElementById('cd-mins').textContent  = '00';
    document.getElementById('cd-secs').textContent  = '00';
    clearInterval(countdownTimer);
    return;
  }

  var days  = Math.floor(diff / 86400000);
  var hours = Math.floor((diff % 86400000) / 3600000);
  var mins  = Math.floor((diff % 3600000)  / 60000);
  var secs  = Math.floor((diff % 60000)    / 1000);

  document.getElementById('cd-days').textContent  = String(days).padStart(2, '0');
  document.getElementById('cd-hours').textContent = String(hours).padStart(2, '0');
  document.getElementById('cd-mins').textContent  = String(mins).padStart(2, '0');
  document.getElementById('cd-secs').textContent  = String(secs).padStart(2, '0');
}
updateCountdown();
countdownTimer = setInterval(updateCountdown, 1000);

//SCROLLERSS
const revealObserver = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach(function (el) {
  revealObserver.observe(el);
});
