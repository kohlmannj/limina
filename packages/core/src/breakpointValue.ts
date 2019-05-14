import units from 'units-css';
import * as defaults from './defaults';
import { getPreferredUnit } from './utils/getPreferredUnit';
import { CSSValue } from './types';
import { getBreakpointString, BreakpointProps } from './breakpoint';

export interface BreakpointValueOptionsObject {
  breakpoint: BreakpointProps;
  unit?: string;
  value: CSSValue;
}

export type BoundBreakpointValueOptionsObject = Pick<
  BreakpointValueOptionsObject,
  Exclude<keyof BreakpointValueOptionsObject, 'breakpoint'>
>;

export type BoundBreakpointValueOptions = BoundBreakpointValueOptionsObject | CSSValue;

export type BoundBreakpointValueConstructor = (
  options: BoundBreakpointValueOptions
) => BreakpointValueProps;

export interface BreakpointValueProps extends Pick<BreakpointValueOptionsObject, 'breakpoint'> {
  rawValue: CSSValue;
  unit: string;
  value: number;
}

export function createBreakpointValue({
  breakpoint,
  value: rawValue,
  unit,
}: BreakpointValueOptionsObject): BreakpointValueProps {
  const { value, unit: parsedUnit } = units.parse(rawValue);

  return {
    breakpoint,
    rawValue,
    unit: getPreferredUnit(unit, parsedUnit, defaults.unit),
    value,
  };
}

export function createBoundBreakpointValue(
  breakpoint: BreakpointValueOptionsObject['breakpoint']
): BoundBreakpointValueConstructor {
  return options =>
    createBreakpointValue({
      breakpoint,
      ...(typeof options === 'number' || typeof options === 'string'
        ? { value: options }
        : options),
    });
}

export function getBreakpointValueString({ breakpoint, unit, value }: BreakpointValueProps) {
  return `${getBreakpointString(breakpoint)} { --${
    breakpoint.name ? `${breakpoint.name}-` : ''
  }value: ${value}${unit}; }`;
}
