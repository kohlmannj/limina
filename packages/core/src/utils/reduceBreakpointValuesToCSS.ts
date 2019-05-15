import { getBreakpointString } from '../breakpoint';
import { BreakpointValue } from '../breakpointValue';
import { CSSValueRetargetingOptions, ReduceToCSSOptions } from '../types';
import {
  MediaQueryDelimitedCSSPropertyValues,
  LinearRegressionMediaQuerySolver,
} from './createLinearRegressionMediaQuery';

export interface ReduceBreakpointValuesToCSSOptions<P extends string, D extends string | undefined>
  extends CSSValueRetargetingOptions<P, D> {
  linearRegressionMediaQuery: LinearRegressionMediaQuerySolver<P, D>;
}

export type BreakpointValuesReducer<P extends string, D extends string | undefined> = (
  options: ReduceToCSSOptions<P, D>,
  breakpointValue: BreakpointValue
) => Required<ReduceToCSSOptions<P, D>>;

export const reduceBreakpointValuesToCSS = <P extends string, D extends string | undefined>({
  property,
  dynamicUnit,
  linearRegressionMediaQuery,
}: ReduceBreakpointValuesToCSSOptions<P, D>): BreakpointValuesReducer<P, D> => (
  { prevValue, css },
  breakpointValue
): ReturnType<BreakpointValuesReducer<P, D>> => {
  const { breakpoint, value } = breakpointValue;
  let breakpointValueString = getBreakpointString(breakpoint);

  // TODO: replace this postfix with something more architecturally sound
  if (!prevValue) {
    breakpointValueString = breakpointValueString.replace('min-width', 'max-width');
  }

  const nextCSS: MediaQueryDelimitedCSSPropertyValues<P, D> = {
    ...css,
    ...(typeof prevValue !== 'undefined'
      ? linearRegressionMediaQuery(prevValue, breakpointValue)
      : {}),
    [breakpointValueString]: {
      [property]: `${(value / breakpoint.width) * 100}${dynamicUnit}`,
    },
  };

  return { prevValue: breakpointValue, css: nextCSS };
};
