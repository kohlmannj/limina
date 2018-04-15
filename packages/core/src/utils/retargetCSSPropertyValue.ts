import { _Interpolation1 } from 'emotion';
import { CSSPropertyValueTuple } from '..';
import { IBreakpointTuple } from '../BreakpointTuple';
import createLinearRegressionMediaQuery from './createLinearRegressionMediaQuery';
import defaultOptions from './cssValueRetargetingDefaultOptions';
import { ICSSValueRetargetingOptions, IReduceToCSSOptions } from './index';
import { reduceBreakpointTuplesToCSS } from './reduceBreakpointTuplesToCSS';

export const retargetCSSPropertyValue = (tuple: CSSPropertyValueTuple) => {
  const [property, value] = tuple;
  const initialValue: IReduceToCSSOptions = { merge: [], css: {} };
  return value.reduce(reduceBreakpointTuplesToCSS({ property }), initialValue).css;
};

export default retargetCSSPropertyValue;
