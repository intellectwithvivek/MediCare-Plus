import { Card, Section, Text } from '@the_viveksingh/vivek-ui';
import { BarChart, PieChart, ProgressRing } from '@the_viveksingh/vivek-ui/charts';
import {
  appointmentsByDepartment,
  appointmentsPerMonth,
  onTimeRate,
  satisfactionRate,
} from '@/data/charts';

/**
 * All three charts render on the server. The VivekUI chart package draws plain
 * SVG and only hands a small serialisable model to its hover layer, so nothing
 * here forces a client bundle — and `formatValue`, being consumed during the
 * server render, is safe to pass as a function.
 */
export function CareInNumbers() {
  return (
    <Section padding="xl" background="muted" aria-label="Care in numbers">
      <Section.Header
        eyebrow="Care in numbers"
        title="What a year at the clinic actually looks like"
        description="Operational figures from the last twelve months. Illustrative data — this is a template, not a real provider."
      />

      <div className="chart-grid" style={{ marginTop: 'var(--vk-space-10)' }}>
        <Card variant="outline" padding="lg" className="chart-card">
          <div className="chart-scroll">
            <BarChart
              title="Appointments completed per month"
              description="September 2025 to August 2026, all departments combined."
              data={appointmentsPerMonth}
              height={280}
              xLabel="Month"
              yLabel="Appointments"
              barRadius={5}
              showGrid
              showValues={false}
              formatValue={(value) => value.toLocaleString('en-IN')}
              accessibleTable
            />
          </div>
          <p className="chart-caption">
            Volume climbs every summer — June to August is when Bengaluru books its deferred
            check-ups, and we roster extra evening clinics to absorb it.
          </p>
        </Card>

        <Card variant="outline" padding="lg" className="chart-card">
          <PieChart
            title="Appointments by department"
            description="Share of all appointments across the six busiest departments."
            data={appointmentsByDepartment}
            donut
            diameter={240}
            centerLabel="96%"
            centerSublabel="of all visits"
            showLegend
            formatValue={(value) => `${value}%`}
            accessibleTable
          />
          <p className="chart-caption">
            General Medicine takes the largest share because it is the front door: roughly one in
            four of those visits is referred onward the same day.
          </p>
        </Card>
      </div>

      <Card
        variant="outline"
        padding="lg"
        className="chart-card"
        style={{ marginTop: 'var(--vk-space-6)' }}
      >
        <div className="ring-pair">
          <div className="ring-cell">
            <ProgressRing
              value={satisfactionRate}
              diameter={148}
              thickness={12}
              title="Patient satisfaction"
              description="Share of post-visit surveys rating the visit good or excellent."
              label="Patient satisfaction"
              showValue
            />
            <h3>{satisfactionRate}% patient satisfaction</h3>
            <p className="chart-caption">
              From 11,400 post-visit surveys. We publish the complaints too, in the annual report.
            </p>
          </div>

          <div className="ring-cell">
            <ProgressRing
              value={onTimeRate}
              diameter={148}
              thickness={12}
              title="On-time consultations"
              description="Share of consultations that started within ten minutes of the booked time."
              label="On-time consultations"
              showValue
            />
            <h3>{onTimeRate}% on-time consultations</h3>
            <p className="chart-caption">
              Measured as starting within ten minutes of the booked slot. The missing 4% is mostly
              emergencies pulling a consultant away.
            </p>
          </div>
        </div>
        <Text size="sm" tone="muted" align="center">
          Two ProgressRings, one BarChart and one PieChart — all four ship inside the same
          zero-dependency package as the rest of this page.
        </Text>
      </Card>
    </Section>
  );
}
