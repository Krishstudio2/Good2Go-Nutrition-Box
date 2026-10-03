/**
 * Order Modal & Action Sheet Module
 * Accessible HTML5 <dialog> modal for selecting location (Trichy / Coimbatore)
 * and ordering via WhatsApp or Phone call.
 */

import { siteConfig, getWhatsAppUrl, getTelUrl } from './site-config.js';

let activeTriggerElement = null;
let currentLocation = 'trichy';
let currentMealName = '';

export function initOrderModal() {
  const dialog = document.querySelector('#order-dialog');
  if (!dialog) return { openModal: () => {}, closeModal: () => {} };

  // Scope close button specifically to THIS dialog
  const closeBtn = dialog.querySelector('.order-dialog__close');
  const tabs = dialog.querySelectorAll('.location-tab');
  const triggerButtons = document.querySelectorAll('[data-action="open-order-modal"]');
  const dialogContent = dialog.querySelector('.order-dialog__content');

  const updateModalContent = () => {
    const loc = siteConfig.locations[currentLocation] || siteConfig.locations.trichy;
    
    // Update city title
    const cityLabel = dialog.querySelector('#modal-location-name');
    if (cityLabel) cityLabel.textContent = loc.name;

    // Update WhatsApp link
    const waBtn = dialog.querySelector('#modal-whatsapp-link');
    if (waBtn) {
      waBtn.setAttribute('href', getWhatsAppUrl(currentLocation, currentMealName));
      const waNumberSpan = waBtn.querySelector('.order-channel-desc');
      if (waNumberSpan) {
        waNumberSpan.textContent = 'WhatsApp: 97877 53592';
      }
    }

    // Update Phone link
    const phoneBtn = dialog.querySelector('#modal-phone-link');
    if (phoneBtn) {
      phoneBtn.setAttribute('href', getTelUrl(currentLocation));
      const phoneSpan = phoneBtn.querySelector('.order-channel-desc');
      if (phoneSpan) {
        phoneSpan.innerHTML = '<strong>Call no1:</strong> 97877 53592<br><strong>Call no2:</strong> 93606 87856';
      }
    }

    // Update coverage info
    const coverageEl = dialog.querySelector('#modal-coverage-info');
    if (coverageEl) {
      coverageEl.textContent = loc.coverageAreas;
    }

    // Update meal interest tag if specified
    const mealTag = dialog.querySelector('#modal-meal-tag');
    if (mealTag) {
      if (currentMealName) {
        mealTag.textContent = `Selected Meal: ${currentMealName}`;
        mealTag.style.display = 'inline-block';
      } else {
        mealTag.style.display = 'none';
      }
    }

    // Update active tab buttons
    tabs.forEach((tab) => {
      const targetLoc = tab.getAttribute('data-location');
      const isSelected = targetLoc === currentLocation;
      tab.classList.toggle('is-active', isSelected);
      tab.setAttribute('aria-selected', isSelected ? 'true' : 'false');
    });
  };

  const openModal = (locationKey = 'trichy', mealName = '') => {
    currentLocation = locationKey;
    currentMealName = mealName;
    updateModalContent();

    if (!dialog.open) {
      if (typeof dialog.showModal === 'function') {
        dialog.showModal();
      } else {
        dialog.setAttribute('open', '');
      }
    }

    document.body.style.overflow = 'hidden';

    // Focus close button or first action
    requestAnimationFrame(() => {
      closeBtn?.focus();
    });
  };

  const closeModal = () => {
    if (dialog.open) {
      if (typeof dialog.close === 'function') {
        dialog.close();
      } else {
        dialog.removeAttribute('open');
      }
    }

    document.body.style.overflow = '';
    currentMealName = '';

    // Restore focus to trigger
    if (activeTriggerElement && typeof activeTriggerElement.focus === 'function') {
      try {
        activeTriggerElement.focus();
      } catch (err) {
        // ignore
      }
      activeTriggerElement = null;
    }
  };

  // Wire up all buttons that trigger the modal
  triggerButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      activeTriggerElement = btn;
      const loc = btn.getAttribute('data-location') || 'trichy';
      const meal = btn.getAttribute('data-meal') || '';
      openModal(loc, meal);
    });
  });

  // Location Tab switching
  tabs.forEach((tab) => {
    tab.addEventListener('click', (e) => {
      e.preventDefault();
      const loc = tab.getAttribute('data-location');
      if (loc && siteConfig.locations[loc]) {
        currentLocation = loc;
        updateModalContent();
      }
    });
  });

  // 1. Close button click
  closeBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    closeModal();
  });

  // 2. Click outside dialog content (backdrop click)
  dialog.addEventListener('click', (e) => {
    if (dialogContent && !dialogContent.contains(e.target)) {
      closeModal();
    }
  });

  // 3. Escape key / native cancel event
  dialog.addEventListener('cancel', (e) => {
    e.preventDefault();
    closeModal();
  });

  // 4. Native dialog close cleanup
  dialog.addEventListener('close', () => {
    document.body.style.overflow = '';
    currentMealName = '';
    if (activeTriggerElement && typeof activeTriggerElement.focus === 'function') {
      try {
        activeTriggerElement.focus();
      } catch (err) {
        // ignore
      }
      activeTriggerElement = null;
    }
  });

  // Global escape fallback
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && dialog.open) {
      closeModal();
    }
  });

  // Return programmatic opener for global access
  return { openModal, closeModal };
}
