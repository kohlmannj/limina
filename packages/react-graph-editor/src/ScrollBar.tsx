import React, { CSSProperties, SFC } from 'react';
import styled, { css, StyledComponent } from 'react-emotion';
import { OverflowMode, ScrollBarOrientation } from './index';

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
  left: ${!props.orientation || props.orientation === 'vertical' ? 'auto' : 0};
  right: ${!props.orientation || props.orientation === 'vertical'
    ? 0
    : `${
        props.theme && typeof props.theme.trackWidth === 'number' ? props.theme.trackWidth : 15
      }px`};
  top: ${!props.orientation || props.orientation === 'vertical' ? 0 : 'auto'};
  bottom: ${!props.orientation || props.orientation === 'vertical'
    ? `${props.theme && typeof props.theme.trackWidth === 'number' ? props.theme.trackWidth : 15}px`
    : 0};
`;

const Track = styled<IScrollBarProps, 'div'>('div')`
  background: ${props => props.theme.trackColor || `#efefef`};
  display: flex;
  flex-direction: ${props =>
    !props.orientation || props.orientation === 'vertical' ? 'column' : 'row'};
  align-items: center;
  justify-content: ${props =>
    typeof props.progress === 'number' && props.progress >= 0.5 ? 'flex-end' : 'flex-start'};
  ${props =>
    !props.orientation || props.orientation === 'vertical' ? 'width' : 'height'}: ${props =>
    `${typeof props.theme.trackWidth === 'number' ? props.theme.trackWidth : 15}px`};
  ${positionForOrientation};
`;

const ThumbContainer = styled<IScrollBarProps, 'div'>('div')`
  display: flex;
  flex-direction: inherit;
  justify-content: inherit;
  align-items: center;
  --overshoot-factor: ${props => getOvershootFactor(props.progress)};
  ${props => (!props.orientation || props.orientation === 'vertical' ? 'width' : 'height')}: 100%;
  /* Thumb Length */
  ${props =>
    !props.orientation || props.orientation === 'vertical' ? 'height' : 'width'}: ${props =>
    `calc(1 / ${props.scale || 1} * ${getOvershootFactor(props.progress)} * 100%)`};
  transform: ${props =>
    `translate${!props.orientation || props.orientation === 'vertical' ? 'Y' : 'X'}(${(Math.min(
      Math.max(props.progress || 0, 0),
      1
    ) +
      (typeof props.progress === 'number' && props.progress >= 0.5 ? -1 : 0)) *
    ((props.scale || 1) -
      1) /* *
      (typeof props.progress === 'number' && props.progress > 1
        ? (props.progress || 1) / getOvershootFactor(props.progress)
        : 1) */ *
      100}%)`};
`;

export interface IStyledScrollBarProps extends IScrollBarProps {
  theme?: IScrollBarTheme;
}

export const Thumb: StyledComponent<IScrollBarProps, IScrollBarTheme, {}> = styled<
  IScrollBarProps,
  'button'
>('button')`
  background: ${props => props.theme.thumbColor || '#666'};
  border-radius: ${props =>
    `${(typeof props.theme.thumbWidth === 'number' ? props.theme.thumbWidth : 15) / 2}px`};
  display: flex;
  padding: 0;
  border: 0;
  flex-direction: inherit;
  flex: 0 1 100%;
  margin: ${props =>
    `${!props.orientation || props.orientation === 'vertical' ? '' : '0 '}${((typeof props.theme
      .trackWidth === 'number'
      ? props.theme.trackWidth
      : 15) -
      (typeof props.theme.thumbWidth === 'number' ? props.theme.thumbWidth : 15)) /
      2}px${!props.orientation || props.orientation === 'vertical' ? ' 0' : ''}`};
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
