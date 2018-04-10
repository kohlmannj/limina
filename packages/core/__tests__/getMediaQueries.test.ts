import getMediaQueries, { MediaQueryType } from '../src/getMediaQueries';

const testMediaQueries: number[] = [320, 540, 854, 1280, 1605];

describe('getMediaQueries', () => {
  it('returns an array of `min-width` media queries', () => {
    const mediaQueries = getMediaQueries(testMediaQueries);
    expect(mediaQueries.length).toEqual(testMediaQueries.length);

    expect(mediaQueries).toEqual(
      expect.arrayContaining(
        testMediaQueries.map(testMediaQuery =>
          expect.stringMatching(new RegExp(`min-width:\\s*${testMediaQuery}`))
        )
      )
    );
  });

  it('returns an array of `max-width` media queries', () => {
    const mediaQueries = getMediaQueries(testMediaQueries, MediaQueryType.MAX_WIDTH);
    expect(mediaQueries.length).toEqual(testMediaQueries.length);

    expect(mediaQueries).toEqual(
      expect.arrayContaining(
        testMediaQueries.map(testMediaQuery =>
          expect.stringMatching(new RegExp(`${MediaQueryType.MAX_WIDTH}:\\s*${testMediaQuery}`))
        )
      )
    );
  });

  // it(`throws an error if any of the input items is a string`, () => {
  //   expect(() => {
  //     getMediaQueries([...testMediaQueries, `@media (min-width: 1920px)`]);
  //   }).toThrowError();
  // });
});
