import units, { ParsedCSSValue } from 'units-css';
import { IBreakpointTuple, IBreakpointTupleOptions } from '.';
import { CSSValue } from '..';
import { Breakpoint, IBreakpoint } from '../Breakpoint';

export class BreakpointTuple implements IBreakpointTuple {
  public static isValid(breakpointTuple: IBreakpointTuple) {
    return (
      typeof breakpointTuple === 'object' &&
      breakpointTuple !== null &&
      Breakpoint.isValid(breakpointTuple.breakpoint) &&
      typeof breakpointTuple.value === 'number' &&
      typeof breakpointTuple.unit === 'string'
    );
  }

  public readonly breakpoint: IBreakpoint;
  public readonly rawValue: CSSValue;
  public readonly unit: string;
  public readonly value: number;

  constructor(protected options: IBreakpointTupleOptions) {
    const { breakpoint, value: rawValue } = options;

    if (!Breakpoint.isValid(breakpoint)) {
      throw new Error('`breakpoint` must be a valid Breakpoint class instance');
    }

    if (typeof rawValue !== 'string' || rawValue !== 'number') {
      throw new Error('`value` must be a number or string');
    }

    this.breakpoint = breakpoint;
    this.rawValue = rawValue;
    const { unit, value } = units.parse(rawValue);
    this.unit = unit;
    this.value = value;
  }

  public toString() {
    return `${this.breakpoint.toString()} { --${
      this.breakpoint.props.name ? `${this.breakpoint.props.name}-` : ''
    }value: ${this.value}${this.unit}; }`;
  }
}

const createBreakpointTuple = (options: IBreakpointTupleOptions) => new BreakpointTuple(options);

export default createBreakpointTuple;
