import merge from 'lodash.merge';
import { retargetCSSPropertyValue } from './utils/retargetCSSPropertyValue';
import {
  CSSProperty,
  DeeplyMergedMediaQueryDelimitedCSSPropertyValues,
} from './utils/createLinearRegressionMediaQuery';
import { BreakpointValue } from './breakpointValue';

export const liminaReducer = <
  T extends { [K in CSSProperty]: V },
  V extends BreakpointValue[] | readonly BreakpointValue[]
>(
  retargetedStyles: DeeplyMergedMediaQueryDelimitedCSSPropertyValues<
    Extract<keyof T, string>,
    'vw'
  >,
  [property, values]: [Extract<keyof T, string>, V | undefined]
): DeeplyMergedMediaQueryDelimitedCSSPropertyValues<Extract<keyof T, string>, 'vw'> =>
  values
    ? // Spread `values` because we need to pass `retargetCSSPropertyValue()` a mutable Array
      merge(
        retargetedStyles,
        retargetCSSPropertyValue({ property, values: [...values], dynamicUnit: 'vw' })
      )
    : retargetedStyles;

export const limina = <
  T extends { [K in keyof import('csstype').PropertiesFallback<number | string>]: V },
  V extends BreakpointValue[] | readonly BreakpointValue[]
>(
  styles: T
): DeeplyMergedMediaQueryDelimitedCSSPropertyValues<Extract<keyof T, string>, 'vw'> =>
  Object.entries(styles).reduce(
    (
      retargetedStyles: DeeplyMergedMediaQueryDelimitedCSSPropertyValues<
        Extract<keyof T, string>,
        'vw'
      >,
      [property, values]: [Extract<keyof T, string>, V | undefined]
    ): DeeplyMergedMediaQueryDelimitedCSSPropertyValues<Extract<keyof T, string>, 'vw'> =>
      values
        ? // Spread `values` because we need to pass `retargetCSSPropertyValue()` a mutable Array
          merge(
            retargetedStyles,
            retargetCSSPropertyValue({ property, values: [...values], dynamicUnit: 'vw' })
          )
        : retargetedStyles,
    {}
  );
