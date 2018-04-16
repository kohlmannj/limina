// import { css } from 'emotion';
import Limina from '.';
import testMediaQueries from '../__stubs__/testMediaQueries';

const lm = new Limina(
  {
    mobilePortrait: 320,
    tabletPortrait: 540,
    tabletLandscape: 854,
    desktop: 1280,
    shell: 1605,
  },
  {
    default: 'desktop',
    compact: 'mobilePortrait',
    regular: 'desktop',
  }
);

const objectDefaultStyles = lm({
  fontSize: 32,
  lineHeight: 48,
});

const objectExplicitDefaultStyles = lm({
  fontSize: lm.default(32),
  lineHeight: lm.default(48),
});

const objectArrayFunctionStyles = lm({
  fontSize: [lm.compact(24), lm.regular(32), lm.shell(Limina.auto)],
  lineHeight: [lm.compact(32), lm.tabletPortrait(64)],
});

const objectArrayTupleStyles = lm({
  fontSize: [[lm.compact, 24], [lm.regular, 32], [lm.shell, Limina.auto]],
  lineHeight: [[lm.compact, 32], [lm.tabletPortrait, 64]],
});

const objectArrayDomainRangeStyles = lm({
  fontSize: [[lm.compact, 24], [lm.regular, 32], [lm.shell, Limina.auto]],
  lineHeight: [[lm.compact, 32], [lm.tabletPortrait, 64]],
});

const objectObjectStyles = lm({
  fontSize: { [lm.compact]: 24, [lm.regular]: 32, [lm.shell]: Limina.auto },
  lineHeight: { [lm.compact]: 32, [lm.tabletPortrait]: 64 },
});

const objectArrowMixedStyles = lm(({ compact, tabletPortrait, regular, shell }) => ({
  fontSize: { [compact]: 24, [regular]: 32, [shell]: Limina.auto },
  lineHeight: [compact(32), tabletPortrait(64)],
}));

const arrayStyles = lm([
  lm.compact({ fontSize: 24 }),
  lm.regular({ fontSize: 32 }),
  lm.shell({ fontSize: Limina.auto }),
]);

const objectStyles = lm({
  [lm.compact]: {
    fontSize: 24,
  },
  [lm.regular]: {
    fontSize: 32,
  },
  [lm.shell]: {
    fontSize: Limina.auto,
  },
});

const arrayArrowStyles = lm(({ compact, regular, shell }) => [
  compact({ fontSize: 24 }),
  regular({ fontSize: 32 }),
  shell({ fontSize: Limina.auto }),
]);

const mixedStyles = lm([
  lm.compact({ fontSize: 24 }),
  { fontSize: [lm.regular(32), lm.shell(Limina.auto)] },
  ({ compact }) => ({ fontSize: compact(24) }),
]);

// Get the width of a particular breakpoint
const shellWidth = lm.shell.width;
