import SLR from 'ml-regression-simple-linear';
import { CSSValueRetargetingOptions } from '..';
import { BreakpointValue } from '../BreakpointValue';
import { cssValueRetargetingDefaultOptions as defaultOptions } from './cssValueRetargetingDefaultOptions';

export const createLinearRegressionMediaQuery = (options: CSSValueRetargetingOptions) => (
  leftValue: BreakpointValue,
  rightValue: BreakpointValue
) => {
  const { dynamicUnit, property } = { ...defaultOptions, ...options };

  if (leftValue.breakpoint.props.unit !== rightValue.breakpoint.props.unit) {
    throw new Error(
      `leftValue and rightValue's breakpoints each use different CSS units
            (${leftValue.breakpoint.props.unit} and ${rightValue.breakpoint.props.unit})`
    );
  }

  if (leftValue.unit !== rightValue.unit) {
    throw new Error(
      `leftValue and rightValue's values each use different CSS units
            (${leftValue.unit} and ${rightValue.unit})`
    );
  }

  // const leftBreakpointIsSmaller =
  //   leftValue.breakpoint.props.width < rightValue.breakpoint.props.width;
  // const smallerValue = leftBreakpointIsSmaller ? leftValue : rightValue;
  // const largerValue = leftBreakpointIsSmaller ? rightValue : leftValue;

  const breakpointConditions = [
    `(min-width: ${leftValue.breakpoint.props.width + 1}${leftValue.breakpoint.props.unit})`,
    `(max-width: ${rightValue.breakpoint.props.width - 1}${rightValue.breakpoint.props.unit})`,
  ];

  const { coefficients } = new SLR(
    [leftValue.breakpoint.props.width, rightValue.breakpoint.props.width],
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
