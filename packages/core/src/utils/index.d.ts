import { _Interpolation1 } from 'emotion';
import { IBreakpointTuple } from '../BreakpointTuple/BreakpointTuple.d';

export interface ICSSValueRetargetingDefaultOptions {
  dynamicUnit: 'vw';
}

export interface ICSSValueRetargetingOptions {
  dynamicUnit?: 'vw';
  property: string;
}

export interface IReduceToCSSOptions {
  prevTuple?: IBreakpointTuple;
  css: _Interpolation1;
}
