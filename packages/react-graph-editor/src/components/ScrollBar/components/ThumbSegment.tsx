import { css } from 'emotion';
import React, { ButtonHTMLAttributes, SFC } from 'react';
import { IScrollBarProps, IStyledScrollBarProps } from '..';
import defaultTheme from '../../../theme';
import { getSingleBorderRadiusValue, getSingleMarginValue } from './ThumbContainer';

export type ThumbSegmentPosition = 'start' | 'middle' | 'end';

export interface IThumbSegmentAdditionalProps {
  dragSignifier?: boolean;
  position: ThumbSegmentPosition;
}

export interface IThumbSegmentProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    IThumbSegmentAdditionalProps,
    IScrollBarProps {}

export interface IStyledThumbSegmentProps extends IThumbSegmentProps, IStyledScrollBarProps {}

export const dragSignifier = (props: IStyledThumbSegmentProps) =>
  css({
    cursor: `${!props.orientation || props.orientation === 'vertical' ? 'ns' : 'ew'}-resize`,

    '&::after': {
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      boxSizing: 'border-box',
      margin: 'auto',
      [!props.orientation || props.orientation === 'vertical'
        ? 'border-top'
        : 'border-left']: '1px solid',
      [!props.orientation || props.orientation === 'vertical'
        ? 'border-bottom'
        : 'border-right']: '1px solid',
      borderColor:
        props.theme && props.theme.trackColor ? props.theme.trackColor : defaultTheme.trackColor,
      [!props.orientation || props.orientation === 'vertical'
        ? 'width'
        : 'height']: `${(props.theme && typeof props.theme.thumbWidth !== 'undefined'
        ? props.theme.thumbWidth
        : defaultTheme.thumbWidth) / 2}px`,
      [!props.orientation || props.orientation === 'vertical'
        ? 'height'
        : 'width']: `${(props.theme && typeof props.theme.thumbWidth !== 'undefined'
        ? props.theme.thumbWidth
        : defaultTheme.thumbWidth) / 4}px`,
      [!props.orientation || props.orientation === 'vertical' ? 'min-height' : 'min-width']: '3px',
      content: "''",
    },
  });

export const getBorderRadiusValue = ({
  orientation,
  position,
  theme,
}: IStyledThumbSegmentProps) => {
  const radius = getSingleBorderRadiusValue({ theme });
  let borderRadiusValue = '0';

  if (!orientation || orientation === 'vertical') {
    if (position === 'start') {
      borderRadiusValue = `${radius} ${radius} 0 0`;
    } else if (position === 'end') {
      borderRadiusValue = `0 0 ${radius} ${radius}`;
    }
  } else {
    if (position === 'start') {
      borderRadiusValue = `${radius} 0 0 ${radius}`;
    } else if (position === 'end') {
      borderRadiusValue = `0 ${radius} ${radius} 0`;
    }
  }

  return borderRadiusValue;
};

export const getFlex = (props: IStyledThumbSegmentProps) => {
  switch (props.position) {
    case 'start':
    case 'end':
      return `0 0 ${(props.theme && typeof props.theme.thumbWidth !== 'undefined'
        ? props.theme.thumbWidth
        : defaultTheme.thumbWidth) +
        getSingleMarginValue(props) * 2}px`;
    case 'middle':
    default:
      return '0 1 100%';
  }
};

const thumbSegment = ({ position, theme }: IStyledThumbSegmentProps) => css`
  position: relative;
  flex: ${getFlex({ position, theme })};
  padding: ${getSingleMarginValue({ theme })};
  border: 0;
  margin: 0;
  background: transparent;
  border-radius: ${getBorderRadiusValue({ position, theme })}px;
`;

const thumbSegmentClassNames = {
  start: thumbSegment({ position: 'start' }),
  middle: thumbSegment({ position: 'middle' }),
  end: thumbSegment({ position: 'end' }),
};

const dragSignifierClassNames = {
  start: {
    horizontal: dragSignifier({ position: 'start', orientation: 'horizontal' }),
    vertical: dragSignifier({ position: 'start', orientation: 'vertical' }),
  },
  middle: {
    horizontal: dragSignifier({ position: 'middle', orientation: 'horizontal' }),
    vertical: dragSignifier({ position: 'middle', orientation: 'vertical' }),
  },
  end: {
    horizontal: dragSignifier({ position: 'end', orientation: 'horizontal' }),
    vertical: dragSignifier({ position: 'end', orientation: 'vertical' }),
  },
};

const ThumbSegment: SFC<IThumbSegmentProps> = ({
  className,
  dragSignifier: dragSignifierProp,
  orientation,
  position,
  ...rest
}) => (
  <button
    className={[
      className,
      thumbSegmentClassNames[position],
      dragSignifierProp && dragSignifierClassNames[position][orientation || 'vertical'],
    ]
      .filter(Boolean)
      .join(' ')}
    {...rest}
  />
);

export default ThumbSegment;
