import React, { SFC } from 'react';
import { css } from 'react-emotion';
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

export const getTranslateFactor = ({ progress, scale }: IScrollBarProps) => {
  const cappedProgress = Math.min(Math.max(progress || 0, 0), 1);
  const halfwayAddend = typeof progress !== 'undefined' && progress > 0.5 ? -1 : 0;
  const scaleMultiplier = (scale || 1) - 1;
  return (cappedProgress + halfwayAddend) * scaleMultiplier;
};

export const getMainAxisLength = ({ orientation }: IScrollBarProps) => ({
  [!orientation || orientation === 'vertical' ? 'width' : 'height']: '100%',
});

export const getCrossAxisLength = ({ orientation, progress, scale }: IScrollBarProps) => {
  const crossAxisProperty = !orientation || orientation === 'vertical' ? 'height' : 'width';
  // const minCrossAxisProperty = `min${crossAxisProperty}`;

  return {
    [crossAxisProperty]: `${1 / (scale || 1) * getOvershootFactor(progress) * 100}%`,
  };
};

export const getSingleBorderRadiusValue = ({ theme }: IStyledScrollBarProps) =>
  (theme && typeof theme.thumbWidth !== 'undefined' ? theme.thumbWidth : defaultTheme.thumbWidth) /
  2;

export const getTransform = ({ orientation, progress, scale }: IScrollBarProps) => ({
  transform: `translate${
    !orientation || orientation === 'vertical' ? 'Y' : 'X'
  }(${getTranslateFactor({ progress, scale }) * 100}%)`,
});

export const getSingleMarginValue = ({ theme }: IStyledScrollBarProps) =>
  ((theme && typeof theme.trackWidth !== 'undefined' ? theme.trackWidth : defaultTheme.trackWidth) -
    (theme && typeof theme.thumbWidth !== 'undefined'
      ? theme.thumbWidth
      : defaultTheme.thumbWidth)) /
  2;

const thumbStyles = css`
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
    background: ${defaultTheme.thumbColor};
    border-radius: ${getSingleBorderRadiusValue({})}px;
    content: '';
  }
`;

const ThumbContainer: SFC<IScrollBarProps> = ({
  className,
  orientation,
  progress,
  scale,
  style,
  ...rest
}) => (
  <div
    className={`${className} ${thumbStyles}`}
    style={{
      ...style,
      ...getMainAxisLength({ orientation }),
      ...getCrossAxisLength({ orientation, progress, scale }),
      ...getTransform({ orientation, progress, scale }),
    }}
    {...rest}
  />
);

export default ThumbContainer;
