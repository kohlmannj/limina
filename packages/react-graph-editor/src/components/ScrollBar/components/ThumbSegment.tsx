/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { ButtonHTMLAttributes, FunctionComponent } from 'react';
import { ScrollBarProps, StyledScrollBarProps } from '..';
import { defaults } from '../../../scrollBarTheme';
import { getSingleBorderRadiusValue, getSingleMarginValue } from './ThumbContainer';

export type ThumbSegmentPosition = 'start' | 'middle' | 'end';

export interface ThumbSegmentAdditionalProps {
  dragSignifier?: boolean;
  position: ThumbSegmentPosition;
}

export interface ThumbSegmentProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    ThumbSegmentAdditionalProps,
    ScrollBarProps {}

export interface StyledThumbSegmentProps extends ThumbSegmentProps, StyledScrollBarProps {}

export const dragSignifier = (props: StyledThumbSegmentProps) =>
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
      [!props.axis || props.axis === 'y' ? 'borderTop' : 'borderLeft']: '1px solid',
      [!props.axis || props.axis === 'y' ? 'borderBottom' : 'borderRight']: '1px solid',
      borderColor:
        props.theme && props.theme.trackColor ? props.theme.trackColor : defaults.trackColor,
      [!props.axis || props.axis === 'y' ? 'width' : 'height']: `${(props.theme &&
      typeof props.theme.thumbWidth !== 'undefined'
        ? props.theme.thumbWidth
        : defaults.thumbWidth) / 2}px`,
      [!props.axis || props.axis === 'y' ? 'height' : 'width']: `${(props.theme &&
      typeof props.theme.thumbWidth !== 'undefined'
        ? props.theme.thumbWidth
        : defaults.thumbWidth) / 4}px`,
      [!props.axis || props.axis === 'y' ? 'minHeight' : 'minWidth']: '3px',
      content: "''",
    },
  });

export const getBorderRadiusValue = ({ axis, position, theme }: StyledThumbSegmentProps) => {
  const radius = getSingleBorderRadiusValue({ theme });
  let borderRadiusValue = '0';

  if (!axis || axis === 'y') {
    if (position === 'start') {
      borderRadiusValue = `${radius} ${radius} 0 0`;
    } else if (position === 'end') {
      borderRadiusValue = `0 0 ${radius} ${radius}`;
    }
  } else if (position === 'start') {
    borderRadiusValue = `${radius} 0 0 ${radius}`;
  } else if (position === 'end') {
    borderRadiusValue = `0 ${radius} ${radius} 0`;
  }

  return borderRadiusValue;
};

export const getFlex = (props: StyledThumbSegmentProps) => {
  switch (props.position) {
    case 'start':
    case 'end':
      return `0 0 ${(props.theme && typeof props.theme.thumbWidth !== 'undefined'
        ? props.theme.thumbWidth
        : defaults.thumbWidth) +
        getSingleMarginValue(props) * 2}px`;
    case 'middle':
    default:
      return '0 1 100%';
  }
};

const thumbSegment = ({ position, theme }: StyledThumbSegmentProps) => css`
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

export const ThumbSegment: FunctionComponent<ThumbSegmentProps> = ({
  dragSignifier: dragSignifierProp,
  axis,
  position,
  ...rest
}) => (
  <button
    type="button"
    css={[
      thumbSegmentClassNames[position],
      dragSignifierProp && dragSignifierClassNames[axis || 'y'][position],
    ]}
    {...rest}
  />
);
