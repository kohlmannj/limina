import { Interpolation } from 'emotion';
import { ICSSValueRetargetingOptions, IReduceToCSSOptions } from '..';
import { IBreakpointTuple } from '../BreakpointTuple';
import createLinearRegressionMediaQuery from './createLinearRegressionMediaQuery';
import defaultOptions from './cssValueRetargetingDefaultOptions';

const reduceBreakpointTuplesToCSS = (options: ICSSValueRetargetingOptions) => (
  { prevTuple, css }: IReduceToCSSOptions,
  tuple: IBreakpointTuple
) => {
  const { property, dynamicUnit } = { ...defaultOptions, ...options };
  const { breakpoint, value } = tuple;

  let tupleBreakpointString = breakpoint.toString();
  // TODO: replace this postfix with something more architecturally sound
  if (!prevTuple) {
    tupleBreakpointString = tupleBreakpointString.replace('min-width', 'max-width');
  }

  const nextCSS: Interpolation = [
    css,
    {
      ...(typeof prevTuple === 'object' && prevTuple !== null
        ? createLinearRegressionMediaQuery({ property, dynamicUnit })(prevTuple, tuple)
        : undefined),
      [tupleBreakpointString]: {
        [property]: `${(value / breakpoint.props.width) * 100}${dynamicUnit}`,
      },
    },
  ];

  return { prevTuple: tuple, css: nextCSS };
};

export default reduceBreakpointTuplesToCSS;
