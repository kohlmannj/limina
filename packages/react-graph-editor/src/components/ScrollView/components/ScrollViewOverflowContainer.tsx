import React from 'react';
import styled, { StyledComponent } from 'react-emotion';
import defaultTheme from '../../../theme';

const ScrollViewOverflowContainer: StyledComponent<
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
  overflow: auto;
  width: ${props =>
    `calc(100% - ${
      props.theme && typeof props.theme.trackWidth !== 'undefined'
        ? props.theme.trackWidth
        : defaultTheme.trackWidth
    }px)`};
  height: ${props =>
    `calc(100% - ${
      props.theme && typeof props.theme.trackWidth !== 'undefined'
        ? props.theme.trackWidth
        : defaultTheme.trackWidth
    }px)`};
  -webkit-overflow-scrolling: touch;

  ::-webkit-scrollbar {
    display: none;
  }
`;

export default ScrollViewOverflowContainer;
