import { Card, Grid, Section, Skeleton } from '@the_viveksingh/vivek-ui';

/**
 * Route-level fallback. It mirrors the real card geometry — photo block, two
 * text lines, a button row — so the page does not visibly reflow when the
 * content arrives.
 */
export default function LoadingDoctors() {
  return (
    <Section padding="lg" aria-busy="true" aria-label="Loading consultants">
      <Skeleton variant="text" width="18rem" height={40} />
      <Skeleton variant="text" lines={2} style={{ marginTop: 'var(--vk-space-4)', maxWidth: '40rem' }} />

      <Grid cols={{ base: 1, sm: 2, lg: 3 }} gap={6} style={{ marginTop: 'var(--vk-space-10)' }}>
        {Array.from({ length: 6 }, (_, i) => (
          <Card key={i} variant="outline" padding="none">
            <Skeleton variant="rect" height={200} style={{ borderRadius: 0 }} />
            <div style={{ padding: 'var(--vk-space-5)', display: 'grid', gap: 'var(--vk-space-3)' }}>
              <Skeleton variant="text" width="70%" height={22} />
              <Skeleton variant="text" lines={2} />
              <Skeleton variant="rect" height={36} />
            </div>
          </Card>
        ))}
      </Grid>
    </Section>
  );
}
