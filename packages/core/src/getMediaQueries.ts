export enum MediaQueryType {
  MIN_WIDTH = 'min-width',
  MAX_WIDTH = 'max-width',
}

export const getMediaQueryType = (type = 'min-width') => (width: number) => {
  // Disallow string-type `width` values that appear to already be media queries
  // if (typeof width === 'string' /* && width.trim().indexOf('@media') === 0 */) {
  //   throw new Error(`\`${width}\` is a string`); // already a media query`);
  // }

  return `@media (${type}: ${typeof width === 'number' ? `${width}px` : width})`;
};

export default function getMediaQueries(widths: number[], type?: MediaQueryType) {
  return widths.map(getMediaQueryType(type));
}
