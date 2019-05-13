import { createBreakpoint, isValidBreakpoint } from '..';

describe('Breakpoint', () => {
  describe('constructor', () => {
    it('supports strings', () => {
      const breakpoint = createBreakpoint('1280px');
      expect(isValidBreakpoint(breakpoint)).toBeTruthy();
    });

    it('supports numbers', () => {
      const breakpoint = createBreakpoint(1280);
      expect(isValidBreakpoint(breakpoint)).toBeTruthy();
    });

    it('supports named breakpoints', () => {
      const breakpoint = createBreakpoint({ name: 'compact', width: 1280 });
      expect(isValidBreakpoint(breakpoint)).toBeTruthy();
      expect(breakpoint.props.name).toEqual('compact');
    });
  });
});
