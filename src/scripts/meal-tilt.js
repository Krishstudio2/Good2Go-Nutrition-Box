/**
 * Meal Tilt — Independent 3D tilt effect for each meal card.
 *
 * Architecture:
 *  - .tilt-stage  → owns perspective (CSS: perspective: 1000px)
 *  - [data-tilt]  → the card; gets rotateX/Y via JS
 *  - .tilt-layer  → child elements; get translateZ via data-depth * MAX_Z
 *  - .meal-card__glare → radial highlight, position via --glare-x/y
 *
 * Guards:
 *  - Skips entirely if prefers-reduced-motion is set
 *  - Skips entirely on touch/coarse-pointer devices
 */

const MAX_TILT = 10;       // degrees (8–12 range; 10 is the sweet spot)
const MAX_Z    = 80;       // px translateZ per depth=1.0

export function initMealTilt() {
  // Guard: reduced motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  // Guard: touch / coarse pointer
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

  const cards = document.querySelectorAll('[data-tilt]');
  if (cards.length === 0) return;

  cards.forEach((card) => {
    const glare  = card.querySelector('.meal-card__glare');
    const layers = card.querySelectorAll('.tilt-layer');

    // Precompute depth values
    const depths = Array.from(layers).map((el) =>
      parseFloat(el.dataset.depth ?? '0')
    );

    let rafId = null;
    let targetRX = 0;
    let targetRY = 0;
    let currentRX = 0;
    let currentRY = 0;
    let animating = false;

    function onMouseMove(e) {
      const rect = card.getBoundingClientRect();
      // Normalised cursor position: [-1, 1] relative to card centre
      const nx = ((e.clientX - rect.left) / rect.width  - 0.5) * 2;
      const ny = ((e.clientY - rect.top)  / rect.height - 0.5) * 2;

      targetRY =  nx * MAX_TILT;   // positive X cursor → positive rotateY
      targetRX = -ny * MAX_TILT;   // positive Y cursor → negative rotateX (tilt top toward user)

      // Glare position (0–100%)
      const glareX = ((nx + 1) / 2 * 100).toFixed(1);
      const glareY = ((ny + 1) / 2 * 100).toFixed(1);
      if (glare) {
        card.style.setProperty('--glare-x', `${glareX}%`);
        card.style.setProperty('--glare-y', `${glareY}%`);
      }

      if (!animating) {
        animating = true;
        rafId = requestAnimationFrame(animate);
      }
    }

    function animate() {
      // Lerp toward target for smooth feel
      currentRX += (targetRX - currentRX) * 0.15;
      currentRY += (targetRY - currentRY) * 0.15;

      card.style.transform =
        `rotateX(${currentRX.toFixed(3)}deg) rotateY(${currentRY.toFixed(3)}deg)`;

      // Shift depth layers
      layers.forEach((layer, i) => {
        const z = depths[i] * MAX_Z;
        layer.style.transform = `translateZ(${z.toFixed(1)}px)`;
      });

      // Keep looping only if still moving
      const stillMoving =
        Math.abs(targetRX - currentRX) > 0.01 ||
        Math.abs(targetRY - currentRY) > 0.01;

      if (stillMoving) {
        rafId = requestAnimationFrame(animate);
      } else {
        animating = false;
      }
    }

    function onMouseLeave() {
      cancelAnimationFrame(rafId);
      animating = false;
      targetRX = 0;
      targetRY = 0;

      // Add resetting class for smooth spring-back (CSS handles transition)
      card.classList.add('is-resetting');
      card.style.transform = 'rotateX(0deg) rotateY(0deg)';
      layers.forEach((layer) => {
        layer.style.transform = 'translateZ(0px)';
      });

      // Remove resetting class after transition completes (~500 ms)
      setTimeout(() => card.classList.remove('is-resetting'), 520);
    }

    card.addEventListener('mousemove', onMouseMove, { passive: true });
    card.addEventListener('mouseleave', onMouseLeave);
  });
}
