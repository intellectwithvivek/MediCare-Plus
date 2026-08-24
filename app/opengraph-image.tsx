import { ImageResponse } from 'next/og';
import { SITE } from '@/lib/site';

export const alt =
  'MediCare Plus — a free, open-source Next.js hospital website template with online appointment booking';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

/**
 * The social card, generated rather than hand-exported so it can never drift
 * out of sync with the brand colours or the copy.
 *
 * The mark is drawn with plain divs instead of the SVG used elsewhere: Satori
 * (what `next/og` renders with) supports a deliberately small subset of SVG,
 * and two rotated rectangles are the same cross with none of that risk.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px 80px',
          background: 'linear-gradient(135deg, #0b62d6 0%, #06316d 100%)',
          color: '#ffffff',
          fontFamily: 'sans-serif',
        }}
      >
        {/* ------------------------------------------------------- brand row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <div
            style={{
              width: 92,
              height: 92,
              borderRadius: 22,
              background: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* The cross: a horizontal bar with a vertical bar laid over it. */}
            <div
              style={{
                position: 'relative',
                width: 56,
                height: 56,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  width: 56,
                  height: 19,
                  borderRadius: 4,
                  background: '#0b62d6',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  width: 19,
                  height: 56,
                  borderRadius: 4,
                  background: '#0b62d6',
                }}
              />
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: 40, fontWeight: 700, letterSpacing: -1 }}>MediCare Plus</div>
            <div style={{ fontSize: 24, color: '#b9d5ff' }}>Multi-specialty clinic · Bengaluru</div>
          </div>
        </div>

        {/* ---------------------------------------------------------- headline */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{ fontSize: 68, fontWeight: 700, letterSpacing: -2, lineHeight: 1.1 }}>
            Free Next.js hospital template
          </div>
          <div style={{ fontSize: 32, color: '#cfe2ff', lineHeight: 1.4 }}>
            Four-step booking · 8 specialties · SVG charts · open source
          </div>
        </div>

        {/* ------------------------------------------------------------ footer */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: 26,
            color: '#b9d5ff',
          }}
        >
          <div style={{ display: 'flex' }}>{SITE.url.replace('https://', '')}</div>
          <div
            style={{
              display: 'flex',
              padding: '10px 22px',
              borderRadius: 999,
              border: '2px solid #4d9dff',
              color: '#ffffff',
            }}
          >
            Built with VivekUI
          </div>
        </div>
      </div>
    ),
    size,
  );
}
