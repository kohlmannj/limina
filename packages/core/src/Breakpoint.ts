import units from 'units-css';
import { CSSValue } from '.';
import { createBreakpointValue, BreakpointValue } from './BreakpointValue';

export type Modifier = 'min' | 'max';
export type Operator = 'and' | 'or';

export interface BreakpointDefaultProps {
  readonly modifier: Modifier;
  readonly operator: Operator;
  readonly unit: string;
}

export interface BreakpointOptionsObject {
  readonly modifier?: Modifier;
  readonly name?: string;
  readonly operator?: Operator;
  readonly unit?: string;
  readonly width: CSSValue;
}

export type BreakpointOptions = BreakpointOptionsObject | CSSValue;

export interface BreakpointProps {
  readonly modifier: Modifier;
  readonly name?: string;
  readonly operator: Operator;
  readonly rawWidth: CSSValue;
  readonly unit: string;
  readonly width: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  readonly [propName: string]: any;
}

export interface Breakpointable {
  props: BreakpointProps;
  createValue: (value: CSSValue) => BreakpointValue;
  toString: () => string;
}

export const modifiers = ['min', 'max'];
export const operators = ['and', 'or'];

export class Breakpoint implements Breakpointable {
  public static readonly defaultProps: BreakpointDefaultProps = {
    modifier: 'min',
    operator: 'and',
    unit: 'px',
  };

  public static isValid(breakpoint: Breakpointable) {
    return (
      typeof breakpoint === 'object' &&
      breakpoint !== null &&
      typeof breakpoint.props === 'object' &&
      breakpoint.props !== null &&
      typeof breakpoint.props.width === 'number' &&
      typeof breakpoint.props.unit === 'string'
    );
  }

  public props: BreakpointProps;

  public constructor(options: BreakpointOptions) {
    const props: BreakpointOptionsObject =
      typeof options === 'string' || typeof options === 'number' ? { width: options } : options;

    const { width: rawWidth, ...rest } = props;
    const { value: width, unit } = units.parse(rawWidth);

    if (props.modifier && modifiers.indexOf(props.modifier) < 0) {
      throw new Error('`modifier` prop is invalid');
    }

    if (typeof props.name !== 'undefined' && typeof props.name !== 'string') {
      throw new Error('`name` prop is invalid');
    }

    if (props.operator && operators.indexOf(props.operator) < 0) {
      throw new Error('`operator` prop is invalid');
    }

    if (props.unit && typeof props.unit !== 'string') {
      throw new Error('`unit` prop is invalid');
    }

    this.props = {
      ...Breakpoint.defaultProps,
      ...rest,
      rawWidth,
      unit: unit === '' ? 'px' : unit, // TODO: generalize the default unit setting
      width,
    };
  }

  public createValue = (value: CSSValue): BreakpointValue =>
    createBreakpointValue({ breakpoint: this, value });

  public toString() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { modifier, name, operator, rawWidth, unit, ...rest } = this.props;
    const mediaQueryConditions = Object.entries(rest).map(
      ([propName /* , propValue */]) =>
        `(${propName === 'width' ? `${modifier}-width` : propName}: ${rest[propName]}${unit})`
    );

    return `@media ${mediaQueryConditions.join(`${operator === 'or' ? ',' : ` ${operator}`} `)}`;
  }
}

export const createBreakpoint = (props: BreakpointOptions) => new Breakpoint(props);
