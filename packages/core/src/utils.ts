import { NamedBreakpointDefinitions, BreakpointFunctions } from './types';

const reduce = (boundGetter: Function) => (
  breakpoints: BreakpointFunctions,
  breakpointName: string
) => ({ ...breakpoints, [breakpointName]: n: number })

export const reduceBreakpoints = (
  breakpointDefinitions: NamedBreakpointDefinitions,
  boundGetter: Function
) => Object.keys(breakpointDefinitions).reduce(, {});
