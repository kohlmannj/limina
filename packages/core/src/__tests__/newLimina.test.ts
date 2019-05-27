import { newLimina } from '..';

describe('newLimina', () => {
  it('works', () => {
    const heading /* css( */ = newLimina({
      fontSize: 32,
      lineHeight: 48,
      '@media (min-width: 720px)': {
        fontSize: 48,
      },
      '@media (min-width: 1280px)': {
        fontSize: 56,
      },
    });
    /* ) */
    expect(heading).toMatchSnapshot();
  });
});
