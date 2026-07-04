// Shared scripts for the experimentation site.

// Mobile navigation toggle
function toggleNav() {
  var links = document.getElementById('navLinks');
  if (links) {
    links.classList.toggle('open');
  }
}

// Image slider / carousel
function initSlider() {
  var slider = document.querySelector('.slider');
  if (!slider) return;

  var slides = slider.querySelector('.slides');
  var images = slides.querySelectorAll('img');
  var dotsWrap = document.querySelector('.dots');
  var current = 0;

  // Build navigation dots
  images.forEach(function (_, i) {
    var dot = document.createElement('button');
    dot.className = 'dot' + (i === 0 ? ' active' : '');
    dot.addEventListener('click', function () { goTo(i); });
    dotsWrap.appendChild(dot);
  });

  var dots = dotsWrap.querySelectorAll('.dot');

  function goTo(index) {
    current = (index + images.length) % images.length;
    slides.style.transform = 'translateX(' + (-current * 100) + '%)';
    dots.forEach(function (d, i) {
      d.classList.toggle('active', i === current);
    });
  }

  var prev = slider.querySelector('.slider-btn.prev');
  var next = slider.querySelector('.slider-btn.next');
  if (prev) prev.addEventListener('click', function () { goTo(current - 1); });
  if (next) next.addEventListener('click', function () { goTo(current + 1); });

  // Auto-advance every 4 seconds
  setInterval(function () { goTo(current + 1); }, 4000);
}

document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('.nav-toggle');
  if (toggle) toggle.addEventListener('click', toggleNav);
  initSlider();
});
