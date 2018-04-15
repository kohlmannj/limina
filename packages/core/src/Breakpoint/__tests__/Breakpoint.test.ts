import createBreakpoint, { Breakpoint } from '..';

describe('Breakpoint', () => {
  describe('constructor', () => {
    it('supports strings', () => {
      const breakpoint = createBreakpoint('1280px');
      debugger;
      expect(Breakpoint.isValid(breakpoint)).toBeTruthy();
    });

    it('supports numbers', () => {
      const breakpoint = createBreakpoint(1280);
      expect(Breakpoint.isValid(breakpoint)).toBeTruthy();
    });

    it('supports named breakpoints', () => {
      const breakpoint = createBreakpoint({ name: 'compact', width: 1280 });
      expect(Breakpoint.isValid(breakpoint)).toBeTruthy();
      expect(breakpoint.props.name).toEqual('compact');
    });
  });
});
