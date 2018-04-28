import React from 'react';
import styled, { StyledComponent } from 'react-emotion';
import { IScrollBarProps } from '..';
import { defaultTheme } from '../../../theme';

const Thumb = styled<IScrollBarProps, 'button'>('button')`
  display: flex;
  flex: 0 1 100%;
  flex-direction: inherit;
  padding: 0;
  border: 0;
  margin: ${props =>
    `${!props.orientation || props.orientation === 'vertical' ? '' : '0 '}${((typeof props.theme
      .trackWidth === 'number'
      ? props.theme.trackWidth
      : 15) -
      (typeof props.theme.thumbWidth === 'number'
        ? props.theme.thumbWidth
        : defaultTheme.thumbWidth)) /
      2}px${!props.orientation || props.orientation === 'vertical' ? ' 0' : ''}`};
  background: ${props => props.theme.thumbColor || defaultTheme.thumbColor};
  border-radius: ${props =>
    `${(typeof props.theme.thumbWidth === 'number'
      ? props.theme.thumbWidth
      : defaultTheme.thumbWidth) / 2}px`};
  ${props =>
    !props.orientation || props.orientation === 'vertical' ? 'width' : 'height'}: ${props =>
    `${
      typeof props.theme.thumbWidth === 'number' ? props.theme.thumbWidth : defaultTheme.thumbWidth
    }px`};
`;

export default Thumb;
