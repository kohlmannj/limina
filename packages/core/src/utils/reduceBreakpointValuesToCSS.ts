import { CSSValueRetargetingOptions, ReduceToCSSOptions } from '..';
import { BreakpointValue } from '../BreakpointValue';
import { createLinearRegressionMediaQuery } from './createLinearRegressionMediaQuery';
import { cssValueRetargetingDefaultOptions as defaultOptions } from './cssValueRetargetingDefaultOptions';

export const reduceBreakpointValuesToCSS = (options: CSSValueRetargetingOptions) => (
  { prevValue, css }: ReduceToCSSOptions,
  breakpointValue: BreakpointValue
) => {
  const { property, dynamicUnit } = { ...defaultOptions, ...options };
  const { breakpoint, value } = breakpointValue;

  let breakpointValueString = breakpoint.toString();
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
      [property]: `${(value / breakpoint.props.width) * 100}${dynamicUnit}`,
    },
  };

  return { prevValue: breakpointValue, css: nextCSS };
};
