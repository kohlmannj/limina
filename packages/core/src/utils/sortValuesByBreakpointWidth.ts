import { BreakpointValue } from '../breakpointValue';

export const sortValuesByBreakpointWidth = (l: BreakpointValue, r: BreakpointValue) => {
  const leftWidth = l.breakpoint.width;
  const rightWidth = r.breakpoint.width;

  if (leftWidth < rightWidth) {
    return -1;
  }
  if (leftWidth > rightWidth) {
    return 1;
  }
  return 0;
};
