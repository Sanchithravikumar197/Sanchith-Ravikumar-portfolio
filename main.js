// Theme toggle (saved in localStorage)
const toggleBtn = document.getElementById("themeToggle");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

function setTheme(isDark) {
  document.body.classList.toggle("dark", isDark);
  toggleBtn.textContent = isDark ? "☀️" : "🌙";
  try { localStorage.setItem("theme", isDark ? "dark" : "light"); } catch (e) {}
}
let saved = null;
try { saved = localStorage.getItem("theme"); } catch (e) {}
if (saved === "dark" || (!saved && prefersDark)) setTheme(true);
toggleBtn.addEventListener("click", () => setTheme(!document.body.classList.contains("dark")));

// Scroll progress bar + active nav link
const bar = document.getElementById("progress");
const links = [...document.querySelectorAll(".nav-links a")];
const sections = links.map(a => document.querySelector(a.getAttribute("href")));
window.addEventListener("scroll", () => {
  const h = document.documentElement;
  bar.style.width = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100 + "%";
  const y = h.scrollTop + 120;
  sections.forEach((s, i) => links[i].classList.toggle("active", s && s.offsetTop <= y && s.offsetTop + s.offsetHeight > y));
});

// Reveal on scroll
const io = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add("show"); io.unobserve(e.target); }
}), { threshold: 0.1 });
document.querySelectorAll(".reveal").forEach(el => io.observe(el));

// Typing effect
const words = ["embedded systems", "IoT solutions", "industrial automation", "PLC"];
const typed = document.getElementById("typed");
let w = 0, c = 0, del = false;
(function tick() {
  const word = words[w];
  typed.textContent = word.slice(0, c);
  if (!del && c === word.length) { del = true; return setTimeout(tick, 1400); }
  if (del && c === 0) { del = false; w = (w + 1) % words.length; }
  c += del ? -1 : 1;
  setTimeout(tick, del ? 40 : 80);
})();
