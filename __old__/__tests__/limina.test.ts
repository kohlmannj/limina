import testMediaQueries from '../__stubs__/testMediaQueries';
import createBreakpoint from '../src/Breakpoint';
import lm from '../src/limina';

const compact = createBreakpoint({ name: 'compact', width: '540px' });
const regular = createBreakpoint({ name: 'regular', width: '1280px' });

const styles = lm({
  width: [compact(540), regular(1160)],
});

console.log(styles);
