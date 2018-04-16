import units from 'units-css';
import createBreakpointTuple from '../BreakpointTuple';
import { IBreakpointTuple } from '../BreakpointTuple/BreakpointTuple.d';
import { CSSValue } from '../index.d';
import {
  BreakpointOptions,
  IBreakpoint,
  IBreakpointDefaultProps,
  IBreakpointOptions,
  IBreakpointProps,
} from './Breakpoint.d';

export const modifiers = ['min', 'max'];
export const operators = ['and', 'or'];

export class Breakpoint implements IBreakpoint {
  public static readonly defaultProps: IBreakpointDefaultProps = {
    modifier: 'min',
    operator: 'and',
    unit: 'px',
  };

  public static isValid(breakpoint: IBreakpoint) {
    return (
      typeof breakpoint === 'object' &&
      breakpoint !== null &&
      typeof breakpoint.props === 'object' &&
      breakpoint.props !== null &&
      typeof breakpoint.props.width === 'number' &&
      typeof breakpoint.props.unit === 'string'
    );
  }

  public props: IBreakpointProps;

  constructor(protected options: BreakpointOptions) {
    const props: IBreakpointOptions =
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

    this.props = { ...Breakpoint.defaultProps, ...rest, rawWidth, unit, width };
  }

  public createTuple = (value: CSSValue): IBreakpointTuple =>
    createBreakpointTuple({ breakpoint: this, value });

  public toString() {
    const { modifier, name, operator, rawWidth, unit, ...rest } = this.props;
    const mediaQueryConditions = Object.entries(rest).map(
      ([propName, propValue]) =>
        `(${propName === 'width' ? `${modifier}-width` : propName}: ${rest[propName]}${unit})`
    );

    return `@media ${mediaQueryConditions.join(`${operator === 'or' ? ',' : ` ${operator}`} `)}`;
  }
}

export const createBreakpoint = (props: BreakpointOptions) => new Breakpoint(props);

export default createBreakpoint;
