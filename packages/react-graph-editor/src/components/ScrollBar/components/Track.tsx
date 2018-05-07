import { css } from 'emotion';
import React, { SFC } from 'react';
import { IScrollBarProps, IStyledScrollBarProps } from '..';
import defaultTheme from '../../../theme';

export const positionForOrientation = ({ axis, theme }: IStyledScrollBarProps) => css`
  top: ${!axis || axis === 'y' ? 0 : 'auto'};
  right: ${!axis || axis === 'y'
    ? 0
    : `${
        theme && typeof theme.trackWidth !== 'undefined'
          ? theme.trackWidth
          : defaultTheme.trackWidth
      }px`};
  bottom: ${!axis || axis === 'y'
    ? `${
        theme && typeof theme.trackWidth !== 'undefined'
          ? theme.trackWidth
          : defaultTheme.trackWidth
      }px`
    : 0};
  left: ${!axis || axis === 'y' ? 'auto' : 0};
`;

const trackStyles = ({ axis, theme }: IStyledScrollBarProps) => css`
  display: flex;
  flex-direction: ${!axis || axis === 'y' ? 'column' : 'row'};
  align-items: center;
  background: ${theme && theme.trackColor ? theme.trackColor : defaultTheme.trackColor};
  ${!axis || axis === 'y' ? 'width' : 'height'}: ${theme && typeof theme.trackWidth !== 'undefined'
    ? theme.trackWidth
    : defaultTheme.trackWidth}px;
  ${positionForOrientation({ axis, theme })};
  ${theme && theme.trackClassName};
`;

const trackClassNames = {
  x: trackStyles({ axis: 'x' }),
  y: trackStyles({ axis: 'y' }),
};

const Track: SFC<IScrollBarProps> = ({ className, axis, progress, style, ...rest }) => (
  <div
    className={`${className} ${trackClassNames[axis || 'y']}`}
    style={{
      ...style,
      justifyContent: typeof progress === 'number' && progress > 0.5 ? 'flex-end' : 'flex-start',
    }}
    {...rest}
  />
);

export default Track;
