import { createBreakpoint } from './Breakpoint';
import { CSSValue } from '.';

export const createBreakpoints = (...widths: CSSValue[]) =>
  widths.map(width => createBreakpoint(width).createValue);
