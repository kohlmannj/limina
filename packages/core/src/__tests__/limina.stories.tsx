/* eslint-disable import/no-extraneous-dependencies */
import React, { Fragment } from 'react';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { storiesOf } from '@storybook/react';
import { createBreakpoints, limina } from '..';

storiesOf('core', module)
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
  });
