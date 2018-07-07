import { Interpolation } from 'emotion';
import { ICSSPropertyValueTuple, IReduceToCSSOptions } from '..';
import reduceBreakpointTuplesToCSS from './reduceBreakpointTuplesToCSS';
import sortValuesByBreakpointWidth from './sortValuesByBreakpointWidth';

export const retargetCSSPropertyValue = (tuple: ICSSPropertyValueTuple): Interpolation => {
  const [property, value] = tuple;
  const initialValue: IReduceToCSSOptions = { css: {} };

  return value
    .sort(sortValuesByBreakpointWidth)
    .reduce(reduceBreakpointTuplesToCSS({ property }), initialValue).css;
};

export default retargetCSSPropertyValue;
