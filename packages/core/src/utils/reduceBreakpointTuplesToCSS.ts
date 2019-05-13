import { Interpolation } from '@emotion/core';
import { CSSValueRetargetingOptions, ReduceToCSSOptions } from '..';
import { BreakpointTupleable } from '../BreakpointTuple';
import { createLinearRegressionMediaQuery } from './createLinearRegressionMediaQuery';
import { cssValueRetargetingDefaultOptions as defaultOptions } from './cssValueRetargetingDefaultOptions';

export const reduceBreakpointTuplesToCSS = (options: CSSValueRetargetingOptions) => (
  { prevTuple, css }: ReduceToCSSOptions,
  tuple: BreakpointTupleable
) => {
  const { property, dynamicUnit } = { ...defaultOptions, ...options };
  const { breakpoint, value } = tuple;

  let tupleBreakpointString = breakpoint.toString();
  // TODO: replace this postfix with something more architecturally sound
  if (!prevTuple) {
    tupleBreakpointString = tupleBreakpointString.replace('min-width', 'max-width');
  }

  const nextCSS: Interpolation = {
    ...css,
    ...(typeof prevTuple === 'object' && prevTuple !== null
      ? createLinearRegressionMediaQuery({ property, dynamicUnit })(prevTuple, tuple)
      : undefined),
    [tupleBreakpointString]: {
      [property]: `${(value / breakpoint.props.width) * 100}${dynamicUnit}`,
    },
  };

  return { prevTuple: tuple, css: nextCSS };
};
