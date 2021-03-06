import { createBreakpoint } from '..';

describe('Breakpoint', () => {
  describe('constructor', () => {
    it('supports strings', () => {
      expect(() => {
        createBreakpoint('1280px');
      }).not.toThrow();
    });

    it('supports numbers', () => {
      expect(() => {
        createBreakpoint(1280);
      }).not.toThrow();
      // expect(isValidBreakpoint(breakpoint)).toBeTruthy();
    });

    it('supports named breakpoints', () => {
      expect(() => {
        const breakpoint = createBreakpoint({ label: 'compact', width: 1280 });
        // expect(isValidBreakpoint(breakpoint)).toBeTruthy();
        expect(breakpoint.label).toEqual('compact');
      }).not.toThrow();
    });
  });
});
