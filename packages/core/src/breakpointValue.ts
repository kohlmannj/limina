import units from 'units-css';
import * as defaults from './defaults';
import { getPreferredUnit } from './utils/getPreferredUnit';
import { CSSValue } from './types';
import { getBreakpointString, Breakpoint } from './breakpoint';

export interface BreakpointValueOptionsObject<
  Value extends CSSValue,
  BoundBreakpoint extends Breakpoint,
  Unit extends string | undefined
> {
  breakpoint: BoundBreakpoint;
  unit?: Unit;
  value: Value;
}

export type CallableBreakpointOptionsObject<
  Value extends CSSValue,
  BoundBreakpoint extends Breakpoint,
  Unit extends string | undefined
> = Pick<
  BreakpointValueOptionsObject<Value, BoundBreakpoint, Unit>,
  Exclude<keyof BreakpointValueOptionsObject<Value, BoundBreakpoint, Unit>, 'breakpoint'>
>;

export type CallableBreakpointOptions<
  Value extends CSSValue,
  BoundBreakpoint extends Breakpoint,
  Unit extends string | undefined
> = CallableBreakpointOptionsObject<Value, BoundBreakpoint, Unit> | Value;

export interface CallableBreakpoint<BoundBreakpoint extends Breakpoint> {
  <
    Value extends CSSValue,
    Unit extends string = Value extends number ? typeof defaults.unit : string
  >(
    options: CallableBreakpointOptions<Value, BoundBreakpoint, Unit>
  ): BreakpointValue<Value, BoundBreakpoint, Unit>;

  label: BoundBreakpoint['label'];
  modifier: BoundBreakpoint['modifier'];
  operator: BoundBreakpoint['operator'];
  rawWidth: BoundBreakpoint['rawWidth'];
  unit: BoundBreakpoint['unit'];
  width: BoundBreakpoint['width'];
}

export interface BreakpointValue<
  Value extends CSSValue = CSSValue,
  BoundBreakpoint extends Breakpoint = Breakpoint,
  Unit extends string = string
>
  extends Required<
    Pick<BreakpointValueOptionsObject<Value, BoundBreakpoint, Unit>, 'unit' | 'breakpoint'>
  > {
  rawValue: Value;
  value: number;
}

export const createBreakpointValue = <
  Value extends CSSValue,
  BoundBreakpoint extends Breakpoint,
  Unit extends string = Value extends number ? typeof defaults.unit : string
>({
  breakpoint,
  value: rawValue,
  unit,
}: BreakpointValueOptionsObject<Value, BoundBreakpoint, Unit>): BreakpointValue<
  Value,
  BoundBreakpoint,
  Unit
> => {
  const { value, unit: parsedUnit } = units.parse(rawValue);

  return {
    breakpoint,
    rawValue,
    unit: getPreferredUnit(unit, parsedUnit, defaults.unit) as Unit,
    value,
  };
};

export const createBoundBreakpointValueConstructor = <BoundBreakpoint extends Breakpoint>(
  breakpoint: BoundBreakpoint
): CallableBreakpoint<BoundBreakpoint> => {
  const breakpointValueConstructor = <
    Value extends CSSValue,
    Unit extends string = Value extends number ? typeof defaults.unit : string
  >(
    options: CallableBreakpointOptions<Value, BoundBreakpoint, Unit>
  ): BreakpointValue<Value, BoundBreakpoint, Unit> =>
    createBreakpointValue({
      breakpoint,
      ...(typeof options === 'object' && options !== null ? options : { value: options }),
    });

  breakpointValueConstructor.label = breakpoint.label;
  breakpointValueConstructor.modifier = breakpoint.modifier;
  breakpointValueConstructor.operator = breakpoint.operator;
  breakpointValueConstructor.rawWidth = breakpoint.rawWidth;
  breakpointValueConstructor.unit = breakpoint.unit;
  breakpointValueConstructor.width = breakpoint.width;

  return breakpointValueConstructor;
};

export const getBreakpointValueString = <
  Value extends CSSValue,
  BoundBreakpoint extends Breakpoint,
  Unit extends string = Value extends number ? typeof defaults.unit : string
>({
  breakpoint,
  unit,
  value,
}: BreakpointValue<Value, BoundBreakpoint, Unit>): string =>
  `${getBreakpointString(breakpoint)} { --${
    breakpoint.label ? `${breakpoint.label}-` : ''
  }value: ${value}${unit}; }`;
