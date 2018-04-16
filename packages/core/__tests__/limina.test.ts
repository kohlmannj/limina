// import testMediaQueries from '../__stubs__/testMediaQueries';
import createBreakpoint from '../src/Breakpoint';
import limina from '../src/limina';

// @see https://codepen.io/anon/pen/VXJgom

describe('limina', () => {
  describe('styles object with array of BreakpointTuples', () => {
    describe('two breakpoints', () => {
      it('works with a single property-value pair', () => {
        const compact = createBreakpoint({ name: 'compact', width: '540px' }).createTuple;
        const regular = createBreakpoint({ name: 'regular', width: '1280px' }).createTuple;

        const compactTuple = compact(540);
        const regularTuple = regular(1160);

        const styles = limina({
          // TODO: order tuples before calling retargetCSSPropertyValue()
          width: [compactTuple, regularTuple],
        });

        // console.log(styles);

        expect(styles).toBeInstanceOf(Object);
      });
    });

    describe('three breakpoints', () => {
      it('works with a single property-value pair', () => {
        const compact = createBreakpoint({ name: 'compact', width: '540px' }).createTuple;
        const tabletPortrait = createBreakpoint({ name: 'tabletPortrait', width: '854px' })
          .createTuple;
        const regular = createBreakpoint({ name: 'regular', width: '1280px' }).createTuple;

        const styles = limina({
          width: [compact(540), tabletPortrait(768), regular(1160)],
        });

        // console.log(styles);

        expect(styles).toBeInstanceOf(Object);
      });

      it('works with a multiple property-value pairs', () => {
        const compact = createBreakpoint({ name: 'compact', width: '540px' }).createTuple;
        const tabletPortrait = createBreakpoint({ name: 'tabletPortrait', width: '854px' })
          .createTuple;
        const regular = createBreakpoint({ name: 'regular', width: '1280px' }).createTuple;

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
