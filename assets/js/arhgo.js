(() => {
  const FLIGHT_SOUND_URL = 'https://www.soundjay.com/transport/airplane-flyby-01.mp3';
  const audio = new Audio(FLIGHT_SOUND_URL);
  audio.preload = 'auto';
  audio.volume = 0.6;
  let soundEnabled = true;

  if (document.body) {
    document.body.classList.add('page-hidden');
  } else {
    document.addEventListener('DOMContentLoaded', () => document.body.classList.add('page-hidden'), { once: true });
  }

  const unlockAudio = () => {
    audio.play()
      .then(() => {
        audio.pause();
        audio.currentTime = 0;
      })
      .catch(() => {});
  };

  window.addEventListener('pointerdown', unlockAudio, { once: true });
  window.addEventListener('keydown', unlockAudio, { once: true });

  const playFlightSound = () => {
    if (!soundEnabled) return;
    try {
      audio.currentTime = 0;
      const playPromise = audio.play();
      if (playPromise && typeof playPromise.catch === 'function') {
        playPromise.catch(() => {});
      }
    } catch (err) {
      console.warn('Flight sound blocked:', err.message);
    }
  };

  const delayedNavigate = (href, delay = 650) => {
    playFlightSound();
    setTimeout(() => {
      window.location.href = href;
    }, delay);
  };

  const attachLinkHijacker = () => {
    document.addEventListener('click', event => {
      const link = event.target.closest('a');
      if (!link) return;
      const isHash = link.getAttribute('href')?.startsWith('#');
      const hasSoundOverride = link.dataset.sound === 'off';
      const targetBlank = link.getAttribute('target') === '_blank';
      if (isHash || hasSoundOverride || targetBlank) return;
      const sameOrigin = link.host === window.location.host;
      if (!sameOrigin) return;

      event.preventDefault();
      const target = link.getAttribute('href');
      if (!target) return;
      delayedNavigate(target);
    });
  };

  const markActiveNav = () => {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('[data-nav]').forEach(link => {
      const target = link.getAttribute('href');
      if (!target) return;
      const normalizedTarget = target.replace('./', '');
      if (currentPath === normalizedTarget || (currentPath === '' && normalizedTarget.includes('index'))) {
        link.classList.add('active');
      }
    });
  };

  const revealPage = () => {
    document.body.classList.remove('page-hidden');
    document.body.classList.add('page-show');
  };

  const updateSoundToggleButtons = () => {
    document.querySelectorAll('[data-toggle-sound]').forEach(btn => {
      btn.setAttribute('aria-pressed', soundEnabled ? 'true' : 'false');
      const label = btn.querySelector('[data-sound-label]');
      if (label) {
        label.textContent = soundEnabled ? 'الصوت مفعل' : 'الصوت متوقف';
      }
    });
  };

  const toggleSound = () => {
    soundEnabled = !soundEnabled;
    updateSoundToggleButtons();
    if (soundEnabled) playFlightSound();
    return soundEnabled;
  };

  const setupCounters = () => {
    const counters = document.querySelectorAll('[data-count]');
    if (!counters.length) return;

    const animateCounter = el => {
      const target = parseInt(el.dataset.count, 10) || 0;
      const duration = 1600;
      let start = 0;
      const step = timestamp => {
        if (!el._startTime) el._startTime = timestamp;
        const progress = Math.min((timestamp - el._startTime) / duration, 1);
        const value = Math.floor(progress * target);
        el.textContent = value;
        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          el.textContent = target;
        }
      };
      requestAnimationFrame(step);
    };

    const counterObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.counted) {
          entry.target.dataset.counted = 'true';
          animateCounter(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));
  };

  const setupMarquee = () => {
    document.querySelectorAll('[data-marquee]').forEach(wrapper => {
      const track = wrapper.querySelector('.marquee-track');
      if (track && !track.dataset.cloned) {
        track.innerHTML += track.innerHTML;
        track.dataset.cloned = 'true';
      }
    });
  };

  document.addEventListener('DOMContentLoaded', () => {
    attachLinkHijacker();
    markActiveNav();
    revealPage();
    setupCounters();
    setupMarquee();
    document.querySelectorAll('[data-flight-sound]').forEach(btn => {
      btn.addEventListener('click', () => playFlightSound());
    });
    document.querySelectorAll('.hero-plane').forEach(svg => {
      svg.addEventListener('click', () => playFlightSound());
    });
    document.querySelectorAll('[data-toggle-sound]').forEach(btn => {
      btn.addEventListener('click', toggleSound);
    });
    updateSoundToggleButtons();
  });

  window.ArhGo = {
    playFlightSound,
    delayedNavigate,
    toggleSound,
    isSoundEnabled: () => soundEnabled
  };
})();

