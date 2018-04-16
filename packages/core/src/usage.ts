import createBreakpoint from './Breakpoint';
import lm from './limina';

const compact = createBreakpoint({ name: 'compact', width: '540px' }).createTuple;
const regular = createBreakpoint({ name: 'regular', width: '1280px' }).createTuple;

const styles = lm({
  width: [compact(540), regular(1160)],
});

// tslint:disable-next-line no-console
console.log(styles);
