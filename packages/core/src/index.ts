import { BreakpointValue } from './BreakpointValue';

export * from './limina';
export * from './Breakpoint';
export * from './BreakpointValue';
export * from './createBreakpoints';
export * from './isValidBreakpoint';
export * from './isValidBreakpointValue';

export interface CSSValueRetargetingDefaultOptions {
  dynamicUnit: 'vw';
}

export interface CSSValueRetargetingOptions {
  dynamicUnit?: 'vw';
  property: string;
}

export interface ReduceToCSSOptions {
  prevValue?: BreakpointValue;
  css: import('@emotion/core').Interpolation & object;
}

export type CSSPropertyValueTuple = [string, BreakpointValue[]];

export type CSSValue = number | string;
