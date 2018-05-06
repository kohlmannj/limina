import { css } from 'emotion';
import React, { SFC } from 'react';
import { IScrollBarProps, IStyledScrollBarProps } from '..';
import defaultTheme from '../../../theme';

export const positionForOrientation = ({ orientation, theme }: IStyledScrollBarProps) => css`
  top: ${!orientation || orientation === 'vertical' ? 0 : 'auto'};
  right: ${!orientation || orientation === 'vertical'
    ? 0
    : `${
        theme && typeof theme.trackWidth !== 'undefined'
          ? theme.trackWidth
          : defaultTheme.trackWidth
      }px`};
  bottom: ${!orientation || orientation === 'vertical'
    ? `${
        theme && typeof theme.trackWidth !== 'undefined'
          ? theme.trackWidth
          : defaultTheme.trackWidth
      }px`
    : 0};
  left: ${!orientation || orientation === 'vertical' ? 'auto' : 0};
`;

const trackStyles = ({ orientation, theme }: IStyledScrollBarProps) => css`
  display: flex;
  flex-direction: ${!orientation || orientation === 'vertical' ? 'column' : 'row'};
  align-items: center;
  background: ${theme && theme.trackColor ? theme.trackColor : defaultTheme.trackColor};
  ${!orientation || orientation === 'vertical' ? 'width' : 'height'}: ${theme &&
  typeof theme.trackWidth !== 'undefined'
    ? theme.trackWidth
    : defaultTheme.trackWidth}px;
  ${positionForOrientation({ orientation, theme })};
  ${theme && theme.trackClassName};
`;

const trackClassNames = {
  horizontal: trackStyles({ orientation: 'horizontal' }),
  vertical: trackStyles({ orientation: 'vertical' }),
};

const Track: SFC<IScrollBarProps> = ({ className, orientation, progress, style, ...rest }) => (
  <div
    className={`${className} ${trackClassNames[orientation || 'vertical']}`}
    style={{
      ...style,
      justifyContent: typeof progress === 'number' && progress > 0.5 ? 'flex-end' : 'flex-start',
    }}
    {...rest}
  />
);

export default Track;
