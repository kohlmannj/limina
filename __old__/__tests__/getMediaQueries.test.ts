import testMediaQueries from '../__stubs__/testMediaQueries';
import getMediaQueries from '../src/getMediaQueries';

describe('getMediaQueries', () => {
  it('returns an array of `min-width` media queries', () => {
    const mediaQueries = getMediaQueries(testMediaQueries);
    expect(mediaQueries).toHaveLength(testMediaQueries.length);

    expect(mediaQueries).toEqual(
      expect.arrayContaining(
        testMediaQueries.map(testMediaQuery =>
          expect.stringMatching(new RegExp(`min-width:\\s*${testMediaQuery}`))
        )
      )
    );
  });

  it('returns an array of `max-width` media queries', () => {
    const mediaQueries = getMediaQueries(testMediaQueries, 'max-width');
    expect(mediaQueries).toHaveLength(testMediaQueries.length);

    expect(mediaQueries).toEqual(
      expect.arrayContaining(
        testMediaQueries.map(testMediaQuery =>
          expect.stringMatching(new RegExp(`max-width:\\s*${testMediaQuery}`))
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
