/**
 * Main Application Entry Point
 * Orchestrates navigation, business data binding, modal interactions,
 * meal category filtering, and scroll reveal animations.
 */

import { siteConfig, getWhatsAppUrl, getTelUrl } from './site-config.js';
import { initNavigation } from './navigation.js';
import { initOrderModal } from './order-modal.js';
import { initMealFilter } from './meal-filter.js';
import { initMealTilt } from './meal-tilt.js';
import { initMealImagePopup } from './meal-image-popup.js';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize core UI controllers
  initNavigation();
  initOrderModal();
  initMealFilter();
  initMealTilt();
  initMealImagePopup();

  // 2. Populate business data from site-config.js
  populateBusinessData();

  // 3. Scroll Reveal Animations (respecting prefers-reduced-motion)
  initScrollReveals();
});

/**
 * Dynamically binds centralized siteConfig data into the DOM.
 * This guarantees all contact links, WhatsApp URLs, phone numbers,
 * and Instagram handles stay 100% in sync with site-config.js.
 */
function populateBusinessData() {
  // Brand name and tagline
  document.querySelectorAll('[data-bind="brand-name"]').forEach((el) => {
    el.textContent = siteConfig.brand;
  });
  document.querySelectorAll('[data-bind="brand-tagline"]').forEach((el) => {
    el.textContent = siteConfig.tagline;
  });

  // Current year in footer
  const yearEl = document.querySelector('[data-bind="current-year"]');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // Instagram links & handles
  document.querySelectorAll('[data-bind="instagram-link"]').forEach((el) => {
    el.setAttribute('href', siteConfig.instagram.url);
    el.setAttribute('target', '_blank');
    el.setAttribute('rel', 'noopener noreferrer');
  });
  document.querySelectorAll('[data-bind="instagram-handle"]').forEach((el) => {
    el.textContent = siteConfig.instagram.handle;
  });

  // Location-specific bindings (Trichy)
  const trichy = siteConfig.locations.trichy;
  document.querySelectorAll('[data-bind="trichy-phone"]').forEach((el) => {
    el.textContent = trichy.phone;
  });
  document.querySelectorAll('[data-bind="trichy-phone-link"]').forEach((el) => {
    el.setAttribute('href', getTelUrl('trichy'));
  });
  document.querySelectorAll('[data-bind="trichy-wa-link"]').forEach((el) => {
    el.setAttribute('href', getWhatsAppUrl('trichy'));
    el.setAttribute('target', '_blank');
    el.setAttribute('rel', 'noopener noreferrer');
  });
  document.querySelectorAll('[data-bind="trichy-coverage"]').forEach((el) => {
    el.textContent = trichy.coverageAreas;
  });

  // Location-specific bindings (Coimbatore)
  const coimbatore = siteConfig.locations.coimbatore;
  document.querySelectorAll('[data-bind="cbe-phone"]').forEach((el) => {
    el.textContent = coimbatore.phone;
  });
  document.querySelectorAll('[data-bind="cbe-phone-link"]').forEach((el) => {
    el.setAttribute('href', getTelUrl('coimbatore'));
  });
  document.querySelectorAll('[data-bind="cbe-wa-link"]').forEach((el) => {
    el.setAttribute('href', getWhatsAppUrl('coimbatore'));
    el.setAttribute('target', '_blank');
    el.setAttribute('rel', 'noopener noreferrer');
  });
  document.querySelectorAll('[data-bind="cbe-coverage"]').forEach((el) => {
    el.textContent = coimbatore.coverageAreas;
  });

  // Mobile Sticky Bar Links (Default to WhatsApp order modal or Trichy / Coimbatore)
  const mobileWaBtn = document.querySelector('#mobile-sticky-whatsapp');
  if (mobileWaBtn) {
    mobileWaBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const modal = document.querySelector('.order-dialog');
      if (modal) {
        // Trigger modal with WhatsApp emphasis
        const trigger = document.querySelector('[data-action="open-order-modal"]');
        trigger?.click();
      }
    });
  }

  const mobileCallBtn = document.querySelector('#mobile-sticky-call');
  if (mobileCallBtn) {
    mobileCallBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const trigger = document.querySelector('[data-action="open-order-modal"]');
      trigger?.click();
    });
  }
}

/**
 * Smooth entrance reveals using IntersectionObserver
 */
function initScrollReveals() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const reveals = document.querySelectorAll('.reveal-on-scroll');

  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    reveals.forEach((el) => el.classList.add('is-revealed'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          obs.unobserve(entry.target);
        }
      });
    },
    {
      root: null,
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px',
    }
  );

  reveals.forEach((el) => observer.observe(el));
}
