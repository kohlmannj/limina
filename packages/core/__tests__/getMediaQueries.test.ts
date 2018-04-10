import getMediaQueries from '../src/getMediaQueries';

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
});
