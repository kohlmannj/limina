import { reduceBreakpointValuesToCSS } from './reduceBreakpointValuesToCSS';
import { sortValuesByBreakpointWidth } from './sortValuesByBreakpointWidth';
import { BreakpointValue } from '../breakpointValue';
import {
  createLinearRegressionMediaQuery,
  MediaQueryDelimitedCSSPropertyValues,
} from './createLinearRegressionMediaQuery';

export const retargetCSSPropertyValue = <
  P extends string,
  V extends readonly BreakpointValue[],
  D extends string | undefined
>({
  dynamicUnit,
  precision,
  property,
  values,
}: {
  dynamicUnit: D;
  precision: number;
  property: P;
  values: V;
}): MediaQueryDelimitedCSSPropertyValues<P, D> => {
  const linearRegressionMediaQuery = createLinearRegressionMediaQuery({
    dynamicUnit,
    precision,
    property,
  });

  return [...values]
    .sort(sortValuesByBreakpointWidth)
    .reduce(
      reduceBreakpointValuesToCSS({ dynamicUnit, linearRegressionMediaQuery, precision, property }),
      {
        css: {},
      }
    ).css;
};
