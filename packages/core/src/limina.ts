import merge from 'lodash.merge';
import { retargetCSSPropertyValue } from './utils/retargetCSSPropertyValue';
import { DeeplyMergedMediaQueryDelimitedCSSPropertyValues } from './utils/createLinearRegressionMediaQuery';
import { BreakpointValue } from './breakpointValue';

export interface LiminaOptions {
  dynamicUnit?: string;
  precision?: number;
}

export const limina = <
  T extends { readonly [K in keyof import('csstype').PropertiesFallback<number | string>]: V },
  V extends readonly BreakpointValue[]
>(
  styles: T,
  { dynamicUnit = 'vw', precision = 5 }: LiminaOptions = {}
): DeeplyMergedMediaQueryDelimitedCSSPropertyValues<Extract<keyof T, string>, typeof dynamicUnit> =>
  Object.entries(styles).reduce(
    (retargetedStyles, [property, values]) =>
      values
        ? merge(
            retargetedStyles,
            retargetCSSPropertyValue({ dynamicUnit, precision, property, values })
          )
        : retargetedStyles,
    {}
  );
