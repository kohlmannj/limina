export interface PartiallyUnknownBreakpoint1 {
  props: unknown;
}

export interface PartiallyUnknownBreakpoint2 {
  props: object;
}

export interface PartiallyUnknownBreakpoint3 {
  props: { width: unknown; unit: unknown };
}

export const isValidBreakpoint = (breakpoint: unknown): boolean =>
  typeof breakpoint === 'object' &&
  breakpoint !== null &&
  'props' in breakpoint &&
  typeof (breakpoint as PartiallyUnknownBreakpoint1).props === 'object' &&
  (breakpoint as PartiallyUnknownBreakpoint1).props !== null &&
  'width' in (breakpoint as PartiallyUnknownBreakpoint2).props &&
  'unit' in (breakpoint as PartiallyUnknownBreakpoint2).props &&
  typeof (breakpoint as PartiallyUnknownBreakpoint3).props.width === 'number' &&
  typeof (breakpoint as PartiallyUnknownBreakpoint3).props.unit === 'string';
