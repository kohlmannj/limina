import merge from 'lodash.merge';
import { CSSPropertyValueTuple } from '.';
import { IBreakpointTuple } from './BreakpointTuple';
import { retargetCSSPropertyValue } from './utils/retargetCSSPropertyValue';

const liminaNeue = (styles: Record<string, IBreakpointTuple[]>) =>
  Object.entries(styles).reduce(
    (retargetedStyles, styleTuple: CSSPropertyValueTuple) =>
      merge(retargetedStyles, retargetCSSPropertyValue(styleTuple)),
    {}
  );

export default liminaNeue;
