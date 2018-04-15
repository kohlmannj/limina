import { _Interpolation1 } from 'emotion';
import { IBreakpointTuple } from '../BreakpointTuple';
import createLinearRegressionMediaQuery from './createLinearRegressionMediaQuery';
import defaultOptions from './cssValueRetargetingDefaultOptions';
import { ICSSValueRetargetingOptions, IReduceToCSSOptions } from './index';

export const reduceBreakpointTuplesToCSS = (options: ICSSValueRetargetingOptions) => (
  { merge, css }: IReduceToCSSOptions,
  tuple: IBreakpointTuple
) => {
  const { property, dynamicUnit } = { ...defaultOptions, ...options };
  const { breakpoint, value } = tuple;

  const nextMerge = [];

  const nextCSS: _Interpolation1 = {
    ...css,
    [breakpoint.toString()]: {
      [property]: `${value / breakpoint.props.width * 100}${dynamicUnit}`,
    },
    ...(merge.length === 2
      ? createLinearRegressionMediaQuery({ property, dynamicUnit })(merge[0], merge[1])
      : undefined),
  };

  if (merge.length < 2) {
    nextMerge.push(tuple);
  }

  const nextReduceValue: IReduceToCSSOptions = { merge: nextMerge, css: nextCSS };

  return nextReduceValue;
};
