import { createBreakpoint } from './Breakpoint';

export const createBreakpoints = (...widths: number[]) =>
  widths.map(width => createBreakpoint(width).createValue);
