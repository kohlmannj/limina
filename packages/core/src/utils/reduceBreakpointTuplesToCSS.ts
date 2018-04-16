import { _Interpolation1 } from 'emotion';
import { IBreakpointTuple } from '../BreakpointTuple/BreakpointTuple.d';
import createLinearRegressionMediaQuery from './createLinearRegressionMediaQuery';
import defaultOptions from './cssValueRetargetingDefaultOptions';
import { ICSSValueRetargetingOptions, IReduceToCSSOptions } from './index';

export const reduceBreakpointTuplesToCSS = (options: ICSSValueRetargetingOptions) => (
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

  const nextCSS: _Interpolation1 = {
    ...css,
    ...(typeof prevTuple === 'object' && prevTuple !== null
      ? createLinearRegressionMediaQuery({ property, dynamicUnit })(prevTuple, tuple)
      : undefined),
    [tupleBreakpointString]: {
      [property]: `${value / breakpoint.props.width * 100}${dynamicUnit}`,
    },
  };

  return { prevTuple: tuple, css: nextCSS };
};
