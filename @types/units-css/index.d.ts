declare module 'units-css' {
  export interface ParsedCSSValue {
    unit: string;
    value: number;
  }

  export function parse(unitStr: string | number): ParsedCSSValue;
}
