/* eslint-disable import/no-extraneous-dependencies */
/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { Fragment } from 'react';
import styled from '@emotion/styled';
import { storiesOf } from '@storybook/react';
import { createBreakpoints, limina } from '..';

storiesOf('core/limina', module)
  .add('with div that decreases in width on wider screens', () => {
    const [mobile, tablet, desktop] = createBreakpoints([540, 854, 1280]);

    const LiminaDiv = styled('div')(
      limina({
        width: [mobile(540), tablet(320), desktop(1160)],
        fontSize: [mobile(32), tablet(48), desktop(64)],
      }),
      // Just to get syntax highlighting with the vscode-styled-components extension
      css`
        margin: 0 auto;
        background-color: rebeccapurple;
        color: goldenrod;
        font-family: sans-serif;
      `
    );

    return (
      <LiminaDiv>
        <h1>Hello World!</h1>
        <h2>Resize the preview pane to see some magic happen {'\u2728'}</h2>
      </LiminaDiv>
    );
  })
  .add('with multiple containers', () => {
    const [sm, md, ml, lg, xl] = createBreakpoints([320, 768, 1024, 1280, 1440]);

    const Container = styled('div')`
      display: flex;
      height: 200px;
      align-items: center;
      justify-content: center;
      margin: 0 auto 20px;
      background-color: orange;
      font-family: sans-serif;
    `;

    const LargeContainer = styled(Container)(
      limina({
        width: [sm(300), md(720), ml(945), lg(945), xl(1200)],
      })
    );

    const MediumContainer = styled(Container)(
      limina({
        width: [sm(300), md(630), ml(600), lg(600), xl(630)],
      })
    );

    const SmallContainer = styled(Container)(
      limina({
        width: [sm(300), md(300), ml(300), lg(300), xl(300)],
      })
    );

    return (
      <Fragment>
        <LargeContainer>
          <span>Large Container</span>
        </LargeContainer>

        <MediumContainer>
          <span>Medium Container</span>
        </MediumContainer>

        <SmallContainer>
          <span>Small Container</span>
        </SmallContainer>
      </Fragment>
    );
  })
  /** @see https://www.reaktor.com/blog/an-abstraction-called-text-styles/ */
  .add('with text styles', () => {
    const [mobile, phablet, lap, desk] = createBreakpoints([320, 414, 720, 1024]);

    const container = css(
      { background: '#ccc', margin: '0 auto' },
      limina({
        width: [mobile(290), phablet(384), lap(576), desk(720)],
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
        fontSize: [mobile(16), desk(18)],
      })
    );

    const heading = css(
      { margin: '0 0 0.25em', fontFamily: 'sans-serif', fontWeight: 'bold' },
      limina({
        fontSize: [mobile(20), lap(26), desk(30)],
        letterSpacing: [lap(0), desk(4)],
      })
    );

    return (
      <div css={container}>
        <h3 css={heading}>Level Three Heading</h3>

        <p css={bodyCopy}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec nisl accumsan,
          efficitur velit non, mollis est. Fusce eu elit vel velit tincidunt efficitur. Pellentesque
          habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Integer
          quam purus, ultrices vel vulputate a, facilisis at enim. Duis convallis blandit mauris.
          Integer eget hendrerit elit, at pharetra justo. Vestibulum ante ipsum primis in faucibus
          orci luctus et ultrices posuere cubilia Curae; Nulla posuere est consequat, consequat nunc
          vel, placerat neque. Donec augue nisi, sollicitudin ut molestie sit amet, tincidunt id
          lectus. Nam sit amet aliquam ipsum. Pellentesque vitae scelerisque dui. Proin at nisi at
          ligula bibendum suscipit. Donec tincidunt lectus dolor, et sollicitudin leo tincidunt non.
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
