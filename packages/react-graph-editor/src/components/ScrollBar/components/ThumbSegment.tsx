import React, { ButtonHTMLAttributes } from 'react';
import styled, { css, StyledComponent } from 'react-emotion';
import { IScrollBarProps, IStyledScrollBarProps } from '..';
import defaultTheme from '../../../theme';
import { getSingleBorderRadiusValue, getSingleMarginValue } from './ThumbContainer';

export interface IThumbSegmentAdditionalProps {
  dragSignifier?: boolean;
  position: 'start' | 'middle' | 'end';
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

export const getBorderRadiusValue = (props: IStyledThumbSegmentProps) => {
  const radius = getSingleBorderRadiusValue(props);
  let borderRadiusValue = '0';

  if (!props.orientation || props.orientation === 'vertical') {
    if (props.position === 'start') {
      borderRadiusValue = `${radius} ${radius} 0 0`;
    } else if (props.position === 'end') {
      borderRadiusValue = `0 0 ${radius} ${radius}`;
    }
  } else {
    if (props.position === 'start') {
      borderRadiusValue = `${radius} 0 0 ${radius}`;
    } else if (props.position === 'end') {
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

const ThumbSegment = styled<IThumbSegmentProps, 'button'>('button')`
  position: relative;
  flex: ${getFlex};
  padding: ${getSingleMarginValue};
  border: 0;
  margin: 0;
  background: transparent;
  border-radius: ${getBorderRadiusValue}px;
  ${props => props.dragSignifier && dragSignifier(props)};
`;

export default ThumbSegment;
