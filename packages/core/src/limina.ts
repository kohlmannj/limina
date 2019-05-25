import merge from 'lodash.merge';
import { retargetCSSPropertyValue } from './utils/retargetCSSPropertyValue';
import { DeeplyMergedMediaQueryDelimitedCSSPropertyValues } from './utils/createLinearRegressionMediaQuery';
import { BreakpointValue } from './breakpointValue';

export const limina = <
  T extends { readonly [K in keyof import('csstype').PropertiesFallback<number | string>]: V },
  V extends readonly BreakpointValue[]
>(
  styles: T
): DeeplyMergedMediaQueryDelimitedCSSPropertyValues<Extract<keyof T, string>, 'vw'> =>
  Object.entries(styles).reduce(
    (retargetedStyles, [property, values]) =>
      values
        ? merge(retargetedStyles, retargetCSSPropertyValue({ property, values, dynamicUnit: 'vw' }))
        : retargetedStyles,
    {}
  );
