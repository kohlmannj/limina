import { createBreakpoints, createLimina, limina } from '..';

describe('createLimina', () => {
  it('works', () => {
    const {
      limina: customLimina,
      breakpoints: [mobile, tablet, desktop],
    } = createLimina([540, 854, 1280] as const);

    const returnValue = customLimina({
      [mobile]: {
        width: 540,
        letterSpacing: 0,
      },
      [tablet]: {
        width: 768,
      },
      [desktop]: {
        width: 1160,
        letterSpacing: 4,
      },
    });

    expect(returnValue).toMatchSnapshot();
  });

  it('outputs the same CSS object content as "regular" limina()', () => {
    const breakpointSpecs = [320, 720, 1024] as const;

    const [mobile, lap, desk] = createBreakpoints(breakpointSpecs);

    const headingLimina = limina({
      fontSize: [mobile(20), lap(26), desk(30)],
      letterSpacing: [lap(0), desk(4)],
    });

    const {
      limina: customLimina,
      breakpoints: [customMobile, customLap, customDesk],
    } = createLimina(breakpointSpecs);

    const headingCustomLimina = customLimina({
      [customMobile]: {
        fontSize: 20,
      },

      [customLap]: {
        fontSize: 26,
        letterSpacing: 0,
      },

      [customDesk]: {
        fontSize: 30,
        letterSpacing: 4,
      },
    });

    expect(headingLimina).toStrictEqual(headingCustomLimina);

    expect(headingCustomLimina).toMatchSnapshot();
  });
});
