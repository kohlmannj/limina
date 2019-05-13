import { BreakpointTupleable } from '../BreakpointTuple';

export const sortValuesByBreakpointWidth = (l: BreakpointTupleable, r: BreakpointTupleable) => {
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
