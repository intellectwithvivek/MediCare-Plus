export interface Slot {
  /** 24-hour "HH:MM". Also the value submitted with the booking. */
  time: string;
  /** Morning slots and afternoon slots are grouped separately in the UI. */
  period: 'Morning' | 'Afternoon' | 'Evening';
}

/** The clinic runs on a fixed 30-minute grid. Nothing here changes per doctor. */
export const SLOT_GRID: Slot[] = [
  { time: '08:00', period: 'Morning' },
  { time: '08:30', period: 'Morning' },
  { time: '09:00', period: 'Morning' },
  { time: '09:30', period: 'Morning' },
  { time: '10:00', period: 'Morning' },
  { time: '10:30', period: 'Morning' },
  { time: '11:00', period: 'Morning' },
  { time: '11:30', period: 'Morning' },
  { time: '12:00', period: 'Afternoon' },
  { time: '14:00', period: 'Afternoon' },
  { time: '14:30', period: 'Afternoon' },
  { time: '15:00', period: 'Afternoon' },
  { time: '15:30', period: 'Afternoon' },
  { time: '16:00', period: 'Afternoon' },
  { time: '16:30', period: 'Afternoon' },
  { time: '17:00', period: 'Evening' },
  { time: '17:30', period: 'Evening' },
  { time: '18:00', period: 'Evening' },
];

export interface SlotAvailability extends Slot {
  booked: boolean;
}

/**
 * A tiny FNV-1a hash. Which slots are taken has to look arbitrary but stay
 * *stable*: the same doctor and date must produce the same grid on the server,
 * on the client, and on a re-render, or React reports a hydration mismatch and
 * the user watches slots flicker between free and booked.
 */
function hash(input: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < input.length; i += 1) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

/**
 * Mock occupancy for one doctor on one day. Roughly a third of the grid comes
 * back booked, which is what a real clinic day looks like a few days out.
 *
 * @param doctorSlug the doctor being booked
 * @param isoDate    the day, as `YYYY-MM-DD`
 */
export function getSlots(doctorSlug: string, isoDate: string): SlotAvailability[] {
  const seed = hash(doctorSlug + '|' + isoDate);
  return SLOT_GRID.map((slot, index) => ({
    ...slot,
    // Mix the index back in so neighbouring slots do not all share a fate.
    booked: (hash(seed + ':' + index) % 100) < 34,
  }));
}

/** `YYYY-MM-DD` in local time. `toISOString()` would shift the day across timezones. */
export function toISODate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return y + '-' + m + '-' + d;
}

/** "Fri, 12 Sep 2026" — spelled out so nobody has to decode 09/12. */
export function formatLongDate(date: Date): string {
  return date.toLocaleDateString('en-IN', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export const AGE_BANDS = [
  { value: 'under-12', label: 'Under 12' },
  { value: '12-17', label: '12 – 17' },
  { value: '18-29', label: '18 – 29' },
  { value: '30-44', label: '30 – 44' },
  { value: '45-59', label: '45 – 59' },
  { value: '60-plus', label: '60 and over' },
];
