export enum MediaQueryMode {
  MIN_WIDTH = 'min-width',
  MAX_WIDTH = 'max-width',
}

export enum SupportedCSSUnit {
  EM = 'em',
  PX = 'px',
  REM = 'rem',
}

export type LiminaFunc = (
  widths: number[],
  mediaQueryMode?: MediaQueryMode,
  ssUnit?: SupportedCSSUnit
) => any;
