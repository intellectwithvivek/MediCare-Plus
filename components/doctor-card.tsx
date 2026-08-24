import Link from 'next/link';
import NextImage from 'next/image';
import { Badge, Button, Card, Rating, Text } from '@the_viveksingh/vivek-ui';
import type { Doctor } from '@/data/doctors';

/**
 * A doctor summary card. `sizes` is set from the real grid geometry rather
 * than left to default — without it every card downloads a viewport-wide image
 * on mobile, which is most of the page weight for nothing.
 */
export function DoctorCard({ doctor, priority = false }: { doctor: Doctor; priority?: boolean }) {
  return (
    <Card variant="outline" padding="none" className="doctor-card">
      <div className="doctor-photo">
        <NextImage
          src={doctor.photo}
          alt={`Portrait of ${doctor.name}, ${doctor.specialty} consultant`}
          fill
          sizes="(max-width: 40rem) 100vw, (max-width: 70rem) 50vw, 280px"
          priority={priority}
        />
      </div>

      <div className="doctor-body">
        <div>
          <h3 className="doctor-name">
            <Link href={`/doctors/${doctor.slug}`}>{doctor.name}</Link>
          </h3>
          <div className="badge-row" style={{ marginTop: 'var(--vk-space-2)' }}>
            <Badge variant="soft" tone="primary">
              {doctor.specialty}
            </Badge>
            <Badge variant="outline" tone="neutral">
              {doctor.experienceYears} yrs
            </Badge>
          </div>
        </div>

        <div className="meta-row">
          {/* No `formatLabel` here: it is a function, and functions cannot cross
              from a server component into a client one like Rating. */}
          <Rating
            value={doctor.rating}
            readOnly
            allowHalf
            size="sm"
            label={`Patient rating for ${doctor.name}`}
          />
          <span>({doctor.reviewCount} reviews)</span>
        </div>

        <Text size="sm" tone="muted" lineClamp={2}>
          {doctor.subspecialties.join(' · ')}
        </Text>

        <div className="meta-row">
          <span className="slot-chip-inline">Next: {doctor.nextAvailable}</span>
          <span>₹{doctor.consultationFee}</span>
        </div>

        <div className="doctor-actions">
          <Button asChild size="sm" fullWidth>
            <Link href={`/book?doctor=${doctor.slug}`}>Book</Link>
          </Button>
          <Button asChild size="sm" variant="outline" fullWidth>
            <Link href={`/doctors/${doctor.slug}`}>Profile</Link>
          </Button>
        </div>
      </div>
    </Card>
  );
}
