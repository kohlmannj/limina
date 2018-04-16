import merge from 'lodash.merge';
import { IBreakpointTuple } from './BreakpointTuple/BreakpointTuple.d';
import { CSSPropertyValueTuple } from './index.d';
import { retargetCSSPropertyValue } from './utils/retargetCSSPropertyValue';

const liminaNeue = (styles: Record<string, IBreakpointTuple[]>) =>
  Object.entries(styles).reduce(
    (retargetedStyles, styleTuple: CSSPropertyValueTuple) =>
      merge(retargetedStyles, retargetCSSPropertyValue(styleTuple)),
    {}
  );

export default liminaNeue;
