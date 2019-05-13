/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { FunctionComponent } from 'react';
import { ScrollBarProps, StyledScrollBarProps } from '..';
import { defaults } from '../../../scrollBarTheme';

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

export const getTranslateFactor = ({ progress, scale }: ScrollBarProps) => {
  const cappedProgress = Math.min(Math.max(progress || 0, 0), 1);
  const halfwayAddend = typeof progress !== 'undefined' && progress > 0.5 ? -1 : 0;
  const scaleMultiplier = (scale || 1) - 1;
  return (cappedProgress + halfwayAddend) * scaleMultiplier;
};

export const getMainAxisLength = ({ axis }: ScrollBarProps) => ({
  [!axis || axis === 'y' ? 'width' : 'height']: '100%',
});

export const getCrossAxisLength = ({ axis, progress, scale }: ScrollBarProps) => {
  const crossAxisProperty = !axis || axis === 'y' ? 'height' : 'width';
  // const minCrossAxisProperty = `min${crossAxisProperty}`;

  return {
    [crossAxisProperty]: `${(1 / (scale || 1)) * getOvershootFactor(progress) * 100}%`,
  };
};

export const getSingleBorderRadiusValue = ({ theme }: StyledScrollBarProps) =>
  (theme && typeof theme.thumbWidth !== 'undefined' ? theme.thumbWidth : defaults.thumbWidth) / 2;

export const getTransform = ({ axis, progress, scale }: ScrollBarProps) => ({
  transform: `translate${(axis || 'y').toUpperCase()}(${getTranslateFactor({
    progress,
    scale,
  }) * 100}%)`,
});

export const getSingleMarginValue = ({ theme }: StyledScrollBarProps) =>
  ((theme && typeof theme.trackWidth !== 'undefined' ? theme.trackWidth : defaults.trackWidth) -
    (theme && typeof theme.thumbWidth !== 'undefined' ? theme.thumbWidth : defaults.thumbWidth)) /
  2;

const thumbCss = css`
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: inherit;
  align-items: stretch;
  justify-content: center;

  &::before {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: ${getSingleMarginValue({})}px;
    background: ${defaults.thumbColor};
    border-radius: ${getSingleBorderRadiusValue({})}px;
    content: '';
  }
`;

export const ThumbContainer: FunctionComponent<ScrollBarProps> = ({
  axis,
  progress,
  scale,
  style,
  ...rest
}) => (
  <div
    css={thumbCss}
    style={{
      ...style,
      ...getMainAxisLength({ axis }),
      ...getCrossAxisLength({ axis, progress, scale }),
      ...getTransform({ axis, progress, scale }),
    }}
    {...rest}
  />
);
