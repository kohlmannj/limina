import { _Interpolation1 } from 'emotion';
import { IBreakpointTuple } from '../BreakpointTuple';

export interface ICSSValueRetargetingDefaultOptions {
  dynamicUnit: 'vw';
}

export interface ICSSValueRetargetingOptions {
  dynamicUnit?: 'vw';
  property: string;
}

export interface IReduceToCSSOptions {
  merge: IBreakpointTuple[];
  css: _Interpolation1;
}
