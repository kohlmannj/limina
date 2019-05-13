import { createBreakpoint } from './Breakpoint';
import { limina } from './limina';

const compact = createBreakpoint({ name: 'compact', width: '540px' }).createTuple;
const regular = createBreakpoint({ name: 'regular', width: '1280px' }).createTuple;

const styles = limina({
  width: [compact(540), regular(1160)],
});

// eslint-disable-next-line no-console
console.log(styles);
