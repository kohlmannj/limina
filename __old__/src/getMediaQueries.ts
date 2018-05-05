// import { LiminaFactory } from '.';

export const mapMediaQuery = (type = 'min-width', unit = 'px') => (width: number) =>
  // Disallow string-type `width` values that appear to already be media queries
  // if (typeof width === 'string' /* && width.trim().indexOf('@media') === 0 */) {
  //   throw new Error(`\`${width}\` is a string`); // already a media query`);
  // }

  `@media (${type}: ${width}${unit})`;

const getMediaQueries: LiminaFactory = (widths, mediaQueryMode, cssUnit) =>
  widths.map(mapMediaQuery(mediaQueryMode, cssUnit));

export default getMediaQueries;
