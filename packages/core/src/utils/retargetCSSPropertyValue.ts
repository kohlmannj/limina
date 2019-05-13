import { Interpolation } from '@emotion/core';
import { CSSPropertyValueTuple, ReduceToCSSOptions } from '..';
import { reduceBreakpointValuesToCSS } from './reduceBreakpointValuesToCSS';
import { sortValuesByBreakpointWidth } from './sortValuesByBreakpointWidth';

export const retargetCSSPropertyValue = (tuple: CSSPropertyValueTuple): Interpolation => {
  const [property, value] = tuple;
  const initialValue: ReduceToCSSOptions = { css: {} };

  return value
    .sort(sortValuesByBreakpointWidth)
    .reduce(reduceBreakpointValuesToCSS({ property }), initialValue).css;
};
