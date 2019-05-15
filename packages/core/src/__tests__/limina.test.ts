import { createBreakpointValueConstructors, limina, createBreakpoints } from '..';

/** @see https://codepen.io/anon/pen/VXJgom */
/** @see https://codesandbox.io/s/jj438z6r2w */
/** @see https://codesandbox.io/s/x256m5vl54 */

describe('limina', () => {
  it('basic usage', () => {
    const [compactBreakpoint, regularBreakpoint] = createBreakpoints(540, 1280);

    const [compact, regular] = createBreakpointValueConstructors(540, 1280);

    const styles = limina({
      width: [compact(540), regular(1160)],
    });

    expect(styles).toMatchSnapshot();
  });
  describe('styles object with array of BreakpointValues', () => {
    describe('two breakpoints', () => {
      it('works with a single property-value pair', () => {
        const [compact, regular] = createBreakpointValueConstructors(540, 1280);

        const styles = limina({
          // TODO: order values before calling retargetCSSPropertyValue()
          width: [compact(540), regular(1160)],
        });

        expect(styles).toMatchSnapshot();
      });
    });

    describe('three breakpoints', () => {
      it('works with a single property-value pair', () => {
        const [mobile, tablet, desktop] = createBreakpointValueConstructors(540, 854, 1280);

        const styles = limina({
          width: [mobile(540), tablet(768), desktop(1160)],
        });

        expect(styles).toMatchSnapshot();
      });

      it('works with a multiple property-value pairs', () => {
        const [mobile, tablet, desktop] = createBreakpointValueConstructors(540, 854, 1280);

        const styles = limina({
          width: [mobile(540), tablet(768), desktop(1160)],
          fontSize: [mobile(32), tablet(48), desktop(64)],
        });

        expect(styles).toMatchSnapshot();
      });
    });
  });
});
