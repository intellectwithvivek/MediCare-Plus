/**
 * Mock operational figures for the "Care in numbers" section.
 *
 * Every value here is a fixed literal rather than something derived from the
 * clock. A chart that reads `new Date()` during render draws one bar order on
 * the server and another on the client, and React reports that as a hydration
 * mismatch — so the twelve months are simply named.
 */

export interface MonthlyPoint {
  x: string;
  y: number;
}

/** Appointments completed per month, September 2025 – August 2026. */
export const appointmentsPerMonth: MonthlyPoint[] = [
  { x: 'Sep', y: 3120 },
  { x: 'Oct', y: 3480 },
  { x: 'Nov', y: 3260 },
  { x: 'Dec', y: 2910 },
  { x: 'Jan', y: 4020 },
  { x: 'Feb', y: 3740 },
  { x: 'Mar', y: 3990 },
  { x: 'Apr', y: 3610 },
  { x: 'May', y: 3880 },
  { x: 'Jun', y: 4260 },
  { x: 'Jul', y: 4410 },
  { x: 'Aug', y: 4180 },
];

export interface SharePoint {
  label: string;
  value: number;
}

/** Share of appointments by department, top six. */
export const appointmentsByDepartment: SharePoint[] = [
  { label: 'General Medicine', value: 28 },
  { label: 'Paediatrics', value: 19 },
  { label: 'Orthopaedics', value: 15 },
  { label: 'Cardiology', value: 13 },
  { label: 'Gynaecology', value: 12 },
  { label: 'Dermatology', value: 9 },
];

export const satisfactionRate = 98;
export const onTimeRate = 96;
