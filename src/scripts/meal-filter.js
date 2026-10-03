/**
 * Meal Filter Module
 * Smooth category filtering without page reload.
 */

export function initMealFilter() {
  const filterButtons = document.querySelectorAll('.meal-filter-btn');
  const mealCards = document.querySelectorAll('.meal-card');

  if (filterButtons.length === 0 || mealCards.length === 0) return;

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const category = button.getAttribute('data-filter');

      // Update active state on buttons
      filterButtons.forEach((btn) => {
        const isActive = btn === button;
        btn.classList.toggle('is-active', isActive);
        btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
      });

      // Filter meal cards
      mealCards.forEach((card) => {
        const cardCategory = card.getAttribute('data-category');
        const matches = category === 'all' || cardCategory === category;

        if (matches) {
          card.style.display = 'flex';
          // Re-trigger subtle reveal
          requestAnimationFrame(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          });
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          card.style.display = 'none';
        }
      });
    });
  });
}
