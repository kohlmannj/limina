import { Interpolation } from '@emotion/core';
import { BreakpointTupleable } from './BreakpointTuple';

export * from './limina';

export interface CSSValueRetargetingDefaultOptions {
  dynamicUnit: 'vw';
}

export interface CSSValueRetargetingOptions {
  dynamicUnit?: 'vw';
  property: string;
}

export interface ReduceToCSSOptions {
  prevTuple?: BreakpointTupleable;
  css: Interpolation & object;
}

export interface CSSPropertyValueTuple extends Array<string | BreakpointTupleable[]> {
  0: string;
  1: BreakpointTupleable[];
}

export type CSSValue = number | string;
