import { _Interpolation1 } from 'emotion';
import { IBreakpointTuple } from './BreakpointTuple/BreakpointTuple.d';

export enum InterpolationMode {
  auto = 'AUTO',
  linear = 'LINEAR',
}

export type CSSPropertyValueTuple = [string, IBreakpointTuple[]];

export type BreakpointDefinition = number;
export type NamedBreakpointDefinitions = Record<string, BreakpointDefinition>;
export type BreakpointDefinitions = NamedBreakpointDefinitions | BreakpointDefinition[];
export type DefaultBreakpointProperty = string | BreakpointDefinition;
export type BreakpointFunctions = Record<string, Limen>;
export type MediaQueryMode = 'min-width' | 'max-width';
export type CSSValue = number | string;
export type SupportedCSSUnit = 'px' | 'em' | 'rem';

export type BreakpointAliases = Record<string, string>;

export interface ILiminaContext {
  breakpoints?: BreakpointDefinitions;
  default?: DefaultBreakpointProperty;
  defaultIndex?: number;
  interpolation?: InterpolationMode;
  scale?: number;
}

// export type BreakpointTupleFactory = (value?: number | InterpolationMode.auto) => ;

export type Limen = (value?: number | InterpolationMode.auto) => _Interpolation1;

// export type Limina = (...limen: Limen[]) => _Interpolation1 | _Interpolation1[];

// export interface ILimina {}

// export type ILiminaConstructorArgs = (

// ) => ILimina;

// @see https://stackoverflow.com/a/46971111

export interface ILiminaConstructor {
  auto: InterpolationMode.auto;
  interpolations: InterpolationMode;
  new (breakpointDefinitions: NamedBreakpointDefinitions, options?: ILiminaContext): ILimina;
}
