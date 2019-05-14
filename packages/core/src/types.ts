import { BreakpointValueProps } from './breakpointValue';

export interface CSSValueRetargetingDefaultOptions {
  dynamicUnit: 'vw';
}

export interface CSSValueRetargetingOptions {
  dynamicUnit?: 'vw';
  property: string;
}

export interface ReduceToCSSOptions {
  prevValue?: BreakpointValueProps;
  css: import('@emotion/core').Interpolation & object;
}

export type CSSPropertyValueTuple = [string, BreakpointValueProps[]];
export type CSSValue = number | string;
