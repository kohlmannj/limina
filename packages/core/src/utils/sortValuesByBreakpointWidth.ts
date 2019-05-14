import { BreakpointValueProps } from '../breakpointValue';

export const sortValuesByBreakpointWidth = (l: BreakpointValueProps, r: BreakpointValueProps) => {
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
