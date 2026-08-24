/**
 * Every VivekUI component this template renders, and where it renders.
 *
 * `slug` is the component's docs path segment, so the /built-with table can
 * deep-link each row straight into the documentation.
 */
export interface ComponentUse {
  section: string;
  component: string;
  slug: string;
  role: string;
}

export const componentMap: ComponentUse[] = [
  // ------------------------------------------------------------ app shell
  {
    section: 'Every page — template banner',
    component: 'Code',
    slug: 'code',
    role: 'The `git clone` command in the open-source strip at the very top.',
  },
  {
    section: 'Every page — template banner',
    component: 'CopyButton',
    slug: 'copy-button',
    role: 'Copies the clone command, and the install command in the footer.',
  },
  {
    section: 'Every page — open-source notice',
    component: 'Badge',
    slug: 'badge',
    role: '"Free & open source" and "MIT licensed" chips above the footer.',
  },
  {
    section: 'Every page — open-source notice',
    component: 'Button',
    slug: 'button',
    role: 'Star on GitHub, Use this template, How it is built.',
  },
  {
    section: 'Every page — theming',
    component: 'ThemeProvider',
    slug: 'theme-provider',
    role: 'Light default, dark supported, choice persisted to localStorage.',
  },
  {
    section: 'Every page — theming',
    component: 'ThemeToggle',
    slug: 'theme-toggle',
    role: 'The sun/moon switch in the navbar.',
  },
  {
    section: 'Every page — emergency bar',
    component: 'Alert',
    slug: 'alert',
    role: 'The thin 24 × 7 emergency strip above the navigation.',
  },
  {
    section: 'Every page — navigation',
    component: 'Navbar',
    slug: 'navbar',
    role: 'Brand, links, actions and the mobile disclosure with its focus trap.',
  },
  {
    section: 'Every page — navigation',
    component: 'Badge',
    slug: 'badge',
    role: 'The "⚡ Built with VivekUI" chip, and every specialty and condition tag.',
  },
  {
    section: 'Every page — footer',
    component: 'Footer',
    slug: 'footer',
    role: 'The footer landmark, container and muted background.',
  },
  {
    section: 'Every page — footer',
    component: 'Clock',
    slug: 'clock',
    role: 'Live local time in Bengaluru, beside the opening hours.',
  },
  {
    section: 'Every page — footer',
    component: 'MapEmbed',
    slug: 'map-embed',
    role: 'The OpenStreetMap frame showing the Indiranagar address.',
  },
  {
    section: 'Every page — footer',
    component: 'Code',
    slug: 'code',
    role: 'The install command block.',
  },
  {
    section: 'Every page — footer',
    component: 'CopyButton',
    slug: 'copy-button',
    role: 'Copies the install command, with its own copied/error announcement.',
  },
  {
    section: 'Every page — footer',
    component: 'Divider',
    slug: 'divider',
    role: 'Rule above the copyright and disclaimer.',
  },

  // -------------------------------------------------------------- homepage
  {
    section: 'Homepage — hero',
    component: 'Hero',
    slug: 'hero',
    role: 'Split layout: headline and actions on the left, booking card on the right.',
  },
  {
    section: 'Homepage — hero',
    component: 'Card',
    slug: 'card',
    role: 'The floating "book in under a minute" panel.',
  },
  {
    section: 'Homepage — hero',
    component: 'Combobox',
    slug: 'combobox',
    role: 'Type-ahead department picker that seeds the booking flow.',
  },
  {
    section: 'Homepage — hero',
    component: 'Button',
    slug: 'button',
    role: 'Every call to action on the site, including `asChild` around next/link.',
  },
  {
    section: 'Homepage — stats',
    component: 'Stats',
    slug: 'stats',
    role: 'Four-up figure grid rendered as a description list.',
  },
  {
    section: 'Homepage — stats',
    component: 'AnimatedCounter',
    slug: 'animated-counter',
    role: 'Counts each figure up when it scrolls into view.',
  },
  {
    section: 'Homepage — departments',
    component: 'FeatureGrid',
    slug: 'feature-grid',
    role: 'The eight specialties, four across on desktop.',
  },
  {
    section: 'Homepage — doctors',
    component: 'Grid',
    slug: 'grid',
    role: 'Responsive card grids on the homepage, /doctors and /departments.',
  },
  {
    section: 'Homepage — doctors',
    component: 'Rating',
    slug: 'rating',
    role: 'Read-only half-star patient rating on every doctor card and profile.',
  },
  {
    section: 'Homepage — care in numbers',
    component: 'BarChart',
    slug: 'bar-chart',
    role: 'Appointments completed per month, last twelve months.',
  },
  {
    section: 'Homepage — care in numbers',
    component: 'PieChart',
    slug: 'pie-chart',
    role: 'Share of appointments across the six busiest departments.',
  },
  {
    section: 'Homepage — care in numbers',
    component: 'ProgressRing',
    slug: 'progress-ring',
    role: 'Two rings: 98% patient satisfaction and 96% on-time consultations.',
  },
  {
    section: 'Homepage — testimonials',
    component: 'Testimonials',
    slug: 'testimonials',
    role: 'Six patient quotes with avatars.',
  },
  {
    section: 'Homepage — testimonials',
    component: 'Avatar',
    slug: 'avatar',
    role: 'Patient portraits, and the head-of-department photo on /departments.',
  },
  {
    section: 'Homepage — FAQ',
    component: 'FAQ',
    slug: 'faq',
    role: 'Four accordion answers, mirrored into FAQPage structured data.',
  },
  {
    section: 'Homepage — closing CTA',
    component: 'CTA',
    slug: 'cta',
    role: 'The closing band on the homepage, /departments and each doctor profile.',
  },

  // ---------------------------------------------------------------- layout
  {
    section: 'Layout — every route',
    component: 'Section',
    slug: 'section',
    role: 'Page rhythm: padding, background and the contained header block.',
  },
  {
    section: 'Layout — every route',
    component: 'Container',
    slug: 'container',
    role: 'Max-width gutter, applied by Section on every page.',
  },
  {
    section: 'Layout — every route',
    component: 'Stack',
    slug: 'stack',
    role: 'Horizontal action rows inside Hero and CTA.',
  },
  {
    section: 'Layout — every route',
    component: 'Heading',
    slug: 'heading',
    role: 'Section titles, kept at one h1 per page.',
  },
  {
    section: 'Layout — every route',
    component: 'Text',
    slug: 'text',
    role: 'Body copy, muted captions and clamped card summaries.',
  },
  {
    section: 'Layout — inner routes',
    component: 'Breadcrumb',
    slug: 'breadcrumb',
    role: 'Trail on /doctors, /departments, /book and each profile.',
  },

  // ----------------------------------------------------------- booking flow
  {
    section: '/book — the flow',
    component: 'Stepper',
    slug: 'stepper',
    role: 'Four steps, clickable backwards only, with aria-current="step".',
  },
  {
    section: '/book — step 2',
    component: 'DatePicker',
    slug: 'date-picker',
    role: 'Typed or picked date, with everything before today blocked.',
  },
  {
    section: '/book — step 2',
    component: 'Scheduler',
    slug: 'scheduler',
    role: 'The "why are some slots gone?" timeline of the day’s existing bookings.',
  },
  {
    section: '/book — step 2',
    component: 'Skeleton',
    slug: 'skeleton',
    role: 'Placeholder grid while the day’s availability loads.',
  },
  {
    section: '/book — step 2',
    component: 'EmptyState',
    slug: 'empty-state',
    role: 'Before a date is chosen, and when a doctor filter matches nothing.',
  },
  {
    section: '/book — step 3',
    component: 'Field',
    slug: 'field',
    role: 'Label, help text and error wiring for every control in the form.',
  },
  {
    section: '/book — step 3',
    component: 'Input',
    slug: 'input',
    role: 'Name, phone and email.',
  },
  {
    section: '/book — step 3',
    component: 'Select',
    slug: 'select',
    role: 'Age band.',
  },
  {
    section: '/book — step 3',
    component: 'Textarea',
    slug: 'textarea',
    role: 'Symptoms and reason for the visit.',
  },
  {
    section: '/book — step 3',
    component: 'Checkbox',
    slug: 'checkbox',
    role: 'Consent, with its own description and error state.',
  },
  {
    section: '/book — step 4',
    component: 'OTPInput',
    slug: 'otp-input',
    role: 'Six-box code entry with paste, autofill and auto-submit on complete.',
  },
  {
    section: '/book — confirmation',
    component: 'Timeline',
    slug: 'timeline',
    role: '"What happens next", and the qualifications trail on doctor profiles.',
  },
  {
    section: '/book — confirmation',
    component: 'Toast',
    slug: 'toast',
    role: 'Booking confirmed, code resent, and "added to calendar".',
  },

  // ------------------------------------------------------------ built-with
  {
    section: '/built-with',
    component: 'Table',
    slug: 'table',
    role: 'This very table — scrollable, with a visually-hidden caption.',
  },
];
