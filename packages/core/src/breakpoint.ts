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

export type InferWidth<T> = T extends PartialBreakpoint
  ? T['width']
  : T extends CSSValue
  ? T
  : never;

export type InferUnit<T> = T extends PartialBreakpoint
  ? (T extends { unit: string }
      ? T['unit']
      : T extends { width: number }
      ? typeof defaults.unit
      : string)
  : T extends CSSValue
  ? typeof defaults.unit
  : never;

export type InferModifier<T> = T extends PartialBreakpoint
  ? (T extends { modifier: Modifier } ? T['modifier'] : typeof defaults.modifier)
  : T extends CSSValue
  ? typeof defaults.modifier
  : never;

export type InferOperator<T> = T extends PartialBreakpoint
  ? (T extends { operator: Operator } ? T['operator'] : typeof defaults.operator)
  : T extends CSSValue
  ? typeof defaults.operator
  : never;

export type InferLabel<T, V = undefined> = V extends string
  ? V
  : T extends PartialBreakpoint
  ? (T extends { label: string } ? T['label'] : undefined)
  : T extends CSSValue
  ? undefined
  : never;

export type InferredBreakpointFromPartial<T, V = undefined> = Breakpoint<
  InferWidth<T>,
  InferUnit<T>,
  InferModifier<T>,
  InferOperator<T>,
  V extends string ? V : InferLabel<T>
>;

export type InferredPartialBreakpointFromPartial<
  T extends PartialBreakpoint,
  V = undefined
> = PartialBreakpoint<
  InferWidth<T>,
  InferUnit<T>,
  InferModifier<T>,
  InferOperator<T>,
  V extends string ? V : InferLabel<T>
>;

export type InferredBreakpointFromOptions<T, V = undefined> = Breakpoint<
  InferWidth<T>,
  InferUnit<T>,
  InferModifier<T>,
  InferOperator<T>,
  V extends string ? V : InferLabel<T>
>;

export type InferredPartialBreakpointFromOptions<T> = PartialBreakpoint<
  InferWidth<T>,
  InferUnit<T>,
  InferModifier<T>,
  InferOperator<T>,
  InferLabel<T>
>;

export const createBreakpoint = <
  T extends string | number | object,
  V extends string | undefined = undefined
>(
  options: T,
  labelArg?: V
): InferredBreakpointFromOptions<T, V> => {
  let optionsObj: InferredPartialBreakpointFromOptions<T>;
  if (typeof options === 'string' || typeof options === 'number') {
    optionsObj = { width: options as InferWidth<Exclude<T, PartialBreakpoint>> };
  } else {
    optionsObj = options as InferredPartialBreakpointFromOptions<T>;
  }

  const { modifier, label, operator, unit, width: rawWidth } = optionsObj;

  const { value: width, unit: parsedUnit } = units.parse(rawWidth);

  const finalUnit = getPreferredUnit(unit, parsedUnit, defaults.unit);

  return {
    modifier: (modifier || defaults.modifier) as InferModifier<T>,
    label: (labelArg || label) as InferLabel<T, V>,
    operator: (operator || defaults.operator) as InferOperator<T>,
    rawWidth,
    unit: finalUnit as InferUnit<T>,
    width,
  };
};

const b = createBreakpoint(320);
const c = createBreakpoint('320px');
const d = createBreakpoint({ width: '320px' });

const o = { width: '320px', unit: 'px' };

type Y = (typeof o)['width'];

type W = InferWidth<typeof o>;

type D = InferredPartialBreakpointFromOptions<typeof o>;

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
