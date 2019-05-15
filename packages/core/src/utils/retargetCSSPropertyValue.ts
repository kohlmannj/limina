import { reduceBreakpointValuesToCSS } from './reduceBreakpointValuesToCSS';
import { sortValuesByBreakpointWidth } from './sortValuesByBreakpointWidth';
import { BreakpointValue } from '../breakpointValue';
import {
  createLinearRegressionMediaQuery,
  MediaQueryDelimitedCSSPropertyValues,
} from './createLinearRegressionMediaQuery';

export const retargetCSSPropertyValue = <
  P extends string,
  V extends BreakpointValue[],
  D extends string | undefined
>({
  property,
  values,
  dynamicUnit,
}: {
  property: P;
  values: V;
  dynamicUnit: D;
}): MediaQueryDelimitedCSSPropertyValues<P, D> => {
  const linearRegressionMediaQuery = createLinearRegressionMediaQuery({ property, dynamicUnit });

  return values
    .sort(sortValuesByBreakpointWidth)
    .reduce(reduceBreakpointValuesToCSS({ property, dynamicUnit, linearRegressionMediaQuery }), {
      css: {},
    }).css;
};
