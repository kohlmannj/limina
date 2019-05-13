import { createBreakpoint } from './Breakpoint';
import { limina } from './limina';

const compact = createBreakpoint({ name: 'compact', width: '540px' }).createValue;
const regular = createBreakpoint({ name: 'regular', width: '1280px' }).createValue;

const styles = limina({
  width: [compact(540), regular(1160)],
});

// eslint-disable-next-line no-console
console.log(styles);
