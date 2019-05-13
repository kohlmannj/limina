import { isValidBreakpoint } from './isValidBreakpoint';
import { BreakpointValue } from './BreakpointValue';

export type PartiallyUnknownBreakpointValue = {
  [k in keyof Pick<BreakpointValue, 'breakpoint' | 'value' | 'unit'>]: unknown
};

export const isValidBreakpointValue = (breakpointValue: unknown): boolean =>
  typeof breakpointValue === 'object' &&
  breakpointValue !== null &&
  'breakpoint' in breakpointValue &&
  'value' in breakpointValue &&
  'unit' in breakpointValue &&
  isValidBreakpoint((breakpointValue as PartiallyUnknownBreakpointValue).breakpoint) &&
  typeof (breakpointValue as PartiallyUnknownBreakpointValue).value === 'number' &&
  typeof (breakpointValue as PartiallyUnknownBreakpointValue).unit === 'string';
