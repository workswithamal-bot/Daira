// Astro 5 location for collection schemas (replaces the older src/content/config.ts).
import { defineCollection, z } from 'astro:content';
import { glob, file } from 'astro/loaders';

const img = z.string().regex(/^\/images\//, 'Use a path under /images/');
const md = (dir: string) => glob({ pattern: ['**/*.md', '!**/_*'], base: `./src/content/${dir}` }); // files starting with _ are templates

// Rooms: top-level fields are PUBLIC and must be confirmed against Zotel.
// Unconfirmed copy lives in `draft` and is never rendered.
const rooms = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/rooms' }),
  schema: z.object({
    name: z.string(),
    order: z.number(),
    kind: z.enum(['private', 'dorm']),
    tagline: z.string().optional(),
    description: z.string().optional(),
    bedType: z.string().optional(),
    capacity: z.number().int().positive().optional(),
    bathroom: z.string().optional(),
    amenities: z.array(z.string()).default([]),
    cover: img.optional(),
    gallery: z.array(img).default([]),
    bookingUrl: z.string().url().optional(), // falls back to site.booking
    draft: z.object({
      tagline: z.string().optional(), description: z.string().optional(),
      bedType: z.string().optional(), capacity: z.number().optional(),
      amenities: z.array(z.string()).optional(),
    }).optional(),
    todo: z.string().optional(),
  }),
});

const gallery = defineCollection({
  loader: file('content/gallery.json'), // maintained by scripts/sync-gallery.js
  schema: z.object({
    title: z.string(), src: img, alt: z.string(),
    category: z.enum(['architecture', 'rooms', 'garden', 'people', 'art', 'events', 'details', 'common-spaces', 'coworking']),
  }),
});

const events = defineCollection({
  loader: md('events'),
  schema: z.object({
    name: z.string(), date: z.coerce.date(), endDate: z.coerce.date().optional(),
    category: z.enum(['festival', 'flea-market', 'workshop', 'wedding', 'community', 'creative', 'experimental']),
    venue: z.enum(['front-yard', 'back-yard', 'house', 'other']),
    status: z.enum(['upcoming', 'past', 'cancelled']).default('upcoming'),
    images: z.array(img).default([]),
    link: z.string().url().optional(),
    summary: z.string(),
  }),
});

const artists = defineCollection({
  loader: md('artists'),
  schema: z.object({
    name: z.string(), discipline: z.string(), year: z.number().int(),
    project: z.string().optional(), images: z.array(img).default([]),
    links: z.array(z.object({ label: z.string(), url: z.string().url() })).default([]),
    summary: z.string(),
  }),
});

const journal = defineCollection({
  loader: md('journal'),
  schema: z.object({
    title: z.string(), date: z.coerce.date(),
    category: z.enum(['Daira', 'Artists', 'Events', 'Workshops', 'Community', 'Kannur']),
    cover: img.optional(), coverAlt: z.string().optional(),
    gallery: z.array(img).default([]), author: z.string(),
    tags: z.array(z.string()).default([]), summary: z.string(), draft: z.boolean().default(false),
  }),
});

export const collections = { rooms, gallery, events, artists, journal };
