import { LiminaFunc } from './types';

export const mapMediaQuery = (type = 'min-width', unit = 'px') => (width: number) => {
  // Disallow string-type `width` values that appear to already be media queries
  // if (typeof width === 'string' /* && width.trim().indexOf('@media') === 0 */) {
  //   throw new Error(`\`${width}\` is a string`); // already a media query`);
  // }

  return `@media (${type}: ${width}${unit})`;
};

const getMediaQueries: LiminaFunc = (widths, mediaQueryMode, cssUnit) =>
  widths.map(mapMediaQuery(mediaQueryMode, cssUnit));

export default getMediaQueries;
