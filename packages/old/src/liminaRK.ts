import SLR from 'ml-regression-simple-linear';
import units from 'units-css';

const unpackBreakpointTuples = (breakpointTuples, breakpointPropertyName) =>
  breakpointTuples.reduce(
    ([breakpoints, values], [breakpoint, value]) => [
      [
        ...breakpoints,
        breakpoint && breakpointPropertyName && breakpoint[breakpointPropertyName]
          ? breakpoint[breakpointPropertyName]
          : breakpoint,
      ],
      [...values, value],
    ],
    [[], []]
  );

// class BreakpointTuple {
//   constructor(breakpoint, value) {
//     this.breakpoint = breakpoint;
//     this.value = value;
//   }
// }

// class Breakpoint {
//   constructor(props) {
//     const initialProps = typeof props === 'object' && props !== null ? props : { width: props };

//     const { width: rawWidth, ...rest } = initialProps;
//     const { value: width, unit } = units.parse(rawWidth);

//     this.props = { ...Breakpoint.defaultProps, ...rest, rawWidth, unit, width };

//     return value => new BreakpointTuple(this, value);
//   }

//   public toString() {
//     const { modifier, name, operator, rawWidth, unit, ...rest } = this.props;
//     const mediaQueryConditions = Object.values(rest).reduce(
//       (conditions, [propName, propValue]) => [
//         ...conditions,
//         `(${propName === 'width' ? `${modifier}-width` : propName}: ${propValue}${unit})`,
//       ],
//       []
//     );

//     return `@media ${mediaQueryConditions.join(' ${operator} ')}`;
//   }
// }

// Breakpoint.defaultProps = {
//   modifier: 'min',
//   operator: 'and',
// };

// const createLinearRegressionMediaQuery = (cssProperty = 'width', dynamicUnit = 'vw') => (
//   leftTuple,
//   rightTuple
// ) => {
//   const tuplesAreValid = [leftTuple, rightTuple].reduce(
//     (prevTupleIsValid, thisTuple) =>
//       prevTupleIsValid &&
//       thisTuple &&
//       thisTuple.breakpoint &&
//       thisTuple.breakpoint.props &&
//       thisTuple.breakpoint.props.width &&
//       typeof thisTuple.breakpoint.props.width === 'number' &&
//       thisTuple.breakpoint.props.unit &&
//       thisTuple.value,
//     true
//   );

//   if (!tuplesAreValid) {
//     throw new Error('Either leftTuple or rightTuple is invalid');
//   }

//   const breakpointsUseSameUnits =
//     leftTuple.breakpoint.props.unit === rightTuple.breakpoint.props.unit;

//   if (!breakpointsUseSameUnits) {
//     throw new Error(
//       `leftTuple and rightTuple's breakpoints each use different CSS units
//             (${leftTuple.breakpoint.props.unit} and ${rightTuple.breakpoint.props.unit})`
//     );
//   }

//   const parsedLeftValue = units.parse(leftTuple.value);
//   const parsedRightValue = units.parse(rightTuple.value);

//   if (parsedLeftValue.unit !== parsedRightValue.unit) {
//     throw new Error(
//       `leftTuple and rightTuple's values each use different CSS units
//             (${parsedLeftValue.unit} and ${rightTuple.breakpoint.props.unit})`
//     );
//   }

//   const leftIsSmaller = leftTuple.breakpoint.props.width < rightTuple.breakpoint.props.width;

//   const { breakpoint: smallerBreakpoint } = leftIsSmaller ? leftTuple : rightTuple;
//   const { breakpoint: largerBreakpoint } = leftIsSmaller ? rightTuple : leftTuple;

//   const breakpointConditions = [
//     `(min-width: ${smallerBreakpoint.props.width + 1}${smallerBreakpoint.props.unit})`,
//     `(max-width: ${largerBreakpoint.props.width - 1}${largerBreakpoint.props.unit})`,
//   ];

//   const { coefficients } = new SLR(
//     [smallerBreakpoint.props.width, largerBreakpoint.props.width],
//     [smallerValue, largerValue]
//   );

//   // Note: we've previously determined that both values use the same units
//   const unit = parsedLeftValue.unit;

//   return {
//     [`@media ${breakpointConditions.join(' and ')}`]: {
//       [cssProperty]: `calc(${coefficients[0] * 100}${dynamicUnit} + ${coefficients[1]}${unit})`,
//     },
//   };
// };

const reduceToCSS = (cssProperty = 'width', dynamicUnit = 'vw') => ({ merge, css }, tuple) => {
  const { breakpoint, value } = tuple;

  const nextMerge = [];

  const nextCSS = {
    ...css,
    [breakpoint.toString()]: {
      [cssProperty]: `${value / breakpoint.props.width * 100}${dynamicUnit}`,
    },
    ...(merge.length === 2
      ? createLinearRegressionMediaQuery(cssProperty, dynamicUnit)(merge)
      : undefined),
  };

  if (merge.length < 2) {
    nextMerge.push(tuple);
  }

  return { merge: nextMerge, css: nextCSS };
};

const compact = new Breakpoint({ name: 'compact', width: '540px' });
const regular = new Breakpoint({ name: 'regular', width: '1280px' });

const values = [compact(540), regular(1160)];

const toCSS = values => values.reduce(reduceToCSS, { merge: [], css: {} }).css;

toCSS(values);
