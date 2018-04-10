import getMediaQueries from '../src/getMediaQueries';

const testMediaQueries: Array<number> = [320, 540, 854, 1280, 1605];

describe('getMediaQueries', () => {
  it('returns an array of media queries', () => {
    console.log('Hello World');
    const mediaQueries = getMediaQueries(testMediaQueries);
    expect(mediaQueries).toMatchObject(expect.arrayContaining(expect.stringMatching(/^@media\s*\(.*\)$/)));
  })
});
