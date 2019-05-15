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

export type BoundBreakpointValueOptionsObject<
  Value extends CSSValue,
  BoundBreakpoint extends Breakpoint,
  Unit extends string | undefined
> = Pick<
  BreakpointValueOptionsObject<Value, BoundBreakpoint, Unit>,
  Exclude<keyof BreakpointValueOptionsObject<Value, BoundBreakpoint, Unit>, 'breakpoint'>
>;

export type BoundBreakpointValueOptions<
  Value extends CSSValue,
  BoundBreakpoint extends Breakpoint,
  Unit extends string | undefined
> = BoundBreakpointValueOptionsObject<Value, BoundBreakpoint, Unit> | Value;

export type BoundBreakpointValueConstructor<BoundBreakpoint extends Breakpoint> = <
  Value extends CSSValue,
  Unit extends string = Value extends number ? typeof defaults.unit : string
>(
  options: BoundBreakpointValueOptions<Value, BoundBreakpoint, Unit>
) => BreakpointValue<Value, BoundBreakpoint, Unit>;

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
): BoundBreakpointValueConstructor<BoundBreakpoint> => <
  Value extends CSSValue,
  Unit extends string = Value extends number ? typeof defaults.unit : string
>(
  options: BoundBreakpointValueOptions<Value, BoundBreakpoint, Unit>
): BreakpointValue<Value, BoundBreakpoint, Unit> =>
  createBreakpointValue({
    breakpoint,
    ...(typeof options === 'object' && options !== null ? options : { value: options }),
  });

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
