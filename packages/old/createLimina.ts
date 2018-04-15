import {
  BreakpointFunctions,
  ILimina,
  ILiminaConstructor,
  ILiminaContext,
  InterpolationMode,
  Limen,
  NamedBreakpointDefinitions,
  SupportedCSSUnit,
} from '.';

export class Limina implements ILimina {
  public static readonly auto = InterpolationMode.linear;
  public static readonly interpolations = InterpolationMode;

  private _breakpointDefinitions: NamedBreakpointDefinitions = {};
  // private _breakpoints: Record<string, Limen> = {};
  private _interpolation: InterpolationMode = InterpolationMode.linear;
  private _scaleFactor: number = 1;

  constructor(breakpointDefinitions: NamedBreakpointDefinitions, context?: ILiminaContext) {
    this._breakpointDefinitions = breakpointDefinitions;
  }

  public get scaleFactor(): number {
    return this._scaleFactor;
  }

  public set scaleFactor(newScaleFactor: number) {
    if (newScaleFactor > 0) {
      this._scaleFactor = newScaleFactor;
    }
  }

  public get breakpoints(): BreakpointFunctions {
    return;
  }
}

const createLimina = (context?: ILiminaContext = {}) => new Limina(context);

export default createLimina;
