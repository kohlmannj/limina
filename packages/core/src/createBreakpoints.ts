import {
  createBreakpoint,
  BreakpointOptions,
  Modifier,
  Operator,
  Breakpoint,
  PartialBreakpoint,
} from './breakpoint';
import {
  createBoundBreakpointValueConstructor,
  BoundBreakpointValueConstructor,
} from './breakpointValue';
import { CSSValue } from './types';
import * as defaults from './defaults';

export type BreakpointOptionsArray<
  O extends BreakpointOptions<CSSValue, string, Modifier, Operator, string | undefined>
> = O[];

export type MappedBreakpointProps<
  O extends BreakpointOptions<CSSValue, string, Modifier, Operator, string | undefined>
> = O extends PartialBreakpoint<infer Width, infer Unit, infer Mod, infer Op, infer Label>
  ? Breakpoint<Width, Unit, Mod, Op, Label>
  : O extends CSSValue
  ? Breakpoint<
      CSSValue,
      O extends number ? typeof defaults.unit : string,
      typeof defaults.modifier,
      typeof defaults.operator,
      undefined
    >
  : never;

export const createBreakpoints = (...breakpointOptionsArray: BreakpointOptions[]) =>
  breakpointOptionsArray.map(breakpointOptions => createBreakpoint(breakpointOptions));

export const createBreakpointValueConstructors = (
  ...breakpointOptionsArray: BreakpointOptions[]
) => {
  const breakpoints = createBreakpoints(...breakpointOptionsArray);
  return breakpoints.map(createBoundBreakpointValueConstructor);
};
