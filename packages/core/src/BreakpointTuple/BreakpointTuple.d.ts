import { IBreakpoint } from '../Breakpoint/Breakpoint.d';
import { CSSValue } from '../index.d';

export interface IBreakpointTupleOptions {
  breakpoint: IBreakpoint;
  value: CSSValue;
}

export interface IBreakpointTuple {
  breakpoint: IBreakpoint;
  rawValue: CSSValue;
  unit: string;
  value: number;
}
