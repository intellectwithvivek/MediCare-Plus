'use client';

import { Scheduler, type SchedulerEvent } from '@the_viveksingh/vivek-ui';
import type { AvailabilityBlock } from '@/data/doctors';

const DAY_NAMES = ['', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'] as const;

/**
 * A fixed Monday. The timetable only cares about time-of-day; which weekday a
 * block belongs to is carried by the Scheduler *resource*, not by the date.
 * Anchoring to one constant day also keeps the page statically renderable.
 */
const REFERENCE_DAY: [number, number, number] = [2026, 0, 5];

const pad = (value: number) => String(value).padStart(2, '0');

/**
 * Every instant here is built and read in UTC, and never in local time.
 *
 * `Scheduler`'s default `formatTime` uses `getHours()`, which is local. A
 * server rendering in UTC and a browser in Asia/Kolkata would then label the
 * same instant five and a half hours apart — a hydration mismatch, and wrong
 * clinic times for every visitor. Building with `Date.UTC` and formatting with
 * `getUTCHours` makes the label depend only on the instant, so both sides
 * agree wherever they run.
 *
 * `formatTime` is passed from inside this client component rather than from
 * the server page, because functions cannot cross that boundary.
 */
function atUTC(time: string): Date {
  const [h, m] = time.split(':').map(Number);
  return new Date(Date.UTC(REFERENCE_DAY[0], REFERENCE_DAY[1], REFERENCE_DAY[2], h, m));
}

function formatUTCTime(value: Date): string {
  return `${pad(value.getUTCHours())}:${pad(value.getUTCMinutes())}`;
}

export function WeeklyTimetable({
  doctorName,
  availability,
}: {
  doctorName: string;
  availability: AvailabilityBlock[];
}) {
  const activeDays = [...new Set(availability.map((b) => b.day))].sort((a, b) => a - b);

  const resources = activeDays.map((day) => {
    const clinics = availability.filter((b) => b.day === day).length;
    return {
      id: `day-${day}`,
      label: DAY_NAMES[day],
      sublabel: `${clinics} clinic${clinics === 1 ? '' : 's'}`,
    };
  });

  const events: SchedulerEvent[] = availability.map((block, index) => ({
    id: `block-${index}`,
    resourceId: `day-${block.day}`,
    title: block.label,
    start: atUTC(block.start),
    end: atUTC(block.end),
    tone: block.tone,
  }));

  return (
    <div className="scheduler-scroll">
      <Scheduler
        label={`Weekly clinic timetable for ${doctorName}`}
        resources={resources}
        events={events}
        start={atUTC('08:00')}
        end={atUTC('18:30')}
        step={60}
        minTickWidth={78}
        formatTime={formatUTCTime}
      />
    </div>
  );
}
