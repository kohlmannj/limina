import {
  createBreakpointValueConstructors,
  limina,
  createBoundBreakpointValueConstructor,
} from '.';
import { retargetCSSPropertyValue } from './utils/retargetCSSPropertyValue';
import { createBreakpoint } from './breakpoint';

const regular = createBreakpoint({ label: 'regular', width: 1440 });

const createRegularValue = createBoundBreakpointValueConstructor(regular);

const regularValue = createRegularValue(320);

const [mobile, tablet, desktop] = createBreakpointValueConstructors([
  { label: 'mobile', width: 540 },
  { label: 'tablet', width: 854 },
  { label: 'desktop', width: 1280 },
] as const);

const result = retargetCSSPropertyValue({
  property: 'width',
  values: [mobile(540), tablet(768), desktop(1160)],
  dynamicUnit: 'vw',
} as const);

const styleSpecs = {
  width: [mobile(540), tablet(768), desktop(1160)],
  fontSize: [mobile(32), tablet(48) /* , desktop(64) */],
} as const;

const returnValue = limina(styleSpecs);

const thirdMediaQueryProperties = Object.values(returnValue)[2].fontSize;

// function testFunction(input: object) {
//   return Object.keys(input).reduce((reduced, key) => ({ ...reduced, [key]: false }), {}) as {
//     [M in string]: { [K in keyof typeof styleSpecs]: false }
//   };
// }

// const retVal = testFunction(styleSpecs);
