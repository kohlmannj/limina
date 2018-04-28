import React from 'react';
import styled, { css, StyledComponent } from 'react-emotion';
import { IScrollBarProps, IStyledScrollBarProps } from '..';
import { defaultTheme } from '../../../theme';

export const positionForOrientation = (props: IStyledScrollBarProps) => css`
  top: ${!props.orientation || props.orientation === 'vertical' ? 0 : 'auto'};
  right: ${!props.orientation || props.orientation === 'vertical'
    ? 0
    : `${
        props.theme && typeof props.theme.trackWidth === 'number' ? props.theme.trackWidth : 15
      }px`};
  bottom: ${!props.orientation || props.orientation === 'vertical'
    ? `${props.theme && typeof props.theme.trackWidth === 'number' ? props.theme.trackWidth : 15}px`
    : 0};
  left: ${!props.orientation || props.orientation === 'vertical' ? 'auto' : 0};
`;

const Track = styled<IScrollBarProps, 'div'>('div')`
  display: flex;
  flex-direction: ${props =>
    !props.orientation || props.orientation === 'vertical' ? 'column' : 'row'};
  align-items: center;
  justify-content: ${props =>
    typeof props.progress === 'number' && props.progress >= 0.5 ? 'flex-end' : 'flex-start'};
  background: ${props => props.theme.trackColor || `#efefef`};
  ${props =>
    !props.orientation || props.orientation === 'vertical' ? 'width' : 'height'}: ${props =>
    `${typeof props.theme.trackWidth === 'number' ? props.theme.trackWidth : 15}px`};
  ${positionForOrientation};
`;

export default Track;
