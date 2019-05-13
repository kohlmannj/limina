import units from 'units-css';
import { CSSValue } from '.';
import { Breakpoint, Breakpointable } from './Breakpoint';

export interface BreakpointTupleOptions {
  breakpoint: Breakpointable;
  value: CSSValue;
}

export interface BreakpointTupleable {
  breakpoint: Breakpointable;
  rawValue: CSSValue;
  unit: string;
  value: number;
}

export class BreakpointTuple implements BreakpointTupleable {
  public static isValid(breakpointTuple: BreakpointTupleable) {
    return (
      typeof breakpointTuple === 'object' &&
      breakpointTuple !== null &&
      Breakpoint.isValid(breakpointTuple.breakpoint) &&
      typeof breakpointTuple.value === 'number' &&
      typeof breakpointTuple.unit === 'string'
    );
  }

  public readonly breakpoint: Breakpointable;

  public readonly rawValue: CSSValue;

  public readonly unit: string;

  public readonly value: number;

  public constructor(options: BreakpointTupleOptions) {
    const { breakpoint, value: rawValue } = options;

    if (!Breakpoint.isValid(breakpoint)) {
      throw new Error('`breakpoint` must be a valid Breakpoint class instance');
    }

    if (typeof rawValue !== 'string' && typeof rawValue !== 'number') {
      throw new Error('`value` must be a number or string');
    }

    this.breakpoint = breakpoint;
    this.rawValue = rawValue;
    const { unit, value } = units.parse(rawValue);
    // TODO: generalize the default unit setting
    this.unit = unit === '' ? 'px' : unit;
    this.value = value;
  }

  public toString() {
    return `${this.breakpoint.toString()} { --${
      this.breakpoint.props.name ? `${this.breakpoint.props.name}-` : ''
    }value: ${this.value}${this.unit}; }`;
  }
}

export const createBreakpointTuple = (options: BreakpointTupleOptions) =>
  new BreakpointTuple(options);
