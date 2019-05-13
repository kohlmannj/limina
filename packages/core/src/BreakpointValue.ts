import units from 'units-css';
import { CSSValue } from '.';
import { Breakpoint } from './Breakpoint';

export interface BreakpointValueOptions {
  breakpoint: Breakpoint;
  value: CSSValue;
}

export class BreakpointValue {
  public readonly breakpoint: Breakpoint;

  public readonly rawValue: CSSValue;

  public readonly unit: string;

  public readonly value: number;

  public constructor(options: BreakpointValueOptions) {
    const { breakpoint, value: rawValue } = options;

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
