import SLR from 'ml-regression-simple-linear';
import { BreakpointValue } from '../breakpointValue';
import { CSSValueRetargetingOptions, CSSValue } from '../types';
import { Breakpoint } from '..';
import { roundToPrecision } from './roundToPrecision';

export type CSSPropertyBreakpointValueRecord<
  T extends keyof import('csstype').PropertiesFallback<number | string>,
  V extends BreakpointValue[] | readonly BreakpointValue[]
> = Record<T, V>;

export type CSSProperty = keyof import('csstype').PropertiesFallback<number | string>;

export type CSSPropertyValues<P extends string, D extends string | undefined> = {
  [K in P]: D extends string ? string : number
};

export type MediaQueryDelimitedCSSPropertyValues<
  P extends string,
  D extends string | undefined,
  M extends string = string
> = { [K in M]: CSSPropertyValues<P, D> };

export type DeeplyMergedMediaQueryDelimitedCSSPropertyValues<
  P extends string,
  D extends string | undefined,
  M extends string = string
> = { [K in M]: Partial<CSSPropertyValues<P, D>> };

export type LinearRegressionMediaQuerySolver<
  P extends string,
  DynamicUnit extends string | undefined,
  Value extends CSSValue = CSSValue,
  Unit extends string = string
> = (
  leftValue: BreakpointValue<Value, Breakpoint, Unit>,
  rightValue: BreakpointValue<Value, Breakpoint, Unit>
) => MediaQueryDelimitedCSSPropertyValues<P, DynamicUnit>;

export const createLinearRegressionMediaQuery = <P extends string, D extends string | undefined>({
  dynamicUnit,
  precision,
  property,
}: CSSValueRetargetingOptions<P, D>): LinearRegressionMediaQuerySolver<P, D> => (
  leftValue,
  rightValue
): MediaQueryDelimitedCSSPropertyValues<P, D> => {
  if (leftValue.breakpoint.unit !== rightValue.breakpoint.unit) {
    throw new Error(
      `leftValue and rightValue's breakpoints each use different CSS units
            (${leftValue.breakpoint.unit} and ${rightValue.breakpoint.unit})`
    );
  }

  if (leftValue.unit !== rightValue.unit) {
    throw new Error(
      `leftValue and rightValue's values each use different CSS units
            (${leftValue.unit} and ${rightValue.unit})`
    );
  }

  // const leftBreakpointIsSmaller =
  //   leftValue.breakpoint.width < rightValue.breakpoint.width;
  // const smallerValue = leftBreakpointIsSmaller ? leftValue : rightValue;
  // const largerValue = leftBreakpointIsSmaller ? rightValue : leftValue;

  const breakpointConditions = [
    `(min-width: ${leftValue.breakpoint.width + 1}${leftValue.breakpoint.unit})`,
    `(max-width: ${rightValue.breakpoint.width - 1}${rightValue.breakpoint.unit})`,
  ];

  const {
    coefficients: [staticValue, dynamicValue],
  } = new SLR(
    [leftValue.breakpoint.width, rightValue.breakpoint.width],
    [leftValue.value, rightValue.value]
  );

  const staticValueRounded = roundToPrecision(staticValue, precision);
  const dynamicValueRounded = roundToPrecision(dynamicValue * 100, precision);

  // Note: we've previously determined that both values use the same units
  const finalMediaQueryObject = {
    [`@media ${breakpointConditions.join(' and ')}`]: {
      [property]: `calc(${dynamicValueRounded}${dynamicUnit} + ${staticValueRounded}${
        leftValue.unit
      })`,
    },
  };

  return finalMediaQueryObject as MediaQueryDelimitedCSSPropertyValues<P, D>;
};
