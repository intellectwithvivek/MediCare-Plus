import Link from 'next/link';
import { Button, EmptyState, Section } from '@the_viveksingh/vivek-ui';

export default function NotFound() {
  return (
    <Section padding="xl" aria-label="Page not found">
      <EmptyState
        size="lg"
        icon={<span aria-hidden="true">🩺</span>}
        title="We could not find that page"
        description="The link may be out of date. The reception desk — and the booking flow — are both one click away."
        headingLevel={1}
        actions={
          <>
            <Button asChild>
              <Link href="/">Back to the homepage</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/book">Book an appointment</Link>
            </Button>
          </>
        }
      />
    </Section>
  );
}
