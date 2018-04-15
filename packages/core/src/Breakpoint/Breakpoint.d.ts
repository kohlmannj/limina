import { CSSValue } from '..';
import { IBreakpointTuple } from '../BreakpointTuple';

export type Modifier = 'min' | 'max';
export type Operator = 'and' | 'or';

export interface IBreakpointDefaultProps {
  readonly modifier: Modifier;
  readonly operator: Operator;
  readonly unit: string;
}

export interface IBreakpointOptions {
  readonly modifier?: Modifier;
  readonly name?: string;
  readonly operator?: Operator;
  readonly unit?: string;
  readonly width: CSSValue;
}

export type BreakpointOptions = IBreakpointOptions | CSSValue;

export interface IBreakpointProps {
  readonly modifier: Modifier;
  readonly name?: string;
  readonly operator: Operator;
  readonly rawWidth: CSSValue;
  readonly unit: string;
  readonly width: number;
  readonly [propName: string]: any;
}

export interface IBreakpoint {
  props: IBreakpointProps;
  createTuple: (value: CSSValue) => IBreakpointTuple;
  toString: () => string;
}
