import React from 'react';
import styled, { css, StyledComponent } from 'react-emotion';
import { IScrollBarProps, IStyledScrollBarProps } from '..';

export const getOvershootFactor = (progress = 0, min = 0, max = 1): number => {
  let overshoot;

  if (progress < min) {
    overshoot = 1 - Math.abs(progress);
  } else if (progress >= max) {
    overshoot = 1 - Math.abs(progress - max);
  } else {
    overshoot = 1;
  }

  return overshoot;
};

const ThumbContainer = styled<IScrollBarProps, 'div'>('div')`
  display: flex;
  flex-direction: inherit;
  align-items: center;
  justify-content: inherit;
  ${props =>
    !props.orientation || props.orientation === 'vertical' ? 'width: 100%' : 'height: 100%'};
  ${props =>
    !props.orientation || props.orientation === 'vertical' ? 'height' : 'width'}: ${props =>
    `calc(1 / ${props.scale || 1} * ${getOvershootFactor(props.progress)} * 100%)`};
  transform: ${props =>
    `translate${!props.orientation || props.orientation === 'vertical' ? 'Y' : 'X'}(${(Math.min(
      Math.max(props.progress || 0, 0),
      1
    ) +
      (typeof props.progress === 'number' && props.progress >= 0.5 ? -1 : 0)) *
      ((props.scale || 1) - 1) *
      100}%)`};
`;

export default ThumbContainer;
