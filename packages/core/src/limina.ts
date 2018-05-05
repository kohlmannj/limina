import merge from 'lodash.merge';
import { ICSSPropertyValueTuple } from '.';
import { IBreakpointTuple } from './BreakpointTuple';
import { retargetCSSPropertyValue } from './utils/retargetCSSPropertyValue';

const liminaNeue = (styles: Record<string, IBreakpointTuple[]>) =>
  Object.entries(styles).reduce(
    (retargetedStyles, styleTuple: ICSSPropertyValueTuple) =>
      merge(retargetedStyles, retargetCSSPropertyValue(styleTuple)),
    {}
  );

export default liminaNeue;
