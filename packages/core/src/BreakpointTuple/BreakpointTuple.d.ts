import { CSSValue } from '..';
import { IBreakpoint } from '../Breakpoint';

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
