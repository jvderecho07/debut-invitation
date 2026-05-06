// ── PARTICLES ──
const container = document.getElementById('particles');
for (let i = 0; i < 40; i++) {
  const p = document.createElement('div');
  p.className = 'particle';
  p.style.cssText = `
    left: ${Math.random() * 100}%;
    --dur: ${6 + Math.random() * 10}s;
    --delay: ${Math.random() * 10}s;
    width: ${4 + Math.random() * 6}px;
    height: ${4 + Math.random() * 6}px;
    opacity: 0;
  `;
  container.appendChild(p);
}

// ── COUNTDOWN ──
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

// ── SCROLL REVEAL ──
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
