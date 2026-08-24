/**
 * The brand mark, inline.
 *
 * Same geometry as app/icon.svg and the generated PNG set, so the tab icon,
 * the header and the footer are visibly one mark rather than three near-misses.
 * Inlined rather than loaded from /icon.svg because it sits above the fold in
 * the header — a separate request for a 600-byte asset costs more than it saves.
 *
 * The gradient id is passed in: two inline SVGs on the same page (header and
 * footer) would otherwise both define `#medicare-mark`, and every browser
 * resolves a duplicate id to the *first* one in the document.
 */
export function Logo({
  size = 30,
  gradientId = 'medicare-mark',
  className,
}: {
  size?: number;
  gradientId?: string;
  className?: string;
}) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 512 512"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#2e8af0" />
          <stop offset="1" stopColor="#084a9f" />
        </linearGradient>
      </defs>
      <rect width="512" height="512" rx="114" fill={`url(#${gradientId})`} />
      <path
        fill="#fff"
        d="M201 96h110a15 15 0 0 1 15 15v75h75a15 15 0 0 1 15 15v110a15 15 0 0 1-15 15h-75v75a15 15 0 0 1-15 15H201a15 15 0 0 1-15-15v-75h-75a15 15 0 0 1-15-15V201a15 15 0 0 1 15-15h75v-75a15 15 0 0 1 15-15Z"
      />
    </svg>
  );
}
