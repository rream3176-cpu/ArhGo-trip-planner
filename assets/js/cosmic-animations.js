/**
 * Cosmic Animations System
 * Creates beautiful cosmic effects throughout the website
 */

(function() {
  'use strict';

  // Create stars container
  function createStars() {
    const starsContainer = document.createElement('div');
    starsContainer.className = 'stars-container';
    document.body.appendChild(starsContainer);

    const starCount = 150;
    for (let i = 0; i < starCount; i++) {
      const star = document.createElement('div');
      star.className = 'star';
      star.style.left = Math.random() * 100 + '%';
      star.style.top = Math.random() * 100 + '%';
      star.style.animationDelay = Math.random() * 3 + 's';
      star.style.animationDuration = (Math.random() * 2 + 2) + 's';
      starsContainer.appendChild(star);
    }
  }

  // Create floating particles
  function createParticles() {
    const particleCount = 20;
    for (let i = 0; i < particleCount; i++) {
      setTimeout(() => {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 2 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 15) + 's';
        document.body.appendChild(particle);

        // Remove particle after animation
        setTimeout(() => {
          particle.remove();
        }, 25000);
      }, i * 1000);
    }
  }

  // Create nebula effects
  function createNebula() {
    const nebula1 = document.createElement('div');
    nebula1.className = 'nebula nebula-1';
    document.body.appendChild(nebula1);

    const nebula2 = document.createElement('div');
    nebula2.className = 'nebula nebula-2';
    document.body.appendChild(nebula2);

    const nebula3 = document.createElement('div');
    nebula3.className = 'nebula nebula-3';
    document.body.appendChild(nebula3);
  }

  // Create cosmic orbs
  function createCosmicOrbs() {
    const orbCount = 2;
    for (let i = 0; i < orbCount; i++) {
      const orb = document.createElement('div');
      orb.className = 'cosmic-orb';
      orb.style.left = (Math.random() * 50 + 25) + '%';
      orb.style.top = (Math.random() * 50 + 25) + '%';
      orb.style.animationDelay = i * 5 + 's';
      document.body.appendChild(orb);
    }
  }

  // Scroll reveal animation
  function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');
    
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    reveals.forEach(reveal => {
      revealObserver.observe(reveal);
    });
  }

  // Add reveal class to elements
  function addRevealClasses() {
    const cards = document.querySelectorAll('.glass-card:not(.no-reveal)');
    cards.forEach((card, index) => {
      card.classList.add('reveal');
      card.style.animationDelay = (index * 0.1) + 's';
    });

    const sections = document.querySelectorAll('.section');
    sections.forEach((section, index) => {
      section.classList.add('reveal');
      section.style.animationDelay = (index * 0.2) + 's';
    });
  }

  // Ripple effect on button click
  function addRippleEffect() {
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
      button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        ripple.className = 'ripple';
        
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        
        this.appendChild(ripple);
        
        setTimeout(() => {
          ripple.remove();
        }, 1000);
      });
    });
  }

  // Parallax effect for hero section
  function initParallax() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const rate = scrolled * 0.5;
      
      if (hero) {
        hero.style.transform = `translateY(${rate}px)`;
      }
    });
  }

  // Smooth page transitions
  function initPageTransitions() {
    const links = document.querySelectorAll('a[href^="#"], a[data-nav]');
    links.forEach(link => {
      link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href && href.startsWith('#')) {
          e.preventDefault();
          const target = document.querySelector(href);
          if (target) {
            target.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
          }
        }
      });
    });
  }

  // Initialize all animations
  function init() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
      return;
    }

    // Create cosmic effects
    createStars();
    createNebula();
    createCosmicOrbs();
    
    // Initialize scroll reveal
    addRevealClasses();
    initScrollReveal();
    
    // Add interactive effects
    addRippleEffect();
    initParallax();
    initPageTransitions();

    // Create particles periodically
    setInterval(createParticles, 5000);
  }

  // Start initialization
  init();

  // Export for global access
  window.CosmicAnimations = {
    createStars,
    createParticles,
    createNebula,
    createCosmicOrbs
  };

})();

