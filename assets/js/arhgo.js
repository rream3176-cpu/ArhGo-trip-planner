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

  // ============================================
  // تحسينات فخمة ومبهرة - Scroll Animations
  // ============================================
  
  const setupScrollReveal = () => {
    const revealElements = document.querySelectorAll('.scroll-reveal, .hero-stat, .saved-plan-card, .blog-card, .immersion-card');
    
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('revealed');
          }, index * 100);
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => {
      el.classList.add('scroll-reveal');
      revealObserver.observe(el);
    });
  };

  // Parallax Effect
  const setupParallax = () => {
    const parallaxElements = document.querySelectorAll('.parallax-element, .hero-main-image');
    
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      
      parallaxElements.forEach(el => {
        const speed = el.dataset.speed || 0.5;
        const yPos = -(scrolled * speed);
        el.style.transform = `translateY(${yPos}px)`;
      });
    });
  };

  // Magnetic Hover Effect
  const setupMagneticHover = () => {
    const magneticElements = document.querySelectorAll('.btn, .card-luxury, .magnetic-hover');
    
    magneticElements.forEach(el => {
      el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        el.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
      });
      
      el.addEventListener('mouseleave', () => {
        el.style.transform = 'translate(0, 0)';
      });
    });
  };

  // Navbar Scroll Effect
  const setupNavbarScroll = () => {
    const navbar = document.querySelector('.arhgo-nav');
    if (!navbar) return;
    
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;
      
      if (currentScroll > 100) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
      
      lastScroll = currentScroll;
    });
  };

  // Add Ripple Effect to Buttons
  const setupRippleEffect = () => {
    const buttons = document.querySelectorAll('.btn-ripple, .btn');
    
    buttons.forEach(btn => {
      btn.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
          ripple.remove();
        }, 600);
      });
    });
  };

  // Add Glow Effect on Scroll
  const setupGlowEffects = () => {
    const glowElements = document.querySelectorAll('.glow-effect, .btn-gradient, .hero');
    
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const windowHeight = window.innerHeight;
      
      glowElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        const elementTop = rect.top + scrolled;
        const elementCenter = elementTop + rect.height / 2;
        const distanceFromCenter = Math.abs(scrolled + windowHeight / 2 - elementCenter);
        const maxDistance = windowHeight;
        const intensity = Math.max(0, 1 - distanceFromCenter / maxDistance);
        
        el.style.setProperty('--glow-intensity', intensity);
      });
    });
  };

  // Text Reveal Animation
  const setupTextReveal = () => {
    const textElements = document.querySelectorAll('.text-reveal');
    
    textElements.forEach(el => {
      const text = el.textContent;
      el.innerHTML = '';
      text.split('').forEach((char, index) => {
        const span = document.createElement('span');
        span.textContent = char === ' ' ? '\u00A0' : char;
        span.style.animationDelay = `${index * 0.05}s`;
        el.appendChild(span);
      });
    });
  };

  // Enhanced Image Loading
  const setupImageLoading = () => {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.add('loaded');
          imageObserver.unobserve(img);
        }
      });
    });
    
    images.forEach(img => imageObserver.observe(img));
  };

  // Smooth Scroll for Anchor Links
  const setupSmoothScroll = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#' || !href) return;
        
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  };

  // Initialize all enhancements
  document.addEventListener('DOMContentLoaded', () => {
    setupScrollReveal();
    setupParallax();
    setupMagneticHover();
    setupNavbarScroll();
    setupRippleEffect();
    setupGlowEffects();
    setupTextReveal();
    setupImageLoading();
    setupSmoothScroll();
  });

  window.ArhGo = {
    playFlightSound,
    delayedNavigate,
    toggleSound,
    isSoundEnabled: () => soundEnabled
  };
})();
