import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// Static output: deploys to Cloudflare Pages with no adapter.
export default defineConfig({
  site: process.env.PUBLIC_SITE_URL || 'https://dairacommunity.com',
  output: 'static',
  integrations: [sitemap()],
  vite: { plugins: [tailwindcss()] },
});
