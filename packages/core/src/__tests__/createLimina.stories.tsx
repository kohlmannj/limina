/* eslint-disable import/no-extraneous-dependencies */
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { storiesOf } from '@storybook/react';
import { createLimina } from '..';

/** @see https://www.reaktor.com/blog/an-abstraction-called-text-styles/ */
storiesOf('core/createLimina', module).add('with text styles', () => {
  const {
    limina,
    breakpoints: [mobile, phablet, lap, desk],
  } = createLimina([320, 414, 720, 1024]);

  const container = css(
    { background: '#ccc', margin: '0 auto' },
    limina({
      [mobile]: {
        width: 290,
      },
      [phablet]: {
        width: 384,
      },
      [lap]: {
        width: 576,
      },
      [desk]: {
        width: 720,
      },
    })
  );

  const bodyCopy = css(
    `
      margin: 0;
      font-family: sans-serif;

      & + & {
        margin-top: 0.5em;
      }
    `,
    limina({
      [mobile]: {
        fontSize: 16,
      },

      [desk]: {
        fontSize: 18,
      },
    })
  );

  const heading = css(
    { margin: '0 0 0.25em', fontFamily: 'sans-serif', fontWeight: 'bold' },
    limina({
      [mobile]: {
        fontSize: 20,
      },

      [lap]: {
        fontSize: 26,
        letterSpacing: 0,
      },

      [desk]: {
        fontSize: 30,
        letterSpacing: 4,
      },
    })
  );

  return (
    <div css={container}>
      <h3 css={heading}>Level Three Heading</h3>

      <p css={bodyCopy}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec nisl accumsan, efficitur
        velit non, mollis est. Fusce eu elit vel velit tincidunt efficitur. Pellentesque habitant
        morbi tristique senectus et netus et malesuada fames ac turpis egestas. Integer quam purus,
        ultrices vel vulputate a, facilisis at enim. Duis convallis blandit mauris. Integer eget
        hendrerit elit, at pharetra justo. Vestibulum ante ipsum primis in faucibus orci luctus et
        ultrices posuere cubilia Curae; Nulla posuere est consequat, consequat nunc vel, placerat
        neque. Donec augue nisi, sollicitudin ut molestie sit amet, tincidunt id lectus. Nam sit
        amet aliquam ipsum. Pellentesque vitae scelerisque dui. Proin at nisi at ligula bibendum
        suscipit. Donec tincidunt lectus dolor, et sollicitudin leo tincidunt non.
      </p>

      <p css={bodyCopy}>
        Inspired by{' '}
        <a href="https://www.reaktor.com/blog/an-abstraction-called-text-styles/">
          Joonas Salovaara
        </a>
      </p>
    </div>
  );
});
