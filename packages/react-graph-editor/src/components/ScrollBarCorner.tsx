import React from 'react';
import styled, { StyledComponent } from 'react-emotion';
import defaultTheme from '../theme';

const ScrollBarCorner: StyledComponent<
  {},
  any,
  React.ClassAttributes<HTMLDivElement> &
    React.HTMLAttributes<HTMLDivElement> & {
      innerRef?:
        | string
        | ((instance: HTMLDivElement | null) => any)
        | React.RefObject<HTMLDivElement>
        | undefined;
    }
> = styled.div`
  position: absolute;
  z-index: 9999;
  right: 0;
  bottom: 0;
  width: ${props => props.theme.trackWidth || defaultTheme.trackWidth}px;
  height: ${props => props.theme.trackWidth || defaultTheme.trackWidth}px;
  background: ${props => props.theme.trackColor || defaultTheme.trackColor};
  ${props => props.theme.trackClassName};
`;

export default ScrollBarCorner;
