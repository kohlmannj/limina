import React from 'react';
import styled, { css, StyledComponent } from 'react-emotion';
import { IScrollBarProps, IStyledScrollBarProps } from '..';
import { defaultTheme } from '../../../theme';

export const positionForOrientation = (props: IStyledScrollBarProps) => css`
  top: ${!props.orientation || props.orientation === 'vertical' ? 0 : 'auto'};
  right: ${!props.orientation || props.orientation === 'vertical'
    ? 0
    : `${
        props.theme && typeof props.theme.trackWidth !== 'undefined'
          ? props.theme.trackWidth
          : defaultTheme.trackWidth
      }px`};
  bottom: ${!props.orientation || props.orientation === 'vertical'
    ? `${
        props.theme && typeof props.theme.trackWidth !== 'undefined'
          ? props.theme.trackWidth
          : defaultTheme.trackWidth
      }px`
    : 0};
  left: ${!props.orientation || props.orientation === 'vertical' ? 'auto' : 0};
`;

const Track = styled<IScrollBarProps, 'div'>('div')`
  display: flex;
  flex-direction: ${props =>
    !props.orientation || props.orientation === 'vertical' ? 'column' : 'row'};
  align-items: center;
  justify-content: ${props =>
    typeof props.progress === 'number' && props.progress > 0.5 ? 'flex-end' : 'flex-start'};
  background: ${props => props.theme.trackColor || defaultTheme.trackColor};
  ${props =>
    !props.orientation || props.orientation === 'vertical' ? 'width' : 'height'}: ${props =>
    `${
      typeof props.theme.trackWidth !== 'undefined'
        ? props.theme.trackWidth
        : defaultTheme.trackWidth
    }px`};
  ${positionForOrientation};
  ${props => props.theme.trackClassName};
`;

export default Track;
