import units from 'units-css';
import { CSSValue } from '.';
import { Breakpoint } from './Breakpoint';

export interface BreakpointValueOptions {
  breakpoint: Breakpoint;
  value: CSSValue;
}

export class BreakpointValue {
  public static readonly defaultUnit = 'px';

  public readonly breakpoint: Breakpoint;

  public readonly rawValue: CSSValue;

  public readonly unit: string;

  public readonly value: number;

  public constructor({ breakpoint, value: rawValue }: BreakpointValueOptions) {
    this.breakpoint = breakpoint;
    this.rawValue = rawValue;
    const { unit, value } = units.parse(rawValue);
    this.unit = unit === '' ? BreakpointValue.defaultUnit : unit;
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
