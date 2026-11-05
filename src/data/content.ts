import type { LucideIcon } from 'lucide-react';
import { CalendarClock, ClipboardList, Handshake, Package, Store, Users } from 'lucide-react';

export const NAV_LINKS = [
  { href: '#problem', label: 'The problem' },
  { href: '#solution', label: 'Our solution' },
  { href: '#how-it-works', label: 'How it works' },
  { href: '#journey', label: 'Journey of a meal' },
  { href: '#impact', label: 'Impact' },
  { href: '#stories', label: 'Stories' },
] as const;

export const HOW_IT_WORKS_STEPS = [
  {
    title: 'Post the surplus',
    body: 'A donor lists the food, the quantity, and the window when it can be collected. It takes a couple of minutes, not a phone tree.',
  },
  {
    title: 'Match it to a destination',
    body: 'Coordinators look at nearby NGOs and community kitchens that can take the load and are open at that time.',
  },
  {
    title: 'Schedule the pickup',
    body: 'A volunteer or partner driver claims the route. Everyone sees the same status, from waiting to claimed to delivered.',
  },
  {
    title: 'Serve and close the loop',
    body: 'The receiving team confirms what arrived and what was served, so the donor can see where their food went.',
  },
] as const;

export interface Feature {
  title: string;
  summary: string;
  points: readonly string[];
}

export const FEATURES: readonly Feature[] = [
  {
    title: 'Food donation',
    summary: 'A short, honest offer form for bakeries, farms, markets and caterers with food to spare.',
    points: [
      'Food type, quantity and allergen notes',
      'Pickup windows set by the donor',
      'Simple checks on what can be accepted',
    ],
  },
  {
    title: 'NGO coordination',
    summary: 'A shared board where partner charities and community kitchens post what they can take now.',
    points: [
      'Live capacity and opening hours',
      'Priority flags for urgent needs',
      'A shared history of what each partner received',
    ],
  },
  {
    title: 'Pickup coordination',
    summary: 'Routes that volunteers and partner drivers can claim, follow and hand over with confidence.',
    points: [
      'Time-window reminders before collection',
      'Status updates from claim to delivery',
      'A fallback to the next nearby destination',
    ],
  },
  {
    title: 'Community participation',
    summary: 'Ways for neighbours to take part beyond donating, from sorting shifts to shared meals.',
    points: [
      'Volunteer shifts for sorting and driving',
      'Local food-sharing events',
      'Feedback from the tables that are served',
    ],
  },
];

export type JourneyStation = 'donor' | 'coordination' | 'destination';

export interface JourneyStep {
  station: JourneyStation;
  title: string;
  body: string;
}

export const JOURNEY_STEPS: readonly JourneyStep[] = [
  {
    station: 'donor',
    title: 'Forty loaves are still good at closing time',
    body: 'A bakery is about to close with bread that will not sell tomorrow. It posts the offer in under two minutes.',
  },
  {
    station: 'donor',
    title: 'The offer appears on the FoodBridge board',
    body: 'The pickup window is set for 6:30 to 8:00pm. Quantity and allergen notes are visible to every partner in the area.',
  },
  {
    station: 'coordination',
    title: 'A coordinator matches it to a nearby kitchen',
    body: 'The kitchen has room for evening meals, and a volunteer is free at 7pm. The match is confirmed before anyone leaves.',
  },
  {
    station: 'coordination',
    title: 'A volunteer claims the pickup',
    body: 'The route is set and the bakery knows who is coming. The status moves from waiting to claimed.',
  },
  {
    station: 'destination',
    title: 'The bread arrives while it is still fresh',
    body: 'Kitchen staff check the delivery and log it. The donor sees the update within minutes.',
  },
  {
    station: 'destination',
    title: 'Neighbours share a warm meal tonight',
    body: 'The bread becomes part of dinner at the community table. The story is shared back with the bakery.',
  },
];

export const JOURNEY_STATIONS: Record<
  JourneyStation,
  { label: string; sublabel: string; icon: LucideIcon }
> = {
  donor: { label: 'Donor', sublabel: 'Bakery, farm, market or caterer', icon: Store },
  coordination: { label: 'FoodBridge', sublabel: 'Coordination and pickup', icon: ClipboardList },
  destination: { label: 'NGO or community', sublabel: 'Kitchen or shared table', icon: Users },
};

export interface Story {
  kicker: string;
  title: string;
  quote: string;
  setting: string;
  body: string;
  imageUrl: string;
  imageAlt: string;
}

export const STORIES: readonly Story[] = [
  {
    kicker: 'Fictional story: a bakery on closing time',
    title: 'The Thursday tray',
    quote: 'I used to throw away the last tray and feel bad about it. Now I just tap a button and someone comes.',
    setting: 'Imagined bakery owner, a fictional town',
    body: 'Mara runs a small bakery with a loyal morning crowd and an empty tray by six. Her offers now reach a community kitchen that serves an evening meal, and she has stopped guessing who might want the bread.',
    imageUrl:
      'https://images.pexels.com/photos/15009979/pexels-photo-15009979.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    imageAlt: 'Fresh bread displayed on wooden shelves in a warm-lit bakery.',
  },
  {
    kicker: 'Fictional story: a volunteer on a Saturday shift',
    title: 'Sorting by the window',
    quote: 'The hardest part was never the lifting. It was not knowing where the food should go.',
    setting: 'Imagined volunteer, a fictional neighbourhood',
    body: 'Tomas gives two Saturday mornings a month. With a shared board, he picks up a route that fits his shift, sorts the boxes at the hall, and watches the status change when the food is delivered.',
    imageUrl:
      'https://images.pexels.com/photos/6591154/pexels-photo-6591154.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    imageAlt: 'Volunteers packing food donations together in a community space.',
  },
  {
    kicker: 'Fictional story: a table that stays open late',
    title: 'Dinner for whoever arrives',
    quote: 'Nobody here has to explain why they came. The table is already set.',
    setting: 'Imagined community table, a fictional district',
    body: 'Priya coordinates a weekly community table. Donated food arrives planned to the hour, so the kitchen cooks less guesswork and more meals, and neighbours sit down together without a sign-up sheet.',
    imageUrl:
      'https://images.pexels.com/photos/3184195/pexels-photo-3184195.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    imageAlt: 'A diverse group of adults sharing a meal together at a table.',
  },
];

export interface DemoField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'number' | 'textarea';
  placeholder?: string;
  required?: boolean;
}

export interface DemoFlow {
  id: 'donate' | 'volunteer' | 'partner';
  number: string;
  title: string;
  summary: string;
  cta: string;
  icon: LucideIcon;
  fields: readonly DemoField[];
}

export const DEMO_FLOWS: readonly DemoFlow[] = [
  {
    id: 'donate',
    number: '01',
    title: 'Donate surplus food',
    summary: 'Tell us what your kitchen, shop or farm has to spare and when it can be collected.',
    cta: 'Try the donor demo',
    icon: Package,
    fields: [
      { name: 'business', label: 'Business or farm name', type: 'text', placeholder: 'e.g. Corner Bakery', required: true },
      { name: 'contact', label: 'Contact email', type: 'email', placeholder: 'you@example.com', required: true },
      { name: 'window', label: 'Typical collection window', type: 'text', placeholder: 'e.g. Weekdays, 6pm to 8pm' },
    ],
  },
  {
    id: 'volunteer',
    number: '02',
    title: 'Volunteer your time',
    summary: 'Sort, drive or host. Share the hours you can give and the area you can cover.',
    cta: 'Try the volunteer demo',
    icon: CalendarClock,
    fields: [
      { name: 'name', label: 'Your name', type: 'text', required: true },
      { name: 'area', label: 'Neighbourhood you can cover', type: 'text', placeholder: 'e.g. Riverside' },
      { name: 'availability', label: 'When you are free', type: 'text', placeholder: 'e.g. Saturday mornings' },
    ],
  },
  {
    id: 'partner',
    number: '03',
    title: 'Partner as an NGO',
    summary: 'Register what you serve and what you can take in, so donors can find you when it matters.',
    cta: 'Try the partner demo',
    icon: Handshake,
    fields: [
      { name: 'organisation', label: 'Organisation name', type: 'text', required: true },
      { name: 'contact', label: 'Contact email', type: 'email', placeholder: 'you@example.org', required: true },
      { name: 'capacity', label: 'Meals you can take each week', type: 'number', placeholder: 'e.g. 300' },
    ],
  },
];
