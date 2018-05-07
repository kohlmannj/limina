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
    cursor: `${!props.axis || props.axis === 'y' ? 'row' : 'col'}-resize`,

    '&::after': {
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      boxSizing: 'border-box',
      margin: 'auto',
      [!props.axis || props.axis === 'y' ? 'border-top' : 'border-left']: '1px solid',
      [!props.axis || props.axis === 'y' ? 'border-bottom' : 'border-right']: '1px solid',
      borderColor:
        props.theme && props.theme.trackColor ? props.theme.trackColor : defaultTheme.trackColor,
      [!props.axis || props.axis === 'y' ? 'width' : 'height']: `${(props.theme &&
      typeof props.theme.thumbWidth !== 'undefined'
        ? props.theme.thumbWidth
        : defaultTheme.thumbWidth) / 2}px`,
      [!props.axis || props.axis === 'y' ? 'height' : 'width']: `${(props.theme &&
      typeof props.theme.thumbWidth !== 'undefined'
        ? props.theme.thumbWidth
        : defaultTheme.thumbWidth) / 4}px`,
      [!props.axis || props.axis === 'y' ? 'min-height' : 'min-width']: '3px',
      content: "''",
    },
  });

export const getBorderRadiusValue = ({ axis, position, theme }: IStyledThumbSegmentProps) => {
  const radius = getSingleBorderRadiusValue({ theme });
  let borderRadiusValue = '0';

  if (!axis || axis === 'y') {
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
  padding: ${getSingleMarginValue({ theme })}px;
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
  x: {
    start: dragSignifier({ axis: 'x', position: 'start' }),
    middle: dragSignifier({ axis: 'x', position: 'middle' }),
    end: dragSignifier({ axis: 'x', position: 'end' }),
  },
  y: {
    start: dragSignifier({ axis: 'y', position: 'start' }),
    middle: dragSignifier({ axis: 'y', position: 'middle' }),
    end: dragSignifier({ axis: 'y', position: 'end' }),
  },
};

const ThumbSegment: SFC<IThumbSegmentProps> = ({
  className,
  dragSignifier: dragSignifierProp,
  axis,
  position,
  ...rest
}) => (
  <button
    className={[
      className,
      thumbSegmentClassNames[position],
      dragSignifierProp && dragSignifierClassNames[axis || 'y'][position],
    ]
      .filter(Boolean)
      .join(' ')}
    {...rest}
  />
);

export default ThumbSegment;
