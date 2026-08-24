/**
 * Twitter reuses the Open Graph card verbatim, so this re-exports it rather
 * than keeping a second copy of the layout that would drift.
 *
 * `twitter:image` is only emitted when a `twitter-image` file exists — most
 * crawlers fall back to `og:image`, but being explicit costs one file.
 */
export { default, alt, size, contentType } from './opengraph-image';
