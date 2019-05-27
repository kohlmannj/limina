import parseMedia, { MediaQueryListNode } from 'postcss-media-query-parser';

export type CSSProperties<TLength = string | 0> = import('csstype').PropertiesFallback<TLength>;

export type CSSPropertiesWithMultiValues<TLength = string | 0> = {
  [K in keyof CSSProperties<TLength>]:
    | CSSProperties<TLength>[K]
    | Extract<CSSProperties<TLength>[K], string>[]
};

export type MappedCSSPropertiesWithMultiValues<TLength = string | 0> = Record<
  string,
  CSSPropertiesWithMultiValues<TLength>
>;

export type CSSPropertyWithMultiValues<
  T,
  TLength = string | 0
> = T extends keyof CSSPropertiesWithMultiValues<TLength>
  ? CSSPropertiesWithMultiValues<TLength>[T]
  : never;

export type InferredCSSAndMappedCSSProperties<
  T extends object,
  TLength = string | 0,
  V = CSSPropertiesWithMultiValues<TLength>
> = { [K in keyof T]: K extends keyof V ? V[K] : V };

/** @see https://stackoverflow.com/a/22338512/1991086 */
export const mediaQueryRegex = /\s*@media\s+/;

export const parseStyles = <T extends object, TLength = string | 0>(
  styles: InferredCSSAndMappedCSSProperties<T, TLength>,
  mediaQueries: Map<string, MediaQueryListNode>,
  stylesByMediaQueryString: Map<string, CSSPropertiesWithMultiValues<TLength>>,
  rootStyles: CSSPropertiesWithMultiValues<TLength>,
  parentMediaQuery?: string
): void => {
  Object.entries(styles).forEach(([property, value]) => {
    if (property.match(mediaQueryRegex)) {
      // Throw an error if we encounter nested media queries (we don't support them)
      if (parentMediaQuery) {
        throw new Error(
          `Encountered invalid nested media query '${parentMediaQuery}' → '${property}'`
        );
      }

      const hasMediaQuery = mediaQueries.has(property);

      const parsedMediaQueryList = hasMediaQuery
        ? mediaQueries.get(property)
        : parseMedia(property);

      if (!parsedMediaQueryList) {
        throw new Error(`Could not parse media query '${property}'`);
      }

      if (!hasMediaQuery) {
        mediaQueries.set(property, parsedMediaQueryList);
      }

      if (typeof value === 'object' && value !== null) {
        const mediaQueryStyles: CSSPropertiesWithMultiValues<TLength> = {};

        parseStyles(value, mediaQueries, stylesByMediaQueryString, mediaQueryStyles, property);

        // TODO: see if it's safe and/or optimal to key on the media query string rather than the parsed media query
        stylesByMediaQueryString.set(property, {
          ...stylesByMediaQueryString.get(property),
          ...mediaQueryStyles,
        });
      }
    } else {
      // TODO: see if inference and/or generics allow us to get the exact property name
      // eslint-disable-next-line no-param-reassign
      rootStyles[
        property as keyof CSSPropertiesWithMultiValues<TLength>
      ] = value as CSSPropertiesWithMultiValues<TLength>[keyof CSSPropertiesWithMultiValues<
        TLength
      >];
    }
  });
};

export const defaultMediaQuery = '@media (min-width: 0)';

export interface NewLiminaReturnType<TLength = string | number> {
  mediaQueries: Map<string, MediaQueryListNode>;
  stylesByMediaQueryString: Map<string, CSSPropertiesWithMultiValues<TLength>>;
}

export type BreakpointDelimitedCSSProperties<TLength = string | 0> = Record<
  string,
  CSSProperties<TLength>
>;

function newLimina<T extends object, TLength = string | number>(
  styles: InferredCSSAndMappedCSSProperties<T, TLength>
): NewLiminaReturnType<TLength> {
  const mediaQueries = new Map<string, MediaQueryListNode>([
    [defaultMediaQuery, parseMedia(defaultMediaQuery)],
  ]);
  const stylesByMediaQueryString = new Map<string, CSSPropertiesWithMultiValues<TLength>>();
  const rootStyles: CSSPropertiesWithMultiValues<TLength> = {};

  parseStyles(styles, mediaQueries, stylesByMediaQueryString, rootStyles);

  // Map `rootStyles` to media query `defaultMediaQuery`
  stylesByMediaQueryString.set(defaultMediaQuery, {
    ...stylesByMediaQueryString.get(defaultMediaQuery),
    ...rootStyles,
  });

  return { mediaQueries, stylesByMediaQueryString };
}

export { newLimina };
