import units from 'units-css';
import * as defaults from './defaults';
import { getPreferredUnit } from './utils/getPreferredUnit';
import { CSSValue } from './types';

export type Modifier = 'min' | 'max';
export type Operator = 'and' | 'or';

export interface PartialBreakpoint<
  Width extends CSSValue = CSSValue,
  Unit extends string = string,
  Mod extends Modifier = Modifier,
  Op extends Operator = Operator,
  Label extends string | undefined = string | undefined
> {
  label?: Label;
  modifier?: Mod;
  operator?: Op;
  unit?: Unit;
  width: Width;
  // TODO: support arbitrary media query constraints???
  // [propName: string]: unknown;
}

export type BreakpointOptions<
  Width extends CSSValue = CSSValue,
  Unit extends string = string,
  Mod extends Modifier = Modifier,
  Op extends Operator = Operator,
  Label extends string | undefined = string | undefined
> = PartialBreakpoint<Width, Unit, Mod, Op, Label> | Width;

export interface Breakpoint<
  Width extends CSSValue = CSSValue,
  Unit extends string = string,
  Mod extends Modifier = Modifier,
  Op extends Operator = Operator,
  Label extends string | undefined = string | undefined
>
  extends Required<
      Pick<
        PartialBreakpoint<Width, Unit, Mod, Op, Label>,
        Exclude<keyof PartialBreakpoint<Width, Unit, Mod, Op, Label>, 'label' | 'width'>
      >
    >,
    Pick<PartialBreakpoint<Width, Unit, Mod, Op, Label>, 'label'> {
  rawWidth: Width;
  width: number;
}

/** @see https://github.com/microsoft/TypeScript/issues/12754#issuecomment-422049039 */
// @ts-ignore
export type BreakpointString<
  Width extends CSSValue = CSSValue,
  Unit extends string = string,
  Mod extends Modifier = Modifier,
  Op extends Operator = Operator,
  Label extends string | undefined = string | undefined
> = string;

export const createBreakpoint = <
  Width extends CSSValue,
  Unit extends string = Width extends number ? typeof defaults.unit : string,
  Mod extends Modifier = typeof defaults.modifier,
  Op extends Operator = typeof defaults.operator,
  Label extends string | undefined = undefined
>(
  options: PartialBreakpoint<Width, Unit, Mod, Op, Label> | Width,
  labelArg?: Label
): Breakpoint<Width, Unit, Mod, Op, Label> => {
  const {
    modifier,
    label,
    operator,
    unit,
    width: rawWidth,
  }: PartialBreakpoint<Width, Unit, Mod, Op, Label> =
    typeof options === 'object' && options !== null ? options : { width: options };

  const { value: width, unit: parsedUnit } = units.parse(rawWidth);

  return {
    modifier: (modifier || defaults.modifier) as Mod,
    label: labelArg || label,
    operator: (operator || defaults.operator) as Op,
    rawWidth,
    unit: getPreferredUnit(unit, parsedUnit, defaults.unit) as Unit,
    width,
  };
};

// const b = createBreakpoint('320px', 'dope');

// const c = createBreakpoint(320, 'fly');

// const d = createBreakpoint({ label: 'regular', width: 320 });

// const options: BreakpointOptions<CSSValue, string, Modifier, Operator, string | undefined>[] = [
//   320,
//   { label: 'regular', width: 320 },
// ];

// // createBreakpoint(options[1]);

// const breakpoints = options.map(o => createBreakpoint(o));

export const getBreakpointString = <
  Width extends CSSValue,
  Unit extends string,
  Mod extends Modifier,
  Op extends Operator,
  Label extends string | undefined
>(
  breakpoint: Breakpoint<Width, Unit, Mod, Op, Label>,
  debug = true
): BreakpointString<Width, Unit, Mod, Op, Label> => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { modifier, label, operator, rawWidth, unit, ...rest } = breakpoint;

  const mediaQueryConditions: string[] = Object.entries(rest).map(
    ([propName, propValue]: [string, unknown]): string =>
      `(${propName === 'width' ? `${modifier}-width` : propName}: ${
        typeof propValue === 'number' ? `${propValue}${unit}` : propValue
      })`
  );

  return `@media ${mediaQueryConditions.join(`${operator === 'or' ? ',' : ` ${operator}`} `)}${
    debug && label ? ` /* '${label}' breakpoint */` : ''
  }`;
};

// const e = getBreakpointString(d);
