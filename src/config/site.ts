// Single source of truth for contact, links and identity.
// Change values here; no component hard-codes them.
export const site = {
  name: 'Daira',
  legalName: 'Daira Art Residency',
  tagline: 'Art Residency · Co-Live · Co-Work · Gather',
  url: import.meta.env.PUBLIC_SITE_URL ?? 'https://dairacommunity.com',
  address: {
    plusCode: 'V9M8+F2J',
    locality: 'Talap, Kannur',
    region: 'Kerala',
    postalCode: '670002',
    country: 'India',
  },
  phones: ['8089903836', '8137813232'],
  // International format, digits only. TODO: confirm this is the WhatsApp line.
  whatsapp: '918089903836',
  whatsappMessage: 'Hello Daira, I would like to know more.',
  email: null as string | null, // TODO: public email not confirmed yet
  social: { instagram: 'https://www.instagram.com/dairacommunityindia/' },
  maps: 'https://maps.app.goo.gl/54E39FHBkVwiBL7NA',
  booking: import.meta.env.PUBLIC_BOOKING_URL ?? 'https://www.zotel.ai/w/website-module/preview/01a0d19f-0692-730c-8caa-42987d628813/home',
  analyticsId: import.meta.env.PUBLIC_ANALYTICS_ID ?? '',
  // English is complete; others are added as reviewed translations arrive.
  locales: { default: 'en', all: ['en', 'ml', 'hi', 'kn', 'ta'], published: ['en'] },
  // TODO: replace text wordmark with supplied logo SVG at /public/logo/daira.svg
  logoSrc: null as string | null,
};
export const whatsappUrl = (msg = site.whatsappMessage) =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(msg)}`;
