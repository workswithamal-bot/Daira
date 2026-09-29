import { statSync } from 'node:fs';
import { join } from 'node:path';

// Owner-editable image map. Drop a photo into /public/images/<folder>/ and
// set `file` here (or run scripts/sync-gallery.js). If the file is missing,
// <Photo> renders a labelled placeholder, never a fake photograph.
export type Slot = { file: string; alt: string; label: string };

export const images = {
  hero:       { file: 'hero/hero.jpg',            alt: 'TODO alt text', label: 'HERO' },
  exterior:   { file: 'exterior/house.jpg',       alt: 'TODO alt text', label: 'HOUSE EXTERIOR' },
  frontYard:  { file: 'exterior/front-yard.jpg',  alt: 'TODO alt text', label: 'FRONT YARD' },
  backYard:   { file: 'garden/back-yard.jpg',     alt: 'TODO alt text', label: 'BACKYARD' },
  coworking:  { file: 'coworking/study-desks.jpg',  alt: 'TODO alt text', label: 'CO-WORKING' },
  dorm:       { file: 'dorm/dorm.jpg',            alt: 'TODO alt text', label: 'DORMITORY' },
  common:     { file: 'common-spaces/main-foyer.jpg', alt: 'TODO alt text', label: 'COMMON SPACE' },
  artists:    { file: 'artists/artists.jpg',      alt: 'TODO alt text', label: 'ARTISTS' },
  events:     { file: 'events/events.jpg',        alt: 'TODO alt text', label: 'EVENTS' },
  details:    { file: 'details/pottery-console.jpg',      alt: 'TODO alt text', label: 'DETAILS' },
} satisfies Record<string, Slot>;

export type SlotKey = keyof typeof images;

export function resolve(slot: Slot) {
  let exists = false;
  try { exists = !!slot.file && statSync(join(process.cwd(), 'public', 'images', slot.file)).isFile(); } catch { /* missing file */ }
  return { ...slot, src: `/images/${slot.file}`, exists };
}

export function resolveFile(src: string, label: string, alt: string) {
  const file = src.replace(/^\/images\//, '');
  return resolve({ file, alt, label });
}
