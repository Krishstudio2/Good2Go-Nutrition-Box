import mealMorning from '../assets/images/meal-morning.jpg';
import mealLunch from '../assets/images/meal-lunch.jpg';
import mealDinner from '../assets/images/meal-dinner.jpg';

const MEAL_IMAGE_MAP = {
  morning: mealMorning,
  lunch: mealLunch,
  dinner: mealDinner,
  // Fallbacks for any legacy/path-based references
  '/src/assets/images/meal-morning.jpg': mealMorning,
  '/src/assets/images/meal-lunch.jpg': mealLunch,
  '/src/assets/images/meal-dinner.jpg': mealDinner,
};

export function initMealImagePopup() {
  const dialog = document.querySelector('#meal-image-dialog');
  if (!dialog) return;

  const img       = dialog.querySelector('#meal-image-dialog-img');
  const titleEl   = dialog.querySelector('#meal-image-dialog-label');
  const closeBtn  = dialog.querySelector('.meal-image-dialog__close');
  const content   = dialog.querySelector('.meal-image-dialog__content');

  let activeTrigger = null;

  const open = (src, label, trigger) => {
    activeTrigger = trigger || null;
    if (img)     { img.src = src; img.alt = label; }
    if (titleEl) { titleEl.textContent = label; }

    if (!dialog.open) {
      typeof dialog.showModal === 'function'
        ? dialog.showModal()
        : dialog.setAttribute('open', '');
    }

    document.body.style.overflow = 'hidden';
    requestAnimationFrame(() => closeBtn?.focus());
  };

  const close = () => {
    if (dialog.open) {
      typeof dialog.close === 'function'
        ? dialog.close()
        : dialog.removeAttribute('open');
    }
    document.body.style.overflow = '';
    // Clear src after transition so image doesn't flash on next open
    setTimeout(() => { if (img) img.src = ''; }, 300);
    if (activeTrigger) {
      try { activeTrigger.focus(); } catch (_) {}
      activeTrigger = null;
    }
  };

  // Wire trigger buttons
  document.querySelectorAll('[data-action="view-meal-image"]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const imageKey = btn.getAttribute('data-image') || '';
      const src      = MEAL_IMAGE_MAP[imageKey] || imageKey;
      const label    = btn.getAttribute('data-label') || 'Meal Menu';
      open(src, label, btn);
    });
  });

  // Close button
  closeBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    close();
  });

  // Backdrop click (click outside content panel)
  dialog.addEventListener('click', (e) => {
    if (content && !content.contains(e.target)) close();
  });

  // Native cancel (Escape key via browser)
  dialog.addEventListener('cancel', (e) => {
    e.preventDefault();
    close();
  });

  // Cleanup on native close
  dialog.addEventListener('close', () => {
    document.body.style.overflow = '';
    if (activeTrigger) {
      try { activeTrigger.focus(); } catch (_) {}
      activeTrigger = null;
    }
  });

  // Global Escape fallback for browsers that don't fire cancel
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && dialog.open) close();
  });
}
