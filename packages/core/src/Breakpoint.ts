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
  // TODO: support arbitrary media query constraints???
  // readonly [propName: string]: unknown;
}

export type BreakpointOptions = BreakpointOptionsObject | CSSValue;

export interface BreakpointProps
  extends Required<
      Pick<BreakpointOptionsObject, Exclude<keyof BreakpointOptionsObject, 'name' | 'width'>>
    >,
    Pick<BreakpointOptionsObject, 'name'> {
  readonly rawWidth: BreakpointOptionsObject['width'];
  readonly width: number;
}

// export const modifiers = ['min', 'max'];
// export const operators = ['and', 'or'];

export class Breakpoint {
  public static readonly defaultProps: BreakpointDefaultProps = {
    modifier: 'min',
    operator: 'and',
    unit: 'px',
  };

  public readonly props: BreakpointProps;

  public constructor(options: BreakpointOptions) {
    const { width: rawWidth, ...rest }: BreakpointOptionsObject =
      typeof options === 'string' || typeof options === 'number' ? { width: options } : options;

    const { value: width, unit } = units.parse(rawWidth);

    this.props = {
      ...Breakpoint.defaultProps,
      ...rest,
      rawWidth,
      unit: unit === '' ? Breakpoint.defaultProps.unit : unit,
      width,
    };
  }

  public createValue = (value: CSSValue): BreakpointValue =>
    createBreakpointValue({ breakpoint: this, value });

  public toString() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { modifier, name, operator, rawWidth, unit, ...rest } = this.props;
    const mediaQueryConditions: string[] = Object.entries(rest).map(
      ([propName, propValue]: [string, unknown]) =>
        `(${propName === 'width' ? `${modifier}-width` : propName}: ${
          typeof propValue === 'number' ? `${propValue}${unit}` : propValue
        })`
    );

    return `@media ${mediaQueryConditions.join(`${operator === 'or' ? ',' : ` ${operator}`} `)}`;
  }
}

export const createBreakpoint = (props: BreakpointOptions) => new Breakpoint(props);
