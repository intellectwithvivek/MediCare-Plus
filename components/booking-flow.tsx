'use client';

import { useCallback, useEffect, useMemo, useState, useSyncExternalStore } from 'react';
import Link from 'next/link';
import {
  Alert,
  Badge,
  Button,
  Card,
  Checkbox,
  Combobox,
  DatePicker,
  EmptyState,
  Field,
  Input,
  OTPInput,
  Scheduler,
  Select,
  Skeleton,
  Stepper,
  Text,
  Textarea,
  Timeline,
  useToast,
} from '@the_viveksingh/vivek-ui';

import { departmentOptions, getDepartment } from '@/data/departments';
import { doctorOptions, getDoctor } from '@/data/doctors';
import { AGE_BANDS, formatLongDate, getSlots, toISODate, type SlotAvailability } from '@/data/slots';
import { nextSteps } from '@/data/content';

const STEPS = [
  { label: 'Department', description: 'Who you need to see' },
  { label: 'Date & time', description: 'Pick a free slot' },
  { label: 'Your details', description: 'Name and symptoms' },
  { label: 'Verify', description: 'Confirm by OTP' },
];

const BOOKING_FEE = 50;

interface Patient {
  name: string;
  phone: string;
  email: string;
  ageBand: string;
  symptoms: string;
  consent: boolean;
}

const EMPTY_PATIENT: Patient = {
  name: '',
  phone: '',
  email: '',
  ageBand: '',
  symptoms: '',
  consent: false,
};

/**
 * Tracks a media query without breaking hydration.
 *
 * The server snapshot is always `false`, so the server and the first client
 * render agree; `useSyncExternalStore` then re-renders with the real value
 * immediately after hydration. Reading `matchMedia` during render instead
 * would produce markup the server could never have produced.
 */
function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const mql = window.matchMedia(query);
      mql.addEventListener('change', onChange);
      return () => mql.removeEventListener('change', onChange);
    },
    [query],
  );
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false,
  );
}

/** Midnight today. Everything before it is blocked in the DatePicker. */
function startOfToday(): Date {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
}

/** Combines a calendar day and an "HH:MM" string into one Date. */
function at(day: Date, time: string): Date {
  const [h, m] = time.split(':').map(Number);
  return new Date(day.getFullYear(), day.getMonth(), day.getDate(), h, m);
}

export function BookingFlow({
  initialDepartment,
  initialDoctor,
}: {
  initialDepartment?: string;
  initialDoctor?: string;
}) {
  const { toast } = useToast();

  // A doctor arriving in the query string implies their department.
  const seededDepartment = initialDoctor
    ? getDoctor(initialDoctor)?.department
    : initialDepartment && getDepartment(initialDepartment)
      ? initialDepartment
      : undefined;

  const [step, setStep] = useState(seededDepartment ? 1 : 0);
  const [department, setDepartment] = useState<string | null>(seededDepartment ?? null);
  const [doctorSlug, setDoctorSlug] = useState<string | null>(initialDoctor ?? null);
  const [date, setDate] = useState<Date | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [patient, setPatient] = useState<Patient>(EMPTY_PATIENT);
  const [otp, setOtp] = useState('');
  const [otpError, setOtpError] = useState<string | null>(null);
  const [errors, setErrors] = useState<Partial<Record<keyof Patient, string>>>({});
  const [bookingId, setBookingId] = useState<string | null>(null);

  const [loaded, setLoaded] = useState<{ key: string; slots: SlotAvailability[] } | null>(null);

  const [today] = useState(startOfToday);

  /*
   * Four markers alone eat 176px of a 320px screen, so the horizontal stepper
   * cannot fit its labels on a phone. This is a real prop rather than a CSS
   * flip of `flex-direction`, because the connector rail between markers is
   * drawn from `data-orientation` — overriding only the flex axis left every
   * step with a stray horizontal line pointing at nothing.
   */
  const isNarrow = useMediaQuery('(max-width: 40rem)');

  const doctor = doctorSlug ? getDoctor(doctorSlug) : undefined;
  const dept = department ? getDepartment(department) : undefined;

  const filteredDoctors = useMemo(
    () =>
      doctorOptions
        .filter((d) => !department || d.department === department)
        .map((d) => ({ value: d.value, label: d.label })),
    [department],
  );

  /**
   * Mock "fetch the day's availability". The delay is deliberate: it is the
   * only honest way to show what the Skeleton state looks like in a template
   * with no backend behind it.
   *
   * The result is stored against the request it answers rather than being
   * cleared on the way in. That keeps the effect free of a synchronous
   * setState — the only write happens in the timer callback — and it means a
   * result that arrives after the user has moved on is simply ignored instead
   * of briefly showing the wrong day's slots.
   */
  const requestKey = doctorSlug && date ? `${doctorSlug}|${toISODate(date)}` : null;

  useEffect(() => {
    if (!requestKey) return;
    const [slug, isoDate] = requestKey.split('|');
    const timer = window.setTimeout(() => {
      setLoaded({ key: requestKey, slots: getSlots(slug, isoDate) });
    }, 350);
    return () => window.clearTimeout(timer);
  }, [requestKey]);

  const slots = loaded && loaded.key === requestKey ? loaded.slots : null;
  const loadingSlots = requestKey !== null && slots === null;

  /** A doctor from another department is no longer a valid choice. */
  function chooseDepartment(value: string | null) {
    setDepartment(value);
    if (doctorSlug && value && getDoctor(doctorSlug)?.department !== value) {
      setDoctorSlug(null);
      setTime(null);
    }
  }

  function chooseDate(value: Date | null) {
    setDate(value);
    setTime(null);
  }

  function validatePatient(): boolean {
    const next: Partial<Record<keyof Patient, string>> = {};
    if (patient.name.trim().length < 2) next.name = 'Please give the name the appointment is for.';
    if (!/^[+\d][\d\s-]{7,}$/.test(patient.phone.trim()))
      next.phone = 'A reachable phone number, please — the reminder goes there.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(patient.email.trim()))
      next.email = 'We send the confirmation and reschedule link by email.';
    if (!patient.ageBand) next.ageBand = 'Pick an age band so we allow the right slot length.';
    if (!patient.consent) next.consent = 'We need your consent before storing these details.';
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function goNext() {
    if (step === 2 && !validatePatient()) return;
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  }

  function confirm(code: string) {
    if (!/^\d{6}$/.test(code)) {
      setOtpError('Enter the six digits from the SMS. Any six will do in this demo.');
      return;
    }
    setOtpError(null);
    // Math.random is safe here: this runs from a click, never during render.
    const suffix = Math.random().toString(36).slice(2, 7).toUpperCase();
    setBookingId(`MCP-${suffix}`);
    toast({
      tone: 'success',
      title: 'Appointment confirmed',
      description: `${doctor?.name} · ${date ? formatLongDate(date) : ''} at ${time}`,
    });
  }

  function reset() {
    setBookingId(null);
    setStep(0);
    setDepartment(null);
    setDoctorSlug(null);
    setDate(null);
    setTime(null);
    setPatient(EMPTY_PATIENT);
    setOtp('');
    setErrors({});
  }

  const canLeaveStep = [Boolean(department && doctorSlug), Boolean(date && time), true, true];
  const total = (doctor?.consultationFee ?? 0) + BOOKING_FEE;

  /* --------------------------------------------------------------- success */

  if (bookingId) {
    return <Confirmation
      bookingId={bookingId}
      doctorName={doctor?.name ?? ''}
      departmentName={dept?.name ?? ''}
      when={date ? `${formatLongDate(date)} at ${time}` : ''}
      onReset={reset}
      onAddToCalendar={() =>
        toast({
          tone: 'info',
          title: 'Added to your calendar',
          description: 'A .ics invitation would download here in a live deployment.',
        })
      }
    />;
  }

  /* ------------------------------------------------------------ the wizard */

  const slotGroups = slots
    ? (['Morning', 'Afternoon', 'Evening'] as const).map((period) => ({
        period,
        items: slots.filter((s) => s.period === period),
      }))
    : [];

  return (
    <div className="book-layout">
      <div>
        <Stepper
          className="book-stepper"
          orientation={isNarrow ? 'vertical' : 'horizontal'}
          steps={STEPS}
          activeStep={step}
          clickable
          label="Booking progress"
          onStepChange={(index) => {
            // Only ever let someone move backwards, or forwards into a step
            // whose predecessors are all satisfied.
            if (index <= step) return setStep(index);
            for (let i = step; i < index; i += 1) if (!canLeaveStep[i]) return;
            setStep(index);
          }}
        />

        <div className="step-panel" style={{ marginTop: 'var(--vk-space-8)' }}>
          {/* ------------------------------------------------------- step 1 */}
          {step === 0 && (
            <Card variant="outline" padding="lg">
              <h2 className="doctor-name">Who would you like to see?</h2>
              <Text tone="muted" size="sm" style={{ marginTop: 'var(--vk-space-2)' }}>
                Choose a department first — the doctor list narrows to that team.
              </Text>

              <div style={{ marginTop: 'var(--vk-space-6)', display: 'grid', gap: 'var(--vk-space-5)' }}>
                <Field label="Department" required>
                  <Combobox
                    options={departmentOptions}
                    value={department}
                    onValueChange={chooseDepartment}
                    placeholder="Search a department…"
                    clearable
                  />
                </Field>

                <Field
                  label="Doctor"
                  required
                  help={
                    department
                      ? `${filteredDoctors.length} consultant${filteredDoctors.length === 1 ? '' : 's'} in ${dept?.name}.`
                      : 'Pick a department to see who is available.'
                  }
                >
                  <Combobox
                    options={filteredDoctors}
                    value={doctorSlug}
                    onValueChange={(value) => {
                      setDoctorSlug(value);
                      setTime(null);
                      if (value && !department) setDepartment(getDoctor(value)?.department ?? null);
                    }}
                    placeholder={department ? 'Search a doctor…' : 'Any department first'}
                    disabled={!department}
                    clearable
                  />
                </Field>

                {doctor && (
                  <Alert tone="info" variant="soft" title={doctor.name}>
                    {doctor.bio} Speaks {doctor.languages.join(', ')}.
                  </Alert>
                )}
              </div>
            </Card>
          )}

          {/* ------------------------------------------------------- step 2 */}
          {step === 1 && (
            <Card variant="outline" padding="lg">
              <h2 className="doctor-name">When suits you?</h2>
              <Text tone="muted" size="sm" style={{ marginTop: 'var(--vk-space-2)' }}>
                Slots are 30 minutes. Anything already taken is struck through.
              </Text>

              <div style={{ marginTop: 'var(--vk-space-6)', maxWidth: '20rem' }}>
                <Field label="Appointment date" required help="We book up to eight weeks ahead.">
                  <DatePicker value={date} onValueChange={chooseDate} min={today} />
                </Field>
              </div>

              <div style={{ marginTop: 'var(--vk-space-7)' }}>
                {!date && (
                  <EmptyState
                    icon={<span aria-hidden="true">🗓️</span>}
                    title="Pick a date to see slots"
                    description="The grid fills in as soon as you choose a day."
                    size="sm"
                  />
                )}

                {loadingSlots && (
                  <div aria-live="polite" aria-busy="true">
                    <Text size="sm" tone="muted" className="visually-hidden">
                      Loading available slots
                    </Text>
                    <div className="slot-grid">
                      {Array.from({ length: 12 }, (_, i) => (
                        <Skeleton key={i} variant="rect" height={48} />
                      ))}
                    </div>
                  </div>
                )}

                {slots && !loadingSlots && (
                  <>
                    <div aria-live="polite">
                      {slotGroups.map((group) =>
                        group.items.length === 0 ? null : (
                          <div className="slot-group" key={group.period}>
                            <h4>{group.period}</h4>
                            <div className="slot-grid">
                              {group.items.map((slot) => (
                                <button
                                  key={slot.time}
                                  type="button"
                                  className="slot-chip"
                                  disabled={slot.booked}
                                  aria-pressed={time === slot.time}
                                  aria-label={
                                    slot.booked
                                      ? `${slot.time}, already booked`
                                      : `Book ${slot.time}`
                                  }
                                  onClick={() => setTime(slot.time)}
                                >
                                  {slot.time}
                                  <small>{slot.booked ? 'Booked' : 'Free'}</small>
                                </button>
                              ))}
                            </div>
                          </div>
                        ),
                      )}
                    </div>

                    {doctor && date && (
                      <details style={{ marginTop: 'var(--vk-space-7)' }}>
                        <summary
                          style={{ cursor: 'pointer', fontSize: 'var(--vk-text-sm)', color: 'var(--vk-color-muted)' }}
                        >
                          Why are some slots gone? See the day on a timeline
                        </summary>
                        <div className="scheduler-scroll" style={{ marginTop: 'var(--vk-space-4)' }}>
                          <Scheduler
                            label={`${doctor.name} — bookings on ${formatLongDate(date)}`}
                            resources={[
                              {
                                id: doctor.slug,
                                label: doctor.name,
                                sublabel: doctor.specialty,
                              },
                            ]}
                            events={slots
                              .filter((s) => s.booked)
                              .map((s) => ({
                                id: `${doctor.slug}-${s.time}`,
                                resourceId: doctor.slug,
                                title: 'Booked',
                                start: at(date, s.time),
                                end: new Date(at(date, s.time).getTime() + 30 * 60_000),
                                tone: 'danger' as const,
                              }))}
                            start={at(date, '08:00')}
                            end={at(date, '18:30')}
                            step={60}
                            minTickWidth={72}
                          />
                        </div>
                      </details>
                    )}
                  </>
                )}
              </div>
            </Card>
          )}

          {/* ------------------------------------------------------- step 3 */}
          {step === 2 && (
            <Card variant="outline" padding="lg">
              <h2 className="doctor-name">Who is the appointment for?</h2>
              <Text tone="muted" size="sm" style={{ marginTop: 'var(--vk-space-2)' }}>
                This is a demo template — nothing you type here is sent anywhere.
              </Text>

              <div style={{ marginTop: 'var(--vk-space-6)', display: 'grid', gap: 'var(--vk-space-5)' }}>
                <div className="field-row">
                  <Field label="Full name" required error={errors.name}>
                    <Input
                      value={patient.name}
                      onChange={(e) => setPatient({ ...patient, name: e.target.value })}
                      autoComplete="name"
                      placeholder="Priya Sharma"
                    />
                  </Field>
                  <Field label="Age band" required error={errors.ageBand}>
                    <Select
                      value={patient.ageBand}
                      onChange={(e) => setPatient({ ...patient, ageBand: e.target.value })}
                      options={AGE_BANDS}
                      placeholder="Select an age band"
                    />
                  </Field>
                </div>

                <div className="field-row">
                  <Field label="Phone" required error={errors.phone} help="For the OTP and the reminder.">
                    <Input
                      type="tel"
                      value={patient.phone}
                      onChange={(e) => setPatient({ ...patient, phone: e.target.value })}
                      autoComplete="tel"
                      placeholder="+91 98765 43210"
                    />
                  </Field>
                  <Field label="Email" required error={errors.email}>
                    <Input
                      type="email"
                      value={patient.email}
                      onChange={(e) => setPatient({ ...patient, email: e.target.value })}
                      autoComplete="email"
                      placeholder="you@example.com"
                    />
                  </Field>
                </div>

                <Field
                  label="What brings you in?"
                  help="A sentence is plenty. It helps the consultant prepare and lets us allow enough time."
                >
                  <Textarea
                    value={patient.symptoms}
                    onChange={(e) => setPatient({ ...patient, symptoms: e.target.value })}
                    rows={4}
                    placeholder="Intermittent chest tightness when climbing stairs, about three weeks."
                  />
                </Field>

                <div>
                  <Checkbox
                    checked={patient.consent}
                    onChange={(e) => setPatient({ ...patient, consent: e.target.checked })}
                    label="I consent to MediCare Plus storing these details for this appointment."
                    description="You can withdraw consent at any time by replying STOP to the confirmation SMS."
                    invalid={Boolean(errors.consent)}
                  />
                  {errors.consent && (
                    <Text size="sm" tone="danger" role="alert" style={{ marginTop: 'var(--vk-space-2)' }}>
                      {errors.consent}
                    </Text>
                  )}
                </div>
              </div>
            </Card>
          )}

          {/* ------------------------------------------------------- step 4 */}
          {step === 3 && (
            <Card variant="outline" padding="lg">
              <div className="otp-wrap">
                <h2 className="doctor-name">Confirm it is you</h2>
                <Text tone="muted" size="sm" style={{ maxWidth: '30rem' }}>
                  We have sent a six-digit code to{' '}
                  <strong>{patient.phone || 'your phone'}</strong>. In this demo any six digits are
                  accepted.
                </Text>

                <Field label="Verification code" error={otpError ?? undefined}>
                  <OTPInput
                    length={6}
                    value={otp}
                    onValueChange={(value) => {
                      setOtp(value);
                      if (otpError) setOtpError(null);
                    }}
                    onComplete={confirm}
                    size="lg"
                    autoFocus
                  />
                </Field>

                <Button size="lg" onClick={() => confirm(otp)}>
                  Confirm appointment
                </Button>
                <Text size="sm" tone="muted">
                  Did not get it? <button type="button" className="link-button" onClick={() => toast({ tone: 'info', title: 'Code resent', description: 'Any six digits will work.' })}>Resend the code</button>
                </Text>
              </div>
            </Card>
          )}

          {/* ------------------------------------------------------ step nav */}
          <div className="step-nav">
            <Button
              variant="ghost"
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              disabled={step === 0}
            >
              ← Back
            </Button>
            {step < STEPS.length - 1 && (
              <Button onClick={goNext} disabled={!canLeaveStep[step]}>
                {step === 2 ? 'Send verification code' : 'Continue'} →
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* --------------------------------------------------------- summary */}
      <aside className="book-summary" aria-label="Appointment summary">
        <Card variant="elevated" padding="lg">
          <Text size="sm" weight="semibold" style={{ textTransform: 'uppercase', letterSpacing: 'var(--vk-tracking-wide)' }}>
            Your appointment
          </Text>

          <dl style={{ marginTop: 'var(--vk-space-4)' }}>
            <div className="summary-row">
              <dt>Department</dt>
              <dd>{dept?.name ?? '—'}</dd>
            </div>
            <div className="summary-row">
              <dt>Doctor</dt>
              <dd>{doctor?.name ?? '—'}</dd>
            </div>
            <div className="summary-row">
              <dt>Date</dt>
              <dd>{date ? formatLongDate(date) : '—'}</dd>
            </div>
            <div className="summary-row">
              <dt>Time</dt>
              <dd>{time ?? '—'}</dd>
            </div>
            <div className="summary-row">
              <dt>Patient</dt>
              <dd>{patient.name || '—'}</dd>
            </div>
            {doctor && (
              <>
                <div className="summary-row">
                  <dt>Consultation</dt>
                  <dd>₹{doctor.consultationFee}</dd>
                </div>
                <div className="summary-row">
                  <dt>Booking fee</dt>
                  <dd>₹{BOOKING_FEE}</dd>
                </div>
              </>
            )}
          </dl>

          {doctor && (
            <div className="summary-total">
              <span>Payable at reception</span>
              <span>₹{total}</span>
            </div>
          )}

          <Text size="sm" tone="muted" style={{ marginTop: 'var(--vk-space-5)' }}>
            Free cancellation up to two hours before. Rescheduling is always free.
          </Text>

          {doctor && (
            <div style={{ marginTop: 'var(--vk-space-4)' }}>
              <Button asChild variant="ghost" size="sm">
                <Link href={`/doctors/${doctor.slug}`}>View {doctor.name}&apos;s profile →</Link>
              </Button>
            </div>
          )}
        </Card>
      </aside>
    </div>
  );
}

/* ------------------------------------------------------------ confirmation */

function Confirmation({
  bookingId,
  doctorName,
  departmentName,
  when,
  onReset,
  onAddToCalendar,
}: {
  bookingId: string;
  doctorName: string;
  departmentName: string;
  when: string;
  onReset: () => void;
  onAddToCalendar: () => void;
}) {
  return (
    <Card variant="elevated" padding="lg" style={{ maxWidth: '46rem', marginInline: 'auto' }}>
      <div style={{ textAlign: 'center' }}>
        <div className="success-mark" aria-hidden="true">
          ✓
        </div>
        <h2 className="doctor-name" style={{ marginTop: 'var(--vk-space-4)', fontSize: 'var(--vk-text-xl)' }}>
          You are booked in
        </h2>
        <Text tone="muted" style={{ marginTop: 'var(--vk-space-2)' }}>
          {doctorName} · {departmentName}
          <br />
          {when}
        </Text>
        <p className="confirm-id" style={{ marginTop: 'var(--vk-space-5)' }}>
          {bookingId}
        </p>
        <Text size="sm" tone="muted">
          Quote this booking ID at the front desk.
        </Text>
        <div className="badge-row" style={{ justifyContent: 'center', marginTop: 'var(--vk-space-4)' }}>
          <Badge tone="success" variant="soft" pill>
            Confirmation sent
          </Badge>
          <Badge tone="neutral" variant="outline" pill>
            Demo booking — nothing was really reserved
          </Badge>
        </div>
      </div>

      <h3 className="footer-heading" style={{ marginTop: 'var(--vk-space-10)' }}>
        What happens next
      </h3>
      <Timeline>
        {nextSteps.map((s, i) => (
          <Timeline.Item
            key={s.title}
            title={s.title}
            description={s.description}
            timestamp={s.timestamp}
            status={i === 0 ? 'complete' : 'pending'}
            headingLevel={4}
          />
        ))}
      </Timeline>

      <div className="cta-row" style={{ marginTop: 'var(--vk-space-8)', justifyContent: 'center' }}>
        <Button onClick={onAddToCalendar}>Add to calendar</Button>
        <Button variant="outline" onClick={onReset}>
          Book another appointment
        </Button>
      </div>
    </Card>
  );
}
