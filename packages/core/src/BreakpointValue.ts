import units from 'units-css';
import { CSSValue } from '.';
import { Breakpoint, Breakpointable } from './Breakpoint';

export interface BreakpointValueOptions {
  breakpoint: Breakpointable;
  value: CSSValue;
}

export class BreakpointValue {
  public static isValid(breakpointValue: BreakpointValue) {
    return (
      typeof breakpointValue === 'object' &&
      breakpointValue !== null &&
      Breakpoint.isValid(breakpointValue.breakpoint) &&
      typeof breakpointValue.value === 'number' &&
      typeof breakpointValue.unit === 'string'
    );
  }

  public readonly breakpoint: Breakpointable;

  public readonly rawValue: CSSValue;

  public readonly unit: string;

  public readonly value: number;

  public constructor(options: BreakpointValueOptions) {
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

export const createBreakpointValue = (options: BreakpointValueOptions) =>
  new BreakpointValue(options);
