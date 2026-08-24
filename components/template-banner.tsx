import { Code, CopyButton } from '@the_viveksingh/vivek-ui';
import { SITE } from '@/lib/site';

/**
 * The outermost strip on every page: this is a template, here is how to clone
 * it, here is who made it.
 *
 * Deliberately dark and outside the clinic's own palette, so it reads as
 * chrome *around* the demo rather than as part of the clinic site. Sitting
 * above the emergency alert keeps that separation unambiguous — a visitor
 * never has to wonder whether the "open source" line is something the hospital
 * is saying.
 *
 * Everything is sized to sit on one line at the 1180px container: the strip
 * looks deliberate at one row and cheap at two, so the copy is short and the
 * clone chip drops out on narrow viewports rather than being allowed to wrap.
 */
export function TemplateBanner() {
  return (
    <div className="template-banner">
      <div className="template-banner-inner">
        <p className="template-banner-copy">
          <span className="template-banner-tag">Open source</span>
          <span className="template-banner-text">
            Free Next.js hospital template by{' '}
            <a href={SITE.authorUrl} target="_blank" rel="noopener noreferrer">
              {SITE.author}
            </a>
          </span>
        </p>

        <div className="template-banner-actions">
          <div className="template-banner-clone">
            <Code>{SITE.cloneCommand}</Code>
            <CopyButton
              value={SITE.cloneCommand}
              size="sm"
              variant="ghost"
              label="Copy"
              copiedLabel="Copied"
              aria-label="Copy the git clone command"
            />
          </div>
          <a
            className="template-banner-link"
            href={SITE.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span aria-hidden="true">★</span> Star
          </a>
        </div>
      </div>
    </div>
  );
}
