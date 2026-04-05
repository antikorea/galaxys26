document.addEventListener('DOMContentLoaded', () => {

  // 1. Countdown Timer Logic
  function startTimer() {
    const timerDisplay = document.querySelector('#countdown span');
    let totalSeconds = 2 * 60 * 60 + 34 * 60 + 12; // Start with somewhat realistic time (2h 34m 12s)

    setInterval(() => {
      if (totalSeconds <= 0) totalSeconds = 24 * 60 * 60; // loop back
      totalSeconds--;

      const h = Math.floor(totalSeconds / 3600).toString().padStart(2, '0');
      const m = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, '0');
      const s = Math.floor(totalSeconds % 60).toString().padStart(2, '0');
      timerDisplay.textContent = `${h}:${m}:${s}`;
    }, 1000);
  }
  startTimer();

  // 2. Privacy Display Slider Logic
  const slider = document.getElementById('angle-slider');
  const overlay = document.getElementById('privacy-overlay');
  
  if (slider && overlay) {
    slider.addEventListener('input', (e) => {
      const val = e.target.value; // 0 to 100
      // 50 is center (0 deg angle -> opacity 0)
      // 0 or 100 is side (high angle -> opacity high)
      const deviation = Math.abs(val - 50); // 0 to 50
      const opacityLevel = (deviation / 50) * 0.95; // max 0.95 opacity
      overlay.style.opacity = opacityLevel;
    });
  }

  // 3. Before/After Image Slider
  const container = document.getElementById('ba-container');
  const wrapper = document.getElementById('before-wrapper');
  const handle = document.getElementById('ba-handle');

  if(container) {
    let isDragging = false;

    const move = (clientX) => {
      const rect = container.getBoundingClientRect();
      let x = clientX - rect.left;
      if (x < 0) x = 0;
      if (x > rect.width) x = rect.width;
      
      const percent = (x / rect.width) * 100;
      wrapper.style.width = `${percent}%`;
      handle.style.left = `${percent}%`;
    };

    // Mouse Events
    handle.addEventListener('mousedown', () => isDragging = true);
    window.addEventListener('mouseup', () => isDragging = false);
    window.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      move(e.clientX);
    });

    // Touch Events
    handle.addEventListener('touchstart', () => isDragging = true);
    window.addEventListener('touchend', () => isDragging = false);
    window.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
      move(e.touches[0].clientX);
    });
  }

  // 4. Performance Observers (Animate Numbers)
  const observerOptions = { threshold: 0.5 };
  let animated = false;

  const performObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        animateValue("npu-stat", 0, 39, 1500, "%");
        animateValue("gpu-stat", 0, 24, 1500, "%");
      }
    });
  }, observerOptions);

  const statsSection = document.getElementById('performance');
  if(statsSection) performObserver.observe(statsSection);

  function animateValue(id, start, end, duration, suffix="") {
    const obj = document.getElementById(id);
    if(!obj) return;
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const val = Math.floor(progress * (end - start) + start);
      obj.innerHTML = val + suffix;
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }

  // 5. Live DB Ticker
  const userCountEl = document.getElementById('user-count');
  if (userCountEl) {
    let currentCount = 1245;
    setInterval(() => {
      if(Math.random() > 0.5) {
        currentCount += Math.floor(Math.random() * 3) + 1;
        userCountEl.textContent = currentCount.toLocaleString();
        
        // simple pop animation
        userCountEl.style.transform = 'scale(1.2)';
        userCountEl.style.color = '#fff';
        setTimeout(() => {
          userCountEl.style.transform = 'scale(1)';
          userCountEl.style.color = '';
        }, 200);
      }
    }, 3500);
  }

  // 6. DB Form Submit Mock functionality
  const dbForm = document.getElementById('db-cart-form');
  const modal = document.getElementById('success-modal');

  if(dbForm) {
    dbForm.addEventListener('submit', (e) => {
      e.preventDefault();
      // Show mock success modal
      modal.style.display = 'flex';
      dbForm.reset();
    });
  }
});
