export default function getMediaQueries(widths: Array<number | string>) {
  return widths.map(
    (width: number | string) =>
      `@media (min-width: ${typeof width === 'number' ? `${width}px` : width})`
  );
}
