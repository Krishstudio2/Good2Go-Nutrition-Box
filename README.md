# Good2Go Nutrition Box - Website

Modern, mobile-first, high-conversion landing page for **Good2Go Nutrition Box**, a healthy meal delivery brand serving **Trichy** and **Coimbatore** (Tamil Nadu).

---

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Local Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for Production
```bash
npm run build
```
The optimized, minified production assets are generated in the `/dist` directory.

### 4. Preview Production Build
```bash
npm run preview
```

---

## How to Update Business Information (Centralized Config)

To launch the site with real contact numbers and social profiles, **you only need to edit one single file**:
[`src/scripts/site-config.js`](file:///d:/krish/krish/Good2Go%20Nutrition%20Box/src/scripts/site-config.js)

```javascript
export const siteConfig = {
  brand: "Good2Go Nutrition Box",
  locations: {
    trichy: {
      name: "Trichy",
      phone: "+91 90000 00001",    // <-- Replace with Trichy kitchen phone number
      whatsapp: "919000000001",    // <-- Replace with Trichy WhatsApp number (digits only)
      address: "Thillai Nagar...", // <-- Replace with Trichy address
    },
    coimbatore: {
      name: "Coimbatore",
      phone: "+91 90000 00002",    // <-- Replace with Coimbatore kitchen phone number
      whatsapp: "919000000002",    // <-- Replace with Coimbatore WhatsApp number (digits only)
      address: "RS Puram...",      // <-- Replace with Coimbatore address
    }
  },
  instagram: {
    handle: "@good2go_nutritionbox",                     // <-- Replace with Instagram handle
    url: "https://www.instagram.com/good2go_nutritionbox" // <-- Replace with Instagram URL
  }
};
```

All phone links (`tel:`), WhatsApp links (`https://wa.me/`), header CTA buttons, meal card order buttons, footer links, and the accessible order dialog automatically update across the entire website!

---

## Features & Highlights

- **Contemporary 2026 Health-Food Aesthetic**: Leaf green, warm cream culinary backdrop, clean rounded cards, and natural food tones.
- **Official Brand Assets**: Uses the official Good2Go full brand logo on desktop navbar and footer, and the official circle logo on mobile navbar, favicon, and PWA manifest.
- **Zero-Friction Ordering Flow**: Direct route to Phone Call and WhatsApp with pre-filled order messages.
- **Accessible Order Modal**: Native `<dialog>` bottom-sheet with city switcher (Trichy / Coimbatore) and keyboard navigation (Escape to close, focus trapping).
- **Interactive Meal Filters**: Instant switching between *All*, *Healthy Meals*, *Balanced Meals*, and *Daily Meal Boxes* without page reloads.
- **Core Web Vitals & Performance**: Sub-second LCP with `fetchpriority="high"` hero image, lazy-loaded below-the-fold media, zero runtime framework overhead (< 9 KB total JS, < 28 KB total CSS unminified / 2.8 KB JS gzipped).
- **Mobile-First UX**: Touch-friendly buttons (>= 48px), responsive slide-out mobile drawer, and floating bottom quick-order bar.
- **Accessibility & Motion**: Full `:focus-visible` outlines, skip-to-content link, semantic HTML5, and strict `@media (prefers-reduced-motion: reduce)` support.
