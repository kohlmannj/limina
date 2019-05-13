import merge from 'lodash.merge';
import { CSSPropertyValueTuple } from '.';
import { BreakpointValue } from './BreakpointValue';
import { retargetCSSPropertyValue } from './utils/retargetCSSPropertyValue';

export const limina = (styles: Record<string, BreakpointValue[]>) =>
  Object.entries(styles).reduce(
    (retargetedStyles, styleTuple: CSSPropertyValueTuple) =>
      merge(retargetedStyles, retargetCSSPropertyValue(styleTuple)),
    {}
  );
