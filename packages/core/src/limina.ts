import merge from 'lodash.merge';
import { BreakpointValueProps } from './breakpointValue';
import { retargetCSSPropertyValue } from './utils/retargetCSSPropertyValue';
import { CSSPropertyValueTuple } from './types';

export const limina = (styles: Record<string, BreakpointValueProps[]>) =>
  Object.entries(styles).reduce(
    (retargetedStyles, styleTuple: CSSPropertyValueTuple) =>
      merge(retargetedStyles, retargetCSSPropertyValue(styleTuple)),
    {}
  );
