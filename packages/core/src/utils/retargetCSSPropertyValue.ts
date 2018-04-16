import { _Interpolation1 } from 'emotion';
import { CSSPropertyValueTuple } from '..';
import { IBreakpointTuple } from '../BreakpointTuple';
import createLinearRegressionMediaQuery from './createLinearRegressionMediaQuery';
import defaultOptions from './cssValueRetargetingDefaultOptions';
import { ICSSValueRetargetingOptions, IReduceToCSSOptions } from './index';
import { reduceBreakpointTuplesToCSS } from './reduceBreakpointTuplesToCSS';
import sortValuesByBreakpointWidth from './sortValuesByBreakpointWidth';

export const retargetCSSPropertyValue = (tuple: CSSPropertyValueTuple) => {
  const [property, value] = tuple;
  const initialValue: IReduceToCSSOptions = { css: {} };

  return value
    .sort(sortValuesByBreakpointWidth)
    .reduce(reduceBreakpointTuplesToCSS({ property }), initialValue).css;
};

export default retargetCSSPropertyValue;
