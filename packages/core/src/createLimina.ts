import { BreakpointOptions, Breakpoint, createBreakpoint } from './breakpoint';
import {
  CallableBreakpoint,
  createBoundBreakpointValueConstructor,
  BreakpointValue,
} from './breakpointValue';
import { CSSValue } from './types';
import { limina, LiminaOptions } from './limina';

export const createLimina = <T extends readonly BreakpointOptions[]>(
  breakpointOptionsArray: T,
  options?: LiminaOptions
) => {
  // const breakpoints = createBreakpoints(breakpointOptionsArray);
  // const breakpointSymbols = breakpoints.map(b => b.symbol);
  const breakpointsMap: Map<string, CallableBreakpoint<Breakpoint>> = new Map();

  breakpointOptionsArray.forEach(breakpointOptions => {
    const callableBreakpoint = createBoundBreakpointValueConstructor(
      createBreakpoint(breakpointOptions)
    );
    // @ts-ignore
    breakpointsMap.set(callableBreakpoint.toString(), callableBreakpoint);
  });

  const customLimina = (
    mediaQueryDelimitedStyles: Record<
      string,
      { readonly [K in keyof import('csstype').PropertiesFallback<number | string>]: CSSValue }
    >
  ) => {
    const cssPropertyDelimitedStyles: Record<
      keyof typeof mediaQueryDelimitedStyles,
      BreakpointValue[]
    > = {};

    // eslint-disable-next-line no-restricted-syntax
    for (const [mediaQuery, cssObject] of Object.entries(mediaQueryDelimitedStyles)) {
      const breakpoint = breakpointsMap.get(mediaQuery);
      if (!breakpoint) throw new Error(`Unknown breakpoint '${mediaQuery}'`);

      // eslint-disable-next-line no-restricted-syntax
      for (const [cssProperty, cssValue] of Object.entries(cssObject)) {
        if (typeof cssValue === 'string' || typeof cssValue === 'number') {
          if (!(cssProperty in cssPropertyDelimitedStyles)) {
            cssPropertyDelimitedStyles[cssProperty] = [];
          }

          cssPropertyDelimitedStyles[cssProperty].push(breakpoint(cssValue));
        }
      }
    }

    return limina(cssPropertyDelimitedStyles, options);
  };

  return { limina: customLimina, breakpoints: Array.from(breakpointsMap.keys()) };
};
