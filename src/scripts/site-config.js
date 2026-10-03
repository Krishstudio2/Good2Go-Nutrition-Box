/**
 * Good2Go Nutrition Box - Central Business & Contact Configuration
 * 
 * IMPORTANT: To launch the site with real business contact details,
 * ONLY edit the placeholder values in this file!
 * All CTAs, header buttons, footer links, modal selectors, and WhatsApp
 * messages consume their data directly from this configuration.
 */

export const siteConfig = {
  brand: "Good2Go Nutrition Box",
  shortBrand: "Good2Go",
  tagline: "Good Food. Balanced Life. Delivered to You.",
  description: "Delicious, balanced and nutritious meals, freshly prepared and delivered straight to your door with free delivery in Trichy & Coimbatore.",

  locations: {
    trichy: {
      name: "Trichy",
      phone: "97877 53592",
      phoneSecondary: "93606 87856",
      whatsapp: "919787753592",
      address: "Thillai Nagar & Cantonment, Trichy, Tamil Nadu",
      coverageAreas: "Thillai Nagar, KK Nagar, Cantonment, Crawford, Woraiyur, Srinivasa Nagar, and surrounding hubs",
      hubDescription: "Serving fresh hot lunch & dinner boxes across central and residential Trichy.",
    },
    coimbatore: {
      name: "Coimbatore",
      phone: "97877 53592",
      phoneSecondary: "93606 87856",
      whatsapp: "919787753592",
      address: "RS Puram & Peelamedu, Coimbatore, Tamil Nadu",
      coverageAreas: "RS Puram, Gandhipuram, Peelamedu, Saibaba Colony, Saravanampatti, Race Course, and IT corridors",
      hubDescription: "Delivering daily balanced nutrition boxes across key business hubs and homes in Coimbatore.",
    },
  },

  instagram: {
    handle: "@good2_go_nb",
    url: "https://www.instagram.com/good2_go_nb/",
  },

  delivery: {
    badge: "Free Doorstep Delivery",
    morningOrderDeadline: "Order before 7:30 AM for Morning (8:00 AM – 9:00 AM)",
    lunchOrderDeadline: "Order before 11:30 AM for Lunch (12:00 PM – 1:30 PM)",
    dinnerOrderDeadline: "Order before 5:30 PM for Dinner (7:00 PM – 9:00 PM)",
    slots: [
      { name: "Morning Slot", time: "8:00 AM – 9:00 AM", deadline: "Order before 7:30 AM" },
      { name: "Lunch Slot", time: "12:00 PM – 1:30 PM", deadline: "Order before 11:30 AM" },
      { name: "Dinner Slot", time: "7:00 PM – 9:00 PM", deadline: "Order before 5:30 PM" },
    ],
  },
};

/**
 * Generates an accessible, URL-encoded WhatsApp deep-link with a prefilled greeting.
 * @param {'trichy' | 'coimbatore'} [locationKey='trichy'] 
 * @param {string} [mealName=''] 
 * @returns {string} WhatsApp direct link
 */
export function getWhatsAppUrl(locationKey = 'trichy', mealName = '') {
  const loc = siteConfig.locations[locationKey] || siteConfig.locations.trichy;
  const digits = loc.whatsapp.replace(/\D/g, '');
  
  let text = `Hi Good2Go Nutrition Box (${loc.name})! I would like to order a fresh meal box.`;
  if (mealName) {
    text = `Hi Good2Go Nutrition Box (${loc.name})! I'm interested in ordering the "${mealName}". Could you please share today's menu and availability?`;
  }
  
  return `https://wa.me/${digits}?text=${encodeURIComponent(text)}`;
}

/**
 * Returns a tel: URI for phone dialers.
 * @param {'trichy' | 'coimbatore'} [locationKey='trichy']
 * @returns {string} tel: URI
 */
export function getTelUrl(locationKey = 'trichy') {
  const loc = siteConfig.locations[locationKey] || siteConfig.locations.trichy;
  const cleaned = loc.phone.replace(/[\s-]/g, '');
  return `tel:${cleaned}`;
}
