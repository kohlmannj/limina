/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { FunctionComponent } from 'react';
import { ScrollBarProps, StyledScrollBarProps } from '..';
import { defaults } from '../../../scrollBarTheme';

export const positionForOrientation = ({ axis, theme }: StyledScrollBarProps) => css`
  top: ${!axis || axis === 'y' ? 0 : 'auto'};
  right: ${!axis || axis === 'y'
    ? 0
    : `${
        theme && typeof theme.trackWidth !== 'undefined' ? theme.trackWidth : defaults.trackWidth
      }px`};
  bottom: ${!axis || axis === 'y'
    ? `${
        theme && typeof theme.trackWidth !== 'undefined' ? theme.trackWidth : defaults.trackWidth
      }px`
    : 0};
  left: ${!axis || axis === 'y' ? 'auto' : 0};
`;

const trackStyles = ({ axis, theme }: StyledScrollBarProps) => css`
  display: flex;
  flex-direction: ${!axis || axis === 'y' ? 'column' : 'row'};
  align-items: center;
  background: ${theme && theme.trackColor ? theme.trackColor : defaults.trackColor};
  ${!axis || axis === 'y' ? 'width' : 'height'}: ${theme && typeof theme.trackWidth !== 'undefined'
    ? theme.trackWidth
    : defaults.trackWidth}px;
  ${positionForOrientation({ axis, theme })};
  ${theme && theme.trackClassName};
`;

const trackClassNames = {
  x: trackStyles({ axis: 'x' }),
  y: trackStyles({ axis: 'y' }),
};

export const Track: FunctionComponent<ScrollBarProps> = ({ axis, progress, style, ...rest }) => (
  <div
    css={trackClassNames[axis || 'y']}
    style={{
      ...style,
      justifyContent: progress && progress > 0.5 ? 'flex-end' : 'flex-start',
    }}
    {...rest}
  />
);
