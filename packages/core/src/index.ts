import { Interpolation } from 'emotion';
import { IBreakpointTuple } from './BreakpointTuple';

export interface ICSSValueRetargetingDefaultOptions {
  dynamicUnit: 'vw';
}

export interface ICSSValueRetargetingOptions {
  dynamicUnit?: 'vw';
  property: string;
}

export interface IReduceToCSSOptions {
  prevTuple?: IBreakpointTuple;
  css: Interpolation;
}

export interface ICSSPropertyValueTuple extends Array<string | IBreakpointTuple[]> {
  0: string;
  1: IBreakpointTuple[];
}

export type CSSValue = number | string;

export { default } from './limina';
