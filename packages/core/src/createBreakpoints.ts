import { createBreakpoint, BreakpointOptions, InferredBreakpointFromOptions } from './breakpoint';
import { createBoundBreakpointValueConstructor, CallableBreakpoint } from './breakpointValue';

export const createBreakpointObjects = <T extends readonly (BreakpointOptions)[]>(
  breakpointOptionsArray: T
) => {
  const mappedBreakpoints: unknown = Array.prototype.map.call(
    breakpointOptionsArray,
    (breakpointOptions: T[number]) => createBreakpoint(breakpointOptions)
  );

  return mappedBreakpoints as { [K in keyof T]: InferredBreakpointFromOptions<T[K]> };
};

export const createBreakpoints = <T extends readonly BreakpointOptions[]>(
  breakpointOptionsArray: T
) => {
  const breakpointValueConstructors: unknown = Array.prototype.map.call(
    breakpointOptionsArray,
    (breakpointOptions: T[number]) =>
      createBoundBreakpointValueConstructor(createBreakpoint(breakpointOptions))
  );

  return breakpointValueConstructors as {
    [K in keyof T]: CallableBreakpoint<InferredBreakpointFromOptions<T[K]>>
  };
};
