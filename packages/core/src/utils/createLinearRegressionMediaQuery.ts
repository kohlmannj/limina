import SLR from 'ml-regression-simple-linear';
import units from 'units-css';
import BreakpointTuple, { IBreakpointTuple } from '../BreakpointTuple';
import defaultOptions from './cssValueRetargetingDefaultOptions';
import { ICSSValueRetargetingOptions } from './index';

const createLinearRegressionMediaQuery = (options: ICSSValueRetargetingOptions) => (
  leftTuple: IBreakpointTuple,
  rightTuple: IBreakpointTuple
) => {
  const { dynamicUnit, property } = { ...defaultOptions, ...options };

  if (
    typeof leftTuple !== 'object' ||
    leftTuple === null ||
    typeof leftTuple.breakpoint !== 'object' ||
    leftTuple.breakpoint === null ||
    typeof leftTuple.breakpoint.props !== 'object' ||
    leftTuple.breakpoint.props === null ||
    typeof leftTuple.breakpoint.props.width !== 'number' ||
    typeof leftTuple.breakpoint.props.unit !== 'string' ||
    typeof rightTuple !== 'object' ||
    rightTuple === null ||
    typeof rightTuple.breakpoint !== 'object' ||
    rightTuple.breakpoint === null ||
    typeof rightTuple.breakpoint.props !== 'object' ||
    rightTuple.breakpoint.props === null ||
    typeof rightTuple.breakpoint.props.width !== 'number' ||
    typeof rightTuple.breakpoint.props.unit !== 'string'
  ) {
    throw new Error('Either leftTuple or rightTuple is invalid');
  }

  if (leftTuple.breakpoint.props.unit !== rightTuple.breakpoint.props.unit) {
    throw new Error(
      `leftTuple and rightTuple's breakpoints each use different CSS units
            (${leftTuple.breakpoint.props.unit} and ${rightTuple.breakpoint.props.unit})`
    );
  }

  if (leftTuple.unit !== rightTuple.unit) {
    throw new Error(
      `leftTuple and rightTuple's values each use different CSS units
            (${leftTuple.unit} and ${rightTuple.unit})`
    );
  }

  // const leftBreakpointIsSmaller =
  //   leftTuple.breakpoint.props.width < rightTuple.breakpoint.props.width;
  // const smallerTuple = leftBreakpointIsSmaller ? leftTuple : rightTuple;
  // const largerTuple = leftBreakpointIsSmaller ? rightTuple : leftTuple;

  const breakpointConditions = [
    `(min-width: ${leftTuple.breakpoint.props.width + 1}${leftTuple.breakpoint.props.unit})`,
    `(max-width: ${rightTuple.breakpoint.props.width - 1}${rightTuple.breakpoint.props.unit})`,
  ];

  const { coefficients } = new SLR(
    [leftTuple.breakpoint.props.width, rightTuple.breakpoint.props.width],
    [leftTuple.value, rightTuple.value]
  );

  // Note: we've previously determined that both tuples' values use the same units
  return {
    [`@media ${breakpointConditions.join(' and ')}`]: {
      [property]: `calc(${coefficients[1] * 100}${dynamicUnit} + ${coefficients[0]}${
        leftTuple.unit
      })`,
    },
  };
};

export default createLinearRegressionMediaQuery;
