import React, { CSSProperties, SFC } from 'react';
import styled, { css, StyledComponent } from 'react-emotion';
import { OverflowMode, ScrollBarOrientation } from '..';

export interface IScrollBarProps {
  className?: string;
  orientation?: ScrollBarOrientation;
  overflow?: OverflowMode;
  progress?: number;
  scale?: number;
  style?: CSSProperties;
}

export interface IScrollBarTheme {
  thumbColor?: string;
  thumbWidth?: number;
  trackColor?: string;
  trackWidth?: number;
}

const getOvershootFactor = (progress = 0, min = 0, max = 1): number => {
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

const positionForOrientation = (props: IStyledScrollBarProps) => css`
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

export interface IStyledScrollBarProps extends IScrollBarProps {
  theme?: IScrollBarTheme;
}

export const Thumb = styled<IScrollBarProps, 'button'>('button')`
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
      (typeof props.theme.thumbWidth === 'number' ? props.theme.thumbWidth : 15)) /
      2}px${!props.orientation || props.orientation === 'vertical' ? ' 0' : ''}`};
  background: ${props => props.theme.thumbColor || '#666'};
  border-radius: ${props =>
    `${(typeof props.theme.thumbWidth === 'number' ? props.theme.thumbWidth : 15) / 2}px`};
  ${props =>
    !props.orientation || props.orientation === 'vertical' ? 'width' : 'height'}: ${props =>
    `${typeof props.theme.thumbWidth === 'number' ? props.theme.thumbWidth : 15}px`};
`;

export const ScrollBar: SFC<IScrollBarProps> = ({
  className,
  orientation,
  overflow,
  progress,
  scale,
  style,
}) => (
  <Track className={className} orientation={orientation} progress={progress} style={style}>
    <ThumbContainer orientation={orientation} progress={progress} scale={scale}>
      {typeof scale === 'number' &&
        (scale > 1 || (scale <= 1 && overflow === 'scroll')) && <Thumb orientation={orientation} />}
    </ThumbContainer>
  </Track>
);

ScrollBar.defaultProps = {
  orientation: 'vertical',
  overflow: 'auto',
  scale: 1,
};

export default ScrollBar;
