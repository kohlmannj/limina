import createBreakpoint from './Breakpoint';
import lm from './limina';

const compact = createBreakpoint({ name: 'compact', width: '540px' });
const regular = createBreakpoint({ name: 'regular', width: '1280px' });

const styles = lm({
  width: [compact(540), regular(1160)],
});

console.log(styles);
