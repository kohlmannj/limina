import merge from 'lodash.merge';
import { CSSPropertyValueTuple } from '.';
import { BreakpointTupleable } from './BreakpointTuple';
import { retargetCSSPropertyValue } from './utils/retargetCSSPropertyValue';

export const limina = (styles: Record<string, BreakpointTupleable[]>) =>
  Object.entries(styles).reduce(
    (retargetedStyles, styleTuple: CSSPropertyValueTuple) =>
      merge(retargetedStyles, retargetCSSPropertyValue(styleTuple)),
    {}
  );
