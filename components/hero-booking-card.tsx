'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Card, Combobox, Field, Text } from '@the_viveksingh/vivek-ui';
import { departmentOptions } from '@/data/departments';

/**
 * The hero's entry point into the booking flow. Picking a department here is
 * optional — the button works either way and simply lands one step further in
 * when a department is already chosen.
 */
export function HeroBookingCard() {
  const router = useRouter();
  const [department, setDepartment] = useState<string | null>(null);

  function start() {
    router.push(department ? `/book?department=${department}` : '/book');
  }

  return (
    <Card variant="elevated" padding="lg" className="booking-card">
      <Card.Header>
        <Text size="lg" weight="semibold">
          Book in under a minute
        </Text>
        <Text size="sm" tone="muted" style={{ marginTop: 'var(--vk-space-1)' }}>
          No account, no callback, no hold music.
        </Text>
      </Card.Header>

      <Card.Body style={{ marginTop: 'var(--vk-space-5)' }}>
        <Field
          label="What do you need help with?"
          help="Not sure? Pick General Medicine — they will point you the right way."
        >
          <Combobox
            options={departmentOptions}
            value={department}
            onValueChange={setDepartment}
            placeholder="Search a department…"
            clearable
          />
        </Field>
      </Card.Body>

      <Card.Footer style={{ marginTop: 'var(--vk-space-5)' }}>
        <Button size="lg" fullWidth onClick={start}>
          Find a slot
        </Button>
        <Text size="sm" tone="muted" className="booking-card-foot" align="center" style={{ marginTop: 'var(--vk-space-3)' }}>
          Average wait for a first appointment: <strong>2.1 days</strong>
        </Text>
      </Card.Footer>
    </Card>
  );
}
