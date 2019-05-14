import SLR from 'ml-regression-simple-linear';
import { BreakpointValueProps } from '../breakpointValue';
import { cssValueRetargetingDefaultOptions as defaultOptions } from './cssValueRetargetingDefaultOptions';
import { CSSValueRetargetingOptions } from '../types';

export const createLinearRegressionMediaQuery = (options: CSSValueRetargetingOptions) => (
  leftValue: BreakpointValueProps,
  rightValue: BreakpointValueProps
) => {
  const { dynamicUnit, property } = { ...defaultOptions, ...options };

  if (leftValue.breakpoint.unit !== rightValue.breakpoint.unit) {
    throw new Error(
      `leftValue and rightValue's breakpoints each use different CSS units
            (${leftValue.breakpoint.unit} and ${rightValue.breakpoint.unit})`
    );
  }

  if (leftValue.unit !== rightValue.unit) {
    throw new Error(
      `leftValue and rightValue's values each use different CSS units
            (${leftValue.unit} and ${rightValue.unit})`
    );
  }

  // const leftBreakpointIsSmaller =
  //   leftValue.breakpoint.width < rightValue.breakpoint.width;
  // const smallerValue = leftBreakpointIsSmaller ? leftValue : rightValue;
  // const largerValue = leftBreakpointIsSmaller ? rightValue : leftValue;

  const breakpointConditions = [
    `(min-width: ${leftValue.breakpoint.width + 1}${leftValue.breakpoint.unit})`,
    `(max-width: ${rightValue.breakpoint.width - 1}${rightValue.breakpoint.unit})`,
  ];

  const { coefficients } = new SLR(
    [leftValue.breakpoint.width, rightValue.breakpoint.width],
    [leftValue.value, rightValue.value]
  );

  // Note: we've previously determined that both values use the same units
  return {
    [`@media ${breakpointConditions.join(' and ')}`]: {
      [property]: `calc(${coefficients[1] * 100}${dynamicUnit} + ${coefficients[0]}${
        leftValue.unit
      })`,
    },
  };
};
