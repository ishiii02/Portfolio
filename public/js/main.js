'use strict';

/* ================================================================
   MAIN.JS — Global client-side functionality
   Loaded on every page via partials/scripts.ejs
   ================================================================ */

(function () {
  'use strict';

  /* ── 1. AOS — Animate On Scroll Init ──────────────────────── */
  function initAOS() {
    if (typeof AOS !== 'undefined') {
      AOS.init({
        once: true,
        duration: 600,
        easing: 'ease-out-cubic',
        offset: 80,
      });
    }
  }

  /* ── 2. Navbar — Scroll behaviour ─────────────────────────── */
  function initNavbar() {
    var navbar = document.getElementById('navbar');
    if (!navbar) return;

    var SCROLL_THRESHOLD = 40;

    function onScroll() {
      if (window.scrollY > SCROLL_THRESHOLD) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    // Run once on load in case the page is already scrolled
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ── 3. Mobile Menu — Hamburger toggle ────────────────────── */
  function initMobileMenu() {
    var hamburger = document.getElementById('hamburger');
    var mobileMenu = document.getElementById('mobile-menu');
    if (!hamburger || !mobileMenu) return;

    function openMenu() {
      hamburger.classList.add('open');
      hamburger.setAttribute('aria-expanded', 'true');
      mobileMenu.classList.add('open');
      mobileMenu.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      mobileMenu.classList.remove('open');
      mobileMenu.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }

    function toggleMenu() {
      var isOpen = mobileMenu.classList.contains('open');
      isOpen ? closeMenu() : openMenu();
    }

    hamburger.addEventListener('click', toggleMenu);

    // Close on link click (data-close-menu attribute)
    var closeTriggers = mobileMenu.querySelectorAll('[data-close-menu]');
    closeTriggers.forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });

    // Close on Escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
        closeMenu();
        hamburger.focus();
      }
    });

    // Close on outside click (clicking the backdrop)
    mobileMenu.addEventListener('click', function (e) {
      if (e.target === mobileMenu) {
        closeMenu();
      }
    });
  }

  /* ── 4. Smooth scroll for anchor links ────────────────────── */
  function initSmoothScroll() {
    document.addEventListener('click', function (e) {
      var link = e.target.closest('a[href^="#"]');
      if (!link) return;

      var targetId = link.getAttribute('href');
      if (targetId === '#' || targetId.length < 2) return;

      var target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();
      var navHeight = parseInt(
        getComputedStyle(document.documentElement).getPropertyValue('--navbar-height'),
        10
      ) || 72;

      var top = target.getBoundingClientRect().top + window.scrollY - navHeight;
      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  }

  /* ── 5. Initialize on DOM ready ───────────────────────────── */
  function init() {
    initNavbar();
    initMobileMenu();
    initSmoothScroll();
    initAOS();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();