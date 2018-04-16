import { IBreakpointTuple } from '../BreakpointTuple';

const sortValuesByBreakpointWidth = (l: IBreakpointTuple, r: IBreakpointTuple) => {
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

export default sortValuesByBreakpointWidth;
