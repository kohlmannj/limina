import { createBreakpoint, BreakpointOptions } from './breakpoint';
import { createBoundBreakpointValue, BoundBreakpointValueConstructor } from './breakpointValue';

export function createBreakpoints(...breakpointOptionsArray: BreakpointOptions[]) {
  return breakpointOptionsArray.map(createBreakpoint);
}

export function createBreakpointValueConstructors(
  ...breakpointOptionsArray: BreakpointOptions[]
): BoundBreakpointValueConstructor[] {
  return createBreakpoints(...breakpointOptionsArray).map(createBoundBreakpointValue);
}
