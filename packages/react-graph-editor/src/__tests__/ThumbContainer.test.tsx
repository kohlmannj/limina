import {
  getOvershootFactor,
  getTranslateFactor,
} from '../components/ScrollBar/components/ThumbContainer';

describe('getOvershootFactor', () => {
  it('returns `1` when `progress` is `0`', () => {
    expect(getOvershootFactor(0)).toBe(1);
  });

  it('returns `1` when `progress` is `1`', () => {
    expect(getOvershootFactor(1)).toBe(1);
  });

  it('returns `1` when `progress` is within the bounds of `min` and `max`', () => {
    expect(getOvershootFactor(0.5)).toBe(1);
  });

  it('returns a value less than `1` when `progress is greater than `max`', () => {
    expect(getOvershootFactor(1.1)).toBeLessThan(1);
  });

  it('returns a value less than `1` when `progress is less than `min`', () => {
    expect(getOvershootFactor(-0.1)).toBeLessThan(1);
  });
});

describe('getTranslateFactor', () => {
  describe('scale = 1', () => {
    it('returns zero when progress === 0', () => {
      expect(getTranslateFactor({ progress: 0 })).toEqual(0);
    });

    it('returns zero when progress < 0.5', () => {
      expect(getTranslateFactor({ progress: 0.25 })).toEqual(0);
    });

    it('returns zero when progress === 0.5', () => {
      expect(getTranslateFactor({ progress: 0.5 })).toEqual(0);
    });

    it('returns negative zero when progress > 0.5', () => {
      expect(getTranslateFactor({ progress: 0.75 })).toEqual(-0);
    });
  });

  describe('scale > 1', () => {
    it('returns zero when progress === 0', () => {
      expect(getTranslateFactor({ progress: 0, scale: 2 })).toEqual(0);
    });

    it('returns a positive number when progress < 0.5', () => {
      expect(getTranslateFactor({ progress: 0.25, scale: 2 })).toBeGreaterThan(0);
    });

    it('returns exactly 0.5 when progress === 0.5', () => {
      expect(getTranslateFactor({ progress: 0.5, scale: 2 })).toEqual(0.5);
    });

    it('returns a negative number when progress > 0.5', () => {
      expect(getTranslateFactor({ progress: 0.75, scale: 2 })).toBeLessThan(0);
    });
  });
});
