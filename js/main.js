/**
 * Slow Content - Vanilla JS
 * Replaces Webflow runtime (~570KB) with minimal vanilla JS (~2KB)
 */

(function() {
  'use strict';

  // Mobile Navigation
  function initMobileNav() {
    const navButton = document.querySelector('.menu-button');
    const navMenu = document.querySelector('.nav-menu-2');

    if (!navButton || !navMenu) return;

    navButton.addEventListener('click', function() {
      const isOpen = navMenu.classList.toggle('open');
      navButton.classList.toggle('open', isOpen);
      navButton.setAttribute('aria-expanded', isOpen);
    });

    // Close menu when clicking a link
    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        navButton.classList.remove('open');
        navButton.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Scroll Animations (fade-in on scroll)
  function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.fade-in');

    if (!animatedElements.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(el => observer.observe(el));
  }

  // Quote Slider
  function initSlider() {
    const slider = document.querySelector('.quote-slider');
    if (!slider) return;

    const slides = slider.querySelectorAll('.slide');
    const prevBtn = slider.querySelector('.left-arrow');
    const nextBtn = slider.querySelector('.right-arrow');
    const dotsContainer = slider.querySelector('.slide-nav');

    if (!slides.length) return;

    let currentSlide = 0;
    const totalSlides = slides.length;

    // Create dots
    if (dotsContainer) {
      dotsContainer.innerHTML = '';
      slides.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.className = 'slide-dot' + (i === 0 ? ' active' : '');
        dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
      });
    }

    function goToSlide(index) {
      slides[currentSlide].classList.remove('active');
      currentSlide = (index + totalSlides) % totalSlides;
      slides[currentSlide].classList.add('active');

      // Update dots
      if (dotsContainer) {
        dotsContainer.querySelectorAll('.slide-dot').forEach((dot, i) => {
          dot.classList.toggle('active', i === currentSlide);
        });
      }
    }

    if (prevBtn) prevBtn.addEventListener('click', () => goToSlide(currentSlide - 1));
    if (nextBtn) nextBtn.addEventListener('click', () => goToSlide(currentSlide + 1));

    // Initialize first slide
    if (slides[0]) slides[0].classList.add('active');
  }

  // Smooth scroll for anchor links
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  }

  // Initialize everything when DOM is ready
  document.addEventListener('DOMContentLoaded', function() {
    initMobileNav();
    initScrollAnimations();
    initSlider();
    initSmoothScroll();
  });
})();
