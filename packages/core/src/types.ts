import { BreakpointValue } from './breakpointValue';
import { MediaQueryDelimitedCSSPropertyValues } from './utils/createLinearRegressionMediaQuery';

export interface CSSValueRetargetingDefaultOptions {
  dynamicUnit: 'vw';
}

export interface CSSValueRetargetingOptions<P extends string, U extends string | undefined> {
  dynamicUnit?: U;
  property: P;
  precision: number;
}

export interface ReduceToCSSOptions<P extends string, D extends string | undefined> {
  prevValue?: BreakpointValue;
  css: MediaQueryDelimitedCSSPropertyValues<P, D>;
}

export type CSSPropertyValueTuple = [string, BreakpointValue[]];
export type CSSValue = number | string;
