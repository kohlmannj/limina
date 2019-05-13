declare module 'units-css' {
  namespace unitsCss {
    interface ParsedCSSValue {
      unit: string;
      value: number;
    }

    function parse(unitStr: string | number): ParsedCSSValue;
  }

  export = unitsCss;
}
