import { BreakpointValue } from '../BreakpointValue';

export const sortValuesByBreakpointWidth = (l: BreakpointValue, r: BreakpointValue) => {
  const leftWidth = l.breakpoint.props.width;
  const rightWidth = r.breakpoint.props.width;

  if (leftWidth < rightWidth) {
    return -1;
  }
  if (leftWidth > rightWidth) {
    return 1;
  }
  return 0;
};
