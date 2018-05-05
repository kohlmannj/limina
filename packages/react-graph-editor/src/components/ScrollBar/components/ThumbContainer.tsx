import React from 'react';
import styled, { css, StyledComponent } from 'react-emotion';
import { IScrollBarProps, IStyledScrollBarProps } from '..';
import defaultTheme from '../../../theme';

export const getOvershootFactor = (progress = 0, min = 0, max = 1): number => {
  let overshoot;

  if (progress < min) {
    overshoot = 1 - Math.abs(progress);
  } else if (progress > max) {
    overshoot = 1 - Math.abs(progress - max);
  } else {
    overshoot = 1;
  }

  return overshoot;
};

export const getTranslateFactor = (props: IScrollBarProps) => {
  const cappedProgress = Math.min(Math.max(props.progress || 0, 0), 1);
  const halfwayAddend = typeof props.progress !== 'undefined' && props.progress > 0.5 ? -1 : 0;
  const scaleMultiplier = (props.scale || 1) - 1;
  return (cappedProgress + halfwayAddend) * scaleMultiplier;
};

export const getMainAxisLength = (props: IStyledScrollBarProps) =>
  css({
    [!props.orientation || props.orientation === 'vertical' ? 'width' : 'height']: '100%',
  });

export const getCrossAxisLength = (props: IStyledScrollBarProps) => {
  const crossAxisProperty =
    !props.orientation || props.orientation === 'vertical' ? 'height' : 'width';
  const minCrossAxisProperty = `min-${crossAxisProperty}`;

  return css`
    ${crossAxisProperty}: ${1 / (props.scale || 1) * getOvershootFactor(props.progress) * 100}%;
    ${minCrossAxisProperty}: ${(props.theme && typeof props.theme.thumbWidth !== 'undefined'
      ? props.theme.thumbWidth
      : defaultTheme.thumbWidth) * 2}px;
  `;
};

export const getSingleBorderRadiusValue = (props: IStyledScrollBarProps) =>
  (props.theme && typeof props.theme.thumbWidth !== 'undefined'
    ? props.theme.thumbWidth
    : defaultTheme.thumbWidth) / 2;

export const getTransformValue = (props: IScrollBarProps) =>
  `translate${
    !props.orientation || props.orientation === 'vertical' ? 'Y' : 'X'
  }(${getTranslateFactor(props) * 100}%)`;

export const getSingleMarginValue = (props: IStyledScrollBarProps) =>
  ((props.theme && typeof props.theme.trackWidth !== 'undefined'
    ? props.theme.trackWidth
    : defaultTheme.trackWidth) -
    (props.theme && typeof props.theme.thumbWidth !== 'undefined'
      ? props.theme.thumbWidth
      : defaultTheme.thumbWidth)) /
  2;

const ThumbContainer: StyledComponent<
  IScrollBarProps,
  any,
  React.ClassAttributes<HTMLDivElement> &
    React.HTMLAttributes<HTMLDivElement> & {
      innerRef?:
        | string
        | ((instance: HTMLDivElement | null) => any)
        | React.RefObject<HTMLDivElement>
        | undefined;
    }
> = styled<IScrollBarProps, 'div'>('div')`
  position: relative;
  display: flex;
  flex-direction: inherit;
  align-items: stretch;
  justify-content: center;
  ${getMainAxisLength};
  ${getCrossAxisLength};
  transform: ${getTransformValue};

  &::before {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: ${getSingleMarginValue}px;
    background: ${props =>
      props.theme && props.theme.thumbColor ? props.theme.thumbColor : defaultTheme.thumbColor};
    border-radius: ${getSingleBorderRadiusValue}px;
    content: '';
    ${props => props.theme.thumbClassName};
  }
`;

export default ThumbContainer;
