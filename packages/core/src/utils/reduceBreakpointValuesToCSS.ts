import { getBreakpointString } from '../breakpoint';
import { BreakpointValueProps } from '../breakpointValue';
import { createLinearRegressionMediaQuery } from './createLinearRegressionMediaQuery';
import { cssValueRetargetingDefaultOptions } from './cssValueRetargetingDefaultOptions';
import { CSSValueRetargetingOptions, ReduceToCSSOptions } from '../types';

export const reduceBreakpointValuesToCSS = (options: CSSValueRetargetingOptions) => (
  { prevValue, css }: ReduceToCSSOptions,
  breakpointValue: BreakpointValueProps
) => {
  const { property, dynamicUnit } = { ...cssValueRetargetingDefaultOptions, ...options };
  const { breakpoint, value } = breakpointValue;

  let breakpointValueString = getBreakpointString(breakpoint);
  // TODO: replace this postfix with something more architecturally sound
  if (!prevValue) {
    breakpointValueString = breakpointValueString.replace('min-width', 'max-width');
  }

  const nextCSS: import('@emotion/core').Interpolation = {
    ...css,
    ...(typeof prevValue === 'object' && prevValue !== null
      ? createLinearRegressionMediaQuery({ property, dynamicUnit })(prevValue, breakpointValue)
      : undefined),
    [breakpointValueString]: {
      [property]: `${(value / breakpoint.width) * 100}${dynamicUnit}`,
    },
  };

  return { prevValue: breakpointValue, css: nextCSS };
};
