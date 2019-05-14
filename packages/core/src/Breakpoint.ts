import units from 'units-css';
import * as defaults from './defaults';
import { getPreferredUnit } from './utils/getPreferredUnit';
import { CSSValue } from './types';

export type Modifier = 'min' | 'max';
export type Operator = 'and' | 'or';

export interface BreakpointOptionsObject {
  modifier?: Modifier;
  name?: string;
  operator?: Operator;
  unit?: string;
  width: CSSValue;
  // TODO: support arbitrary media query constraints???
  // [propName: string]: unknown;
}

export type BreakpointDefaultProps = Required<
  Pick<BreakpointOptionsObject, 'modifier' | 'operator' | 'unit'>
>;

export type BreakpointOptions = BreakpointOptionsObject | CSSValue;

export interface BreakpointProps
  extends Required<
      Pick<BreakpointOptionsObject, Exclude<keyof BreakpointOptionsObject, 'name' | 'width'>>
    >,
    Pick<BreakpointOptionsObject, 'name'> {
  rawWidth: BreakpointOptionsObject['width'];
  width: number;
}

export function createBreakpoint(options: BreakpointOptions): BreakpointProps {
  const { width: rawWidth, unit, ...rest }: BreakpointOptionsObject =
    typeof options === 'string' || typeof options === 'number' ? { width: options } : options;

  const { value: width, unit: parsedUnit } = units.parse(rawWidth);

  return {
    ...defaults,
    rawWidth,
    unit: getPreferredUnit(unit, parsedUnit, defaults.unit),
    width,
    ...rest,
  };
}

export function getBreakpointString(breakpoint: BreakpointProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { modifier, name, operator, rawWidth, unit, ...rest } = breakpoint;

  const mediaQueryConditions: string[] = Object.entries(rest).map(
    ([propName, propValue]: [string, unknown]) =>
      `(${propName === 'width' ? `${modifier}-width` : propName}: ${
        typeof propValue === 'number' ? `${propValue}${unit}` : propValue
      })`
  );

  return `@media ${mediaQueryConditions.join(`${operator === 'or' ? ',' : ` ${operator}`} `)}`;
}
