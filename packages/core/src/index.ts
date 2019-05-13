import { Interpolation } from '@emotion/core';
import { BreakpointValue } from './BreakpointValue';

export * from './limina';
export * from './Breakpoint';
export * from './BreakpointValue';
export * from './createBreakpoints';

export interface CSSValueRetargetingDefaultOptions {
  dynamicUnit: 'vw';
}

export interface CSSValueRetargetingOptions {
  dynamicUnit?: 'vw';
  property: string;
}

export interface ReduceToCSSOptions {
  prevValue?: BreakpointValue;
  css: Interpolation & object;
}

export type CSSPropertyValueTuple = [string, BreakpointValue[]];

export type CSSValue = number | string;
