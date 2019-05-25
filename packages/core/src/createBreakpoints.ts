import { createBreakpoint, BreakpointOptions, InferredBreakpointFromOptions } from './breakpoint';
import {
  createBoundBreakpointValueConstructor,
  BoundBreakpointValueConstructor,
} from './breakpointValue';

export const createBreakpoints = <T extends readonly (BreakpointOptions)[]>(
  breakpointOptionsArray: T
) => {
  const mappedBreakpoints: unknown = Array.prototype.map.call(
    breakpointOptionsArray,
    (breakpointOptions: T[number]) => createBreakpoint(breakpointOptions)
  );

  return mappedBreakpoints as { [K in keyof T]: InferredBreakpointFromOptions<T[K]> };
};

const dingus = { width: '480px', unit: 'px', label: 'dingus' } as const;

const b = createBreakpoint(480);

const testBreakpointOptions = [320, '480px'] as const;

const [compactBreakpoint, desktopBreakpoint] = createBreakpoints(testBreakpointOptions);

export const createBreakpointValueConstructors = <T extends readonly BreakpointOptions[]>(
  breakpointOptionsArray: T
) => {
  const breakpointValueConstructors: unknown = Array.prototype.map.call(
    breakpointOptionsArray,
    (breakpointOptions: T[number]) =>
      createBoundBreakpointValueConstructor(createBreakpoint(breakpointOptions))
  );

  return breakpointValueConstructors as {
    [K in keyof T]: BoundBreakpointValueConstructor<InferredBreakpointFromOptions<T[K]>>
  };
};

const [compact, desktop] = createBreakpointValueConstructors(testBreakpointOptions);
