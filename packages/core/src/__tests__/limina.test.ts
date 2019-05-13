// import testMediaQueries from '../__stubs__/testMediaQueries';
import { createBreakpoint } from '../Breakpoint';
import { limina } from '../limina';

/** @see https://codepen.io/anon/pen/VXJgom */

describe('limina', () => {
  describe('styles object with array of BreakpointTuples', () => {
    describe('two breakpoints', () => {
      it('works with a single property-value pair', () => {
        const [compact, regular] = [540, 1280].map(w => createBreakpoint(w).createTuple);

        const styles = limina({
          // TODO: order tuples before calling retargetCSSPropertyValue()
          width: [compact(540), regular(1160)],
        });

        // console.log(styles);

        expect(styles).toBeInstanceOf(Object);
      });
    });

    describe('three breakpoints', () => {
      it('works with a single property-value pair', () => {
        const [compact, tabletPortrait, regular] = [540, 854, 1280].map(
          w => createBreakpoint(w).createTuple
        );

        const styles = limina({
          width: [compact(540), tabletPortrait(768), regular(1160)],
        });

        // console.log(styles);

        expect(styles).toBeInstanceOf(Object);
      });

      it('works with a multiple property-value pairs', () => {
        const [compact, tabletPortrait, regular] = [540, 854, 1280].map(
          w => createBreakpoint(w).createTuple
        );

        const styles = limina({
          width: [compact(540), tabletPortrait(768), regular(1160)],
          fontSize: [compact(32), tabletPortrait(48), regular(64)],
        });

        // @see https://codepen.io/anon/pen/LdwPeP
        // console.log(styles);

        expect(styles).toBeInstanceOf(Object);
      });
    });
  });
});
